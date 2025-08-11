import {Action} from "@ngrx/store";
import {Submission} from "./submission.model";
import {SubmissionTest} from "./submission-test.model";

export const GET_SUBMISSIONS = '[Submissions] Get Submissions'
export const GET_SUBMISSIONS_BY_PROBLEM_ID = '[Submissions] Get Submissions by problemId'
export const LOAD_SUBMISSIONS = '[Submissions] Load Submissions'
export const GET_SUBMISSION = '[Submissions] Get Submission'
export const LOAD_SUBMISSION = '[Submissions] Load Submission'
export const GET_SUBMISSION_TESTS = '[Submissions] Get Submission Tests'
export const LOAD_SUBMISSION_TESTS = '[Submissions] Load Submission Tests'

export class GetSubmissions implements Action {
  readonly type = GET_SUBMISSIONS

  constructor(public payload: { pageIndex: number, pageSize: number }) {
  }
}

export class GetSubmissionsByProblemId implements Action {
  readonly type = GET_SUBMISSIONS_BY_PROBLEM_ID

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

export type SubmissionActions =
  GetSubmissions
  | GetSubmissionsByProblemId
  | LoadSubmissions
  | GetSubmission
  | LoadSubmission
  | GetSubmissionTests
  | LoadSubmissionTests
