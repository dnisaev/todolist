import axios from 'axios';

type TodolistType = {
    id: string
    addedDate: string
    order: number
    title: string
}

export type ResponseType<Data = {}> = {
    resultCode: number
    messages: Array<string>
    //fieldsErrors: Array<string>
    data: Data
}

export type TaskType = {
    description: string
    title: string
    completed: boolean
    status: number
    priority: number
    startDate: string
    deadline: string
    id: string
    todoListId: string
    order: number
    addedDate: string
}

export type UpdateTaskType = {
    description: string
    title: string
    completed: boolean
    status: number
    priority: number
    startDate: string
    deadline: string
}

type GetTasksResponse = {
    error: string
    totalCount: number
    items: TaskType[]
}

const instance = axios.create({
    baseURL: 'https://social-network.samuraijs.com/api/1.1/',
    withCredentials: true,
    headers: {
        'API-KEY': 'bb82ba3c-ed1e-4248-bb07-d52f74e8ed63',
    },
})

export const todolistsAPI = {
    getTodolist() {
        return instance.get<TodolistType[]>(
            `/todo-lists/`
        )
    },
    createTodolist(title: string) {
        return instance.post<ResponseType<{item: TodolistType}>>(
            `/todo-lists/`,
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
          `todo-lists/${todolistId}/tasks/`,
          {title: taskTitle}
      )
    },
    updateTask(todolistId: string, taskId: string, taskTitle: string) {
        return instance.put<UpdateTaskType>(
            `todo-lists/${todolistId}/tasks/${taskId}/`,
            {title: taskTitle}
        )
    },
    deleteTask(todolistId: string, taskId: string) {
        return instance.delete<ResponseType>(
            `/todo-lists/${todolistId}/tasks/${taskId}`
        )
    }
}
