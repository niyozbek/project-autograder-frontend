import {HttpClient} from '@angular/common/http'
import {Injectable} from '@angular/core'
import {Actions, Effect, ofType} from '@ngrx/effects'
import {map, switchMap} from 'rxjs/operators'
import * as ProblemActions from './problem.actions'
import {Problem} from "./problem.model";
import {environment} from "../../../environments/environment";

@Injectable()
export class ProblemEffects {
  apiUrl = environment.apiUrl + '/api/problems'

  @Effect()
  getProblems = this.actions$.pipe(
    ofType(ProblemActions.GET_PROBLEMS),
    switchMap((params: ProblemActions.GetProblems) => {
      return this.http
        .get<Problem[]>(
          this.apiUrl,
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
  createProblem = this.actions$.pipe(
    ofType(ProblemActions.CREATE_PROBLEM),
    switchMap((body: ProblemActions.CreateProblem) => {
      return this.http
        .post<Problem>(
          this.apiUrl,
          {
            'title': body.payload.title,
            'description': body.payload.description
          }
        )
    }),
    map(problem => {
      return new ProblemActions.LoadProblem(problem)
    })
  )

  @Effect()
  updateProblem = this.actions$.pipe(
    ofType(ProblemActions.UPDATE_PROBLEM),
    switchMap((body: ProblemActions.UpdateProblem) => {
      return this.http
        .put<Problem>(
          this.apiUrl + '/' + body.payload.id,
          {
            'title': body.payload.newProblem.title,
            'status': body.payload.newProblem.status,
            'description': body.payload.newProblem.description
          }
        )
    }),
    map(problem => {
      return new ProblemActions.LoadProblem(problem)
    })
  )

  @Effect()
  getProblemDetail = this.actions$.pipe(
    ofType(ProblemActions.GET_PROBLEM_DETAIL),
    switchMap((params: ProblemActions.GetProblemDetail) => {
      return this.http
        .get<Problem>(
          this.apiUrl + '/'+ params.payload.id
        )
    }),
    map(problem => {
      return new ProblemActions.LoadProblemDetail(problem)
    })
  )

  constructor(
    private actions$: Actions,
    private http: HttpClient,
  ) {
  }
}
