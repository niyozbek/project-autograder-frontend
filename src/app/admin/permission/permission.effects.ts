import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Actions, Effect, ofType} from '@ngrx/effects';
import {map, switchMap} from 'rxjs/operators';
import * as PermissionActions from './permission.actions';
import {Permission} from './permission.model';
import {environment} from '../../../environments/environment';

@Injectable()
export class PermissionEffects {
  apiUrl = environment.apiUrl + '/api/permissions';

  @Effect()
  getPermissions = this.actions$.pipe(
    ofType(PermissionActions.GET_PERMISSIONS),
    switchMap((params: PermissionActions.GetPermissions) => {
      return this.http
        .get<Permission[]>(
          this.apiUrl,
          {
            params: {
              pageNo: params.payload.pageIndex,
              pageSize: params.payload.pageSize
            }
          }
        );
    }),
    map(permissions => {
      return new PermissionActions.LoadPermissions(permissions);
    })
  );

  @Effect()
  getPermission = this.actions$.pipe(
    ofType(PermissionActions.GET_PERMISSION),
    switchMap((params: PermissionActions.GetPermission) => {
      return this.http
        .get<Permission>(
          this.apiUrl + '/' + params.payload.permissionId
        );
    }),
    map(permission => {
      return new PermissionActions.LoadPermission(permission);
    })
  );

  constructor(
    private actions$: Actions,
    private http: HttpClient
  ) {}
}
