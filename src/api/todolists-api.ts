import axios from 'axios';

export type TodolistType = {
    id: string
    addedDate: string
    order: number
    title: string
}

export type ResponseType<Data = {}> = {
    data: Data
    resultCode: number
    messages: Array<string>
}

export enum TaskStatuses {
    New = 0,
    InProgress = 1,
    Completed = 2,
    Draft = 3
}

export enum TaskPriorities {
    Low = 0,
    Middle = 1,
    Hi = 2,
    Urgently = 3,
    Later = 4
}

export type TaskType = {
    id: string
    title: string
    description: string | null
    todoListId: string
    order: number
    status: TaskStatuses
    priority: TaskPriorities
    startDate: string | null
    deadline: string | null
    addedDate: string
    completed?: boolean
}

export type UpdateTaskModelType = {
    title: string
    description: string | null
    status: number
    priority: number
    startDate: string | null
    deadline: string | null
}

type GetTasksResponse = {
    items: Array<TaskType>
    totalCount: number
    error: string
}

const instance = axios.create({
    baseURL: 'https://social-network.samuraijs.com/api/1.1/',
    withCredentials: true,
    headers: {
        'API-KEY': 'bb82ba3c-ed1e-4248-bb07-d52f74e8ed63',
    },
})

export const todolistsAPI = {
    getTodolists() {
        return instance.get<TodolistType[]>(
            `/todo-lists`
        )
    },
    createTodolist(title: string) {
        return instance.post<ResponseType<{item: TodolistType}>>(
            `/todo-lists`,
            {title: title}
        )
    },
    deleteTodolist(todolistId: string) {
        return instance.delete<ResponseType>(
            `/todo-lists/${todolistId}`
        )
    },
    updateTodolist(todolistId: string, title: string) {
        return instance.put<ResponseType>(
            `/todo-lists/${todolistId}`,
            {title: title}
        )
    },
    getTasks(todolistId: string) {
        return instance.get<GetTasksResponse>(
            `/todo-lists/${todolistId}/tasks`
        )
    },
    createTask(todolistId: string, taskTitle: string) {
      return instance.post<ResponseType<{item: TaskType}>>(
          `todo-lists/${todolistId}/tasks`,
          {title: taskTitle}
      )
    },
    updateTask(todolistId: string, taskId: string, model: UpdateTaskModelType) {
        return instance.put<ResponseType>(
            `todo-lists/${todolistId}/tasks/${taskId}/`, model
        )
    },
    deleteTask(todolistId: string, taskId: string) {
        return instance.delete<ResponseType>(
            `/todo-lists/${todolistId}/tasks/${taskId}`
        )
    }
}