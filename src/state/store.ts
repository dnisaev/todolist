import { tasksReducer } from './tasks-reducer'
import { todolistsReducer } from './todolists-reducer'
import {applyMiddleware, combineReducers} from 'redux'
import { legacy_createStore as createStore} from 'redux'
import {thunk} from "redux-thunk";

export const rootReducer = combineReducers({
    tasks: tasksReducer,
    todolists: todolistsReducer
})

// @ts-ignore
export const store = createStore(rootReducer, applyMiddleware(thunk))

export type AppRootStateType = ReturnType<typeof rootReducer>

// @ts-ignore
window.store = store
