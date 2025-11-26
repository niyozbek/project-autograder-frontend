import {Action} from "@ngrx/store";
import {User} from "./user.model";

export const GET_USERS = '[Users] Get Users'
export const LOAD_USERS = '[Users] Load Users'
export const GET_USER = '[Users] Get User'
export const CREATE_USER = '[Users] Create User'
export const UPDATE_USER = '[Users] Update User'
export const ASSIGN_ROLES = '[Users] Assign Roles'
export const LOAD_USER = '[Users] Load User'
export const CLEAR_USER = '[Users] Clear User Detail'

export class GetUsers implements Action {
  readonly type = GET_USERS

  constructor(public payload: { pageIndex: number, pageSize: number }) {
  }
}

export class LoadUsers implements Action {
  readonly type = LOAD_USERS

  constructor(public payload: User[]) {
  }
}

export class GetUser implements Action {
  readonly type = GET_USER

  constructor(public payload: { id: number }) {
  }
}

export class CreateUser implements Action {
  readonly type = CREATE_USER

  constructor(public payload: User) {
  }
}

export class UpdateUser implements Action {
  readonly type = UPDATE_USER

  constructor(public payload: { id: number, user: User }) {
  }
}

export class AssignRoles implements Action {
  readonly type = ASSIGN_ROLES

  constructor(public payload: { id: number, roles: { id: number }[] }) {
  }
}

export class LoadUser implements Action {
  readonly type = LOAD_USER

  constructor(public payload: User) {
  }
}

export class ClearUser implements Action {
  readonly type = CLEAR_USER

  constructor() {
  }
}

export type UserActions =
  GetUsers
  | LoadUsers
  | GetUser
  | CreateUser
  | UpdateUser
  | AssignRoles
  | LoadUser
  | ClearUser
