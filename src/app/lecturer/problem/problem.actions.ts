import {Action} from "@ngrx/store";
import {Problem} from "./problem.model";

export const GET_PROBLEMS = '[Problems] Get Problems'
export const LOAD_PROBLEMS = '[Problems] Load Problems'
export const CREATE_PROBLEM = '[Problems] Create Problem'
export const LOAD_PROBLEM = '[Problems] Load Problem'
export const UPDATE_PROBLEM = '[Problems] Update Problem'
export const GET_PROBLEM_DETAIL = '[Problems] Get Problem Detail'
export const LOAD_PROBLEM_DETAIL = '[Problems] Load Problem Detail'
export const CLEAR_PROBLEM_DETAIL = '[Problems] Clear Problem Detail'

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

export class CreateProblem implements Action {
  readonly type = CREATE_PROBLEM

  constructor(public payload: Problem) {
  }
}

export class LoadProblem implements Action {
  readonly type = LOAD_PROBLEM

  constructor(public payload: Problem) {
  }
}

export class UpdateProblem implements Action {
  readonly type = UPDATE_PROBLEM

  constructor(public payload: { id: number, newProblem: Problem }) {
  }
}

export class GetProblemDetail implements Action {
  readonly type = GET_PROBLEM_DETAIL

  constructor(public payload: { id: number }) {
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


export type ProblemActions =
  GetProblems
  | LoadProblems
  | CreateProblem
  | LoadProblem
  | UpdateProblem
  | GetProblemDetail
  | LoadProblemDetail
  | ClearProblemDetail
