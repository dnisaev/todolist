import { createSlice, isFulfilled, isPending, isRejected, PayloadAction } from "@reduxjs/toolkit";
import { todolistsThunks } from "features/TodolistsList/model/todolistsSlice";
import { tasksThunks } from "features/TodolistsList/model/tasksSlice";

const slice = createSlice({
  name: "app",
  initialState: {
    status: "idle" as RequestStatusType,
    error: null as RequestErrorType,
    isInitialized: false,
  },
  reducers: {
    setAppStatus: (state, action: PayloadAction<{ status: RequestStatusType }>) => {
      state.status = action.payload.status;
    },
    setAppError: (state, action: PayloadAction<{ error: RequestErrorType }>) => {
      state.error = action.payload.error;
    },
    setAppInitialized: (state, action: PayloadAction<{ isInitialized: boolean }>) => {
      state.isInitialized = action.payload.isInitialized;
    },
  },
  selectors: {
    selectAppStatus: (sliceState) => sliceState,
    selectAppError: (sliceState) => sliceState,
    selectIsInitialized: (sliceState) => sliceState,
  },
  extraReducers: (builder) => {
    builder
      .addMatcher(isPending, (state) => {
        state.status = "loading";
      })
      .addMatcher(isFulfilled, (state) => {
        state.status = "succeeded";
      })
      .addMatcher(isRejected, (state, action: any) => {
        state.status = "failed";
        console.log("action", action);
        console.log("state", state);
        if (action.payload) {
          if (
            action.type === todolistsThunks.addTodolistTC.rejected.type ||
            action.type === todolistsThunks.changeTodolistTitleTC.rejected.type ||
            action.type === tasksThunks.addTaskTC.rejected.type ||
            action.type === tasksThunks.updateTaskTC.rejected.type
          )
            return;
          state.error = action.payload.messages[0];
        } else {
          state.error = action.error.message ? action.error.message : "Some error occurred";
        }
      });
  },
});

export const appSlice = slice.reducer;
export const appActions = slice.actions;
export const { setAppStatus, setAppError, setAppInitialized } = appActions;
export const { selectAppStatus, selectIsInitialized, selectAppError } = slice.selectors;

// types
export type RequestStatusType = "idle" | "loading" | "succeeded" | "failed";
export type RequestErrorType = string | null;
