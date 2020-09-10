export const actionCreator = (actionType, actionPayload) => ({
  type: actionType,
  payload: actionPayload,
});

export const constantsCreator = (prefixString) => ({
  REQUEST: `${prefixString}_REQUEST`,
  SUCCESS: `${prefixString}_SUCCESS`,
  FAILURE: `${prefixString}_FAILURE`,
});
