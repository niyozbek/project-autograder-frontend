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
import {ThemePalette} from "@angular/material/core";
import {environment} from "../../../environments/environment";

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
  // eventually every submission will have progress=100 even though status might be various
  testResult: TestResultModel
  progress = 0
  progressInterval
  color: ThemePalette = 'primary';

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
        this.statusMap = STATUSES[this.submission.status]
      })
  }

  connectToWebSocket() {
    if (this.webSocketClient != null) {
      return
    }
    const socket = new SockJS(environment.apiUrl + '/gs-guide-websocket');
    this.webSocketClient = Stomp.over(socket);

    const _this = this;
    this.webSocketClient.connect({}, function (frame) {
      console.log('Connected: ' + frame);
      _this.webSocketClient.subscribe('/topic/test-results', function (testResult) {
        _this.testResult = JSON.parse(testResult.body)
        _this.showProgress();
        // progressRequest is needed so that code stops in case submission gets stuck
        if (_this.testResult.status == 'COMPLETED') {
          _this.color = 'accent'
          clearInterval(_this.progressInterval)
          _this.store.dispatch(new SubmissionActions.GetSubmission({submissionId: _this.id}))
          _this.store.dispatch(new SubmissionActions.GetSubmissionTests({submissionId: _this.id}))
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

  showProgress() {
    // console.log(testResultModel)
    this.progress = this.testResult.processedTestCases / this.testResult.totalTestCases * 100
  }

  ngOnDestroy(): void {
    this.disconnectFromWebSocket()
    this.studentSubscription.unsubscribe()
    this.routeSubscription.unsubscribe()
  }
}



