import {Action} from "@ngrx/store";
import {Submission} from "./problem-submission.model";
import {SubmissionTest} from "../problem-test/problem-test.model";

export const GET_SUBMISSIONS = '[User Submissions] Get Submissions'
export const LOAD_SUBMISSIONS = '[User Submissions] Load Submissions'
export const GET_SUBMISSION = '[User Submissions] Get Submission'
export const LOAD_SUBMISSION = '[User Submissions] Load Submission'
export const LOAD_SUBMISSION_WINDOW = '[User Submissions] Load Submission Window'
export const GET_SUBMISSION_TESTS = '[User Submissions] Get Submission Tests'
export const LOAD_SUBMISSION_TESTS = '[User Submissions] Load Submission Tests'

export class GetSubmissions implements Action {
  readonly type = GET_SUBMISSIONS

  constructor(public payload: { problemId: number, pageIndex: number, pageSize: number }) {
  }
}

export class LoadSubmissions implements Action {
  readonly type = LOAD_SUBMISSIONS

  constructor(public payload: Submission[]) {
  }
}

export class GetSubmission implements Action {
  readonly type = GET_SUBMISSION

  constructor(public payload: { submissionId: number }) {
  }
}

export class LoadSubmission implements Action {
  readonly type = LOAD_SUBMISSION

  constructor(public payload: Submission) {
  }
}


export class LoadSubmissionWindow implements Action {
  readonly type = LOAD_SUBMISSION_WINDOW

  constructor(public payload: Submission) {
  }
}

export class GetSubmissionTests implements Action {
  readonly type = GET_SUBMISSION_TESTS

  constructor(public payload: { submissionId: number }) {
  }
}

export class LoadSubmissionTests implements Action {
  readonly type = LOAD_SUBMISSION_TESTS

  constructor(public payload: SubmissionTest[]) {
  }
}

export type ProblemSubmissionActions =
  GetSubmissions
  | LoadSubmissions
  | GetSubmission
  | LoadSubmission
  | GetSubmissionTests
  | LoadSubmissionTests
  | LoadSubmissionWindow
