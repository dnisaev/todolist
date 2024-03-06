import { authAPI } from "api/todolists-api";
import { handleServerAppError, handleServerNetworkError } from "utils/error-utils";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { setIsLoggedIn } from "features/Login/auth-reducer";
import { AppDispatch } from "app/store";

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
});

export const appReducer = slice.reducer;

// actions
export const appActions = slice.actions;
export const { setAppStatus, setAppError, setAppInitialized } = appActions;

// thunks
export const initializeAppTC = () => (dispatch: AppDispatch) => {
  authAPI
    .me()
    .then((res) => {
      if (res.data.resultCode === 0) {
        dispatch(setIsLoggedIn({ isLoggedIn: true }));
      } else {
        handleServerAppError(res.data, dispatch);
      }
    })
    .catch((error) => {
      handleServerNetworkError(error, dispatch);
    })
    .finally(() => {
      dispatch(setAppInitialized({ isInitialized: true }));
    });
};

// types
export type RequestStatusType = "idle" | "loading" | "succeeded" | "failed";
export type RequestErrorType = string | null;
export type AppActionsType =
  | ReturnType<typeof appActions.setAppStatus>
  | ReturnType<typeof appActions.setAppError>
  | ReturnType<typeof appActions.setAppInitialized>;
