import { combineReducers } from 'redux';

import auth from './auth/reducer';
import students from './students/reducer';

export default combineReducers({
  auth,
  students,
});
