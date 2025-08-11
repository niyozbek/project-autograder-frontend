import {Component, OnDestroy, OnInit} from '@angular/core';
import {Store} from "@ngrx/store";
import * as fromAdmin from "../../admin.reducer";
import * as SubmissionActions from '../submission.actions';
import {ActivatedRoute, Router} from "@angular/router";
import {map, switchMap} from "rxjs/operators";
import {STATUSES, Submission} from "../submission.model";
import {SubmissionTest} from "../submission-test.model";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-admin-submission',
  templateUrl: './submission-view.component.html',
})
export class SubmissionViewComponent implements OnInit, OnDestroy {
  routeSubscription: Subscription
  id: number
  submission: Submission
  submissionTests: SubmissionTest[]
  statusMap = STATUSES.INIT

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private store: Store<fromAdmin.State>
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

        return this.store.select('admin')
      }),
      map(submissionState => {
        return submissionState.submissions
      })
    ).subscribe(submissionState => {
      this.submission = submissionState.submission
      if (this.submission.status) {
        this.statusMap = STATUSES[this.submission.status]
      }
      this.submissionTests = submissionState.submissionTests
    })
  }

  ngOnDestroy(): void {
    this.routeSubscription.unsubscribe()
  }
}
