import { configureStore } from "@reduxjs/toolkit";

import authReducer from "./AuthConsumer";

const store = configureStore({
  reducer: { auth: authReducer },
});

export default store;
