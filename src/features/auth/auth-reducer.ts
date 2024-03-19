import { createSlice } from "@reduxjs/toolkit";
import { setAppInitialized, setAppStatus } from "app/app-reducer";
import { createAppAsyncThunk } from "common/utils/create-app-async-thunk";
import { clearTasksAndTodolists } from "common/actions/common.actions";
import { handleServerAppError } from "common/utils/handle-server-app-error";
import { handleServerNetworkError } from "common/utils/handle-server-network-error";
import { authAPI, LoginParamsType } from "features/auth/auth-api";
import { ResultCode } from "common/enums";
import { thunkTryCatch } from "common/utils/thunkTryCatch";

const slice = createSlice({
  name: "auth",
  initialState: {
    isLoggedIn: false,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(loginTC.fulfilled, (state) => {
        state.isLoggedIn = true;
      })
      .addCase(logoutTC.fulfilled, (state) => {
        state.isLoggedIn = false;
      })
      .addCase(initializeAppTC.fulfilled, (state, action) => {
        state.isLoggedIn = action.payload.isLoggedIn;
      });
  },
});

export const loginTC = createAppAsyncThunk<{ isLoggedIn: boolean }, LoginParamsType>(
  "auth/login",
  async (param, thunkAPI) => {
    const { dispatch, rejectWithValue } = thunkAPI;
    try {
      dispatch(setAppStatus({ status: "loading" }));
      const res = await authAPI.login(param);
      if (res.data.resultCode === ResultCode.Success) {
        dispatch(setAppStatus({ status: "succeeded" }));
        return { isLoggedIn: true };
      } else {
        handleServerAppError(res.data, dispatch);
        return rejectWithValue(res.data);
      }
    } catch (error) {
      handleServerNetworkError(error, dispatch);
      return rejectWithValue(null);
    }
  },
);

export const logoutTC = createAppAsyncThunk<{ isLoggedIn: boolean }, undefined>("auth/logout", async (_, thunkAPI) => {
  const { dispatch, rejectWithValue } = thunkAPI;

  try {
    dispatch(setAppStatus({ status: "loading" }));
    const res = await authAPI.logout();
    if (res.data.resultCode === ResultCode.Success) {
      dispatch(clearTasksAndTodolists());
      dispatch(setAppStatus({ status: "succeeded" }));
      return { isLoggedIn: false };
    } else {
      handleServerAppError(res.data, dispatch);
      return rejectWithValue(null);
    }
  } catch (error) {
    handleServerNetworkError(error, dispatch);
    return rejectWithValue(null);
  }
});

const initializeAppTC = createAppAsyncThunk<{ isLoggedIn: boolean }, undefined>(
  "auth/initializeApp",
  async (_, thunkAPI) => {
    const { dispatch, rejectWithValue } = thunkAPI;
    return thunkTryCatch(thunkAPI, async () => {
      const res = await authAPI.me();
      if (res.data.resultCode === ResultCode.Success) {
        return { isLoggedIn: true };
      } else {
        handleServerAppError(res.data, dispatch, false);
        return rejectWithValue(null);
      }
    }).finally(() => {
      dispatch(setAppInitialized({ isInitialized: true }));
    });
  },
);

export const authReducer = slice.reducer;
export const authThunks = { loginTC, logoutTC, initializeAppTC };
