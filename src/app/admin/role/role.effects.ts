import {HttpClient} from '@angular/common/http'
import {Injectable} from '@angular/core'
import {Actions, Effect, ofType} from '@ngrx/effects'
import {map, switchMap, tap} from 'rxjs/operators'
import * as RoleActions from './role.actions'
import {Role} from "./role.model";
import {environment} from "../../../environments/environment";
import {Router} from "@angular/router";

@Injectable()
export class RoleEffects {
  apiUrl = environment.apiUrl + '/api/roles'

  @Effect()
  getRoles = this.actions$.pipe(
    ofType(RoleActions.GET_ROLES),
    switchMap((params: RoleActions.GetRoles) => {
      return this.http
        .get<Role[]>(
          this.apiUrl,
          {
            params: {
              pageNo: params.payload.pageIndex,
              pageSize: params.payload.pageSize
            }
          }
        )
    }),
    map(roles => {
      return new RoleActions.LoadRoles(roles)
    })
  )

  @Effect()
  getRole = this.actions$.pipe(
    ofType(RoleActions.GET_ROLE),
    switchMap((params: RoleActions.GetRole) => {
      return this.http
        .get<Role>(
          this.apiUrl + '/' + params.payload.roleId
        )
    }),
    map(role => {
      return new RoleActions.LoadRole(role)
    })
  )

  @Effect({dispatch: false})
  createRole = this.actions$.pipe(
    ofType(RoleActions.CREATE_ROLE),
    switchMap((action: RoleActions.CreateRole) => {
      return this.http.post<Role>(this.apiUrl, action.payload)
    }),
    tap(() => {
      this.router.navigate(['/admin/roles'])
    })
  )

  @Effect({dispatch: false})
  updateRole = this.actions$.pipe(
    ofType(RoleActions.UPDATE_ROLE),
    switchMap((action: RoleActions.UpdateRole) => {
      return this.http.put<Role>(this.apiUrl + '/' + action.payload.id, action.payload)
    }),
    tap(() => {
      this.router.navigate(['/admin/roles'])
    })
  )

  constructor(
    private actions$: Actions,
    private http: HttpClient,
    private router: Router
  ) {
  }
}
