
import {Action} from '@ngrx/store';
import {Permission} from './permission.model';

export const GET_PERMISSIONS = '[Permissions] Get Permissions';
export const LOAD_PERMISSIONS = '[Permissions] Load Permissions';
export const GET_PERMISSION = '[Permissions] Get Permission';
export const LOAD_PERMISSION = '[Permissions] Load Permission';

export class GetPermissions implements Action {
  readonly type = GET_PERMISSIONS;
  constructor(public payload: { pageIndex: number, pageSize: number }) {}
}

export class LoadPermissions implements Action {
  readonly type = LOAD_PERMISSIONS;
  constructor(public payload: Permission[]) {}
}

export class GetPermission implements Action {
  readonly type = GET_PERMISSION;
  constructor(public payload: { permissionId: number }) {}
}

export class LoadPermission implements Action {
  readonly type = LOAD_PERMISSION;
  constructor(public payload: Permission) {}
}

export type PermissionActions =
  GetPermissions
  | LoadPermissions
  | GetPermission
  | LoadPermission;
