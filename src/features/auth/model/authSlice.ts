import { createSlice, isFulfilled, PayloadAction } from "@reduxjs/toolkit";
import { createAppAsyncThunk } from "common/utils";
import { authApi, LoginParamsType } from "features/auth/api/authApi";
import { ResultCode } from "common/enums";
import { clearTasksAndTodolists } from "common/actions";
import { setAppInitialized } from "app/model/appSlice";

const slice = createSlice({
  name: "auth",
  initialState: {
    isLoggedIn: false,
  },
  reducers: {},
  selectors: {
    selectIsLoggedIn: (sliceState) => sliceState,
  },
  extraReducers: (builder) => {
    builder.addMatcher(
      isFulfilled(authThunks.loginTC, authThunks.logoutTC, authThunks.initializeAppTC),
      (state, action: PayloadAction<{ isLoggedIn: boolean }>) => {
        state.isLoggedIn = action.payload.isLoggedIn;
      },
    );
  },
});

const loginTC = createAppAsyncThunk<{ isLoggedIn: boolean }, LoginParamsType>("auth/login", async (param, thunkAPI) => {
  const { rejectWithValue } = thunkAPI;

  const res = await authApi.login(param);
  if (res.data.resultCode === ResultCode.Success) {
    return { isLoggedIn: true };
  } else {
    return rejectWithValue(res.data);
  }
});

const logoutTC = createAppAsyncThunk<{ isLoggedIn: boolean }, undefined>("auth/logout", async (_, thunkAPI) => {
  const { dispatch, rejectWithValue } = thunkAPI;

  const res = await authApi.logout();
  if (res.data.resultCode === ResultCode.Success) {
    dispatch(clearTasksAndTodolists());
    return { isLoggedIn: false };
  } else {
    return rejectWithValue(res.data);
  }
});

const initializeAppTC = createAppAsyncThunk<{ isLoggedIn: boolean }, undefined>(
  "auth/initializeApp",
  async (_, thunkAPI) => {
    const { dispatch, rejectWithValue } = thunkAPI;
    const res = await authApi.me();
    dispatch(setAppInitialized({ isInitialized: true }));
    if (res.data.resultCode === ResultCode.Success) {
      return { isLoggedIn: true };
    } else {
      return rejectWithValue(res.data);
    }
  },
);

export const authSlice = slice.reducer;
export const authThunks = { loginTC, logoutTC, initializeAppTC };
export const { selectIsLoggedIn } = slice.selectors;
