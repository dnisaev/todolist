import React, {useEffect, useState} from "react";
import {todolistAPI} from "../api/todolist-api";

export default {
    title: 'API/Todolist'
}

const todolistId = '67505134-8b40-4660-b3c2-1dfa1afe48d4';

export const GetTodolists = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        todolistAPI.getTodolist().then(response => {
                setState(response.data)
            })
    }, [])
    return <div>{JSON.stringify(state)}</div>
}

export const CreateTodolist = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        const todolistTitle = 'exampleTodolist';
        todolistAPI.createTodolist(todolistTitle).then(response => {
            setState(response.data)
        })
    }, []);

    return <div> {JSON.stringify(state)}</div>
}

export const DeleteTodolist = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        todolistAPI.deleteTodolist(todolistId).then(response => {
            setState(response.data)
        })
    }, []);

    return <div> {JSON.stringify(state)}</div>
}

export const UpdateTodolistTitle = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        todolistAPI.updateTodolist(todolistId, 'firstTodolist').then(response => {
            setState(response.data)
        })
    }, [])

    return <div> {JSON.stringify(state)}</div>
}
