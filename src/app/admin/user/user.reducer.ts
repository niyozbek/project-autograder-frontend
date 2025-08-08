import {User} from "./user.model";
import * as UserActions from './user.actions'

export interface AppState {
  users: State,
}

export interface State {
  users: User[];
  user: User
}

const initialState: State = {
  users: [],
  user: new User(),
}

export function userReducer(
  state = initialState,
  action: UserActions.UserActions
) {
  switch (action.type) {
    case UserActions.GET_USERS:
      return {
        ...state
      }
    case UserActions.LOAD_USERS:
      return {
        ...state,
        users: [...action.payload]
      }
    case UserActions.GET_USER:
      return {
        ...state
      }
    case UserActions.CREATE_USER:
      return {
        ...state
      }
    case UserActions.UPDATE_USER:
      return {
        ...state
      }
    case UserActions.LOAD_USER:
      return {
        ...state,
        user: action.payload
      }
    case UserActions.CLEAR_USER:
      return {
        ...state,
        user: new User()
      }
    default:
      return state
  }
}
