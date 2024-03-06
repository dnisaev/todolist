import { Dispatch } from "redux";
import { authAPI } from "../api/todolists-api";
import { setIsLoggedInAC } from "../features/Login/auth-reducer";
import { GlobalActionsType } from "./store";
import { handleServerAppError, handleServerNetworkError } from "../utils/error-utils";

const initialState = {
  status: "idle" as RequestStatusType,
  error: null as RequestErrorType,
  isInitialized: false,
};

export const appReducer = (state: InitialStateType = initialState, action: AppActionsType): InitialStateType => {
  switch (action.type) {
    case "APP/SET-STATUS":
      return { ...state, status: action.status };
    case "APP/SET-ERR":
      return { ...state, error: action.error };
    case "APP/SET-INITIALIZED":
      return { ...state, isInitialized: action.isInitialized };
    default:
      return state;
  }
};

// actions
export const setAppStatusAC = (status: RequestStatusType) => ({ type: "APP/SET-STATUS", status }) as const;
export const setAppErrorAC = (error: RequestErrorType) => ({ type: "APP/SET-ERR", error: error }) as const;
export const setIsInitializedAC = (isInitialized: boolean) => ({ type: "APP/SET-INITIALIZED", isInitialized }) as const;

// thunks
export const initializeAppTC = () => (dispatch: Dispatch<GlobalActionsType>) => {
  authAPI
    .me()
    .then((res) => {
      if (res.data.resultCode === 0) {
        dispatch(setIsLoggedInAC(true));
      } else {
        handleServerAppError(res.data, dispatch);
      }
    })
    .catch((error) => {
      handleServerNetworkError(error, dispatch);
    })
    .finally(() => {
      dispatch(setIsInitializedAC(true));
    });
};

// types
export type RequestStatusType = "idle" | "loading" | "succeeded" | "failed";
export type RequestErrorType = string | null;
export type InitialStateType = typeof initialState;
export type AppActionsType =
  | ReturnType<typeof setAppStatusAC>
  | ReturnType<typeof setAppErrorAC>
  | ReturnType<typeof setIsInitializedAC>;
