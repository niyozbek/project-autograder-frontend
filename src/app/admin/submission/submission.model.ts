export class Submission {
  public id: number;
  public problemId: number;
  public language: string
  public version: string
  public filename: string
  public userId: number
  public code: string
  public status: string;
  public output: string;
  public grade: number
}
export interface StatusMap {
  label: string,
  labelStyle: string
}

export const STATUSES: { [key: string]: StatusMap } = {
  INIT: {label: '', labelStyle: ''},
  NEW: {label: 'New', labelStyle: 'badge bg-primary'},
  WRONG_ANSWER: {label: 'Wrong Answer', labelStyle: 'badge bg-warning'},
  COMPILE_ERROR: {label: 'Compilation Error', labelStyle: 'badge bg-danger'},
  ACCEPTED: {label: 'Accepted', labelStyle: 'badge bg-success'}
}


