import { addTodolistTC, fetchTodolistsTC, removeTodolistTC } from "features/TodolistsList/model/todolistsSlice";
import { RequestStatusType, setAppError } from "app/appSlice";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { createAppAsyncThunk } from "common/utils/create-app-async-thunk";
import { clearTasksAndTodolists } from "common/actions/common.actions";
import { handleServerAppError } from "common/utils/handle-server-app-error";
import { ResultCode, TaskPriorities, TaskStatuses } from "common/enums";
import { TaskType, UpdateTaskModelType } from "features/TodolistsList/api/tasksApi.types";
import { tasksApi } from "features/TodolistsList/api/tasksApi";

const initialState: TasksStateType = {};

export const fetchTasksTC = createAppAsyncThunk<{ tasks: TaskType[]; todoListId: string }, string>(
  "tasks/fetchTasks",
  async (todoListId: string) => {
    const res = await tasksApi.getTasks(todoListId);
    const tasks = res.data.items;

    return { tasks, todoListId };
  },
);
export const removeTaskTC = createAppAsyncThunk(
  "tasks/removeTask",
  async (
    param: {
      taskId: string;
      todoListId: string;
    },
    thunkAPI,
  ) => {
    const { dispatch, rejectWithValue } = thunkAPI;
    const { taskId, todoListId } = param;

    dispatch(changeTaskEntityStatus({ taskId, todoListId, status: "loading" }));
    const res = await tasksApi.deleteTask(todoListId, taskId).finally(() => {
      dispatch(changeTaskEntityStatus({ taskId, todoListId, status: "idle" }));
    });

    if (res.data.resultCode === ResultCode.Success) {
      return { taskId, todoListId };
    } else {
      dispatch(changeTaskEntityStatus({ taskId, todoListId, status: "failed" }));
      handleServerAppError(res.data, dispatch);
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

    const res = await tasksApi.createTask(todoListId, title);
    if (res.data.resultCode === ResultCode.Success) {
      return res.data.data.item;
    } else {
      handleServerAppError(res.data, dispatch, false);
      return rejectWithValue(res.data);
    }
  },
);
export const updateTaskTC = createAppAsyncThunk(
  "tasks/updateTask",
  async (
    param: {
      taskId: string;
      domainModel: UpdateDomainTaskModelType;
      todoListId: string;
    },
    thunkAPI,
  ) => {
    const { dispatch, rejectWithValue, getState } = thunkAPI;
    const { taskId, domainModel, todoListId } = param;

    dispatch(changeTaskEntityStatus({ taskId, todoListId, status: "loading" }));

    const state = getState();
    const task = state.tasks[todoListId].find((t) => t.id === taskId);

    if (!task) {
      dispatch(setAppError({ error: "Task not found" }));
      dispatch(changeTaskEntityStatus({ taskId, todoListId, status: "failed" }));
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

    const res = await tasksApi.updateTask(todoListId, taskId, apiModel).finally(() => {
      dispatch(changeTaskEntityStatus({ taskId, todoListId, status: "idle" }));
    });
    if (res.data.resultCode === ResultCode.Success) {
      dispatch(changeTaskEntityStatus({ taskId, todoListId, status: "succeeded" }));
      return { taskId, domainModel, todoListId };
    } else {
      dispatch(changeTaskEntityStatus({ taskId, todoListId, status: "failed" }));
      handleServerAppError(res.data, dispatch);
      return rejectWithValue(res.data);
    }
  },
);

const slice = createSlice({
  name: "tasks",
  initialState,
  reducers: {
    changeTaskEntityStatus: (
      state,
      action: PayloadAction<{ taskId: string; todoListId: string; status: RequestStatusType }>,
    ) => {
      const tasks = state[action.payload.todoListId];
      const index = tasks.findIndex((t) => t.id === action.payload.taskId);
      if (index > -1) {
        tasks[index].entityStatus = action.payload.status;
      }
    },
  },
  selectors: {
    selectTasks: (sliceState) => sliceState,
  },
  extraReducers: (builder) => {
    builder
      .addCase(addTodolistTC.fulfilled, (state, action) => {
        state[action.payload.todolist.id] = [];
      })
      .addCase(removeTodolistTC.fulfilled, (state, action) => {
        delete state[action.payload.id];
      })
      .addCase(fetchTodolistsTC.fulfilled, (state, action) => {
        action.payload.todolists.forEach((tl) => {
          state[tl.id] = [];
        });
      })
      .addCase(clearTasksAndTodolists, () => {
        return {};
      })
      .addCase(fetchTasksTC.fulfilled, (state, action) => {
        state[action.payload.todoListId] = action.payload.tasks;
      })
      .addCase(removeTaskTC.fulfilled, (state, action) => {
        const tasks = state[action.payload.todoListId];
        const index = tasks.findIndex((t) => t.id === action.payload.taskId);
        if (index > -1) {
          tasks.splice(index, 1);
        }
      })
      .addCase(addTaskTC.fulfilled, (state, action) => {
        state[action.payload.todoListId].unshift(action.payload);
      })
      .addCase(updateTaskTC.fulfilled, (state, action) => {
        const tasks = state[action.payload.todoListId];
        const index = tasks.findIndex((t) => t.id === action.payload.taskId);
        if (index > -1) {
          tasks[index] = { ...tasks[index], ...action.payload.domainModel };
        }
      });
  },
});

export const tasksSlice = slice.reducer;
export const tasksActions = slice.actions;
export const tasksThunks = { fetchTasksTC, addTaskTC, updateTaskTC, removeTaskTC };
export const { selectTasks } = slice.selectors;
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
