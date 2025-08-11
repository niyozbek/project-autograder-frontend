import {Action} from "@ngrx/store";
import {Role} from "./role.model";

export const GET_ROLES = '[Roles] Get Roles'
export const LOAD_ROLES = '[Roles] Load Roles'
export const GET_ROLE = '[Roles] Get Role'
export const LOAD_ROLE = '[Roles] Load Role'

export class GetRoles implements Action {
  readonly type = GET_ROLES

  constructor(public payload: { pageIndex: number, pageSize: number }) {
  }
}

export class LoadRoles implements Action {
  readonly type = LOAD_ROLES

  constructor(public payload: Role[]) {
  }
}

export class GetRole implements Action {
  readonly type = GET_ROLE

  constructor(public payload: { roleId: number }) {
  }
}

export class LoadRole implements Action {
  readonly type = LOAD_ROLE

  constructor(public payload: Role) {
  }
}

export type RoleActions =
  GetRoles
  | LoadRoles
  | GetRole
  | LoadRole
