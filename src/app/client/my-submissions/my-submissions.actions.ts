import {Action} from "@ngrx/store";
import {MySubmission} from "./my-submissions.model";

export const GET_MY_SUBMISSIONS = '[My Submissions] Get My Submissions';
export const LOAD_MY_SUBMISSIONS = '[My Submissions] Load My Submissions';

export class GetMySubmissions implements Action {
  readonly type = GET_MY_SUBMISSIONS;

  constructor(public payload: { pageIndex: number, pageSize: number }) {
  }
}

export class LoadMySubmissions implements Action {
  readonly type = LOAD_MY_SUBMISSIONS;

  constructor(public payload: MySubmission[]) {
  }
}

export type MySubmissionsActions =
  GetMySubmissions
  | LoadMySubmissions;

