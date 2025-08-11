import * as SubmissionActions from './submission.actions'
import {Submission} from "./submission.model";
import {SubmissionTest} from "./submission-test.model";

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

export function submissionReducer(
  state = initialState,
  action: SubmissionActions.SubmissionActions
) {
  switch (action.type) {
    case SubmissionActions.GET_SUBMISSIONS:
      return {
        ...state
      }
    case SubmissionActions.GET_SUBMISSIONS_BY_PROBLEM_ID:
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
      return {
        ...state,
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
