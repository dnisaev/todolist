import React, {useEffect, useState} from "react";
import {todolistsAPI} from "./todolists-api";

export default {
    title: 'API/Todolist'
}

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
    const [state, setState] = useState<any>(null);
    const [todolistTitle, setTodolistTitle] = useState<string>('');

    const createTodolist = () => {
        todolistsAPI.createTodolist(todolistTitle).then(response => {
            setState(response.data)
        })
    }

    return (
        <div>
            <div> {JSON.stringify(state)}</div>
            <div>
                <input placeholder={"Todolist Title"} value={todolistTitle} onChange={(e) => {
                    setTodolistTitle(e.currentTarget.value)
                }}/>
                <button onClick={createTodolist}>Добавить</button>
            </div>
        </div>
    )
}

export const DeleteTodolist = () => {
    const [state, setState] = useState<any>(null);
    const [todolistId, setTodolistId] = useState<string>('');

    const deleteTodolist = () => {
        todolistsAPI.deleteTodolist(todolistId).then(response => {
            setState(response.data)
        })
    }

    return (
        <div>
            <div> {JSON.stringify(state)}</div>
            <div>
                <input placeholder={"Todolist ID"} value={todolistId} onChange={(e) => {
                    setTodolistId(e.currentTarget.value)
                }}/>
                <button onClick={deleteTodolist}>Удалить</button>
            </div>
        </div>
    )
}

export const UpdateTodolistTitle = () => {
    const [state, setState] = useState<any>(null);
    const [todolistId, setTodolistId] = useState<string>('');
    const [todolistTitle, setTodolistTitle] = useState<string>('');

    const updateTodolistTitle = () => {
        todolistsAPI.updateTodolist(todolistId, todolistTitle).then(response => {
            setState(response.data)
        })
    }

    return (
        <div>
            <div> {JSON.stringify(state)}</div>
            <div>
                <input placeholder={"Todolist ID"} value={todolistId} onChange={(e) => {
                    setTodolistId(e.currentTarget.value)
                }}/>
                <input placeholder={"Todolist Title"} value={todolistTitle} onChange={(e) => {
                    setTodolistTitle(e.currentTarget.value)
                }}/>
                <button onClick={updateTodolistTitle}>Изменить</button>
            </div>
        </div>
    )
}

export const GetTasks = () => {
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
                <input placeholder={"Todolist ID"} value={todolistId} onChange={(e) => {
                    setTodolistId(e.currentTarget.value)
                }}/>
                <button onClick={getTasks}>Запросить</button>
            </div>
        </div>
    )
}

export const CreateTask = () => {
    const [state, setState] = useState<any>(null)
    const [todolistId, setTodolistId] = useState<string>('')
    const [taskTitle, setTaskTitle] = useState<string>('')

    const createTask = () => {
        todolistsAPI.createTask(todolistId, taskTitle).then(response => {
            setState(response.data)
        })
    }

    return (
        <div>
            <div> {JSON.stringify(state)}</div>
            <div>
                <input placeholder={"Todolist ID"} value={todolistId} onChange={(e) => {
                    setTodolistId(e.currentTarget.value)
                }}/>
                <input placeholder={"Task Title"} value={taskTitle} onChange={(e) => {
                    setTaskTitle(e.currentTarget.value)
                }}/>
                <button onClick={createTask}>Добавить</button>
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
                <input placeholder={"Todolist ID"} value={todolistId} onChange={(e) => {setTodolistId(e.currentTarget.value)}}/>
                <input placeholder={"Task ID"} value={taskId} onChange={(e) => {setTaskId(e.currentTarget.value)}}/>
                <input placeholder={"Task Title"} value={taskTitle} onChange={(e) => {setTaskTitle(e.currentTarget.value)}}/>
                <input placeholder={"Task Description"} value={description} onChange={(e) => {setDescription(e.currentTarget.value)}}/>
                <input placeholder={"Task Status"} value={status} onChange={(e) => {setStatus(+e.currentTarget.value)}}/>
                <input placeholder={"Task Priority"} value={priority} onChange={(e) => {setPriority(+e.currentTarget.value)}}/>
                <button onClick={updateTask}>Изменить</button>
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
                <input placeholder={"Todolist ID"} value={todolistId} onChange={(e) => {
                    setTodolistId(e.currentTarget.value)
                }}/>
                <input placeholder={"Task ID"} value={taskId} onChange={(e) => {
                    setTaskId(e.currentTarget.value)
                }}/>
                <button onClick={deleteTask}>Удалить</button>
            </div>
        </div>
    )
}