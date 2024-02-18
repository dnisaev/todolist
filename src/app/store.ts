import {TasksActionsType, tasksReducer} from '../features/TodolistsList/tasks-reducer'
import {TodolistsActionsType, todolistsReducer} from '../features/TodolistsList/todolists-reducer'
import {applyMiddleware, combineReducers} from 'redux'
import {legacy_createStore as createStore} from 'redux'
import {thunk, ThunkAction, ThunkDispatch} from "redux-thunk";
import {AppActionsType, appReducer} from "./app-reducer";

export const rootReducer = combineReducers({
    tasks: tasksReducer,
    todolists: todolistsReducer,
    app: appReducer
})

// @ts-ignore
export const store = createStore(rootReducer, applyMiddleware(thunk))

export type AppRootStateType = ReturnType<typeof rootReducer>
export type GlobalActionsType = TasksActionsType | TodolistsActionsType | AppActionsType
export type AppDispatch = ThunkDispatch<AppRootStateType, unknown, GlobalActionsType>
export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, AppRootStateType, unknown, GlobalActionsType>

// @ts-ignore
window.store = store