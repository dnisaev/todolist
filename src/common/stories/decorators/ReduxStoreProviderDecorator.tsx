import React from "react";
import { Provider } from "react-redux";
import { combineReducers } from "redux";
import { tasksSlice } from "features/TodolistsList/model/tasksSlice";
import { todolistsSlice } from "features/TodolistsList/model/todolistsSlice";
import { thunk } from "redux-thunk";
import { appSlice } from "app/appSlice";
import { AppRootStateType } from "app/store";
import { v1 } from "uuid";
import { authSlice } from "features/auth/model/authSlice";
import { configureStore } from "@reduxjs/toolkit";
import { MemoryRouter } from "react-router-dom";
import { TaskPriorities, TaskStatuses } from "common/enums";

const rootReducer = combineReducers({
  tasks: tasksSlice,
  todolists: todolistsSlice,
  app: appSlice,
  auth: authSlice,
});

const initialGlobalState: AppRootStateType = {
  todolists: [
    { id: "todoListId1", title: "Что изучить", filter: "all", entityStatus: "idle", addedDate: "", order: 0 },
    { id: "todoListId2", title: "Что купить", filter: "all", entityStatus: "loading", addedDate: "", order: 0 },
  ],
  tasks: {
    ["todoListId1"]: [
      {
        id: v1(),
        title: "HTML & CSS",
        status: TaskStatuses.Completed,
        todoListId: "todoListId1",
        description: "",
        startDate: "",
        deadline: "",
        addedDate: "",
        order: 0,
        priority: TaskPriorities.Low,
      },
      {
        id: v1(),
        title: "JavaScript",
        status: TaskStatuses.Completed,
        todoListId: "todoListId1",
        description: "",
        startDate: "",
        deadline: "",
        addedDate: "",
        order: 0,
        priority: TaskPriorities.Low,
      },
      {
        id: v1(),
        title: "React",
        status: TaskStatuses.New,
        todoListId: "todoListId1",
        description: "",
        startDate: "",
        deadline: "",
        addedDate: "",
        order: 0,
        priority: TaskPriorities.Low,
      },
      {
        id: v1(),
        title: "Typescript",
        status: TaskStatuses.New,
        todoListId: "todoListId1",
        description: "",
        startDate: "",
        deadline: "",
        addedDate: "",
        order: 0,
        priority: TaskPriorities.Low,
      },
    ],
    ["todoListId2"]: [
      {
        id: v1(),
        title: "Овощи",
        status: TaskStatuses.New,
        todoListId: "todoListId2",
        description: "",
        startDate: "",
        deadline: "",
        addedDate: "",
        order: 0,
        priority: TaskPriorities.Low,
      },
      {
        id: v1(),
        title: "Фрукты",
        status: TaskStatuses.Completed,
        todoListId: "todoListId2",
        description: "",
        startDate: "",
        deadline: "",
        addedDate: "",
        order: 0,
        priority: TaskPriorities.Low,
      },
    ],
  },
  app: {
    status: "idle",
    error: null,
    isInitialized: true,
  },
  auth: {
    isLoggedIn: true,
  },
};

export const storyBookStore = configureStore({
  reducer: rootReducer,
  preloadedState: initialGlobalState,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().prepend(thunk),
});

export const ReduxStoreProviderDecorator = (storyFn: () => React.ReactNode) => {
  return (
    <Provider store={storyBookStore}>
      <MemoryRouter>{storyFn()}</MemoryRouter>
    </Provider>
  );
};
