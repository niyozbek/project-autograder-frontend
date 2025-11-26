import * as fromProblems from './problem/problem.reducer'
import * as fromSubmissions from './problem-submission/problem-submission.reducer'
import * as fromMySubmissions from './my-submissions/my-submissions.reducer'
import {ActionReducerMap} from '@ngrx/store'
import * as fromRoot from '../store/app.reducer'

export interface ClientState {
  problems: fromProblems.State
  submissions: fromSubmissions.State
  mySubmissions: fromMySubmissions.State
}

export interface State extends fromRoot.AppState {
  client: ClientState
}

export const reducers: ActionReducerMap<ClientState> = {
  problems: fromProblems.problemReducer,
  submissions: fromSubmissions.problemSubmissionReducer,
  mySubmissions: fromMySubmissions.mySubmissionsReducer,
}
