import {TasksStateType} from "../App";
import {AddTodolistActionType, RemoveTodolistActionType} from "./todolists-reducer";
import {v1} from "uuid";
import {TaskPriorities, TaskStatuses} from "../api/todolists-api";

type ActionsType =
    RemoveTaskActionType |
    AddTaskActionType |
    ChangeTaskStatusActionType |
    ChangeTaskTitleActionType |
    AddTodolistActionType |
    RemoveTodolistActionType

export type RemoveTaskActionType = {
    type: 'REMOVE-TASK'
    taskId: string
    todolistId: string
}

export type AddTaskActionType = {
    type: 'ADD-TASK'
    taskTitle: string
    todolistId: string
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

const initialState = {};

export const tasksReducer = (state: TasksStateType = initialState, action: ActionsType): TasksStateType => {
    switch (action.type) {
        case 'REMOVE-TASK': {
            const stateCopy = {...state};
            const tasks = stateCopy[action.todolistId];
            stateCopy[action.todolistId] = tasks.filter(t => t.id !== action.taskId);
            return stateCopy;
        }
        case 'ADD-TASK': {
            const stateCopy = {...state};
            const tasks = stateCopy[action.todolistId];
            const newTask = {id: v1(), title: action.taskTitle, status: TaskStatuses.New, todoListId: action.todolistId, description: '', startDate: '', deadline: '', addedDate: '', order: 0, priority: TaskPriorities.Low};
            stateCopy[action.todolistId] = [newTask, ...tasks];
            return stateCopy;
        }
        case 'CHANGE-TASK-STATUS': {
            state[action.todolistId] = state[action.todolistId].map(
                task=> task.id === action.taskId ? {...task, status: action.status} : task);
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
            stateCopy[action.todolistId] = [];
            return stateCopy;
        }
        case "REMOVE-TODOLIST": {
            const stateCopy = {...state};
            delete stateCopy[action.id];
            return stateCopy;
        }
        default:
            return state;
    }
}

export const removeTaskAC = (taskId: string, todolistId: string): RemoveTaskActionType => {
    return {type: 'REMOVE-TASK', taskId: taskId, todolistId: todolistId}
}

export const addTaskAC = (taskTitle: string, todolistId: string): AddTaskActionType => {
    return {type: 'ADD-TASK', taskTitle: taskTitle, todolistId: todolistId}
}

export const changeTaskStatusAC = (taskId: string, status: TaskStatuses, todolistId: string): ChangeTaskStatusActionType => {
    return {type: 'CHANGE-TASK-STATUS', taskId: taskId, status: status, todolistId: todolistId}
}

export const changeTaskTitleAC = (taskId: string, taskTitle: string, todolistId: string): ChangeTaskTitleActionType => {
    return {type: 'CHANGE-TASK-TITLE', taskId: taskId, taskTitle: taskTitle, todolistId: todolistId}
}