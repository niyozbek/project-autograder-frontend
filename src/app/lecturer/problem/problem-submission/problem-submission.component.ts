import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {Store} from '@ngrx/store';
import {map, switchMap} from 'rxjs/operators';
import * as SubmissionActions from '../../submission/submission.actions';
import {PageEvent} from "@angular/material/paginator";
import {Submission} from "../../submission/submission.model";
import * as fromLecturer from "../../lecturer.reducer";

@Component({
  selector: 'app-lecturer-problem-submission',
  templateUrl: './problem-submission.component.html'
})
export class ProblemSubmissionComponent implements OnInit {
  problemId: number
  submissions: Submission[]

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private store: Store<fromLecturer.State>
  ) {
  }

  ngOnInit(): void {
    this.route.params.pipe(
      map(params => {
        return +params['id']
      }),
      switchMap(id => {
        this.problemId = id
        this.store.dispatch(new SubmissionActions.GetSubmissionsByProblemId({
          problemId: id,
          pageIndex: 0,
          pageSize: 10
        }))

        return this.store.select('lecturer')
      }),
      map(lecturerState => {
        return lecturerState.submissions
      })
    ).subscribe(submissions => {
      this.submissions = submissions.submissions
    })
  }

  getServerData($event: PageEvent) {
    this.store.dispatch(new SubmissionActions.GetSubmissionsByProblemId({
      problemId: this.problemId,
      pageIndex: $event.pageIndex,
      pageSize: $event.pageSize
    }))
  }
}
