import * as ProblemActions from './problem.actions'
import {Problem} from "./problem.model";
import {Runtime} from "./runtime.model";

export interface AppState {
  problems: State
}

export interface State {
  problems: Problem[]
  problem: Problem
  runtimes: Runtime[]
}

const initialState: State = {
  problems: [],
  problem: new Problem(),
  runtimes: []
}

export function problemReducer(
  state = initialState,
  action: ProblemActions.ProblemActions
) {
  switch (action.type) {
    case ProblemActions.GET_PROBLEMS:
      return {
        ...state
      }
    case ProblemActions.LOAD_PROBLEMS:
      return {
        ...state,
        problems: [...action.payload]
      }
    case ProblemActions.GET_PROBLEM_DETAIL:
      return {
        ...state
      }
    case ProblemActions.LOAD_PROBLEM_DETAIL:
      return {
        ...state,
        problem: action.payload
      }
    case ProblemActions.CLEAR_PROBLEM_DETAIL:
      return {
        ...state,
        problem: initialState.problem
      }
    case ProblemActions.SUBMIT_SOLUTION:
      return {
        ...state
      }
    case ProblemActions.GET_RUNTIMES:
      return {
        ...state
      }
    case ProblemActions.LOAD_RUNTIMES:
      return {
        ...state,
        runtimes: [...action.payload]
      }
    default:
      return state
  }
}
