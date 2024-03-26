import { RequestStatusType } from "app/appSlice";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { todolistsApi } from "features/TodolistsList/api/todolistsApi";
import { createAppAsyncThunk } from "common/utils/create-app-async-thunk";
import { clearTasksAndTodolists } from "common/actions/common.actions";
import { handleServerAppError } from "common/utils/handle-server-app-error";
import { ResultCode } from "common/enums";
import { TodolistType } from "features/TodolistsList/api/todolistsApi.types";

export const fetchTodolistsTC = createAppAsyncThunk("todolists/fetchTodolists", async () => {
  const res = await todolistsApi.getTodolists();
  return { todolists: res.data };
});
export const removeTodolistTC = createAppAsyncThunk(
  "todolists/removeTodolist",
  async (todoListId: string, thunkAPI) => {
    const { dispatch, rejectWithValue } = thunkAPI;

    dispatch(changeTodolistEntityStatus({ id: todoListId, status: "loading" }));
    const res = await todolistsApi.deleteTodolist(todoListId);
    dispatch(changeTodolistEntityStatus({ id: todoListId, status: "idle" }));
    if (res.data.resultCode === ResultCode.Success) {
      return { id: todoListId };
    } else {
      handleServerAppError(res.data, dispatch);
      return rejectWithValue(null);
    }
  },
);
export const addTodolistTC = createAppAsyncThunk("todolists/addTodolist", async (title: string, thunkAPI) => {
  const { dispatch, rejectWithValue } = thunkAPI;
  const res = await todolistsApi.createTodolist(title);
  if (res.data.resultCode === ResultCode.Success) {
    return { todolist: res.data.data.item };
  } else {
    handleServerAppError(res.data, dispatch, false);
    return rejectWithValue(res.data);
  }
});

export const changeTodolistTitleTC = createAppAsyncThunk(
  "todolists/changeTodolistTitle",
  async (param: { todoListId: string; title: string }, thunkAPI) => {
    const { dispatch, rejectWithValue } = thunkAPI;
    const { todoListId, title } = param;

    dispatch(changeTodolistEntityStatus({ id: todoListId, status: "loading" }));
    const res = await todolistsApi.updateTodolist(todoListId, title);
    if (res.data.resultCode === ResultCode.Success) {
      dispatch(changeTodolistEntityStatus({ id: todoListId, status: "succeeded" }));
      return { id: todoListId, title };
    } else {
      handleServerAppError(res.data, dispatch);
      dispatch(changeTodolistEntityStatus({ id: todoListId, status: "failed" }));
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
  selectors: {
    selectTodolists: (sliceState) => sliceState,
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

export const todolistsSlice = slice.reducer;
export const todolistsActions = slice.actions;
export const todolistsThunks = { fetchTodolistsTC, addTodolistTC, removeTodolistTC, changeTodolistTitleTC };
export const { selectTodolists } = slice.selectors;
export const { changeTodolistFilter, changeTodolistEntityStatus } = todolistsActions;

// types
export type FilterValuesType = "active" | "all" | "completed";
export type TodolistDomainType = TodolistType & { filter: FilterValuesType; entityStatus: RequestStatusType };
