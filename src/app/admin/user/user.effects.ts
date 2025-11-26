import {HttpClient} from '@angular/common/http'
import {Injectable} from '@angular/core'
import {Actions, Effect, ofType} from '@ngrx/effects'
import {map, switchMap} from 'rxjs/operators'
import * as UserActions from './user.actions'
import {User} from "./user.model";
import {environment} from "../../../environments/environment";

@Injectable()
export class UserEffects {
  apiUrl = environment.apiUrl + '/api'

  @Effect()
  getUsers = this.actions$.pipe(
    ofType(UserActions.GET_USERS),
    switchMap((params: UserActions.GetUsers) => {
      return this.http
        .get<User[]>(
          this.apiUrl + '/users',
          {
            params: {
              pageNo: params.payload.pageIndex,
              pageSize: params.payload.pageSize
            }
          }
        )
    }),
    map(users => {
      return new UserActions.LoadUsers(users)
    })
  )

  @Effect()
  getUser = this.actions$.pipe(
    ofType(UserActions.GET_USER),
    switchMap((params: UserActions.GetUser) => {
      return this.http
        .get<User>(
          this.apiUrl + '/users/'+ params.payload.id
        )
    }),
    map(user => {
      return new UserActions.LoadUser(user)
    })
  )

  @Effect()
  createUser = this.actions$.pipe(
    ofType(UserActions.CREATE_USER),
    switchMap((body: UserActions.CreateUser) => {
      return this.http
        .post<User>(
          this.apiUrl + '/users',
          {
            'username': body.payload.username,
            'password': body.payload.password,
            'fullname': body.payload.fullname
          }
        )
    }),
    map(user => {
      return new UserActions.LoadUser(user)
    })
  )

  @Effect()
  updateUser = this.actions$.pipe(
    ofType(UserActions.UPDATE_USER),
    switchMap((body: UserActions.UpdateUser) => {
      return this.http
        .put<User>(
          this.apiUrl + '/users/' + body.payload.id,
          body.payload.user
        )
    }),
    map(user => {
      return new UserActions.LoadUser(user)
    })
)

  constructor(
    private actions$: Actions,
    private http: HttpClient
  ) {
  }
}
