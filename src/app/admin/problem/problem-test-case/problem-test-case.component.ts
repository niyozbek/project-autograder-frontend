import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {Store} from '@ngrx/store';
import * as fromAdmin from '../../admin.reducer'
import {map, switchMap} from 'rxjs/operators';
import * as TestCaseActions from '../../test-case/test-case.actions';
import {PageEvent} from "@angular/material/paginator";
import {TestCase} from "../../test-case/test-case.model";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-admin-problem-test-case',
  templateUrl: './problem-test-case.component.html'
})
export class ProblemTestCaseComponent implements OnInit, OnDestroy {
  routeSubscription: Subscription
  problemId: number
  testCases: TestCase[]

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
        this.problemId = id
        this.store.dispatch(new TestCaseActions.GetTestCases({
          problemId: id,
          pageIndex: 0,
          pageSize: 10
        }))

        return this.store.select('admin')
      }),
      map(submissionState => {
        return submissionState.testCases
      })
    ).subscribe(testCases => {
      this.testCases = testCases.testCases
    })
  }

  getServerData($event: PageEvent) {
    this.store.dispatch(new TestCaseActions.GetTestCases({
      problemId: this.problemId,
      pageIndex: $event.pageIndex,
      pageSize: $event.pageSize
    }))
  }

  ngOnDestroy(): void {
    this.routeSubscription.unsubscribe()
  }
}
