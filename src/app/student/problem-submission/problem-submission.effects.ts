import {HttpClient} from '@angular/common/http'
import {Injectable} from '@angular/core'
import {Actions, Effect, ofType} from '@ngrx/effects'
import {map, switchMap, tap} from 'rxjs/operators'
import * as SubmissionAction from './problem-submission.actions'
import {Submission} from "./problem-submission.model";
import {SubmissionTest} from "../problem-test/problem-test.model";
import * as SubmissionActions from "./problem-submission.actions";
import {Router} from "@angular/router";

@Injectable()
export class ProblemSubmissionEffects {
  apiUrl = 'http://localhost:8080/api/student/'

  @Effect()
  getSubmissionsByProblemId = this.actions$.pipe(
    ofType(SubmissionAction.GET_SUBMISSIONS),
    switchMap((params: SubmissionAction.GetSubmissions) => {
      return this.http
        .get<Submission[]>(
          this.apiUrl + 'submission',
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

  @Effect({ dispatch: false })
  loadSubmissionWindow = this.actions$.pipe(
    ofType(SubmissionActions.LOAD_SUBMISSION_WINDOW),
    tap((params: SubmissionActions.LoadSubmissionWindow) => {
      this.router.navigate(['/student/submission/'+params.payload.id])
    })
  )

  constructor(
    private actions$: Actions,
    private http: HttpClient,
    private router: Router,
  ) {
  }
}
