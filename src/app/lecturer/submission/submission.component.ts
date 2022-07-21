import {Component, OnInit} from '@angular/core';
import {Store} from "@ngrx/store";
import * as fromLecturer from "../lecturer.reducer";
import * as SubmissionActions from './submission.actions';
import {ActivatedRoute, Router} from "@angular/router";
import {map, switchMap} from "rxjs/operators";
import {Submission} from "./submission.model";
import {SubmissionTest} from "./submission-test.model";

@Component({
  selector: 'app-lecturer-submission',
  templateUrl: './submission.component.html',
})
export class SubmissionComponent implements OnInit {
  id: number
  submission: Submission
  submissionTests: SubmissionTest[]

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
        this.id = id
        this.store.dispatch(new SubmissionActions.GetSubmission({submissionId: this.id}))
        this.store.dispatch(new SubmissionActions.GetSubmissionTests({submissionId: this.id}))

        return this.store.select('lecturer')
      }),
      map(submissionState => {
        return submissionState.submissions
      })
    ).subscribe(submissionState => {
      this.submission = submissionState.submission
      this.submissionTests = submissionState.submissionTests
    })
  }
}
