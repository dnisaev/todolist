import { instance } from "common/api/commonApi";
import { BaseResponseType } from "common/types/common.types";
import { TodolistType } from "features/TodolistsList/api/todolistsApi.types";

export const todolistsApi = {
  getTodolists() {
    return instance.get<TodolistType[]>(`todo-lists`);
  },
  createTodolist(title: string) {
    return instance.post<BaseResponseType<{ item: TodolistType }>>(`todo-lists`, { title: title });
  },
  deleteTodolist(todoListId: string) {
    return instance.delete<BaseResponseType>(`/todo-lists/${todoListId}`);
  },
  updateTodolist(todoListId: string, title: string) {
    return instance.put<BaseResponseType>(`/todo-lists/${todoListId}`, { title: title });
  },
};
