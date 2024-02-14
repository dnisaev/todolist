import {AddTodolistActionType, RemoveTodolistActionType, SetTodolistsActionType} from "./todolists-reducer";
import {TaskStatuses, TaskType, todolistsAPI} from "../api/todolists-api";
import {Dispatch} from "redux";
import {TasksStateType} from "../AppWithRedux";
import {AppActionsType, AppRootStateType} from "./store";

export type TasksActionsType =
    RemoveTaskActionType |
    AddTaskActionType |
    ChangeTaskStatusActionType |
    ChangeTaskTitleActionType |
    AddTodolistActionType |
    RemoveTodolistActionType |
    SetTodolistsActionType |
    SetTasksActionType

export type RemoveTaskActionType = {
    type: 'REMOVE-TASK'
    taskId: string
    todolistId: string
}

export type AddTaskActionType = {
    type: 'ADD-TASK'
    task: TaskType
}

export type ChangeTaskStatusActionType = {
    type: 'CHANGE-TASK-STATUS'
    taskId: string
    status: TaskStatuses
    todolistId: string
}

export type ChangeTaskTitleActionType = {
    type: 'CHANGE-TASK-TITLE'
    taskId: string
    taskTitle: string
    todolistId: string
}

export type SetTasksActionType = {
    type: 'SET-TASKS'
    tasks: Array<TaskType>
    todolistId: string
}

const initialState = {};

export const tasksReducer = (state: TasksStateType = initialState, action: TasksActionsType): TasksStateType => {
    switch (action.type) {
        case 'REMOVE-TASK': {
            const stateCopy = {...state};
            const tasks = stateCopy[action.todolistId];
            stateCopy[action.todolistId] = tasks.filter(task => task.id !== action.taskId);
            return stateCopy;
        }
        case 'ADD-TASK': {
            const stateCopy = {...state};
            const tasks = stateCopy[action.task.todoListId];
            const newTask = [action.task, ...tasks];
            stateCopy[action.task.todoListId] = newTask;
            return stateCopy;
        }
        case 'CHANGE-TASK-STATUS': {
            state[action.todolistId] = state[action.todolistId].map(
                task => task.id === action.taskId ? {...task, status: action.status} : task);
            return {...state};
        }
        case 'CHANGE-TASK-TITLE': {
            state[action.todolistId] = state[action.todolistId].map(
                task => task.id === action.taskId ? {...task, title: action.taskTitle} : task
            )
            return {...state};
        }
        case 'ADD-TODOLIST': {
            const stateCopy = {...state};
            stateCopy[action.todolist.id] = [];
            return stateCopy;
        }
        case "REMOVE-TODOLIST": {
            const stateCopy = {...state};
            delete stateCopy[action.id];
            return stateCopy;
        }
        case 'SET-TODOLISTS': {
            const stateCopy = {...state};
            action.todolists.forEach(todolist => stateCopy[todolist.id] = []);
            return stateCopy;
        }
        case 'SET-TASKS': {
            const stateCopy = {...state};
            stateCopy[action.todolistId] = action.tasks;
            return stateCopy;
        }
        default:
            return state;
    }
}

export const removeTaskAC = (taskId: string, todolistId: string): RemoveTaskActionType => {
    return {type: 'REMOVE-TASK', taskId: taskId, todolistId: todolistId}
}

export const addTaskAC = (task: TaskType): AddTaskActionType => {
    return {type: 'ADD-TASK', task}
}

export const changeTaskStatusAC = (taskId: string, status: TaskStatuses, todolistId: string): ChangeTaskStatusActionType => {
    return {type: 'CHANGE-TASK-STATUS', taskId: taskId, status: status, todolistId: todolistId}
}

export const changeTaskTitleAC = (taskId: string, taskTitle: string, todolistId: string): ChangeTaskTitleActionType => {
    return {type: 'CHANGE-TASK-TITLE', taskId: taskId, taskTitle: taskTitle, todolistId: todolistId}
}

export const setTasksAC = (tasks: Array<TaskType>, todolistId: string): SetTasksActionType => {
    return {type: 'SET-TASKS', tasks, todolistId}
}

export const fetchTasksTC = (todolistId: string) => (dispatch: Dispatch<AppActionsType>) => {
    todolistsAPI.getTasks(todolistId)
        .then(response => {
            const action = setTasksAC(response.data.items, todolistId)
            dispatch(action)
        })
}

export const removeTaskTC = (taskId: string, todolistId: string) => (dispatch: Dispatch<AppActionsType>) => {
    todolistsAPI.deleteTask(todolistId, taskId).then(response => {
        const action = removeTaskAC(taskId, todolistId)
        dispatch(action)
    })
}

export const addTaskTC = (todolistId: string, title: string) => (dispatch: Dispatch<AppActionsType>) => {
    todolistsAPI.createTask(todolistId, title).then(response => {
        const action = addTaskAC(response.data.data.item)
        dispatch(action)
    })
}

export const updateTaskStatusTC = (taskId: string, status: TaskStatuses, todolistId: string) => {
    return (dispatch: Dispatch<AppActionsType>, getState: () => AppRootStateType) => {

        const allTasksFromState = getState().tasks;
        const tasksForCurrentTodolist = allTasksFromState[todolistId]
        const task = tasksForCurrentTodolist.find(t => {
            return t.id === taskId
        })

        if (task) {
            todolistsAPI.updateTask(todolistId, taskId, {
                title: task.title,
                startDate: task.startDate,
                priority: task.priority,
                description: task.description,
                deadline: task.deadline,
                status: status
            }).then(() => {
                const action = changeTaskStatusAC(taskId, status, todolistId)
                dispatch(action)
            })
        }
    }
}

export const changeTaskTitleTC = (taskId: string, taskTitle: string, todolistId: string) => (dispatch: Dispatch<AppActionsType>) => {

    const model = {
        title: taskTitle,
        description: '',
        status: 0,
        priority: 0,
        startDate: '',
        deadline: ''
    }

    todolistsAPI.updateTask(todolistId, taskId, model).then(response => {
        const action = changeTaskTitleAC(taskId, taskTitle, todolistId)
        dispatch(action)
    })
}