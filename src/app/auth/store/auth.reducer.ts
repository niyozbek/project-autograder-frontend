import { AuthUser } from "../auth-user.model"
import * as AuthActions from "./auth.actions"

export interface State {
  user: AuthUser
  authError: string
  successMessage: string
  loading: boolean
}

const initialState: State = {
  user: null,
  authError: null,
  successMessage: null,
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
        successMessage: null,
        loading: false
      }
    case AuthActions.LOGOUT:
      return {
        ...state,
        user: null
      }
    case AuthActions.LOGIN_START:
    case AuthActions.FORGOT_PASSWORD_START:
    case AuthActions.RESET_PASSWORD_START:
      return {
        ...state,
        authError: null,
        successMessage: null,
        loading: true
      }
    case AuthActions.AUTHENTICATE_FAIL:
    case AuthActions.FORGOT_PASSWORD_FAIL:
    case AuthActions.RESET_PASSWORD_FAIL:
      return {
        ...state,
        user: null,
        authError: action.payload,
        successMessage: null,
        loading: false
      }
    case AuthActions.FORGOT_PASSWORD_SUCCESS:
    case AuthActions.RESET_PASSWORD_SUCCESS:
      return {
        ...state,
        authError: null,
        successMessage: action.payload,
        loading: false
      }
    case AuthActions.CLEAR_ERROR:
      return {
        ...state,
        authError: null,
        successMessage: null
      }
    default:
      return state
  }

}
