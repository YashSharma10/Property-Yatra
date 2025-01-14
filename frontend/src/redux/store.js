import { configureStore } from "@reduxjs/toolkit";

import authReducer from "./slices/auth";
import globalEventReducer from "./slices/globalEvent";

const store = configureStore({
  reducer: {
    auth: authReducer,
    globalEvent: globalEventReducer,
  },
});

export default store;
