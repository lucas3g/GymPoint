export function checkInRequest(id) {
  return {
    type: "@checkin/CHECK_IN_REQUEST",
    payload: { id }
  };
}

export function checkInSuccess(checkin) {
  return {
    type: "@checkin/CHECK_IN_SUCCESS",
    payload: { checkin }
  };
}

export function checkInFailure() {
  return {
    type: "@checkin/CHECK_IN_FAILURE"
  };
}
