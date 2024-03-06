import { todolistsAPI, TodolistType } from "api/todolists-api";
import { AppDispatch } from "app/store";
import { RequestStatusType, setAppStatus } from "app/app-reducer";
import { handleServerAppError, handleServerNetworkError } from "utils/error-utils";
import { fetchTasksTC } from "./tasks-reducer";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState: Array<TodolistDomainType> = [];

const slice = createSlice({
  name: "todolists",
  initialState,
  reducers: {
    removeTodolist: (state, action: PayloadAction<{ id: string }>) => {
      const index = state.findIndex((tl) => tl.id === action.payload.id);
      if (index > -1) {
        state.splice(index, 1);
      }
    },
    addTodolist: (state, action: PayloadAction<{ todolist: TodolistType }>) => {
      state.unshift({ ...action.payload.todolist, filter: "all", entityStatus: "idle" });
    },
    changeTodolistTitle: (state, action: PayloadAction<{ id: string; title: string }>) => {
      const index = state.findIndex((tl) => tl.id === action.payload.id);
      state[index].title = action.payload.title;
    },
    changeTodolistFilter: (state, action: PayloadAction<{ id: string; filter: FilterValuesType }>) => {
      const index = state.findIndex((tl) => tl.id === action.payload.id);
      state[index].filter = action.payload.filter;
    },
    changeTodolistEntityStatus: (state, action: PayloadAction<{ id: string; status: RequestStatusType }>) => {
      const index = state.findIndex((tl) => tl.id === action.payload.id);
      state[index].entityStatus = action.payload.status;
    },
    setTodolists: (state, action: PayloadAction<{ todolists: Array<TodolistType> }>) => {
      return action.payload.todolists.map((tl) => ({ ...tl, filter: "all", entityStatus: "idle" }));
    },
    clearTodosData: () => {
      return [];
    },
  },
});

export const todolistsReducer = slice.reducer;
export const todolistsActions = slice.actions;
export const {
  removeTodolist,
  addTodolist,
  setTodolists,
  changeTodolistTitle,
  changeTodolistFilter,
  changeTodolistEntityStatus,
  clearTodosData,
} = todolistsActions;

// thunks
export const fetchTodolistsTC = () => (dispatch: AppDispatch) => {
  dispatch(setAppStatus({ status: "loading" }));
  todolistsAPI
    .getTodolists()
    .then((res) => {
      const action = setTodolists({ todolists: res.data });
      dispatch(action);
      dispatch(setAppStatus({ status: "succeeded" }));
      return res.data;
    })
    .then((todos) => {
      todos.forEach((tl) => {
        dispatch(fetchTasksTC(tl.id));
      });
    });
};
export const removeTodolistTC = (todolistId: string) => (dispatch: AppDispatch) => {
  dispatch(setAppStatus({ status: "loading" }));
  dispatch(changeTodolistEntityStatus({ id: todolistId, status: "loading" }));
  todolistsAPI
    .deleteTodolist(todolistId)
    .then((res) => {
      if (res.data.resultCode === 0) {
        dispatch(removeTodolist({ id: todolistId }));
        dispatch(setAppStatus({ status: "succeeded" }));
      } else {
        handleServerAppError(res.data, dispatch);
      }
    })
    .catch((error) => {
      handleServerNetworkError(error, dispatch);
    });
};
export const addTodolistTC = (title: string) => (dispatch: AppDispatch) => {
  dispatch(setAppStatus({ status: "loading" }));
  todolistsAPI
    .createTodolist(title)
    .then((res) => {
      if (res.data.resultCode === 0) {
        dispatch(addTodolist({ todolist: res.data.data.item }));
        dispatch(setAppStatus({ status: "succeeded" }));
      } else {
        handleServerAppError(res.data, dispatch);
      }
    })
    .catch((error) => {
      handleServerNetworkError(error, dispatch);
    });
};
export const changeTodolistTitleTC = (todolistId: string, title: string) => (dispatch: AppDispatch) => {
  dispatch(setAppStatus({ status: "loading" }));
  dispatch(changeTodolistEntityStatus({ id: todolistId, status: "loading" }));
  todolistsAPI
    .updateTodolist(todolistId, title)
    .then((res) => {
      if (res.data.resultCode === 0) {
        dispatch(changeTodolistTitle({ id: todolistId, title }));
        dispatch(setAppStatus({ status: "succeeded" }));
        dispatch(changeTodolistEntityStatus({ id: todolistId, status: "succeeded" }));
      } else {
        handleServerAppError(res.data, dispatch);
        dispatch(changeTodolistEntityStatus({ id: todolistId, status: "failed" }));
      }
    })
    .catch((error) => {
      handleServerNetworkError(error, dispatch);
    });
};

// types
export type AddTodolistActionType = ReturnType<typeof addTodolist>;
export type RemoveTodolistActionType = ReturnType<typeof removeTodolist>;
export type SetTodolistActionType = ReturnType<typeof setTodolists>;
export type ClearDataActionType = ReturnType<typeof clearTodosData>;
export type TodolistsActionsType =
  | AddTodolistActionType
  | RemoveTodolistActionType
  | SetTodolistActionType
  | ClearDataActionType
  | ReturnType<typeof changeTodolistTitle>
  | ReturnType<typeof changeTodolistFilter>
  | ReturnType<typeof changeTodolistEntityStatus>;
export type FilterValuesType = "active" | "all" | "completed";
export type TodolistDomainType = TodolistType & { filter: FilterValuesType; entityStatus: RequestStatusType };
