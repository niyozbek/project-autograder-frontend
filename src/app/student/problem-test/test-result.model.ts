export class TestResultModel {
  public submissionId: number;
  public status: TestResultModelStatus;
  public totalTestCases: number;
  public processedTestCases: number;
  public correctTestCases: number;
}

export declare type TestResultModelStatus = 'PROCESSING' | 'COMPLETED';

