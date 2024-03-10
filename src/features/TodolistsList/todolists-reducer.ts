import { RequestStatusType, setAppStatus } from "app/app-reducer";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { handleServerAppError, handleServerNetworkError } from "../../utils/error-utils";
import { todolistsAPI, TodolistType } from "../../api/todolists-api";
import { createAppAsyncThunk } from "../../utils/create-app-async-thunk";

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
      if (res.data.resultCode === 0) {
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
    if (res.data.resultCode === 0) {
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
      if (res.data.resultCode === 0) {
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
    clearTodosData: () => {
      return [];
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchTodolistsTC.fulfilled, (state, action) => {
      return action.payload.todolists.map((tl) => ({ ...tl, filter: "all", entityStatus: "idle" }));
    });
    builder.addCase(removeTodolistTC.fulfilled, (state, action) => {
      const index = state.findIndex((tl) => tl.id === action.payload.id);
      if (index > -1) {
        state.splice(index, 1);
      }
    });
    builder.addCase(addTodolistTC.fulfilled, (state, action) => {
      state.unshift({ ...action.payload.todolist, filter: "all", entityStatus: "idle" });
    });
    builder.addCase(changeTodolistTitleTC.fulfilled, (state, action) => {
      const index = state.findIndex((tl) => tl.id === action.payload.id);
      state[index].title = action.payload.title;
    });
  },
});

export const todolistsReducer = slice.reducer;
export const todolistsActions = slice.actions;
export const { changeTodolistFilter, changeTodolistEntityStatus, clearTodosData } = todolistsActions;

export type FilterValuesType = "active" | "all" | "completed";
export type TodolistDomainType = TodolistType & { filter: FilterValuesType; entityStatus: RequestStatusType };
