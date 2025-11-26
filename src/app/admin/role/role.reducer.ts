import {Role} from "./role.model";
import * as RoleActions from './role.actions'

export interface AppState {
  roles: State
}

export interface State {
  roles: Role[],
  role: Role,
}

const initialState: State = {
  roles: [],
  role: new Role(),
}

export function roleReducer(
  state = initialState,
  action: RoleActions.RoleActions
) {
  switch (action.type) {
    case RoleActions.GET_ROLES:
      return {
        ...state
      }
    case RoleActions.LOAD_ROLES:
      return {
        ...state,
        roles: [...action.payload]
      }
    case RoleActions.GET_ROLE:
      return {
        ...state
      }
    case RoleActions.LOAD_ROLE:
      return {
        ...state,
        role: action.payload
      }
    case RoleActions.CLEAR_ROLE:
      return {
        ...state,
        role: new Role()
      }
    default:
      return state
  }
}
