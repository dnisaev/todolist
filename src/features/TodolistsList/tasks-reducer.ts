import { TaskPriorities, TaskStatuses, TaskType, todolistsAPI, UpdateTaskModelType } from "api/todolists-api";
import { addTodolistTC, clearTodosData, fetchTodolistsTC, removeTodolistTC } from "./todolists-reducer";
import { RequestStatusType, setAppError, setAppStatus } from "app/app-reducer";
import { handleServerAppError, handleServerNetworkError } from "utils/error-utils";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { createAppAsyncThunk } from "../../utils/create-app-async-thunk";

const initialState: TasksStateType = {};

export const fetchTasksTC = createAppAsyncThunk<{ tasks: TaskType[]; todolistId: string }, string>(
  "tasks/fetchTasks",
  async (todolistId: string, thunkAPI) => {
    const { dispatch, rejectWithValue } = thunkAPI;

    try {
      dispatch(setAppStatus({ status: "loading" }));
      const res = await todolistsAPI.getTasks(todolistId);
      const tasks = res.data.items;
      dispatch(setAppStatus({ status: "succeeded" }));
      return { tasks, todolistId };
    } catch (error) {
      handleServerNetworkError(error, dispatch);
      return rejectWithValue(null);
    }
  },
);
export const removeTaskTC = createAppAsyncThunk(
  "tasks/removeTask",
  async (
    param: {
      taskId: string;
      todolistId: string;
    },
    thunkAPI,
  ) => {
    const { dispatch, rejectWithValue } = thunkAPI;
    const { taskId, todolistId } = param;

    try {
      dispatch(setAppStatus({ status: "loading" }));
      dispatch(changeTaskEntityStatus({ taskId, todolistId, status: "loading" }));
      const res = await todolistsAPI.deleteTask(todolistId, taskId);

      if (res.data.resultCode === 0) {
        dispatch(setAppStatus({ status: "succeeded" }));
        return { taskId, todolistId };
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
export const addTaskTC = createAppAsyncThunk(
  "tasks/addTask",
  async (
    param: {
      todoListId: string;
      title: string;
    },
    thunkAPI,
  ) => {
    const { dispatch, rejectWithValue } = thunkAPI;
    const { todoListId, title } = param;

    try {
      dispatch(setAppStatus({ status: "loading" }));
      const res = await todolistsAPI.createTask(todoListId, title);

      if (res.data.resultCode === 0) {
        dispatch(setAppStatus({ status: "succeeded" }));
        return res.data.data.item;
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
export const updateTaskTC = createAppAsyncThunk(
  "tasks/updateTask",
  async (
    param: {
      taskId: string;
      domainModel: UpdateDomainTaskModelType;
      todolistId: string;
    },
    thunkAPI,
  ) => {
    const { dispatch, rejectWithValue, getState } = thunkAPI;
    const { taskId, domainModel, todolistId } = param;

    try {
      dispatch(setAppStatus({ status: "loading" }));
      dispatch(changeTaskEntityStatus({ taskId, todolistId, status: "loading" }));

      const state = getState();
      const task = state.tasks[todolistId].find((t) => t.id === taskId);

      if (!task) {
        dispatch(setAppError({ error: "Task not found" }));
        dispatch(changeTaskEntityStatus({ taskId, todolistId, status: "failed" }));
        return rejectWithValue(null);
      }

      const apiModel: UpdateTaskModelType = {
        deadline: task.deadline,
        description: task.description,
        priority: task.priority,
        startDate: task.startDate,
        title: task.title,
        status: task.status,
        ...domainModel,
      };

      const res = await todolistsAPI.updateTask(todolistId, taskId, apiModel);
      if (res.data.resultCode === 0) {
        dispatch(setAppStatus({ status: "succeeded" }));
        dispatch(changeTaskEntityStatus({ taskId, todolistId, status: "succeeded" }));
        return { taskId, domainModel, todolistId };
      } else {
        handleServerAppError(res.data, dispatch);
        dispatch(changeTaskEntityStatus({ taskId, todolistId, status: "failed" }));
        return rejectWithValue(null);
      }
    } catch (error) {
      handleServerNetworkError(error, dispatch);
      return rejectWithValue(null);
    }
  },
);

const slice = createSlice({
  name: "tasks",
  initialState,
  reducers: {
    changeTaskEntityStatus: (
      state,
      action: PayloadAction<{ taskId: string; todolistId: string; status: RequestStatusType }>,
    ) => {
      const tasks = state[action.payload.todolistId];
      const index = tasks.findIndex((t) => t.id === action.payload.taskId);
      if (index > -1) {
        tasks[index].entityStatus = action.payload.status;
      }
    },
  },
  extraReducers: (builder) => {
    builder.addCase(addTodolistTC.fulfilled, (state, action) => {
      state[action.payload.todolist.id] = [];
    });
    builder.addCase(removeTodolistTC.fulfilled, (state, action) => {
      delete state[action.payload.id];
    });
    builder.addCase(fetchTodolistsTC.fulfilled, (state, action) => {
      action.payload.todolists.forEach((tl) => {
        state[tl.id] = [];
      });
    });
    builder.addCase(clearTodosData, () => {
      return {};
    });
    builder.addCase(fetchTasksTC.fulfilled, (state, action) => {
      state[action.payload.todolistId] = action.payload.tasks;
    });
    builder.addCase(removeTaskTC.fulfilled, (state, action) => {
      const tasks = state[action.payload.todolistId];
      const index = tasks.findIndex((t) => t.id === action.payload.taskId);
      if (index > -1) {
        tasks.splice(index, 1);
      }
    });
    builder.addCase(addTaskTC.fulfilled, (state, action) => {
      state[action.payload.todoListId].unshift(action.payload);
    });
    builder.addCase(updateTaskTC.fulfilled, (state, action) => {
      const tasks = state[action.payload.todolistId];
      const index = tasks.findIndex((t) => t.id === action.payload.taskId);
      if (index > -1) {
        tasks[index] = { ...tasks[index], ...action.payload.domainModel };
      }
    });
  },
});

export const tasksReducer = slice.reducer;

// actions
export const tasksActions = slice.actions;
export const { changeTaskEntityStatus } = tasksActions;

// types
export type UpdateDomainTaskModelType = {
  title?: string;
  description?: string;
  status?: TaskStatuses;
  priority?: TaskPriorities;
  startDate?: string;
  deadline?: string;
};
export type TasksStateType = {
  [key: string]: Array<TaskType>;
};
