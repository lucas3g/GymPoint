export function studentUpdateRequest(data) {
  return {
    type: '@student/STUDENT_UPDATE_REQUEST',
    payload: { data },
  };
}
export function studentUpdateSucess(data) {
  return {
    type: '@student/STUDENT_UPDATE_SUCCESS',
    payload: { data },
  };
}

export function studentUpdateFailure(error) {
  return {
    type: '@student/STUDENT_UPDATE_FAILURE',
    error,
  };
}

export function studentListRequest() {
  return {
    type: '@student/STUDENT_LIST_REQUEST',
  };
}

export function studentListSuccess(data) {
  return {
    type: '@student/STUDENT_LIST_SUCCESS',
    payload: { data },
  };
}

export function sudentListFailure(error) {
  return {
    type: '@student/STUDENT_LIST_FAILURE',
    error,
  };
}
