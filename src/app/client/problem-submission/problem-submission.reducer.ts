import * as SubmissionActions from './problem-submission.actions'
import {Submission} from "./problem-submission.model";
import {SubmissionTest} from "../problem-test/problem-test.model";

export interface AppState {
  submissions: State
}

export interface State {
  submissions: Submission[],
  submission: Submission,
  submissionTests: SubmissionTest[]
}

const initialState: State = {
  submissions: [],
  submission: new Submission(),
  submissionTests: []
}

export function problemSubmissionReducer(
  state = initialState,
  action: SubmissionActions.ProblemSubmissionActions
) {
  switch (action.type) {
    case SubmissionActions.GET_SUBMISSIONS:
      return {
        ...state
      }
    case SubmissionActions.LOAD_SUBMISSIONS:
      return {
        ...state,
        submissions: [...action.payload]
      }
    case SubmissionActions.GET_SUBMISSION:
      return {
        ...state
      }
    case SubmissionActions.LOAD_SUBMISSION:
      let index = state.submissions.findIndex((problem) => problem.id === action.payload.id)
      if (index !== -1) {
        const updatedSubmissions = [...state.submissions]
        updatedSubmissions[index] = action.payload
        return {
          ...state,
          submissions: updatedSubmissions,
          submission: action.payload
        }
      }

      return {
        ...state,
        submissions:  [action.payload, ...state.submissions],
        submission: action.payload
      }
    case SubmissionActions.GET_SUBMISSION_TESTS:
      return {
        ...state
      }
    case SubmissionActions.LOAD_SUBMISSION_TESTS:
      return {
        ...state,
        submissionTests: action.payload
      }
    default:
      return state
  }
}
