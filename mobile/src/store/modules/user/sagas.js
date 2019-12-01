import { Alert } from "react-native";
import { takeLatest, call, put, all } from "redux-saga/effects";
// import { toast } from "react-toastify";

import api from "~/services/api";

import { updateProfileSuccess, updateProfileFailure } from "./actions";

export function* updateProfile({ payload }) {
  try {
    const { name, email, ...rest } = payload.data;

    const profile = {
      name,
      email,
      ...(rest.oldPassword ? rest : {})
    };

    const response = yield call(api.put, "users", profile);

    Alert.alert("Sucesso", "Perfil atualizado com sucesso");

    yield put(updateProfileSuccess(response.data));
  } catch (error) {
    Alert.alert("Erro ao atualizar perfil", "confira os seus dados!");
    yield put(updateProfileFailure());
  }
}

export default all([takeLatest("@user/UPDATE_PROFILE_REQUEST", updateProfile)]);
