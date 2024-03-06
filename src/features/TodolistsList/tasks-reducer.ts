import { TaskPriorities, TaskStatuses, TaskType, todolistsAPI, UpdateTaskModelType } from "api/todolists-api";
import { AppRootStateType, AppDispatch } from "app/store";
import {
  addTodolist,
  AddTodolistActionType,
  ClearDataActionType,
  clearTodosData,
  removeTodolist,
  RemoveTodolistActionType,
  SetTodolistActionType,
  setTodolists,
} from "./todolists-reducer";
import { RequestStatusType, setAppStatus } from "app/app-reducer";
import { handleServerAppError, handleServerNetworkError } from "utils/error-utils";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState: TasksStateType = {};

const slice = createSlice({
  name: "tasks",
  initialState,
  reducers: {
    removeTask: (state, action: PayloadAction<{ taskId: string; todolistId: string }>) => {
      const tasks = state[action.payload.todolistId];
      const index = tasks.findIndex((t) => t.id === action.payload.taskId);
      if (index > -1) {
        tasks.splice(index, 1);
      }
    },
    addTask: (state, action: PayloadAction<{ task: TaskType }>) => {
      state[action.payload.task.todoListId].unshift(action.payload.task);
    },
    changeTask: (
      state,
      action: PayloadAction<{ taskId: string; model: UpdateDomainTaskModelType; todolistId: string }>,
    ) => {
      const tasks = state[action.payload.todolistId];
      const index = tasks.findIndex((t) => t.id === action.payload.taskId);
      if (index > -1) {
        tasks[index] = { ...tasks[index], ...action.payload.model };
      }
    },
    setTasks: (state, action: PayloadAction<{ tasks: Array<TaskType>; todolistId: string }>) => {
      state[action.payload.todolistId] = action.payload.tasks;
    },
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
    builder.addCase(addTodolist, (state, action) => {
      state[action.payload.todolist.id] = [];
    });
    builder.addCase(removeTodolist, (state, action) => {
      delete state[action.payload.id];
    });
    builder.addCase(setTodolists, (state, action) => {
      action.payload.todolists.forEach((tl) => {
        state[tl.id] = [];
      });
    });
    builder.addCase(clearTodosData, () => {
      return {};
    });
  },
});

export const tasksReducer = slice.reducer;

// actions
export const tasksActions = slice.actions;
export const { removeTask, addTask, changeTask, setTasks, changeTaskEntityStatus } = tasksActions;

// thunks
export const fetchTasksTC = (todolistId: string) => (dispatch: AppDispatch) => {
  dispatch(setAppStatus({ status: "loading" }));
  todolistsAPI
    .getTasks(todolistId)
    .then((res) => {
      dispatch(setTasks({ tasks: res.data.items, todolistId }));
      dispatch(setAppStatus({ status: "succeeded" }));
    })
    .catch((error) => {
      handleServerNetworkError(error, dispatch);
    });
};
export const removeTaskTC = (taskId: string, todolistId: string) => (dispatch: AppDispatch) => {
  dispatch(setAppStatus({ status: "loading" }));
  dispatch(changeTaskEntityStatus({ taskId, todolistId, status: "loading" }));
  todolistsAPI
    .deleteTask(todolistId, taskId)
    .then((res) => {
      if (res.data.resultCode === 0) {
        dispatch(removeTask({ taskId, todolistId }));
        dispatch(setAppStatus({ status: "succeeded" }));
      } else {
        handleServerAppError(res.data, dispatch);
      }
    })
    .catch((error) => {
      handleServerNetworkError(error, dispatch);
    });
};
export const addTaskTC = (todolistId: string, title: string) => (dispatch: AppDispatch) => {
  dispatch(setAppStatus({ status: "loading" }));
  todolistsAPI
    .createTask(todolistId, title)
    .then((res) => {
      if (res.data.resultCode === 0) {
        dispatch(addTask({ task: res.data.data.item }));
        dispatch(setAppStatus({ status: "succeeded" }));
      } else {
        handleServerAppError(res.data, dispatch);
      }
    })
    .catch((error) => {
      handleServerNetworkError(error, dispatch);
    });
};
export const updateTaskTC =
  (taskId: string, domainModel: UpdateDomainTaskModelType, todolistId: string) =>
  (dispatch: AppDispatch, getState: () => AppRootStateType) => {
    const state = getState().tasks;
    const task = state[todolistId].find((t: TaskType) => t.id === taskId);

    if (task) {
      const apiModel: UpdateTaskModelType = {
        title: task.title,
        startDate: task.startDate,
        priority: task.priority,
        description: task.description,
        deadline: task.deadline,
        status: task.status,
        ...domainModel,
      };
      dispatch(setAppStatus({ status: "loading" }));
      dispatch(changeTaskEntityStatus({ taskId, todolistId, status: "loading" }));
      todolistsAPI
        .updateTask(todolistId, taskId, apiModel)
        .then((res) => {
          if (res.data.resultCode === 0) {
            dispatch(changeTask({ taskId, model: domainModel, todolistId }));
            dispatch(setAppStatus({ status: "succeeded" }));
            dispatch(changeTaskEntityStatus({ taskId, todolistId, status: "succeeded" }));
          } else {
            handleServerAppError(res.data, dispatch);
            dispatch(changeTaskEntityStatus({ taskId, todolistId, status: "failed" }));
          }
        })
        .catch((error) => {
          handleServerNetworkError(error, dispatch);
        });
    }
  };

// types
export type UpdateDomainTaskModelType = {
  title?: string;
  description?: string;
  status?: TaskStatuses;
  priority?: TaskPriorities;
  startDate?: string;
  deadline?: string;
};
export type TasksActionsType =
  | ReturnType<typeof removeTask>
  | ReturnType<typeof addTask>
  | ReturnType<typeof changeTask>
  | ReturnType<typeof setTasks>
  | ReturnType<typeof changeTaskEntityStatus>
  | AddTodolistActionType
  | RemoveTodolistActionType
  | SetTodolistActionType
  | ClearDataActionType;
export type TasksStateType = {
  [key: string]: Array<TaskType>;
};
