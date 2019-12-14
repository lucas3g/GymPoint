export function planCreateRequest(data) {
  return {
    type: '@plan/PLAN_CREATE_REQUEST',
    payload: { data },
  };
}
export function planCreateSucess(data) {
  return {
    type: '@plan/PLAN_CREATE_SUCCESS',
    payload: { data },
  };
}

export function planCreateFailure(error) {
  return {
    type: '@plan/PLAN_CREATE_FAILURE',
    error,
  };
}

export function planUpdateRequest(data, id) {
  return {
    type: '@plan/PLAN_UPDATE_REQUEST',
    payload: { data },
    id,
  };
}
export function planUpdateSucess(data) {
  return {
    type: '@plan/PLAN_UPDATE_SUCCESS',
    payload: { data },
  };
}

export function planUpdateFailure(error) {
  return {
    type: '@plan/PLAN_UPDATE_FAILURE',
    error,
  };
}

export function planDeleteRequest(id) {
  return {
    type: '@plan/PLAN_DELETE_REQUEST',
    id,
  };
}

export function planDeleteSuccess(data) {
  return {
    type: '@plan/PLAN_DELETE_SUCCESS',
    payload: { data },
  };
}

export function planDeleteFailure(error) {
  return {
    type: '@plan/PLAN_DELETE_FAILURE',
    error,
  };
}

export function planListRequest() {
  return {
    type: '@plan/PLAN_LIST_REQUEST',
  };
}

export function planListSuccess(data) {
  return {
    type: '@plan/PLAN_LIST_SUCCESS',
    payload: { data },
  };
}

export function planListFailure(error) {
  return {
    type: '@plan/PLAN_LIST_FAILURE',
    error,
  };
}
