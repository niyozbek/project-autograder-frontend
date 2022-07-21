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
    case ProblemActions.CREATE_PROBLEM:
      return {
        ...state
      }
    case ProblemActions.LOAD_PROBLEM: {
      let index = state.problems.findIndex((problem) => problem.id === action.payload.id)
      if (index !== -1) {
        const updatedProblems = [...state.problems]
        updatedProblems[index] = action.payload
        return {
          ...state,
          problems: updatedProblems
        }
      }

      return {
        ...state,
        problems: [...state.problems, action.payload]
      }
    }
    case ProblemActions.UPDATE_PROBLEM: {
      let index = state.problems.findIndex((problem) => problem.id === action.payload.id)

      const updatedProblem = {
        ...state.problems[index],
        ...action.payload.newProblem
      }

      const updatedProblems = [...state.problems]
      updatedProblems[index] = updatedProblem

      return {
        ...state,
        problems: updatedProblems
      }
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
        problem: new Problem()
      }
    default:
      return state
  }
}
