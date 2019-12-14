import { takeLatest, call, put, all } from 'redux-saga/effects';
import { toast } from 'react-toastify';
import api from '~/services/api';
import history from '~/services/history';

import {
  planCreateSucess,
  planCreateFailure,
  planUpdateSucess,
  planUpdateFailure,
  planDeleteSuccess,
  planDeleteFailure,
  planListSuccess,
  planListFailure,
} from './actions';

export function* planCreate({ payload }) {
  try {
    const { title, duration, price } = payload.data;

    const plan = { title, duration, price };

    const response = yield call(api.post, 'plans', plan);

    toast.success('Plano cadastrado com sucesso!');

    yield put(planCreateSucess(response.data));

    history.push('/plans');
  } catch (err) {
    toast.error(
      `Falha no cadastro do plano, verifique o seus dados! ${err.message}`
    );
    yield put(planCreateFailure(err.message));
  }
}

export function* planUpdate({ payload, id }) {
  try {
    const { title, duration, price } = payload.data;

    const plan = { title, duration, price };

    const response = yield call(api.put, `plans/${id}`, plan);

    toast.success('Plano atualizado com sucesso!');

    yield put(planUpdateSucess(response.data));
    history.push('plans');
  } catch (err) {
    toast.error(
      `Falha na alteração do plano, verifique o seus dados! ${err.message}`
    );
    yield put(planUpdateFailure(err.message));
  }
}

export function* planDelete({ id }) {
  try {
    const response = yield call(api.delete, `plans/${id}`);

    toast.success('Plano excluido com sucesso!');

    yield put(planDeleteSuccess(response.data));
  } catch (err) {
    toast.error(
      `Falha na exclusão do plano, verifique o seus dados! ${err.message}`
    );
    yield put(planDeleteFailure(err.message));
  }
}

export function* planLists() {
  try {
    const response = yield call(api.get, 'plans');

    yield put(planListSuccess(response.data));
  } catch (error) {
    yield put(planListFailure(error.message));
  }
}

export default all([
  takeLatest('@plan/PLAN_CREATE_REQUEST', planCreate),
  takeLatest('@plan/PLAN_UPDATE_REQUEST', planUpdate),
  takeLatest('@plan/PLAN_DELETE_REQUEST', planDelete),
  takeLatest('@plan/PLAN_LIST_REQUEST', planLists),
]);
