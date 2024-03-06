import { ResponseType } from "api/todolists-api";
import { setAppError, setAppStatus } from "app/app-reducer";
import { AppDispatch } from "app/store";

export const handleServerAppError = <T>(data: ResponseType<T>, dispatch: AppDispatch) => {
  if (data.messages.length) {
    dispatch(setAppError({ error: data.messages[0] }));
  } else {
    dispatch(setAppError({ error: "Some error occurred" }));
  }
  dispatch(setAppStatus({ status: "failed" }));
};

export const handleServerNetworkError = (error: { message: string }, dispatch: AppDispatch) => {
  dispatch(setAppError({ error: error.message ? error.message : "Catch: Some error occurred" }));
  dispatch(setAppStatus({ status: "failed" }));
};
