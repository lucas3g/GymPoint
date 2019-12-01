import { Alert } from "react-native";
import { takeLatest, call, put, all } from "redux-saga/effects";
// delay do saga
import api from "~/services/api";
// import history from "~/services/history";

import { checkInSuccess, checkInFailure } from "./actions";

export function* checkIn({ payload }) {
  try {
    const { id } = payload;

    const checkins = yield call(api.get, `/students/${id}/checkins`);

    if (checkins.data.length >= 5) {
      Alert.alert("Aviso", "Limite de 5 checkins atingido nos ultimos 7 dias");
      return;
    }

    const response = yield call(api.post, `/students/${id}/checkins`);

    const { checkin } = response.data;

    yield put(checkInSuccess(checkin));
  } catch (err) {
    Alert.alert("Falha no checkin", "Por favor tente mais tarde!");
    yield put(checkInFailure());
  }
}

export default all([takeLatest("@checkin/CHECK_IN_REQUEST", checkIn)]);
