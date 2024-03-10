import { ResponseType } from "api/todolists-api";
import {appActions, setAppError, setAppStatus} from "app/app-reducer";
import {Dispatch} from "redux";
import {AppDispatch} from "../app/store";
import axios from "axios";

export const handleServerAppError = <T>(data: ResponseType<T>, dispatch: Dispatch) => {
  if (data.messages.length) {
    dispatch(setAppError({ error: data.messages[0] }));
  } else {
    dispatch(setAppError({ error: "Some error occurred" }));
  }
  dispatch(setAppStatus({ status: "failed" }));
};

export const handleServerNetworkError = (err: unknown, dispatch: AppDispatch):void => {
  let errorMessage = "Some error occurred";

  if (axios.isAxiosError(err)) {
    errorMessage = err.response?.data?.message || err?.message || errorMessage;
  } else if (err instanceof Error) {
    errorMessage = `Native error: ${err.message}`;
  } else {
    errorMessage = JSON.stringify(err);
  }

  dispatch(appActions.setAppError({ error: errorMessage }));
  dispatch(appActions.setAppStatus({ status: "failed" }));
};
