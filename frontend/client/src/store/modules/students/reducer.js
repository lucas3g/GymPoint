import produce from 'immer';

const INITIAL_STATE = {
  data: [],
  loading: false,
  error: null,
};

export default function student(
  state = INITIAL_STATE,
  { type, payload, error }
) {
  return produce(state, draft => {
    switch (type) {
      case '@student/STUDENT_CREATE_REQUEST': {
        draft.loading = true;
        break;
      }
      case '@student/STUDENT_CREATE_SUCCESS': {
        draft.data = payload.data;
        draft.loading = false;
        break;
      }
      case '@student/STUDENT_CREATE_FAILURE': {
        draft.loading = false;
        draft.error = error;
        break;
      }
      case '@student/STUDENT_UPDATE_REQUEST': {
        draft.loading = true;
        break;
      }
      case '@student/STUDENT_UPDATE_SUCCESS': {
        const studentIndex = draft.data.findIndex(
          p => p.id === payload.data.id
        );
        if (studentIndex >= 0) {
          draft.data[studentIndex] = payload.data;
          draft.loading = false;
        }
        break;
      }
      case '@student/STUDENT_UDPATE_FAILURE': {
        draft.loading = false;
        draft.error = error;
        break;
      }
      case '@student/STUDENT_DELETE_REQUEST': {
        draft.loading = true;
        break;
      }
      case '@student/STUDENT_DELETE_SUCCESS': {
        const studentIndex = draft.data.findIndex(
          p => p.id === payload.data.id
        );
        if (studentIndex >= 0) {
          draft.data[studentIndex] = payload.data.splice(studentIndex, 1);
          draft.loading = false;
        }
        break;
      }
      case '@student/STUDENT_DELETE_FAILURE': {
        draft.loading = false;
        draft.error = error;
        break;
      }

      case '@student/STUDENT_LIST_REQUEST': {
        draft.loading = true;
        break;
      }

      case '@student/STUDENT_LIST_SUCCESS': {
        draft.data = payload.data;
        draft.loading = false;
        break;
      }

      case '@student/STUDENT_LIST_FAILURE': {
        draft.loading = false;
        draft.error = error;
        break;
      }
      default:
    }
  });
}
