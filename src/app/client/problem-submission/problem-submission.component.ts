import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {Store} from '@ngrx/store';
import {map, switchMap} from 'rxjs/operators';
import * as SubmissionActions from './problem-submission.actions';
import {PageEvent} from "@angular/material/paginator";
import {STATUSES, StatusMap, Submission} from "./problem-submission.model";
import * as fromClient from "../client.reducer";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-client-problem-submission',
  templateUrl: './problem-submission.component.html'
})
export class ProblemSubmissionComponent implements OnInit, OnDestroy {
  routeSubscription: Subscription
  problemId: number
  submissions: Submission[]
  statusMaps: StatusMap[] = []

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private store: Store<fromClient.State>
  ) {
  }

  ngOnInit(): void {
    this.routeSubscription = this.route.params.pipe(
      map(params => {
        return +params['id']
      }),
      switchMap(id => {
        this.problemId = id
        this.store.dispatch(new SubmissionActions.GetSubmissions({
          problemId: id,
          pageIndex: 0,
          pageSize: 10
        }))

        return this.store.select('client')
      }),
      map(adminState => {
        return adminState.submissions
      })
    ).subscribe(submissions => {
      this.submissions = submissions.submissions
      this.submissions.forEach((submission, index) => {
        this.statusMaps[index] = STATUSES[submission.status]
      })
    })
  }

  getServerData($event: PageEvent) {
    this.store.dispatch(new SubmissionActions.GetSubmissions({
      problemId: this.problemId,
      pageIndex: $event.pageIndex,
      pageSize: $event.pageSize
    }))
  }

  ngOnDestroy(): void {
    this.routeSubscription.unsubscribe()
  }




}
