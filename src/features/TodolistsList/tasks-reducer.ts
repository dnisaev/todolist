import {TaskPriorities, TaskStatuses, TaskType, todolistsAPI, UpdateTaskModelType} from "../../api/todolists-api";
import {Dispatch} from "redux";
import {AppActionsType, AppRootStateType} from "../../app/store";
import {AddTodolistActionType, RemoveTodolistActionType, SetTodolistActionType} from "./todolists-reducer";

const initialState = {};
export const tasksReducer = (state: TasksStateType = initialState, action: TasksActionsType): TasksStateType => {
    switch (action.type) {
        case 'REMOVE-TASK':
            return {...state, [action.todolistId]: state[action.todolistId].filter(task => task.id !== action.taskId)}
        case 'ADD-TASK':
            return {...state, [action.task.todoListId]: [action.task, ...state[action.task.todoListId]]}
        case 'UPDATE-TASK':
            return {...state, [action.todolistId]: state[action.todolistId]
                    .map(t => t.id === action.taskId ? {...t, ...action.model} : t)}
        case 'ADD-TODOLIST':
            return {...state, [action.todolist.id]: []}
        case "REMOVE-TODOLIST": {
            const stateCopy = {...state};
            delete stateCopy[action.id];
            return stateCopy;
        }
        case 'SET-TODOLISTS': {
            const stateCopy = {...state};
            action.todolists.forEach(tl => stateCopy[tl.id] = []);
            return stateCopy;
        }
        case 'SET-TASKS':
            return {...state, [action.todolistId]: action.tasks}
        default:
            return state;
    }
}

// actions
export const removeTaskAC = (taskId: string, todolistId: string) =>
    ({type: 'REMOVE-TASK', taskId, todolistId} as const)
export const addTaskAC = (task: TaskType) =>
    ({type: 'ADD-TASK', task} as const)
export const changeTaskAC = (taskId: string, model: UpdateDomainTaskModelType, todolistId: string) =>
    ({type: 'UPDATE-TASK', taskId, model, todolistId} as const)
export const setTasksAC = (tasks: Array<TaskType>, todolistId: string) =>
    ({type: 'SET-TASKS', tasks, todolistId} as const)

// thunks
export const fetchTasksTC = (todolistId: string) => (dispatch: Dispatch<AppActionsType>) => {
    todolistsAPI.getTasks(todolistId)
        .then(response => {
            const action = setTasksAC(response.data.items, todolistId)
            dispatch(action)
        })
}
export const removeTaskTC = (taskId: string, todolistId: string) => (dispatch: Dispatch<AppActionsType>) => {
    todolistsAPI.deleteTask(todolistId, taskId).then(() => {
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
export const updateTaskTC = (taskId: string, domainModel: UpdateDomainTaskModelType, todolistId: string) =>
    (dispatch: Dispatch<AppActionsType>, getState: () => AppRootStateType) => {

        const state = getState().tasks;
        const task = state[todolistId].find(t => t.id === taskId)

        if (task) {
            const apiModel: UpdateTaskModelType = {
                title: task.title,
                startDate: task.startDate,
                priority: task.priority,
                description: task.description,
                deadline: task.deadline,
                status: task.status,
                ...domainModel
            }

            todolistsAPI.updateTask(todolistId, taskId, apiModel).then(() => {
                const action = changeTaskAC(taskId, domainModel, todolistId)
                dispatch(action)
            })
        }
    }

// types
export type UpdateDomainTaskModelType = {
    title?: string
    description?: string
    status?: TaskStatuses
    priority?: TaskPriorities
    startDate?: string
    deadline?: string
}
export type TasksActionsType =
    | ReturnType<typeof removeTaskAC>
    | ReturnType<typeof addTaskAC>
    | ReturnType<typeof changeTaskAC>
    | ReturnType<typeof setTasksAC>
    | AddTodolistActionType
    | RemoveTodolistActionType
    | SetTodolistActionType
export type TasksStateType = {
    [key: string]: Array<TaskType>
};