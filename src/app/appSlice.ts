import { createSlice, PayloadAction } from "@reduxjs/toolkit";

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
});

export const appSlice = slice.reducer;

// actions
export const appActions = slice.actions;
export const { setAppStatus, setAppError, setAppInitialized } = appActions;
export const { selectAppStatus, selectIsInitialized, selectAppError } = slice.selectors;

// types
export type RequestStatusType = "idle" | "loading" | "succeeded" | "failed";
export type RequestErrorType = string | null;
