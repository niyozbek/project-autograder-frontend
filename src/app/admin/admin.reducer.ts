import {ActionReducerMap} from '@ngrx/store'
import * as fromRoot from '../store/app.reducer'
import * as fromUsers from "./user/user.reducer";

export interface AdminState {
  users: fromUsers.State
}

export interface State extends fromRoot.AppState {
  admin: AdminState
}

export const reducers: ActionReducerMap<AdminState> = {
  users: fromUsers.userReducer
}
