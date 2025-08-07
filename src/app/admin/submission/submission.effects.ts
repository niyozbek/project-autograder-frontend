import {HttpClient} from '@angular/common/http'
import {Injectable} from '@angular/core'
import {Actions, Effect, ofType} from '@ngrx/effects'
import {map, switchMap} from 'rxjs/operators'
import * as SubmissionAction from './submission.actions'
import {Submission} from "./submission.model";
import {SubmissionTest} from "./submission-test.model";
import {environment} from "../../../environments/environment";

@Injectable()
export class SubmissionEffects {
  apiUrl = environment.apiUrl + '/api/submissions'

  @Effect()
  getSubmissionsByProblemId = this.actions$.pipe(
    ofType(SubmissionAction.GET_SUBMISSIONS_BY_PROBLEM_ID),
    switchMap((params: SubmissionAction.GetSubmissionsByProblemId) => {
      return this.http
        .get<Submission[]>(
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
    map(submissions => {
      return new SubmissionAction.LoadSubmissions(submissions)
    })
  )

  @Effect()
  getSubmission = this.actions$.pipe(
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
  )

  @Effect()
  getSubmissionTests = this.actions$.pipe(
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
  )

  constructor(
    private actions$: Actions,
    private http: HttpClient,
  ) {
  }
}
