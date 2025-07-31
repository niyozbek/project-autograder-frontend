import {User} from "./user.model";
import * as UserActions from './user.actions'

export interface AppState {
  users: State,
}

export interface State {
  users: User[];
  lecturers: User[],
  students: User[],
  user: User
}

const initialState: State = {
  lecturers: [],
  students: [],
  users: [],
  user: new User(),
}

export function userReducer(
  state = initialState,
  action: UserActions.UserActions
) {
  switch (action.type) {
    case UserActions.GET_LECTURERS:
      return {
        ...state
      }
    case UserActions.LOAD_LECTURERS:
      return {
        ...state,
        lecturers: [...action.payload]
      }
    case UserActions.CREATE_LECTURER:
      return {
        ...state
      }
    case UserActions.LOAD_LECTURER:
      return {
        ...state,
        lecturers: [action.payload, ...state.lecturers]
      }
    case UserActions.GET_STUDENTS:
      return {
        ...state
      }
    case UserActions.LOAD_STUDENTS:
      return {
        ...state,
        students: [...action.payload]
      }
    case UserActions.CREATE_STUDENT:
      return {
        ...state
      }
    case UserActions.LOAD_STUDENT:
      return {
        ...state,
        students: [action.payload, ...state.students]
      }
    case UserActions.GET_USERS:
      return {
        ...state
      }
    case UserActions.LOAD_USERS:
      return {
        ...state,
        users: [...action.payload]
      }
    case UserActions.CREATE_USER:
      return {
        ...state
      }
    case UserActions.LOAD_USER:
      return {
        ...state,
        users: [action.payload, ...state.users]
      }
    case UserActions.GET_USER_DETAIL:
      return {
        ...state
      }
    case UserActions.LOAD_USER_DETAIL:
      return {
        ...state,
        user: action.payload
      }
    case UserActions.CLEAR_USER_DETAIL:
      return {
        ...state,
        user: new User()
      }

    default:
      return state
  }
}
