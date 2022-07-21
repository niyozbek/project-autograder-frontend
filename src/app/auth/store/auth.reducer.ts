import { AuthUser } from "../auth-user.model"
import * as AuthActions from "./auth.actions"

export interface State {
  user: AuthUser
  authError: string
  loading: boolean
}

const initialState: State = {
  user: null,
  authError: null,
  loading: false
}

export function authReducer(state = initialState, action: AuthActions.AuthActions) {
  switch (action.type) {
    case AuthActions.AUTHENTICATE_SUCCESS:
      const {
        username,
        role,
        token,
        expirationDate
      } = action.payload
      const user = new AuthUser(username, role, token, expirationDate)
      return {
        ...state,
        user: user,
        authError: null,
        loading: false
      }
    case AuthActions.LOGOUT:
      return {
        ...state,
        user: null
      }
    case AuthActions.LOGIN_START:
      return {
        ...state,
        authError: null,
        loading: true
      }
    case AuthActions.AUTHENTICATE_FAIL:
      return {
        ...state,
        user: null,
        authError: action.payload,
        loading: false
      }
    case AuthActions.CLEAR_ERROR:
      return {
        ...state,
        authError: null
      }
    default:
      return state
  }

}
