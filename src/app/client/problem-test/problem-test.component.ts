import {Component, OnDestroy, OnInit} from '@angular/core';
import {Store} from "@ngrx/store";
import * as SubmissionActions from '../problem-submission/problem-submission.actions';
import {ActivatedRoute, Router} from "@angular/router";
import {filter, map, take} from "rxjs/operators";
import {STATUSES, Submission} from "../problem-submission/problem-submission.model";
import {SubmissionTest} from "./problem-test.model";
import * as fromClient from "../client.reducer";
import {Subscription} from "rxjs";
import {Stomp} from '@stomp/stompjs';
import SockJS from 'sockjs-client';
import {TestResultModel} from "./test-result.model";
import {ThemePalette} from "@angular/material/core";
import {environment} from "../../../environments/environment";

@Component({
  standalone: false,
  selector: 'app-client-submission',
  templateUrl: './problem-test.component.html',
})

export class ProblemTestComponent implements OnInit, OnDestroy {
  routeSubscription: Subscription
  clientSubscription: Subscription
  id: number
  submission: Submission
  submissionTests: SubmissionTest[]
  statusMap = STATUSES.INIT
  webSocketClient
  // eventually every submission will have progress=100 even though status might be various
  testResult: TestResultModel
  progress = 0
  progressInterval
  // const isSuccess = ['ACCEPTED', 'COMPLETED'].includes(_this.testResult.status);
  color: ThemePalette = 'accent';
  

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private store: Store<fromClient.State>
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

    this.clientSubscription = this.store.select('client')
      .subscribe(clientState => {
        const submissionState = clientState.submissions
        this.submission = submissionState.submission
        this.submissionTests = submissionState.submissionTests
        this.statusMap = STATUSES[this.submission.status]
      })
  }

  connectToWebSocket() {
    if (this.webSocketClient != null) {
      return
    }

    this.store.select('auth').pipe(
      map(authState => authState.user),
      filter(user => !!user),
      take(1)
    ).subscribe(user => {
      const token = user.token;
      const url = environment.apiUrl + '/ws/submissions' + (token ? '?access_token=' + token : '');
      const socket = new SockJS(url);
      this.webSocketClient = Stomp.over(socket);

      const _this = this;
      this.webSocketClient.connect({}, function (frame) {
        console.log('Connected: ' + frame);
        _this.webSocketClient.subscribe('/topic/test-results', function (testResult) {
          _this.testResult = JSON.parse(testResult.body)
          _this.showProgress();
          // Stop polling when any terminal status is reached
          const terminalStatuses = ['COMPLETED', 'ACCEPTED', 'WRONG_ANSWER', 'COMPILE_ERROR'];
          if (terminalStatuses.includes(_this.testResult.status)) {
            _this.color = 'accent'
            clearInterval(_this.progressInterval)
            _this.disconnectFromWebSocket()
            _this.store.dispatch(new SubmissionActions.GetSubmission({submissionId: _this.id}))
            _this.store.dispatch(new SubmissionActions.GetSubmissionTests({submissionId: _this.id}))
          }
        });
        // update every 1000 seconds
        _this.progressInterval = setInterval(() => {
          _this.requestTestResult();
        }, 1000)
      });
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
    this.clientSubscription.unsubscribe()
    this.routeSubscription.unsubscribe()
  }
}



