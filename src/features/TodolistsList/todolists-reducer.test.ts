import {
    addTodolistAC, changeTodolistEntityStatusAC,
    changeTodolistFilterAC,
    changeTodolistTitleAC, FilterValuesType,
    removeTodolistAC, setTodolistsAC,
    TodolistDomainType,
    todolistsReducer
} from './todolists-reducer'
import { v1 } from 'uuid'
import {RequestStatusType} from "../../app/app-reducer";

let todolistId1: string
let todolistId2: string

let startState: Array<TodolistDomainType>

beforeEach( ()=> {
    todolistId1 = v1()
    todolistId2 = v1()

    startState = [
        {id: todolistId1, title: 'What to learn', filter: 'all', entityStatus: 'idle', addedDate: '', order: 0},
        {id: todolistId2, title: 'What to buy', filter: 'all', entityStatus: 'idle', addedDate: '', order: 0}
    ]
})

test('correct todolist should be removed', () => {
    const endState = todolistsReducer(startState, removeTodolistAC(todolistId1))

    expect(endState.length).toBe(1)
    expect(endState[0].id).toBe(todolistId2)
})

test('correct todolist should be added', () => {
    let newTodolist = {id: v1(), title: 'New Todolist', filter: 'all', entityStatus: 'idle', addedDate: '', order: 0}

    const endState = todolistsReducer(startState, addTodolistAC(newTodolist))

    expect(endState.length).toBe(3)
    expect(endState[0].title).toBe('New Todolist')
    expect(endState[0].entityStatus).toBe('idle')
})

test('correct todolist should change its name', () => {
    let newTodolistTitle = 'New Todolist'

    const endState = todolistsReducer(startState, changeTodolistTitleAC(todolistId2, newTodolistTitle))

    expect(endState[0].title).toBe('What to learn')
    expect(endState[1].title).toBe(newTodolistTitle)
})

test('correct filter of todolist should be changed', () => {
    let newFilter: FilterValuesType = 'completed'

    const endState = todolistsReducer(startState, changeTodolistFilterAC(todolistId2, newFilter))

    expect(endState[0].filter).toBe('all')
    expect(endState[1].filter).toBe(newFilter)
})

test('todolists should be set to the state', () => {
    const action = setTodolistsAC(startState)

    const endState = todolistsReducer([], action)
    expect(endState.length).toBe(2)
})

test('correct entity status of todolist should be changed', () => {
    let newStatus: RequestStatusType = 'succeeded'

    const endState = todolistsReducer(startState, changeTodolistEntityStatusAC(todolistId2, newStatus))

    expect(endState[0].entityStatus).toBe('idle')
    expect(endState[1].entityStatus).toBe(newStatus)
})