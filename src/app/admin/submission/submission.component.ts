import {Component, OnDestroy, OnInit} from '@angular/core';
import {PageEvent} from "@angular/material/paginator";
import {Store} from "@ngrx/store";
import * as fromAdmin from "../admin.reducer";
import {map} from "rxjs/operators";
import {Subscription} from "rxjs";
import {Router} from "@angular/router";
import {Submission, STATUSES} from "./submission.model";
import * as SubmissionActions from './submission.actions';

@Component({
  standalone: false,
  selector: 'app-admin-submission',
  templateUrl: './submission.component.html',
})

export class SubmissionComponent implements OnInit, OnDestroy {
  baseRoute: string;
  submissions: Submission[]
  adminStateSubscription: Subscription

  constructor(
    private router: Router,
    private store: Store<fromAdmin.State>
) {
  }

  ngOnInit(): void {
    this.baseRoute = this.router.url;
    this.adminStateSubscription = this.store.select('admin')
      .pipe(
        map(adminState => adminState.submissions)
      )
      .subscribe(submissions => {
      this.submissions = submissions.submissions
    })

    this.store.dispatch(new SubmissionActions.GetSubmissions({
      pageIndex: 0,
      pageSize: 10
    }))
  }

  getStatusLabel(status: string): string {
    return STATUSES[status]?.label || status;
  }

  getStatusStyle(status: string): string {
    return STATUSES[status]?.labelStyle || '';
  }

  getServerData($event: PageEvent) {
    this.store.dispatch(new SubmissionActions.GetSubmissions({pageIndex: $event.pageIndex, pageSize: $event.pageSize}))
  }

  ngOnDestroy(): void {
    this.adminStateSubscription.unsubscribe()
  }
}
