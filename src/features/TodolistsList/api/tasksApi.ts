import { instance } from "common/api";
import { BaseResponseType } from "common/types";
import { GetTasksResponse, TaskType, UpdateTaskModelType } from "features/TodolistsList/api/tasksApi.types";

export const tasksApi = {
  getTasks(todoListId: string) {
    return instance.get<GetTasksResponse>(`/todo-lists/${todoListId}/tasks`);
  },
  createTask(todoListId: string, taskTitle: string) {
    return instance.post<BaseResponseType<{ item: TaskType }>>(`todo-lists/${todoListId}/tasks`, { title: taskTitle });
  },
  updateTask(todoListId: string, taskId: string, model: UpdateTaskModelType) {
    return instance.put<BaseResponseType>(`todo-lists/${todoListId}/tasks/${taskId}/`, model);
  },
  deleteTask(todoListId: string, taskId: string) {
    return instance.delete<BaseResponseType>(`todo-lists/${todoListId}/tasks/${taskId}`);
  },
};
