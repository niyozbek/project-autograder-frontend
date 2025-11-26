import {MySubmission} from "./my-submissions.model";
import * as MySubmissionsActions from './my-submissions.actions';

export interface State {
  submissions: MySubmission[];
}

const initialState: State = {
  submissions: []
};

export function mySubmissionsReducer(
  state = initialState,
  action: MySubmissionsActions.MySubmissionsActions
) {
  switch (action.type) {
    case MySubmissionsActions.LOAD_MY_SUBMISSIONS:
      return {
        ...state,
        submissions: [...action.payload]
      };
    default:
      return state;
  }
}

