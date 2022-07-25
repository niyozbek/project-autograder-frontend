import {Component, OnDestroy, OnInit} from '@angular/core';
import {Store} from "@ngrx/store";
import * as SubmissionActions from '../problem-submission/problem-submission.actions';
import {ActivatedRoute, Router} from "@angular/router";
import {map, switchMap} from "rxjs/operators";
import {STATUSES, Submission} from "../problem-submission/problem-submission.model";
import {SubmissionTest} from "./problem-test.model";
import * as fromStudent from "../student.reducer";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-student-submission',
  templateUrl: './problem-test.component.html',
})

export class ProblemTestComponent implements OnInit, OnDestroy {
  routeSubscription: Subscription
  id: number
  submission: Submission
  submissionTests: SubmissionTest[]
  statusMap = STATUSES.INIT

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private store: Store<fromStudent.State>
  ) {
  }

  ngOnInit(): void {
    this.routeSubscription = this.route.params.pipe(
      map(params => {
        return +params['id']
      }),
      switchMap(id => {
        this.id = id
        this.store.dispatch(new SubmissionActions.GetSubmission({submissionId: this.id}))
        this.store.dispatch(new SubmissionActions.GetSubmissionTests({submissionId: this.id}))

        return this.store.select('student')
      }),
      map(submissionState => {
        return submissionState.submissions
      })
    ).subscribe(submissionState => {
      this.submission = submissionState.submission
      this.submissionTests = submissionState.submissionTests
      if (this.submission.status) {
        this.statusMap = STATUSES[this.submission.status]
      }
    })
  }

  ngOnDestroy(): void {
    this.routeSubscription.unsubscribe()
  }
}



