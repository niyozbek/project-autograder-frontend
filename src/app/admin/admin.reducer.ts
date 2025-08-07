import {ActionReducerMap} from '@ngrx/store'
import * as fromRoot from '../store/app.reducer'
import * as fromUsers from "./user/user.reducer";
import * as fromSubmissions from "./submission/submission.reducer";
import * as fromTestCases from "./test-case/test-case.reducer";
import * as fromProblems from './problem/problem.reducer'

export interface AdminState {
  users: fromUsers.State,
  problems: fromProblems.State
  submissions: fromSubmissions.State
  testCases: fromTestCases.State
}

export interface State extends fromRoot.AppState {
  admin: AdminState
}

export const reducers: ActionReducerMap<AdminState> = {
  users: fromUsers.userReducer,
  problems: fromProblems.problemReducer,
  submissions: fromSubmissions.submissionReducer,
  testCases: fromTestCases.testCaseReducer
}
