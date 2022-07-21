import * as fromProblems from './problem/problem.reducer'
import * as fromSubmissions from './submission/submission.reducer'
import * as fromTestCases from './test-case/test-case.reducer'
import {ActionReducerMap} from '@ngrx/store'
import * as fromRoot from '../store/app.reducer'

export interface LecturerState {
  problems: fromProblems.State
  submissions: fromSubmissions.State
  testCases: fromTestCases.State
}

export interface State extends fromRoot.AppState {
  lecturer: LecturerState
}

export const reducers: ActionReducerMap<LecturerState> = {
  problems: fromProblems.problemReducer,
  submissions: fromSubmissions.submissionReducer,
  testCases: fromTestCases.testCaseReducer
}
