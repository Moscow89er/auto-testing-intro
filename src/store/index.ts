import { combineReducers, configureStore } from "@reduxjs/toolkit";
import type { TypedUseSelectorHook } from "react-redux";
import { useDispatch, useSelector } from "react-redux";
import authReducer from "./auth";
import counterReducer from "./counter";
import userReducer from "./user";

// const rootReducer = { counter: authSlice, auth: counterSlice };

const rootReducer = combineReducers({
  authReducer,
  counterReducer,
  userReducer,
});

const store = configureStore({
  reducer: rootReducer,
});

export type RootState = ReturnType<typeof store.getState>; // получаем тип состояния
export type AppDispatch = typeof store.dispatch; // позволяет использовать только те dispatch, которые мы получили

// хуки для работы с типизированными данными
export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

export default store;
