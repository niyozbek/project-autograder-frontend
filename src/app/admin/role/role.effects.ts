import {HttpClient} from '@angular/common/http'
import {Injectable} from '@angular/core'
import {Actions, Effect, ofType} from '@ngrx/effects'
import {map, switchMap} from 'rxjs/operators'
import * as RoleActions from './role.actions'
import {Role} from "./role.model";
import {environment} from "../../../environments/environment";

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
    map(submissions => {
      return new RoleActions.LoadRoles(submissions)
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
    map(submission => {
      return new RoleActions.LoadRole(submission)
    })
  )

  constructor(
    private actions$: Actions,
    private http: HttpClient,
  ) {
  }
}
