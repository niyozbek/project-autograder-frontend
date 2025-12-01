import {Component, OnDestroy, OnInit} from '@angular/core';
import {PageEvent} from "@angular/material/paginator";
import {Store} from "@ngrx/store";
import {Problem} from "./problem.model";
import * as ProblemActions from './problem.actions';
import * as fromAdmin from "../admin.reducer";
import {map} from "rxjs/operators";
import {Subscription} from "rxjs";
import {Router} from "@angular/router";

@Component({
  standalone: false,
  selector: 'app-admin-problem',
  templateUrl: './problem.component.html',
})

export class ProblemComponent implements OnInit, OnDestroy {
  baseRoute: string;
  problems: Problem[]
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
        map(adminState => adminState.problems)
      )
      .subscribe(problems => {
      this.problems = problems.problems
    })

    this.store.dispatch(new ProblemActions.GetProblems({
      pageIndex: 0,
      pageSize: 10
    }))
  }

  getServerData($event: PageEvent) {
    this.store.dispatch(new ProblemActions.GetProblems({pageIndex: $event.pageIndex, pageSize: $event.pageSize}))
  }

  ngOnDestroy(): void {
    this.adminStateSubscription.unsubscribe()
  }
}
