import {TasksActionsType, tasksReducer} from './tasks-reducer'
import {TodolistsActionsType, todolistsReducer} from './todolists-reducer'
import {applyMiddleware, combineReducers} from 'redux'
import {legacy_createStore as createStore} from 'redux'
import {thunk, ThunkAction, ThunkDispatch} from "redux-thunk";

export const rootReducer = combineReducers({
    tasks: tasksReducer,
    todolists: todolistsReducer
})

// @ts-ignore
export const store = createStore(rootReducer, applyMiddleware(thunk))

export type AppRootStateType = ReturnType<typeof rootReducer>
export type AppActionsType = TasksActionsType | TodolistsActionsType
export type AppDispatch = ThunkDispatch<AppRootStateType, unknown, AppActionsType>
export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, AppRootStateType, unknown, AppActionsType>

// @ts-ignore
window.store = store