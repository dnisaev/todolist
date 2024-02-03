import React, {useEffect, useState} from "react";
import {todolistsAPI} from "../api/todolists-api";

export default {
    title: 'API/Todolist'
}

const todolist1 = '67505134-8b40-4660-b3c2-1dfa1afe48d4';
const todolist2 = '5a63cdf0-39ab-4ced-99d3-2e6b7ebafeb3';
const todolist3 = 'f7638f5c-6726-498c-b9e8-1f9ee5b047c8';
const taskId1 = 'fadb88b9-f112-40b1-90bd-f950ed3047f9';

export const GetTodolists = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        todolistsAPI.getTodolist().then(response => {
                setState(response.data)
            })
    }, [])
    return <div>{JSON.stringify(state)}</div>
}

export const CreateTodolist = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        const todolistTitle = 'exampleTodolist';
        todolistsAPI.createTodolist(todolistTitle).then(response => {
            setState(response.data)
        })
    }, []);

    return <div> {JSON.stringify(state)}</div>
}

export const DeleteTodolist = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        todolistsAPI.deleteTodolist(todolist1).then(response => {
            setState(response.data)
        })
    }, []);

    return <div> {JSON.stringify(state)}</div>
}

export const UpdateTodolistTitle = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        todolistsAPI.updateTodolist(todolist1, 'firstTodolist').then(response => {
            setState(response.data)
        })
    }, [])

    return <div> {JSON.stringify(state)}</div>
}

export const GetTasts = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        todolistsAPI.getTasks(todolist3).then(response => {
            setState(response.data)
        })
    }, []);

    return <div> {JSON.stringify(state)}</div>
}

export const CreateTask = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        todolistsAPI.createTask(todolist3, 'Создание тестовой таски').then(response => {
            setState(response.data)
        })
    }, []);

    return <div> {JSON.stringify(state)}</div>
}

export const UpdateTaskTitle = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        todolistsAPI.updateTask(todolist3, taskId1, 'И еще еще одна тестовая таска :)').then(response => {
            setState(response.data)
        })
    }, []);

    return <div> {JSON.stringify(state)}</div>
}

export const DeleteTask = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        todolistsAPI.deleteTask(todolist3, taskId1).then(response => {
            return setState(response.data)
        })
    }, []);

    return <div> {JSON.stringify(state)}</div>
}