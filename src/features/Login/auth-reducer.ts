import { authAPI, LoginParamsType } from "api/todolists-api";
import { handleServerAppError, handleServerNetworkError } from "utils/error-utils";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { setAppStatus } from "app/app-reducer";
import { createAppAsyncThunk } from "utils/create-app-async-thunk";
import { clearTasksAndTodolists } from "common/actions/common.actions";

export const loginTC = createAppAsyncThunk("auth/login", async (param: LoginParamsType, thunkAPI) => {
  const { dispatch, rejectWithValue } = thunkAPI;
  dispatch(setAppStatus({ status: "loading" }));

  try {
    const res = await authAPI.login(param);
    if (res.data.resultCode === 0) {
      dispatch(setAppStatus({ status: "succeeded" }));
    } else {
      handleServerAppError(res.data, dispatch);
      return rejectWithValue(null);
    }
  } catch (error) {
    handleServerNetworkError(error, dispatch);
    return rejectWithValue(null);
  }
});

export const logoutTC = createAppAsyncThunk("auth/logout", async (param, thunkAPI) => {
  const { dispatch, rejectWithValue } = thunkAPI;
  dispatch(setAppStatus({ status: "loading" }));

  try {
    const res = await authAPI.logout();
    if (res.data.resultCode === 0) {
      dispatch(clearTasksAndTodolists());
      dispatch(setAppStatus({ status: "succeeded" }));
    } else {
      handleServerAppError(res.data, dispatch);
      return rejectWithValue(null);
    }
  } catch (error) {
    handleServerNetworkError(error, dispatch);
    return rejectWithValue(null);
  }
});

const slice = createSlice({
  name: "auth",
  initialState: {
    isLoggedIn: false,
  },
  reducers: {
    setIsLoggedIn(state, action: PayloadAction<{ isLoggedIn: boolean }>) {
      state.isLoggedIn = action.payload.isLoggedIn;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(loginTC.fulfilled, (state) => {
      state.isLoggedIn = true;
    });
    builder.addCase(logoutTC.fulfilled, (state) => {
      state.isLoggedIn = false;
    });
  },
});

export const authReducer = slice.reducer;
export const { setIsLoggedIn } = slice.actions;
