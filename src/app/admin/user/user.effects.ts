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
  getLecturers = this.actions$.pipe(
    ofType(UserActions.GET_LECTURERS),
    switchMap((params: UserActions.GetLecturers) => {
      return this.http
        .get<User[]>(
          this.apiUrl + '/lecturers',
          {
            params: {
              pageNo: params.payload.pageIndex,
              pageSize: params.payload.pageSize
            }
          }
        )
    }),
    map(lecturers => {
      return new UserActions.LoadLecturers(lecturers)
    })
  )

  @Effect()
  createLecturer = this.actions$.pipe(
    ofType(UserActions.CREATE_LECTURER),
    switchMap((body: UserActions.CreateLecturer) => {
      return this.http
        .post<User>(
          this.apiUrl + '/lecturers',
          {
            'username': body.payload.username,
            'password': body.payload.password
          }
        )
    }),
    map(lecturer => {
      return new UserActions.LoadLecturer(lecturer)
    })
  )

  @Effect()
  getStudents = this.actions$.pipe(
    ofType(UserActions.GET_STUDENTS),
    switchMap((params: UserActions.GetLecturers) => {
      return this.http
        .get<User[]>(
          this.apiUrl + '/students',
          {
            params: {
              pageNo: params.payload.pageIndex,
              pageSize: params.payload.pageSize
            }
          }
        )
    }),
    map(students => {
      return new UserActions.LoadStudents(students)
    })
  )

  @Effect()
  createStudent = this.actions$.pipe(
    ofType(UserActions.CREATE_STUDENT),
    switchMap((body: UserActions.CreateStudent) => {
      return this.http
        .post<User>(
          this.apiUrl + '/students',
          {
            'username': body.payload.username,
            'password': body.payload.password
          }
        )
    }),
    map(student => {
      return new UserActions.LoadStudent(student)
    })
  )

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
  createUser = this.actions$.pipe(
    ofType(UserActions.CREATE_USER),
    switchMap((body: UserActions.CreateUser) => {
      return this.http
        .post<User>(
          this.apiUrl + '/users',
          {
            'username': body.payload.username,
            'password': body.payload.password
          }
        )
    }),
    map(user => {
      return new UserActions.LoadUser(user)
    })
  )

  @Effect()
  getUserDetail = this.actions$.pipe(
    ofType(UserActions.GET_USER_DETAIL),
    switchMap((params: UserActions.GetUserDetail) => {
      return this.http
        .get<User>(
          this.apiUrl + '/users/'+ params.payload.id
        )
    }),
    map(user => {
      return new UserActions.LoadUserDetail(user)
    })
  )

  constructor(
    private actions$: Actions,
    private http: HttpClient
  ) {
  }
}
