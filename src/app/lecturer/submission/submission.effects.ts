import {HttpClient} from '@angular/common/http'
import {Injectable} from '@angular/core'
import {Actions, Effect, ofType} from '@ngrx/effects'
import {map, switchMap} from 'rxjs/operators'
import * as SubmissionAction from './submission.actions'
import {Submission} from "./submission.model";
import {SubmissionTest} from "./submission-test.model";

@Injectable()
export class SubmissionEffects {
  apiUrl = 'http://localhost:8080/api/lecturer/'

  @Effect()
  getSubmissionsByProblemId = this.actions$.pipe(
    ofType(SubmissionAction.GET_SUBMISSIONS_BY_PROBLEM_ID),
    switchMap((params: SubmissionAction.GetSubmissionsByProblemId) => {
      return this.http
        .get<Submission[]>(
          this.apiUrl + 'problem/' + params.payload.problemId + '/submission',
          {
            params: {
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
          this.apiUrl + 'submission/' + params.payload.submissionId
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
          this.apiUrl + 'submission/' + params.payload.submissionId + '/detail'
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
