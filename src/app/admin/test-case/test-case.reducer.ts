import * as TestCaseActions from './test-case.actions'
import {TestCase} from "./test-case.model";

export interface AppState {
  testCases: State
}

export interface State {
  testCases: TestCase[]
  testCase: TestCase
}

const initialState: State = {
  testCases: [],
  testCase: new TestCase()
}

export function testCaseReducer(
  state = initialState,
  action: TestCaseActions.TestCaseActions
) {
  switch (action.type) {
    case TestCaseActions.GET_TEST_CASES:
      return {
        ...state
      }
    case TestCaseActions.LOAD_TEST_CASES:
      return {
        ...state,
        testCases: [...action.payload]
      }
    case TestCaseActions.ADD_TEST_CASE:
      return {
        ...state
      }
    case TestCaseActions.LOAD_TEST_CASE: {
      let index = state.testCases.findIndex((testCase) => testCase.id === action.payload.id)
      if (index !== -1) {
        const updatedTestCases = [...state.testCases]
        updatedTestCases[index] = action.payload
        return {
          ...state,
          testCases: updatedTestCases
        }
      }

      return {
        ...state,
        testCases: [action.payload, ...state.testCases]
      }
    }
    default:
      return state
  }
}
