export class Submission {
  public id: number;
  public problemId: number;
  public language: string
  public version: string
  public filename: string
  public code: string
  public status: string = 'INIT'
}

export interface StatusMap {
  label: string,
  labelStyle: string
}

export const STATUSES: { [key: string]: StatusMap } = {
  INIT: {label: '', labelStyle: ''},
  NEW: {label: 'New', labelStyle: 'badge badge-primary'},
  WRONG_ANSWER: {label: 'Wrong Answer', labelStyle: 'badge badge-warning'},
  COMPILE_ERROR: {label: 'Compilation Error', labelStyle: 'badge badge-danger'},
  ACCEPTED: {label: 'Accepted', labelStyle: 'badge badge-success'}
}

