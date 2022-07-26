import {User} from "./user.model";
import * as UserActions from './user.actions'

export interface AppState {
  users: State,
}

export interface State {
  lecturers: User[],
  students: User[]
}

const initialState: State = {
  lecturers: [],
  students: []
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
    default:
      return state
  }
}
