import {HttpClient} from '@angular/common/http'
import {Injectable} from '@angular/core'
import {Actions, createEffect, ofType} from '@ngrx/effects'
import {map, switchMap, tap} from 'rxjs/operators'
import * as SubmissionAction from './problem-submission.actions'
import {Submission} from "./problem-submission.model";
import {SubmissionTest} from "../problem-test/problem-test.model";
import * as SubmissionActions from "./problem-submission.actions";
import {Router} from "@angular/router";
import {environment} from "../../../environments/environment";

@Injectable()
export class ProblemSubmissionEffects {
  apiUrl = environment.apiUrl + '/api/submissions/own'

  getSubmissionsByProblemId = createEffect(() => this.actions$.pipe(
    ofType(SubmissionAction.GET_SUBMISSIONS),
    switchMap((params: SubmissionAction.GetSubmissions) => {
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
          this.apiUrl + '/' + params.payload.submissionId,
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
          this.apiUrl + '/' + params.payload.submissionId + '/detail'
        )
    }),
    map(submissionTests => {
      return new SubmissionAction.LoadSubmissionTests(submissionTests)
    })
  ))

  loadSubmissionWindow = createEffect(() => this.actions$.pipe(
    ofType(SubmissionActions.LOAD_SUBMISSION_WINDOW),
    tap((params: SubmissionActions.LoadSubmissionWindow) => {
      this.router.navigate(['/client/submissions/'+params.payload.id])
    })
  ), { dispatch: false })

  constructor(
    private actions$: Actions,
    private http: HttpClient,
    private router: Router,
  ) {
  }
}
