import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../store/Slices/authSlice";

const store = configureStore({
  reducer: {
    auth: authReducer,
  },
});

export default store;
