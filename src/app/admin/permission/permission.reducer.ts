import {Permission} from './permission.model';
import * as PermissionActions from './permission.actions';

export interface State {
  permissions: Permission[];
  permission: Permission;
}

const initialState: State = {
  permissions: [],
  permission: new Permission()
};

export function permissionReducer(
  state = initialState,
  action: PermissionActions.PermissionActions
) {
  switch (action.type) {
    case PermissionActions.LOAD_PERMISSIONS:
      return {
        ...state,
        permissions: [...action.payload]
      };
    case PermissionActions.LOAD_PERMISSION:
      return {
        ...state,
        permission: action.payload
      };
    default:
      return state;
  }
}
