import {Component, OnInit} from '@angular/core';
import {PageEvent} from "@angular/material/paginator";
import {Store} from "@ngrx/store";
import {Problem} from "./problem.model";
import * as ProblemActions from './problem.actions';
import * as fromLecturer from "../lecturer.reducer";
import {map} from "rxjs/operators";

@Component({
  selector: 'app-lecturer-problem',
  templateUrl: './problem.component.html',
})

export class ProblemComponent implements OnInit {
  problems: Problem[]

  constructor(
    private store: Store<fromLecturer.State>
  ) {
  }

  ngOnInit(): void {
    this.store.select('lecturer')
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
}
