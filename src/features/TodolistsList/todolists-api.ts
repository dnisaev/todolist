import { RequestStatusType } from "app/app-reducer";
import { instance } from "common/api/common.api";

// api
export const todolistsAPI = {
  getTodolists() {
    return instance.get<TodolistType[]>(`todo-lists`);
  },
  createTodolist(title: string) {
    return instance.post<ResponseType<{ item: TodolistType }>>(`todo-lists`, { title: title });
  },
  deleteTodolist(todolistId: string) {
    return instance.delete<ResponseType>(`/todo-lists/${todolistId}`);
  },
  updateTodolist(todolistId: string, title: string) {
    return instance.put<ResponseType>(`/todo-lists/${todolistId}`, { title: title });
  },
  getTasks(todolistId: string) {
    return instance.get<GetTasksResponse>(`/todo-lists/${todolistId}/tasks`);
  },
  createTask(todolistId: string, taskTitle: string) {
    return instance.post<ResponseType<{ item: TaskType }>>(`todo-lists/${todolistId}/tasks`, { title: taskTitle });
  },
  updateTask(todolistId: string, taskId: string, model: UpdateTaskModelType) {
    return instance.put<ResponseType>(`todo-lists/${todolistId}/tasks/${taskId}/`, model);
  },
  deleteTask(todolistId: string, taskId: string) {
    return instance.delete<ResponseType>(`todo-lists/${todolistId}/tasks/${taskId}`);
  },
};

export const authAPI = {
  login(payload: LoginParamsType) {
    return instance.post<ResponseType<{ userId: number }>>(`auth/login`, payload);
  },
  logout() {
    return instance.delete<ResponseType>(`auth/login`);
  },
  me() {
    return instance.get<ResponseType<{ id: number; email: string; login: string }>>("/auth/me");
  },
};

// types
export type TodolistType = {
  id: string;
  addedDate: string;
  order: number;
  title: string;
};
export type ResponseType<Data = {}> = {
  data: Data;
  resultCode: number;
  messages: Array<string>;
  fieldErrors: Array<{ field: string; error: string }>;
};
export enum TaskStatuses {
  New = 0,
  InProgress = 1,
  Completed = 2,
  Draft = 3,
}
export enum TaskPriorities {
  Low = 0,
  Middle = 1,
  Hi = 2,
  Urgently = 3,
  Later = 4,
}
export const ResultCode = {
  success: 0,
  error: 1,
  captcha: 10,
} as const;
export type TaskType = {
  id: string;
  title: string;
  description: string;
  todoListId: string;
  order: number;
  status: TaskStatuses;
  priority: TaskPriorities;
  startDate: string;
  deadline: string;
  addedDate: string;
  completed?: boolean;
  entityStatus?: RequestStatusType;
};
export type UpdateTaskModelType = {
  title: string;
  description: string;
  status: TaskStatuses;
  priority: TaskPriorities;
  startDate: string;
  deadline: string;
};
type GetTasksResponse = {
  items: Array<TaskType>;
  totalCount: number;
  error: string;
};
export type LoginParamsType = {
  email: string;
  password: string;
  rememberMe?: boolean;
  captcha?: boolean;
};
