import produce from "immer";

const INITIAL_STATE = {
  checked: false,
  loading: false,
  checkin: null
};

export default function checkin(state = INITIAL_STATE, action) {
  return produce(state, draft => {
    switch (action.type) {
      case "@checkin/CHECK_IN_REQUEST": {
        draft.loading = true;
        break;
      }
      case "@checkin/CHECK_IN_SUCCESS": {
        console.tron.log(action);
        draft.checked = true;
        draft.loading = false;
        draft.checkin = action.payload.checkin;
        break;
      }
      case "@checkin/CHECK_IN_FAILURE": {
        draft.loading = false;
        draft.checkin = null;
        break;
      }
      default:
    }
  });
}
