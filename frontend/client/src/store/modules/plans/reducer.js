import produce from 'immer';

const INITIAL_STATE = {
  data: [],
  loading: false,
  error: null,
};

export default function plan(state = INITIAL_STATE, { type, payload, error }) {
  return produce(state, draft => {
    switch (type) {
      case '@plan/PLAN_CREATE_REQUEST': {
        draft.loading = true;
        break;
      }
      case '@plan/PLAN_CREATE_SUCCESS': {
        draft.data = payload.data;
        draft.loading = false;
        break;
      }
      case '@plan/PLAN_CREATE_FAILURE': {
        draft.loading = false;
        draft.error = error;
        break;
      }
      case '@plan/PLAN_UPDATE_REQUEST': {
        draft.loading = true;
        break;
      }
      case '@plan/PLAN_UPDATE_SUCCESS': {
        draft.data = payload.data;
        draft.loading = false;
        break;
      }
      case '@plan/PLAN_UDPATE_FAILURE': {
        draft.loading = false;
        draft.error = error;
        break;
      }
      case '@plan/PLAN_DELETE_REQUEST': {
        draft.loading = true;
        break;
      }
      case '@plan/PLAN_DELETE_SUCCESS': {
        draft.data = payload.data;
        draft.loading = false;
        break;
      }
      case '@plan/PLAN_DELETE_FAILURE': {
        draft.loading = false;
        draft.error = error;
        break;
      }

      case '@plan/PLAN_LIST_REQUEST': {
        draft.loading = true;
        break;
      }

      case '@plan/PLAN_LIST_SUCCESS': {
        draft.data = payload.data;
        draft.loading = false;
        break;
      }

      case '@plan/PLAN_LIST_FAILURE': {
        draft.loading = false;
        draft.error = error;
        break;
      }
      default:
    }
  });
}
