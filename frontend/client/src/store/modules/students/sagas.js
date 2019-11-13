import { takeLatest, call, put, all } from 'redux-saga/effects';
import { toast } from 'react-toastify';
import api from '~/services/api';

import {
  studentUpdateSucess,
  studentUpdateFailure,
  studentListSuccess,
  sudentListFailure,
} from './actions';

export function* studentUpdate({ payload }) {
  try {
    const { id, name, email, age, weight, height } = payload.data.profile;

    const student = { id, name, email, age, weight, height };

    const response = yield call(api.put, `students/${id}`, student);

    toast.success('Aluno atualizado com sucesso!');

    yield put(studentUpdateSucess(response.data));
  } catch (err) {
    toast.error(
      `Falha na alteração do aluno, verifique o seus dados! ${err.message}`
    );
    yield put(studentUpdateFailure(err.message));
  }
}

export function* studentLists() {
  try {
    const response = yield call(api.get, 'students');

    yield put(studentListSuccess(response.data));
  } catch (error) {
    yield put(sudentListFailure(error.message));
  }
}

export default all([
  takeLatest('@student/STUDENT_UPDATE_REQUEST', studentUpdate),
  takeLatest('@student/STUDENT_LIST_REQUEST', studentLists),
]);
