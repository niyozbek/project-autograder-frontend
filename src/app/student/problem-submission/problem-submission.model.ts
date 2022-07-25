export class Submission {
  public id: number;
  public problemId: number;
  public language: string
  public version: string
  public filename: string
  public code: string
  public status: string
  public statusMap = STATUSES.INIT
}

export interface StatusMap {
  label: string,
  labelStyle: string
}

export const STATUSES: { [key: string]: StatusMap } = {
  INIT: {label: '', labelStyle: ''},
  NEW: {label: 'New', labelStyle: 'label label-primary'},
  WRONG_ANSWER: {label: 'Wrong Answer', labelStyle: 'label label-warning'},
  COMPILE_ERROR: {label: 'Compilation Error', labelStyle: 'label label-danger'},
  ACCEPTED: {label: 'Accepted', labelStyle: 'label label-success'}
}

