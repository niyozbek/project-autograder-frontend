import {HttpClient} from '@angular/common/http'
import {Injectable} from '@angular/core'
import {Actions, Effect, ofType} from '@ngrx/effects'
import {map, switchMap} from 'rxjs/operators'
import * as ProblemActions from './problem.actions'
import * as SubmissionActions from '../problem-submission/problem-submission.actions'
import {Problem} from "./problem.model";
import {Submission} from "../problem-submission/problem-submission.model";
import {Runtime} from "./runtime.model";
import {environment} from "../../../environments/environment";

@Injectable()
export class ProblemEffects {
  apiUrl = environment.apiUrl + '/api'

  @Effect()
  getProblems = this.actions$.pipe(
    ofType(ProblemActions.GET_PROBLEMS),
    switchMap((params: ProblemActions.GetProblems) => {
      return this.http
        .get<Problem[]>(
          this.apiUrl + '/problems',
          {
            params: {
              pageNo: params.payload.pageIndex,
              pageSize: params.payload.pageSize
            }
          }
        )
    }),
    map(problems => {
      return new ProblemActions.LoadProblems(problems)
    })
  )

  @Effect()
  getProblemDetail = this.actions$.pipe(
    ofType(ProblemActions.GET_PROBLEM_DETAIL),
    switchMap((params: ProblemActions.GetProblemDetail) => {
      return this.http
        .get<Problem>(
          this.apiUrl + '/problems/' + params.payload.problemId
        )
    }),
    map(problem => {
      return new ProblemActions.LoadProblemDetail(problem)
    })
  )

  @Effect()
  submitSolution = this.actions$.pipe(
    ofType(ProblemActions.SUBMIT_SOLUTION),
    switchMap((params: ProblemActions.SubmitSolution) => {
      return this.http
        .post<Submission>(
          this.apiUrl + '/submissions',
          {
            problemId: params.payload.problemId,
            language: params.payload.newSubmission.language,
            version: params.payload.newSubmission.version,
            filename: params.payload.newSubmission.filename,
            code: params.payload.newSubmission.code
          }
        )
    }),
    map(submission => {
      return new SubmissionActions.LoadSubmissionWindow(submission)
    })
  )

  @Effect()
  getRuntimes = this.actions$.pipe(
    ofType(ProblemActions.GET_RUNTIMES),
    switchMap((params: ProblemActions.GetRuntimes) => {
      return this.http
        .get<Runtime[]>(
          this.apiUrl + '/problems/runtimes'
        )
    }),
    map(runtimes => {
      return new ProblemActions.LoadRuntimes(runtimes)
    })
  )

  constructor(
    private actions$: Actions,
    private http: HttpClient,
  ) {
  }
}
