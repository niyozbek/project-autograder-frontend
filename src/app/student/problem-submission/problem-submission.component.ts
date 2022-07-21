import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {Store} from '@ngrx/store';
import {map, switchMap} from 'rxjs/operators';
import * as SubmissionActions from './problem-submission.actions';
import {PageEvent} from "@angular/material/paginator";
import {Submission} from "./problem-submission.model";
import * as fromStudent from "../student.reducer";

@Component({
  selector: 'app-student-problem-submission',
  templateUrl: './problem-submission.component.html'
})
export class ProblemSubmissionComponent implements OnInit {
  problemId: number
  submissions: Submission[]

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private store: Store<fromStudent.State>
  ) {
  }

  ngOnInit(): void {
    this.route.params.pipe(
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

        return this.store.select('student')
      }),
      map(lecturerState => {
        return lecturerState.submissions
      })
    ).subscribe(submissions => {
      this.submissions = submissions.submissions
    })
  }

  getServerData($event: PageEvent) {
    this.store.dispatch(new SubmissionActions.GetSubmissions({
      problemId: this.problemId,
      pageIndex: $event.pageIndex,
      pageSize: $event.pageSize
    }))
  }
}
