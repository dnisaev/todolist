import { TasksActionsType, tasksReducer } from "features/TodolistsList/tasks-reducer";
import { TodolistsActionsType, todolistsReducer } from "features/TodolistsList/todolists-reducer";
import { combineReducers } from "redux";
import { AppActionsType, appReducer } from "./app-reducer";
import { AuthActionsType, authReducer } from "features/Login/auth-reducer";
import { thunk, ThunkAction, ThunkDispatch } from "redux-thunk";
import { configureStore } from "@reduxjs/toolkit";

export const rootReducer = combineReducers({
  tasks: tasksReducer,
  todolists: todolistsReducer,
  app: appReducer,
  auth: authReducer,
});

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().prepend(thunk),
});

export type AppRootStateType = ReturnType<typeof store.getState>;
export type AppGlobalActionsType = TasksActionsType | TodolistsActionsType | AppActionsType | AuthActionsType;
export type AppDispatch = ThunkDispatch<AppRootStateType, unknown, AppGlobalActionsType>;
export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, AppRootStateType, unknown, AppGlobalActionsType>;

// @ts-ignore
window.store = store;
