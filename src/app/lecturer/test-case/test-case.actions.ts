import {Action} from "@ngrx/store";
import {TestCase} from "./test-case.model";

export const GET_TEST_CASES = '[Test Cases] Get Test Cases'
export const LOAD_TEST_CASES = '[Test Cases] Load Test Cases'
export const ADD_TEST_CASE = '[Test Cases] Add Test Case'
export const LOAD_TEST_CASE = '[Test Cases] Load Test Case'

export class GetTestCases implements Action {
  readonly type = GET_TEST_CASES

  constructor(public payload: { problemId: number, pageIndex: number, pageSize: number }) {
  }
}

export class LoadTestCases implements Action {
  readonly type = LOAD_TEST_CASES

  constructor(public payload: TestCase[]) {
  }
}

export class AddTestCase implements Action {
  readonly type = ADD_TEST_CASE

  constructor(public payload: { problemId: number, newTestCase: TestCase }) {
  }
}

export class LoadTestCase implements Action {
  readonly type = LOAD_TEST_CASE

  constructor(public payload: TestCase) {
  }
}

export type TestCaseActions =
  GetTestCases
  | LoadTestCases
  | AddTestCase
  | LoadTestCase
