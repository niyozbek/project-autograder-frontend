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

export type UserActions =
  GetLecturers
  | LoadLecturers
  | CreateLecturer
  | LoadLecturer
  | GetStudents
  | LoadStudents
  | CreateStudent
  | LoadStudent
