import {HttpClient} from '@angular/common/http'
import {Injectable} from '@angular/core'
import {Actions, Effect, ofType} from '@ngrx/effects'
import {map, switchMap} from 'rxjs/operators'
import * as TestCaseActions from './test-case.actions'
import {TestCase} from "./test-case.model";

@Injectable()
export class TestCaseEffects {
  apiUrl = 'http://localhost:8080/api/lecturer/'

  @Effect()
  getTestCases = this.actions$.pipe(
    ofType(TestCaseActions.GET_TEST_CASES),
    switchMap((params: TestCaseActions.GetTestCases) => {
      return this.http
        .get<TestCase[]>(
          this.apiUrl + 'problem/' + params.payload.problemId + '/test-case',
          {
            params: {
              pageNo: params.payload.pageIndex,
              pageSize: params.payload.pageSize
            }
          }
        )
    }),
    map(testCases => {
      return new TestCaseActions.LoadTestCases(testCases)
    })
  )

  @Effect()
  addTestCase = this.actions$.pipe(
    ofType(TestCaseActions.ADD_TEST_CASE),
    switchMap((params: TestCaseActions.AddTestCase) => {
      return this.http
        .post<TestCase>(
          this.apiUrl + 'problem/' + params.payload.problemId + '/test-case',
          {
            'input': params.payload.newTestCase.input,
            'expectedOutput': params.payload.newTestCase.expectedOutput
          }
        )
    }),
    map(testCase => {
      return new TestCaseActions.LoadTestCase(testCase)
    })
  )

  constructor(
    private actions$: Actions,
    private http: HttpClient,
  ) {
  }
}
