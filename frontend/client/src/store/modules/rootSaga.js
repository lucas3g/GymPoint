import { all } from 'redux-saga/effects';

import auth from './auth/sagas';
import students from './students/sagas';

export default function* rootSaga() {
  return yield all([auth, students]);
}
