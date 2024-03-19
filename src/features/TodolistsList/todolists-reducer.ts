import { RequestStatusType, setAppStatus } from "app/app-reducer";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { todolistsAPI, TodolistType } from "features/TodolistsList/todolists-api";
import { createAppAsyncThunk } from "common/utils/create-app-async-thunk";
import { clearTasksAndTodolists } from "common/actions/common.actions";
import { handleServerNetworkError } from "common/utils/handle-server-network-error";
import { handleServerAppError } from "common/utils/handle-server-app-error";
import { ResultCode } from "common/enums";

export const fetchTodolistsTC = createAppAsyncThunk("todolists/fetchTodolists", async (param, thunkAPI) => {
  const { dispatch, rejectWithValue } = thunkAPI;
  try {
    dispatch(setAppStatus({ status: "loading" }));
    const res = await todolistsAPI.getTodolists();
    dispatch(setAppStatus({ status: "succeeded" }));
    return { todolists: res.data };
  } catch (error) {
    handleServerNetworkError(error, dispatch);
    return rejectWithValue(null);
  }
});
export const removeTodolistTC = createAppAsyncThunk(
  "todolists/removeTodolist",
  async (todolistId: string, thunkAPI) => {
    const { dispatch, rejectWithValue } = thunkAPI;

    try {
      dispatch(setAppStatus({ status: "loading" }));
      dispatch(changeTodolistEntityStatus({ id: todolistId, status: "loading" }));
      const res = await todolistsAPI.deleteTodolist(todolistId);
      if (res.data.resultCode === ResultCode.Success) {
        dispatch(setAppStatus({ status: "succeeded" }));
        return { id: todolistId };
      } else {
        handleServerAppError(res.data, dispatch);
        return rejectWithValue(null);
      }
    } catch (error) {
      handleServerNetworkError(error, dispatch);
      return rejectWithValue(null);
    }
  },
);
export const addTodolistTC = createAppAsyncThunk("todolists/addTodolist", async (title: string, thunkAPI) => {
  const { dispatch, rejectWithValue } = thunkAPI;

  try {
    dispatch(setAppStatus({ status: "loading" }));
    const res = await todolistsAPI.createTodolist(title);
    if (res.data.resultCode === ResultCode.Success) {
      dispatch(setAppStatus({ status: "succeeded" }));
      return { todolist: res.data.data.item };
    } else {
      handleServerAppError(res.data, dispatch);
      return rejectWithValue(null);
    }
  } catch (error) {
    handleServerNetworkError(error, dispatch);
    return rejectWithValue(null);
  }
});

export const changeTodolistTitleTC = createAppAsyncThunk(
  "todolists/changeTodolistTitle",
  async (param: { todolistId: string; title: string }, thunkAPI) => {
    const { dispatch, rejectWithValue } = thunkAPI;
    const { todolistId, title } = param;

    try {
      dispatch(setAppStatus({ status: "loading" }));
      dispatch(changeTodolistEntityStatus({ id: todolistId, status: "loading" }));
      const res = await todolistsAPI.updateTodolist(todolistId, title);
      if (res.data.resultCode === ResultCode.Success) {
        dispatch(setAppStatus({ status: "succeeded" }));
        dispatch(changeTodolistEntityStatus({ id: todolistId, status: "succeeded" }));
        return { id: todolistId, title };
      } else {
        handleServerAppError(res.data, dispatch);
        dispatch(changeTodolistEntityStatus({ id: todolistId, status: "failed" }));
        return rejectWithValue(null);
      }
    } catch (error) {
      handleServerNetworkError(error, dispatch);
      return rejectWithValue(null);
    }
  },
);

const slice = createSlice({
  name: "todolists",
  initialState: [] as Array<TodolistDomainType>,
  reducers: {
    changeTodolistFilter: (state, action: PayloadAction<{ id: string; filter: FilterValuesType }>) => {
      const index = state.findIndex((tl) => tl.id === action.payload.id);
      state[index].filter = action.payload.filter;
    },
    changeTodolistEntityStatus: (state, action: PayloadAction<{ id: string; status: RequestStatusType }>) => {
      const index = state.findIndex((tl) => tl.id === action.payload.id);
      state[index].entityStatus = action.payload.status;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchTodolistsTC.fulfilled, (state, action) => {
        return action.payload.todolists.map((tl) => ({ ...tl, filter: "all", entityStatus: "idle" }));
      })
      .addCase(removeTodolistTC.fulfilled, (state, action) => {
        const index = state.findIndex((tl) => tl.id === action.payload.id);
        if (index > -1) {
          state.splice(index, 1);
        }
      })
      .addCase(addTodolistTC.fulfilled, (state, action) => {
        state.unshift({ ...action.payload.todolist, filter: "all", entityStatus: "idle" });
      })
      .addCase(changeTodolistTitleTC.fulfilled, (state, action) => {
        const index = state.findIndex((tl) => tl.id === action.payload.id);
        state[index].title = action.payload.title;
      })
      .addCase(clearTasksAndTodolists, () => {
        return [];
      });
  },
});

export const todolistsReducer = slice.reducer;
export const todolistsActions = slice.actions;
export const { changeTodolistFilter, changeTodolistEntityStatus } = todolistsActions;

export type FilterValuesType = "active" | "all" | "completed";
export type TodolistDomainType = TodolistType & { filter: FilterValuesType; entityStatus: RequestStatusType };
