import {Component, OnDestroy, OnInit} from '@angular/core';
import {PageEvent} from "@angular/material/paginator";
import {Store} from "@ngrx/store";
import {Problem} from "./problem.model";
import * as ProblemActions from './problem.actions';
import * as fromLecturer from "../lecturer.reducer";
import {map} from "rxjs/operators";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-lecturer-problem',
  templateUrl: './problem.component.html',
})

export class ProblemComponent implements OnInit, OnDestroy {
  problems: Problem[]
  lecturerStateSubscription: Subscription

  constructor(
    private store: Store<fromLecturer.State>
  ) {
  }

  ngOnInit(): void {
    this.lecturerStateSubscription = this.store.select('lecturer')
      .pipe(
        map(lecturerState => lecturerState.problems)
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
    this.lecturerStateSubscription.unsubscribe()
  }
}
