import {TasksActionsType, tasksReducer} from '../features/TodolistsList/tasks-reducer'
import {TodolistsActionsType, todolistsReducer} from '../features/TodolistsList/todolists-reducer'
import {applyMiddleware, combineReducers} from 'redux'
import {legacy_createStore as createStore} from 'redux'
import {thunk, ThunkAction, ThunkDispatch} from "redux-thunk";
import {AppActionsType, appReducer} from "./app-reducer";
import {AuthActionsType, authReducer} from "../features/Login/auth-reducer";

export const rootReducer = combineReducers({
    tasks: tasksReducer,
    todolists: todolistsReducer,
    app: appReducer,
    auth: authReducer
})

// @ts-ignore
export const store = createStore(rootReducer, applyMiddleware(thunk))

export type AppRootStateType = ReturnType<typeof rootReducer>
export type GlobalActionsType = TasksActionsType | TodolistsActionsType | AppActionsType | AuthActionsType
export type AppDispatch = ThunkDispatch<AppRootStateType, unknown, GlobalActionsType>
export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, AppRootStateType, unknown, GlobalActionsType>

// @ts-ignore
window.store = store