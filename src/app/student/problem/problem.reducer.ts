import * as ProblemActions from './problem.actions'
import {Problem} from "./problem.model";

export interface AppState {
  problems: State
}

export interface State {
  problems: Problem[]
  problem: Problem
}

const initialState: State = {
  problems: [],
  problem: new Problem()
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
    default:
      return state
  }
}
