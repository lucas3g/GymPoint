import AsyncStorage from "@react-native-community/async-storage";
import { persistReducer } from "redux-persist";

export default reducers => {
  const persistedReducer = persistReducer(
    {
      key: "gymPoint",
      storage: AsyncStorage,
      whitelist: ["auth", "user", "checkin"]
    },
    reducers
  );

  return persistedReducer;
};
