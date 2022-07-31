import {Component, OnDestroy, OnInit} from '@angular/core';
import {Store} from "@ngrx/store";
import * as SubmissionActions from '../problem-submission/problem-submission.actions';
import {ActivatedRoute, Router} from "@angular/router";
import {map} from "rxjs/operators";
import {STATUSES, Submission} from "../problem-submission/problem-submission.model";
import {SubmissionTest} from "./problem-test.model";
import * as fromStudent from "../student.reducer";
import {Subscription} from "rxjs";
import {Stomp} from '@stomp/stompjs';
import * as SockJS from 'sockjs-client';
import {TestResultModel} from "./test-result.model";

@Component({
  selector: 'app-student-submission',
  templateUrl: './problem-test.component.html',
})

export class ProblemTestComponent implements OnInit, OnDestroy {
  routeSubscription: Subscription
  studentSubscription: Subscription
  id: number
  submission: Submission
  submissionTests: SubmissionTest[]
  statusMap = STATUSES.INIT
  webSocketClient
  progress = 0
  progressInterval
  // if three times progress is not updated, decide that it got stuck (WRONG_ANSWER||COMP_ERROR)
  progressRequestsInitial = 15
  progressRequests = this.progressRequestsInitial

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private store: Store<fromStudent.State>
  ) {
  }

  ngOnInit(): void {
    this.routeSubscription = this.route.params.pipe(
      map(params => {
        this.id = +params['id']
        return this.id
      }),
    ).subscribe(id => {
      this.connectToWebSocket();
      this.store.dispatch(new SubmissionActions.GetSubmission({submissionId: id}))
      this.store.dispatch(new SubmissionActions.GetSubmissionTests({submissionId: id}))
    })

    this.studentSubscription = this.store.select('student')
      .subscribe(studentState => {
        const submissionState = studentState.submissions
        this.submission = submissionState.submission
        this.submissionTests = submissionState.submissionTests
        if (this.submission.status) {
          this.statusMap = STATUSES[this.submission.status]
        }
      })
  }

  connectToWebSocket() {
    const socket = new SockJS('http://localhost:8080/gs-guide-websocket');
    this.webSocketClient = Stomp.over(socket);

    const _this = this;
    this.webSocketClient.connect({}, function (frame) {
      console.log('Connected: ' + frame);
      _this.webSocketClient.subscribe('/topic/test-results', function (testResult) {
        _this.showProgress(JSON.parse(testResult.body));
        // progressRequest is needed so that code stops in case submission gets stuck
        if (_this.progress == 100 || _this.progressRequests < 1) {
          console.log('stopped')
          clearInterval(_this.progressInterval)
        }
      });
      // update every 1000 seconds
      _this.progressInterval = setInterval(() => {
        _this.requestTestResult();
      }, 1000)
    });
  }

  disconnectFromWebSocket() {
    if (this.webSocketClient != null) {
      this.webSocketClient.disconnect();
    }

    console.log('Disconnected!');
  }

  requestTestResult() {
    this.webSocketClient.send(
      '/app/test-result',
      {},
      JSON.stringify({'submissionId': this.id})
    );
  }

  showProgress(testResultModel: TestResultModel) {
    console.log(testResultModel)
    const newProgress = testResultModel.processedTestCases / testResultModel.totalTestCases * 100
    if (this.progress === newProgress) {
      this.progressRequests -= 1;
    } else {
      // reset
      this.progressRequests = this.progressRequestsInitial
    }
    this.progress = newProgress
  }

  ngOnDestroy(): void {
    this.disconnectFromWebSocket()
    this.studentSubscription.unsubscribe()
    this.routeSubscription.unsubscribe()
  }
}



