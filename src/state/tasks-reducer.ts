import {TasksStateType} from "../App";
import {AddTodolistActionType, RemoveTodolistActionType} from "./todolists-reducer";

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
    taskStatus: boolean
    todolistId: string
}

export type ChangeTaskTitleActionType = {
    type: 'CHANGE-TASK-TITLE'
    taskId: string
    taskTitle: string
    todolistId: string
}

export const tasksReducer = (state: TasksStateType, action: ActionsType) => {
    switch (action.type) {
        case 'REMOVE-TASK':
            state[action.todolistId] = state[action.todolistId].filter(t => t.id !== action.taskId);
            return {...state};
        case 'ADD-TASK':
            state[action.todolistId] = [{id: '0', title: action.taskTitle, isDone: false}, ...state[action.todolistId]];
            return {...state};
        case 'CHANGE-TASK-STATUS':
            let findTaskStatus = state[action.todolistId].find(t => t.id === action.taskId);
            if (findTaskStatus) {
                findTaskStatus.isDone = action.taskStatus
            }
            return {...state};
        case 'CHANGE-TASK-TITLE':
            let findTaskTitle = state[action.todolistId].find(t => t.id === action.taskId);
            if (findTaskTitle) {
                findTaskTitle.title = action.taskTitle
            }
            return {...state};
        case 'ADD-TODOLIST':
            return {[action.todolistId]:[], ...state};
        case "REMOVE-TODOLIST":
            delete state[action.id];
            return {...state};
        default:
            throw new Error('Unexpected action type')
    }
}

export const removeTaskAC = (taskId: string, todolistId: string): RemoveTaskActionType => {
    return {type: 'REMOVE-TASK', taskId: taskId, todolistId: todolistId}
}

export const addTaskAC = (taskTitle: string, todolistId: string): AddTaskActionType => {
    return {type: 'ADD-TASK', taskTitle: taskTitle, todolistId: todolistId}
}

export const changeTaskStatusAC = (taskId: string, taskStatus: boolean, todolistId: string): ChangeTaskStatusActionType => {
    return {type: 'CHANGE-TASK-STATUS', taskId: taskId, taskStatus: taskStatus, todolistId: todolistId}
}

export const changeTaskTitleAC = (taskId: string, taskTitle: string, todolistId: string): ChangeTaskTitleActionType => {
    return {type: 'CHANGE-TASK-TITLE', taskId: taskId, taskTitle: taskTitle, todolistId: todolistId}
}