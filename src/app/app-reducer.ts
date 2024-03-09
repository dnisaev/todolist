import {authAPI} from "api/todolists-api";
import {handleServerAppError, handleServerNetworkError} from "utils/error-utils";
import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {setIsLoggedIn} from "../features/Login/auth-reducer";
import {createAppAsyncThunk} from "../utils/create-app-async-thunk";

export const initializeAppTC = createAppAsyncThunk('app/initializeApp', async (param, thunkAPI) => {

    const {dispatch, rejectWithValue} = thunkAPI;

    try {
        const res = await authAPI.me();
        if (res.data.resultCode === 0) {
            dispatch(setIsLoggedIn({isLoggedIn: true}));
        } else {
            handleServerAppError(res.data, dispatch);
            return rejectWithValue(null)
        }
    } catch (error) {
        handleServerNetworkError(error, dispatch);
        return rejectWithValue(null)
    }
});

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
        }
    },
    extraReducers: builder => {
        builder.addCase(initializeAppTC.fulfilled, (state)=>{
            state.isInitialized = true;
        })
    }
});

export const appReducer = slice.reducer;

// actions
export const appActions = slice.actions;
export const {setAppStatus, setAppError} = appActions;

// types
export type RequestStatusType = "idle" | "loading" | "succeeded" | "failed";
export type RequestErrorType = string | null;