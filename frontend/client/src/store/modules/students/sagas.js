import { takeLatest, call, put, all } from 'redux-saga/effects';
import { toast } from 'react-toastify';
import api from '~/services/api';
import history from '~/services/history';

import {
  studentCreateSucess,
  studentCreateFailure,
  studentUpdateSucess,
  studentUpdateFailure,
  studentDeleteSuccess,
  studentDeleteFailure,
  studentListSuccess,
  sudentListFailure,
} from './actions';

export function* studentCreate({ payload }) {
  try {
    const { name, email, age, weight, height } = payload.data;

    const student = { name, email, age, weight, height };

    const response = yield call(api.post, 'students', student);

    toast.success('Aluno cadastrado com sucesso!');

    yield put(studentCreateSucess(response.data));

    history.push('/Students');
  } catch (err) {
    toast.error(
      `Falha no cadastro do aluno, verifique o seus dados! ${err.message}`
    );
    yield put(studentCreateFailure(err.message));
  }
}

export function* studentUpdate({ payload, id }) {
  try {
    const { name, email, age, weight, height } = payload.data;

    const student = { name, email, age, weight, height };

    const response = yield call(api.put, `students/${id}`, student);

    toast.success('Aluno atualizado com sucesso!');

    yield put(studentUpdateSucess(response.data));
    history.push('Students');
  } catch (err) {
    toast.error(
      `Falha na alteração do aluno, verifique o seus dados! ${err.message}`
    );
    yield put(studentUpdateFailure(err.message));
  }
}

export function* stundetDelete({ id }) {
  try {
    const response = yield call(api.delete, `students/${id}`);

    toast.success('Aluno excluido com sucesso!');

    yield put(studentDeleteSuccess(response.data));
  } catch (err) {
    toast.error(
      `Falha na exclusão do aluno, verifique o seus dados! ${err.message}`
    );
    yield put(studentDeleteFailure(err.message));
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
  takeLatest('@student/STUDENT_CREATE_REQUEST', studentCreate),
  takeLatest('@student/STUDENT_UPDATE_REQUEST', studentUpdate),
  takeLatest('@student/STUDENT_DELETE_REQUEST', stundetDelete),
  takeLatest('@student/STUDENT_LIST_REQUEST', studentLists),
]);
