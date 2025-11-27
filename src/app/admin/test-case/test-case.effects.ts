import {HttpClient} from '@angular/common/http'
import {Injectable} from '@angular/core'
import {Actions, createEffect, ofType} from '@ngrx/effects'
import {map, switchMap} from 'rxjs/operators'
import * as TestCaseActions from './test-case.actions'
import {TestCase} from "./test-case.model";
import {environment} from "../../../environments/environment";

@Injectable()
export class TestCaseEffects {
  apiUrl = environment.apiUrl + '/api/test-cases'

  getTestCases = createEffect(() => this.actions$.pipe(
    ofType(TestCaseActions.GET_TEST_CASES),
    switchMap((params: TestCaseActions.GetTestCases) => {
      return this.http
        .get<TestCase[]>(
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
    map(testCases => {
      return new TestCaseActions.LoadTestCases(testCases)
    })
  ))

  addTestCase = createEffect(() => this.actions$.pipe(
    ofType(TestCaseActions.ADD_TEST_CASE),
    switchMap((params: TestCaseActions.AddTestCase) => {
      return this.http
        .post<TestCase>(
          this.apiUrl,
          {
            'problemId': params.payload.problemId,
            'input': params.payload.newTestCase.input,
            'expectedOutput': params.payload.newTestCase.expectedOutput
          }
        )
    }),
    map(testCase => {
      return new TestCaseActions.LoadTestCase(testCase)
    })
  ))

  constructor(
    private actions$: Actions,
    private http: HttpClient,
  ) {
  }
}
