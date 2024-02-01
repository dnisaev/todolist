import React, {useEffect, useState} from 'react'
import axios from "axios";

export default {
    title: 'API'
}

const settings = {
    withCredentials: true,
    headers: {
        'API-KEY': 'bb82ba3c-ed1e-4248-bb07-d52f74e8ed63'
    }
}

const GetTodolists = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        // здесь мы будем делать запрос и ответ закидывать в стейт.
        // который в виде строки будем отображать в div-ке
        axios
            .get('https://social-network.samuraijs.com/api/1.1/todo-lists', settings)
            .then(response => {
                setState(response.data);
                console.log(response)
            })
    }, [])
    return <div>{JSON.stringify(state)}</div>
}
const CreateTodolist = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        axios
            .post(
                'https://social-network.samuraijs.com/api/1.1/todo-lists',
                {title: 'test1Todolist'},
                settings
            )
            .then(response => {
                setState(response.data)
            })
    }, [])

    return <div>{JSON.stringify(state)}</div>
}
const DeleteTodolist = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        const todolistId = ''
        axios
            .delete(
                `https://social-network.samuraijs.com/api/1.1/todo-lists/${todolistId}`,
                settings
            )
            .then(response => {
                setState(response.data)
            })
    }, [])

    return <div>{JSON.stringify(state)}</div>
}
const UpdateTodolistTitle = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        const todolistId = '50b3e07a-8b8a-4dd1-ba26-df528a076b6c'
        axios
            .put(
                `https://social-network.samuraijs.com/api/1.1/todo-lists/${todolistId}`,
                {title: 'test2Todolist'},
                settings
            )
            .then(response => {
                setState(response.data)
            })
    }, [])

    return <div>{JSON.stringify(state)}</div>
}