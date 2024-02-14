import {todolistsAPI, TodolistType} from "../api/todolists-api";
import {Dispatch} from "redux";
import {AppActionsType} from "./store";

export type TodolistsActionsType =
    RemoveTodolistActionType |
    AddTodolistActionType |
    ChangeTodolistTitleActionType |
    ChangeTodolistFilterActionType |
    SetTodolistsActionType

export type RemoveTodolistActionType = {
    type: 'REMOVE-TODOLIST'
    id: string
}

export type AddTodolistActionType = {
    type: 'ADD-TODOLIST'
    todolist: TodolistType
}

export type ChangeTodolistTitleActionType = {
    type: 'CHANGE-TODOLIST-TITLE'
    id: string
    title: string
}

export type ChangeTodolistFilterActionType = {
    type: 'CHANGE-TODOLIST-FILTER'
    id: string
    filter: FilterValuesType
}

export type SetTodolistsActionType = {
    type: 'SET-TODOLISTS'
    todolists: Array<TodolistType>
}

const initialState: Array<TodolistDomainType> = [];

export type FilterValuesType = 'active' | 'all' | 'completed';

export type TodolistDomainType = TodolistType & {
    filter: FilterValuesType
}

export const todolistsReducer = (state: Array<TodolistDomainType> = initialState, action: TodolistsActionsType): Array<TodolistDomainType> => {
    switch (action.type) {
        case 'REMOVE-TODOLIST': {
            return state.filter(tl => tl.id !== action.id)
        }
        case 'ADD-TODOLIST': {
            return [{...action.todolist, filter: 'all'}, ...state]
        }
        case 'CHANGE-TODOLIST-TITLE': {
            let findTodolist = state.find(tl => tl.id === action.id);
            if (findTodolist) {
                findTodolist.title = action.title
            }
            return [...state]
        }
        case 'CHANGE-TODOLIST-FILTER': {
            let currentTodolist = state.find(tl => tl.id === action.id);
            if (currentTodolist) {
                currentTodolist.filter = action.filter
            }
            return [...state]
        }
        case 'SET-TODOLISTS': {
            return action.todolists.map(todolist => ({...todolist, filter: 'all'}))
        }
        default:
            return state
    }
}

export const removeTodolistAC = (todolistId: string): RemoveTodolistActionType => {
    return {type: 'REMOVE-TODOLIST', id: todolistId}
}

export const addTodolistAC = (todolist: TodolistType): AddTodolistActionType => {
    return {type: 'ADD-TODOLIST', todolist}
}

export const changeTodolistTitleAC = (todolistId: string, title: string): ChangeTodolistTitleActionType => {
    return {type: 'CHANGE-TODOLIST-TITLE', id: todolistId, title: title}
}

export const changeTodolistFilterAC = (todolistId: string, filter: FilterValuesType): ChangeTodolistFilterActionType => {
    return {type: 'CHANGE-TODOLIST-FILTER', id: todolistId, filter: filter}
}

export const setTodolistsAC = (todolists: Array<TodolistType>): SetTodolistsActionType => {
    return {type: 'SET-TODOLISTS', todolists}
}

export const fetchThenTodolistsTC = () => (dispatch: Dispatch<AppActionsType>) => {
    todolistsAPI.getTodolists().then(response => {
        const action = setTodolistsAC(response.data)
        dispatch(action)
    })
}

export const fetchAsyncTodolistsTC = () => async (dispatch: Dispatch<AppActionsType>) => {
    const response = await todolistsAPI.getTodolists()
    dispatch(setTodolistsAC(response.data))
}

export const removeTodolistTC = (todolistId: string) => (dispatch: Dispatch<AppActionsType>) => {
    todolistsAPI.deleteTodolist(todolistId).then(response => {
        const action = removeTodolistAC(todolistId)
        dispatch(action)
    })
}

export const addTodolistTC = (title: string) => (dispatch: Dispatch<AppActionsType>) => {
    todolistsAPI.createTodolist(title).then(response => {
        const action = addTodolistAC(response.data.data.item)
        dispatch(action)
    })
}

export const changeTodolistTitleTC = (todolistId: string, title: string) => (dispatch: Dispatch<AppActionsType>) => {
    todolistsAPI.updateTodolist(todolistId, title).then(response => {
        const action = changeTodolistTitleAC(todolistId, title)
        dispatch(action)
    })
}