import {Action} from "@ngrx/store";
import {User} from "./user.model";

export const GET_LECTURERS = '[Users] Get Lecturers'
export const LOAD_LECTURERS = '[Users] Load Lecturers'
export const CREATE_LECTURER = '[Users] Create Lecturers'
export const LOAD_LECTURER = '[Users] Load Lecturer'

export const GET_STUDENTS = '[Users] Get Students'
export const LOAD_STUDENTS = '[Users] Load Students'
export const CREATE_STUDENT = '[Users] Create Student'
export const LOAD_STUDENT = '[Users] Load Student'

export const GET_USERS = '[Users] Get Users'
export const LOAD_USERS = '[Users] Load Users'
export const CREATE_USER = '[Users] Create User'
export const LOAD_USER = '[Users] Load User'
export const UPDATE_USER = '[Users] Update User'
export const GET_USER_DETAIL = '[Users] Get User Detail'
export const LOAD_USER_DETAIL = '[Users] Load User Detail'
export const CLEAR_USER_DETAIL = '[Users] Clear User Detail'

export class GetLecturers implements Action {
  readonly type = GET_LECTURERS

  constructor(public payload: { pageIndex: number, pageSize: number }) {
  }
}

export class LoadLecturers implements Action {
  readonly type = LOAD_LECTURERS

  constructor(public payload: User[]) {
  }
}

export class CreateLecturer implements Action {
  readonly type = CREATE_LECTURER

  constructor(public payload: User) {
  }
}

export class LoadLecturer implements Action {
  readonly type = LOAD_LECTURER

  constructor(public payload: User) {
  }
}

export class GetStudents implements Action {
  readonly type = GET_STUDENTS

  constructor(public payload: { pageIndex: number, pageSize: number }) {
  }
}

export class LoadStudents implements Action {
  readonly type = LOAD_STUDENTS

  constructor(public payload: User[]) {
  }
}

export class CreateStudent implements Action {
  readonly type = CREATE_STUDENT

  constructor(public payload: User) {
  }
}

export class LoadStudent implements Action {
  readonly type = LOAD_STUDENT

  constructor(public payload: User) {
  }
}

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

export class CreateUser implements Action {
  readonly type = CREATE_USER

  constructor(public payload: User) {
  }
}

export class LoadUser implements Action {
  readonly type = LOAD_USER

  constructor(public payload: User) {
  }
}

export class UpdateUser implements Action {
  readonly type = UPDATE_USER

  constructor(public payload: { id: number, user: User }) {
  }
}

export class GetUserDetail implements Action {
  readonly type = GET_USER_DETAIL

  constructor(public payload: { id: number }) {
  }
}

export class LoadUserDetail implements Action {
  readonly type = LOAD_USER_DETAIL

  constructor(public payload: User) {
  }
}

export class ClearUserDetail implements Action {
  readonly type = CLEAR_USER_DETAIL

  constructor() {
  }
}

export type UserActions =
  GetLecturers
  | LoadLecturers
  | CreateLecturer
  | LoadLecturer
  | GetStudents
  | LoadStudents
  | CreateStudent
  | LoadStudent
  | GetUsers
  | LoadUsers
  | CreateUser
  | LoadUser
  | UpdateUser
  | GetUserDetail
  | LoadUserDetail
  | ClearUserDetail
