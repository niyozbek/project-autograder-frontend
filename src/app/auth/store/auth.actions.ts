import { Action } from "@ngrx/store"

export const LOGIN_START = '[Auth] Login Start'
export const AUTHENTICATE_SUCCESS = '[Auth] Login'
export const AUTHENTICATE_FAIL = '[Auth] Login Fail'
export const LOGOUT = '[Auth] Logout'
export const CLEAR_ERROR = '[Auth] Clear Error'
export const SIGNUP_START = '[AUTH] Signup Start'
export const AUTO_LOGIN = '[AUTH] Auto Login'
export const FORGOT_PASSWORD_START = '[Auth] Forgot Password Start'
export const FORGOT_PASSWORD_SUCCESS = '[Auth] Forgot Password Success'
export const FORGOT_PASSWORD_FAIL = '[Auth] Forgot Password Fail'
export const RESET_PASSWORD_START = '[Auth] Reset Password Start'
export const RESET_PASSWORD_SUCCESS = '[Auth] Reset Password Success'
export const RESET_PASSWORD_FAIL = '[Auth] Reset Password Fail'


export class AuthenticateSuccess implements Action {
  readonly type = AUTHENTICATE_SUCCESS

  constructor(
    public payload: {
      username: string
      role: string
      token: string
      expirationDate: Date
      redirect: boolean
    }
  ) { }
}

export class Logout implements Action {
  readonly type = LOGOUT
}

export class LoginStart implements Action {
  readonly type = LOGIN_START

  constructor(public payload: { username: string, password: string }) { }
}

export class AuthenticateFail implements Action {
  readonly type = AUTHENTICATE_FAIL

  constructor(public payload: string) { }

}

export class ClearError implements Action {
  readonly type = CLEAR_ERROR
}

export class AutoLogin implements Action {
  readonly type = AUTO_LOGIN
}

export class ForgotPasswordStart implements Action {
  readonly type = FORGOT_PASSWORD_START
  constructor(public payload: { email: string }) { }
}

export class ForgotPasswordSuccess implements Action {
  readonly type = FORGOT_PASSWORD_SUCCESS
  constructor(public payload: string) { }
}

export class ForgotPasswordFail implements Action {
  readonly type = FORGOT_PASSWORD_FAIL
  constructor(public payload: string) { }
}

export class ResetPasswordStart implements Action {
  readonly type = RESET_PASSWORD_START
  constructor(public payload: { token: string, newPassword: string }) { }
}

export class ResetPasswordSuccess implements Action {
  readonly type = RESET_PASSWORD_SUCCESS
  constructor(public payload: string) { }
}

export class ResetPasswordFail implements Action {
  readonly type = RESET_PASSWORD_FAIL
  constructor(public payload: string) { }
}

export type AuthActions =
  | Logout
  | AuthenticateSuccess
  | AuthenticateFail
  | LoginStart
  | ClearError
  | AutoLogin
  | ForgotPasswordStart
  | ForgotPasswordSuccess
  | ForgotPasswordFail
  | ResetPasswordStart
  | ResetPasswordSuccess
  | ResetPasswordFail

