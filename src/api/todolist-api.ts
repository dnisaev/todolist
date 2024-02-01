import axios from 'axios';

type TodolistType = {
    id: string
    addedDate: string
    order: number
    title: string
}

export type ResponseType<D> = {
    resultCode: number
    messages: Array<string>
    fieldsErrors: Array<string>
    data: D
}


const instance = axios.create({
    baseURL: 'https://social-network.samuraijs.com/api/1.1/',
    withCredentials: true,
    headers: {
        'API-KEY': 'bb82ba3c-ed1e-4248-bb07-d52f74e8ed63',
    },
})

export const todolistAPI = {
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
        return instance.delete<ResponseType<{}>>(
            `/todo-lists/${todolistId}`
        )
    },
    updateTodolist(todolistId: string, title: string) {
        return instance.put<ResponseType<{}>>(
            `/todo-lists/${todolistId}`,
            {title: title}
        )
    },
}
