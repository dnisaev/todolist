import React, {useEffect, useState} from "react";
import {todolistsAPI} from "../api/todolists-api";

export default {
    title: 'API/Todolist'
}

const todolist1 = '67505134-8b40-4660-b3c2-1dfa1afe48d4';
const todolist2 = '5a63cdf0-39ab-4ced-99d3-2e6b7ebafeb3';
const todolist3 = 'f7638f5c-6726-498c-b9e8-1f9ee5b047c8';
const taskId1 = 'fadb88b9-f112-40b1-90bd-f950ed3047f9';
const taskId2 = '6c3ca966-8699-41db-bfa2-9a36342c5dd9';

export const GetTodolists = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        todolistsAPI.getTodolists().then(response => {
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
    const [todolistId, setTodolistId] = useState<string>('')
    useEffect(() => {
        todolistsAPI.updateTodolist(todolist1, 'firstTodolist').then(response => {
            setState(response.data)
        })
    }, [])

    return <div> {JSON.stringify(state)}</div>
}

export const GetTasts = () => {
    const [state, setState] = useState<any>(null)
    const [todolistId, setTodolistId] = useState<string>('')

    const getTasks = () => {
        todolistsAPI.getTasks(todolistId).then(response => {
            setState(response.data)
        })
    }

    return (
        <div>
            <div> {JSON.stringify(state)}</div>
            <div>
                <input placeholder={"todolistId"} value={todolistId} onChange={(e) => {
                    setTodolistId(e.currentTarget.value)
                }}/>
                <button onClick={getTasks}>Получить</button>
            </div>
        </div>
    )
}

export const CreateTask = () => {
    const [state, setState] = useState<any>(null)
    const [todolistId, setTodolistId] = useState<string>('')
    const [taskTitle, setTaskTitle] = useState<string>('')
    useEffect(() => {

    }, []);

    const createTask = () => {
        todolistsAPI.createTask(todolistId, taskTitle).then(response => {
            setState(response.data)
        })
    }

    return (
        <div>
            <div> {JSON.stringify(state)}</div>
            <div>
                <input placeholder={"todolistId"} value={todolistId} onChange={(e) => {
                    setTodolistId(e.currentTarget.value)
                }}/>
                <input placeholder={"taskTitle"} value={taskTitle} onChange={(e) => {
                    setTaskTitle(e.currentTarget.value)
                }}/>
                <button onClick={createTask}>Создать</button>
            </div>
        </div>
    )
}

export const UpdateTask = () => {
    const [state, setState] = useState<any>(null)
    const [todolistId, setTodolistId] = useState<string>('')
    const [taskId, setTaskId] = useState<string>('')
    const [taskTitle, setTaskTitle] = useState<string>('')
    const [description, setDescription] = useState<string>('')
    const [status, setStatus] = useState<number>(0)
    const [priority, setPriority] = useState<number>(0)
    const [startDate, setStartDate] = useState<string>('')
    const [deadline, setDeadline] = useState<string>('')

    const updateTask = () => {
        todolistsAPI.updateTask(todolistId, taskId, {
            deadline: "",
            description: description,
            priority: priority,
            startDate: "",
            status: status,
            title: taskTitle
        }).then(response => {
            setState(response.data)
        })
    }

    return (
        <div>
            <div> {JSON.stringify(state)}</div>
            <div>
                <input placeholder={"todolistId"} value={todolistId} onChange={(e) => {setTodolistId(e.currentTarget.value)}}/>
                <input placeholder={"taskId"} value={taskId} onChange={(e) => {setTaskId(e.currentTarget.value)}}/>
                <input placeholder={"taskTitle"} value={taskTitle} onChange={(e) => {setTaskTitle(e.currentTarget.value)}}/>
                <input placeholder={"taskDescription"} value={description} onChange={(e) => {setDescription(e.currentTarget.value)}}/>
                <input placeholder={"status"} value={status} onChange={(e) => {setStatus(+e.currentTarget.value)}}/>
                <input placeholder={"priority"} value={priority} onChange={(e) => {setPriority(+e.currentTarget.value)}}/>
                <button onClick={updateTask}>Обновить</button>
            </div>
        </div>
    )
}

export const DeleteTask = () => {
    const [state, setState] = useState<any>(null)
    const [todolistId, setTodolistId] = useState<string>('')
    const [taskId, setTaskId] = useState<string>('')

    const deleteTask = () => {
        todolistsAPI.deleteTask(todolistId, taskId).then(response => {
            return setState(response.data)
        })
    }

    return (
        <div>
            <div> {JSON.stringify(state)}</div>
            <div>
                <input placeholder={"todolistId"} value={todolistId} onChange={(e) => {
                    setTodolistId(e.currentTarget.value)
                }}/>
                <input placeholder={"taskId"} value={taskId} onChange={(e) => {
                    setTaskId(e.currentTarget.value)
                }}/>
                <button onClick={deleteTask}>Удалить</button>
            </div>
        </div>
    )
}