import { actionCreator, constantsCreator } from '../reduxHelpers';

describe('actionCreator', () => {
  const testAction = actionCreator('TEST_TYPE', { test: '123' });

  it('has the correct type', () => {
    expect(testAction.type).toEqual('TEST_TYPE');
  });

  it('has the correct payload', () => {
    expect(testAction.payload).toEqual({ test: '123' });
  });
});

describe('constantsCreator', () => {
  const testConstants = constantsCreator('TEST');
  const expectedResult = {
    REQUEST: 'TEST_REQUEST',
    SUCCESS: 'TEST_SUCCESS',
    FAILURE: 'TEST_FAILURE',
  };

  it('has the correct constants', () => {
    expect(testConstants).toEqual(expectedResult);
  });
});
