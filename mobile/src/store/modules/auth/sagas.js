import { Alert } from "react-native";
import { takeLatest, call, put, all } from "redux-saga/effects";
// delay do saga
import api from "~/services/api";
// import history from "~/services/history";

import { signInSuccess, signFailure } from "./actions";

export function* signIn({ payload }) {
  try {
    const { id } = payload;

    const response = yield call(api.get, `students/${id}`);

    const { student } = response.data;

    console.tron.log(response.data);

    if (!student) {
      Alert.alert("Erro no login", "Usuário não pode ser prestador ");
      return;
    }

    // api.defaults.headers.Authorization = `Bearer ${token}`;

    // yield delay(3000);

    yield put(signInSuccess(student));

    // history.push("/dashboard");
  } catch (err) {
    Alert.alert("Falha na autenticação", "verifique os seus dados");
    yield put(signFailure());
  }
}

export function signOut() {
  //history.push("/");
}

export default all([
  takeLatest("@auth/SIGN_IN_REQUEST", signIn),
  takeLatest("@auth/SIGN_OUT", signOut)
]);
