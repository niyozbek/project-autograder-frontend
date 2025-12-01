import {HttpClient} from '@angular/common/http'
import {Injectable} from '@angular/core'
import {Actions, createEffect, ofType} from '@ngrx/effects'
import {map, switchMap} from 'rxjs/operators'
import * as SubmissionAction from './submission.actions'
import {Submission} from "./submission.model";
import {SubmissionTest} from "./submission-test.model";
import {environment} from "../../../environments/environment";

@Injectable()
export class SubmissionEffects {
  apiUrl = environment.apiUrl + '/api/submissions'

  getSubmissions = createEffect(() => this.actions$.pipe(
    ofType(SubmissionAction.GET_SUBMISSIONS),
    switchMap((params: SubmissionAction.GetSubmissions) => {
      return this.http
        .get<any>(
          this.apiUrl,
          {
            params: {
              pageNo: params.payload.pageIndex,
              pageSize: params.payload.pageSize
            }
          }
        )
    }),
    map((page: { content: Submission[] }) => {
      return new SubmissionAction.LoadSubmissions(page.content)
    })
  ))

  getSubmissionsByProblemId = createEffect(() => this.actions$.pipe(
    ofType(SubmissionAction.GET_SUBMISSIONS_BY_PROBLEM_ID),
    switchMap((params: SubmissionAction.GetSubmissionsByProblemId) => {
      return this.http
        .get<any>(
          this.apiUrl,
          {
            params: {
              problemId: params.payload.problemId,
              pageNo: params.payload.pageIndex,
              pageSize: params.payload.pageSize
            }
          }
        )
    }),
    map((page: { content: Submission[] }) => {
      return new SubmissionAction.LoadSubmissions(page.content)
    })
  ))

  getSubmission = createEffect(() => this.actions$.pipe(
    ofType(SubmissionAction.GET_SUBMISSION),
    switchMap((params: SubmissionAction.GetSubmission) => {
      return this.http
        .get<Submission>(
          this.apiUrl + '/' + params.payload.submissionId
        )
    }),
    map(submission => {
      return new SubmissionAction.LoadSubmission(submission)
    })
  ))

  getSubmissionTests = createEffect(() => this.actions$.pipe(
    ofType(SubmissionAction.GET_SUBMISSION_TESTS),
    switchMap((params: SubmissionAction.GetSubmissionTests) => {
      return this.http
        .get<SubmissionTest[]>(
          this.apiUrl + '/' +params.payload.submissionId + '/detail'
        )
    }),
    map(submissionTests => {
      return new SubmissionAction.LoadSubmissionTests(submissionTests)
    })
  ))

  constructor(
    private actions$: Actions,
    private http: HttpClient,
  ) {
  }
}
