import {Action} from "@ngrx/store";
import {Problem} from "./problem.model";
import {Submission} from "../problem-submission/problem-submission.model";
import {Runtime} from "./runtime.model";

export const GET_PROBLEMS = '[Student Problems] Get Problems'
export const LOAD_PROBLEMS = '[Student Problems] Load Problems'
export const GET_PROBLEM_DETAIL = '[Student Problems] Get Problem Detail'
export const LOAD_PROBLEM_DETAIL = '[Student Problems] Load Problem Detail'
export const CLEAR_PROBLEM_DETAIL = '[Student Problems] Clear Problem Detail'
export const SUBMIT_SOLUTION = '[Student Problems] Submit Solution'
export const GET_RUNTIMES = '[Student Problems] Get Runtimes'
export const LOAD_RUNTIMES = '[Student Problems] Load Runtimes'

export class GetProblems implements Action {
  readonly type = GET_PROBLEMS

  constructor(public payload: { pageIndex: number, pageSize: number }) {
  }
}

export class LoadProblems implements Action {
  readonly type = LOAD_PROBLEMS

  constructor(public payload: Problem[]) {
  }
}

export class GetProblemDetail implements Action {
  readonly type = GET_PROBLEM_DETAIL

  constructor(public payload: { problemId: number }) {
  }
}

export class LoadProblemDetail implements Action {
  readonly type = LOAD_PROBLEM_DETAIL

  constructor(public payload: Problem) {
  }
}

export class ClearProblemDetail implements Action {
  readonly type = CLEAR_PROBLEM_DETAIL

  constructor() {
  }
}

export class SubmitSolution implements Action {
  readonly type = SUBMIT_SOLUTION

  constructor(public payload: { problemId: number, newSubmission: Submission }) {
  }
}

export class GetRuntimes implements Action {
  readonly type = GET_RUNTIMES

  constructor(public payload: { problemId: number }) {
  }
}

export class LoadRuntimes implements Action {
  readonly type = LOAD_RUNTIMES

  constructor(public payload: Runtime[]) {
  }
}

export type ProblemActions =
  GetProblems
  | LoadProblems
  | GetProblemDetail
  | LoadProblemDetail
  | ClearProblemDetail
  | SubmitSolution
  | GetRuntimes
  | LoadRuntimes
