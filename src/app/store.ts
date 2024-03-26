import { tasksSlice } from "features/TodolistsList/model/tasksSlice";
import { todolistsSlice } from "features/TodolistsList/model/todolistsSlice";
import { appSlice } from "app/appSlice";
import { authSlice } from "features/auth/model/authSlice";
import { thunk } from "redux-thunk";
import { configureStore } from "@reduxjs/toolkit";

export const store = configureStore({
  reducer: {
    tasks: tasksSlice,
    todolists: todolistsSlice,
    app: appSlice,
    auth: authSlice,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().prepend(thunk),
  devTools: true,
});

export type AppRootStateType = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
