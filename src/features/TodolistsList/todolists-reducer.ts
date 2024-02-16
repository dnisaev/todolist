import {todolistsAPI, TodolistType} from "../../api/todolists-api";
import {Dispatch} from "redux";
import {AppActionsType} from "../../app/store";

const initialState: Array<TodolistDomainType> = [];
export const todolistsReducer = (state: Array<TodolistDomainType> = initialState, action: TodolistsActionsType): Array<TodolistDomainType> => {
    switch (action.type) {
        case 'REMOVE-TODOLIST':
            return state.filter(tl => tl.id !== action.id)
        case 'ADD-TODOLIST':
            return [{...action.todolist, filter: 'all'}, ...state]
        case 'CHANGE-TODOLIST-TITLE':
            return state.map(tl => tl.id === action.id ? {...tl, title: action.title} : tl)
        case 'CHANGE-TODOLIST-FILTER':
            return state.map(tl => tl.id === action.id ? {...tl, filter: action.filter} : tl)
        case 'SET-TODOLISTS':
            return action.todolists.map(tl => ({...tl, filter: 'all'}))
        default:
            return state
    }
}

// actions
export const removeTodolistAC = (id: string) =>
    ({type: 'REMOVE-TODOLIST', id} as const)
export const addTodolistAC = (todolist: TodolistType) =>
    ({type: 'ADD-TODOLIST', todolist} as const)
export const changeTodolistTitleAC = (id: string, title: string) =>
    ({type: 'CHANGE-TODOLIST-TITLE', id, title} as const)
export const changeTodolistFilterAC = (id: string, filter: FilterValuesType) =>
    ({type: 'CHANGE-TODOLIST-FILTER', id, filter} as const)
export const setTodolistsAC = (todolists: Array<TodolistType>) =>
    ({type: 'SET-TODOLISTS', todolists} as const)

// thunks
export const fetchTodolistsTC = () => (dispatch: Dispatch<AppActionsType>) => {
    todolistsAPI.getTodolists().then(response => {
        const action = setTodolistsAC(response.data)
        dispatch(action)
    })
}
export const removeTodolistTC = (todolistId: string) => (dispatch: Dispatch<AppActionsType>) => {
    todolistsAPI.deleteTodolist(todolistId).then(() => {
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
    todolistsAPI.updateTodolist(todolistId, title).then(() => {
        const action = changeTodolistTitleAC(todolistId, title)
        dispatch(action)
    })
}

// types
export type AddTodolistActionType = ReturnType<typeof addTodolistAC>
export type RemoveTodolistActionType = ReturnType<typeof removeTodolistAC>
export type SetTodolistActionType = ReturnType<typeof setTodolistsAC>
export type TodolistsActionsType =
    | AddTodolistActionType
    | RemoveTodolistActionType
    | SetTodolistActionType
    | ReturnType<typeof changeTodolistTitleAC>
    | ReturnType<typeof changeTodolistFilterAC>
export type FilterValuesType = 'active' | 'all' | 'completed';
export type TodolistDomainType = TodolistType & { filter: FilterValuesType }