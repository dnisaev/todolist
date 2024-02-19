import React from 'react'
import {Provider} from "react-redux";
import {applyMiddleware, combineReducers, legacy_createStore} from "redux";
import {tasksReducer} from "../../features/TodolistsList/tasks-reducer";
import {todolistsReducer} from "../../features/TodolistsList/todolists-reducer";
import {thunk} from "redux-thunk";
import {appReducer} from "../../app/app-reducer";
import {AppRootStateType} from "../../app/store";
import {v1} from "uuid";
import {TaskPriorities, TaskStatuses} from "../../api/todolists-api";

const rootReducer = combineReducers({
    tasks: tasksReducer,
    todolists: todolistsReducer,
    app: appReducer
})

const initialGlobalState: AppRootStateType = {
    todolists: [
        {id: "todolistId1", title: "What to learn", filter: "all", entityStatus: "idle", addedDate: '', order: 0},
        {id: "todolistId2", title: "What to buy", filter: "all", entityStatus: "idle",addedDate: '', order: 0}
    ] ,
    tasks: {
        ["todolistId1"]: [
            {id: v1(), title: "HTML&CSS", status: TaskStatuses.Completed, todoListId: "todolistId1", description: '', startDate: '', deadline: '', addedDate: '', order: 0, priority: TaskPriorities.Low},
            {id: v1(), title: "JS",status: TaskStatuses.New, todoListId: "todolistId1", description: '', startDate: '', deadline: '', addedDate: '', order: 0, priority: TaskPriorities.Low}
        ],
        ["todolistId2"]: [
            {id: v1(), title: "Milk", status: TaskStatuses.New, todoListId: "todolistId2", description: '', startDate: '', deadline: '', addedDate: '', order: 0, priority: TaskPriorities.Low},
            {id: v1(), title: "React Book", status: TaskStatuses.Completed, todoListId: "todolistId2", description: '', startDate: '', deadline: '', addedDate: '', order: 0, priority: TaskPriorities.Low}
        ]
    },
    app: {
        status: 'idle',
        error: null
    }
};

// @ts-ignore
export const storyBookStore = legacy_createStore(rootReducer, applyMiddleware(thunk));


export const ReduxStoreProviderDecorator = (storyFn: () => React.ReactNode) => {
    return <Provider store={storyBookStore}>{storyFn()}</Provider>
}
