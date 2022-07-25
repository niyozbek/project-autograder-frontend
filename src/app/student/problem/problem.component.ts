import {Component, OnDestroy, OnInit} from '@angular/core';
import {PageEvent} from "@angular/material/paginator";
import {Store} from "@ngrx/store";
import * as fromStudent from "../student.reducer";
import {Problem} from "./problem.model";
import * as ProblemActions from './problem.actions';
import {map} from "rxjs/operators";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-student-problem',
  templateUrl: './problem.component.html',
})
export class ProblemComponent implements OnInit, OnDestroy {
  studentStateSubscription: Subscription
  problems: Problem[]

  constructor(
    private store: Store<fromStudent.State>
  ) {
  }

  ngOnInit(): void {
    this.studentStateSubscription = this.store.select('student')
      .pipe(
        map(problemState => problemState.problems)
      ).subscribe(problems => {
      this.problems = problems.problems
    })

    this.store.dispatch(new ProblemActions.GetProblems({
      pageIndex: 0,
      pageSize: 10
    }))
  }

  getServerData($event: PageEvent) {
    this.store.dispatch(new ProblemActions.GetProblems({
      pageIndex: $event.pageIndex,
      pageSize: $event.pageSize
    }))
  }

  ngOnDestroy(): void {
    this.studentStateSubscription.unsubscribe()
  }
}
