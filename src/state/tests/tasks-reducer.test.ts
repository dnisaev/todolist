import {
    addTaskAC,
    changeTaskAC,
    removeTaskAC, setTasksAC,
    tasksReducer
} from '../tasks-reducer'
import {addTodolistAC, removeTodolistAC, setTodolistsAC} from "../todolists-reducer";
import {TaskPriorities, TaskStatuses} from "../../api/todolists-api";
import { TasksStateType } from '../../AppWithRedux';
import {v1} from "uuid";

let startState: TasksStateType

beforeEach(() => {
    startState = {
        'todolistId1': [
            {id: '1', title: 'CSS', status: TaskStatuses.New, todoListId: "todolistId1", description: '', startDate: '', deadline: '', addedDate: '', order: 0, priority: TaskPriorities.Low},
            {id: '2', title: 'JS', status: TaskStatuses.Completed, todoListId: "todolistId1", description: '', startDate: '', deadline: '', addedDate: '', order: 0, priority: TaskPriorities.Low},
            {id: '3', title: 'React', status: TaskStatuses.New, todoListId: "todolistId1", description: '', startDate: '', deadline: '', addedDate: '', order: 0, priority: TaskPriorities.Low}
        ],
        'todolistId2': [
            {id: '1', title: 'bread', status: TaskStatuses.New, todoListId: "todolistId2", description: '', startDate: '', deadline: '', addedDate: '', order: 0, priority: TaskPriorities.Low},
            {id: '2', title: 'milk', status: TaskStatuses.Completed, todoListId: "todolistId2", description: '', startDate: '', deadline: '', addedDate: '', order: 0, priority: TaskPriorities.Low},
            {id: '3', title: 'tea', status: TaskStatuses.New, todoListId: "todolistId2", description: '', startDate: '', deadline: '', addedDate: '', order: 0, priority: TaskPriorities.Low}
        ]
    }
})

test('correct task should be deleted from correct array', () => {

    const action = removeTaskAC('2', 'todolistId2')
    const endState = tasksReducer(startState, action)

    expect(endState).toEqual({
        'todolistId1': [
            {id: '1', title: 'CSS', status: TaskStatuses.New, todoListId: "todolistId1", description: '', startDate: '', deadline: '', addedDate: '', order: 0, priority: TaskPriorities.Low},
            {id: '2', title: 'JS', status: TaskStatuses.Completed, todoListId: "todolistId1", description: '', startDate: '', deadline: '', addedDate: '', order: 0, priority: TaskPriorities.Low},
            {id: '3', title: 'React', status: TaskStatuses.New, todoListId: "todolistId1", description: '', startDate: '', deadline: '', addedDate: '', order: 0, priority: TaskPriorities.Low}
        ],
        'todolistId2': [
            {id: '1', title: 'bread', status: TaskStatuses.New, todoListId: "todolistId2", description: '', startDate: '', deadline: '', addedDate: '', order: 0, priority: TaskPriorities.Low},
            {id: '3', title: 'tea', status: TaskStatuses.New, todoListId: "todolistId2", description: '', startDate: '', deadline: '', addedDate: '', order: 0, priority: TaskPriorities.Low}
        ]
    })
})

test('correct task should be added to correct array', () => {

    const action = addTaskAC({id: '0', title: 'TypeScript', status: TaskStatuses.New, todoListId: "todolistId1", description: '', startDate: '', deadline: '', addedDate: '', order: 0, priority: TaskPriorities.Low})
    const endState = tasksReducer(startState, action)

    expect(endState['todolistId1'].length).toBe(4)
    expect(endState['todolistId1'][0].title).toBe('TypeScript')
    expect(endState['todolistId2'].length).toBe(3)
    expect(endState['todolistId2'][0].id).toBeDefined()
    expect(endState['todolistId2'][0].title).toBe('bread')
    expect(endState['todolistId2'][0].status).toBe(TaskStatuses.New)
})

test('status of specified task should be changed', () => {

    const model = {
        title: 'bread',
        description: '',
        status: TaskStatuses.Completed,
        priority: TaskPriorities.Low,
        startDate: '',
        deadline: ''
    }

    const action = changeTaskAC('1', model, 'todolistId2')
    const endState = tasksReducer(startState, action)

    expect(endState['todolistId2'][0].status).toBe(TaskStatuses.Completed)
    expect(endState['todolistId2'][0].title).toBe('bread')
    expect(endState).toEqual({
        'todolistId1': [
            {id: '1', title: 'CSS', status: TaskStatuses.New, todoListId: "todolistId1", description: '', startDate: '', deadline: '', addedDate: '', order: 0, priority: TaskPriorities.Low},
            {id: '2', title: 'JS', status: TaskStatuses.Completed, todoListId: "todolistId1", description: '', startDate: '', deadline: '', addedDate: '', order: 0, priority: TaskPriorities.Low},
            {id: '3', title: 'React', status: TaskStatuses.New, todoListId: "todolistId1", description: '', startDate: '', deadline: '', addedDate: '', order: 0, priority: TaskPriorities.Low}
        ],
        'todolistId2': [
            {id: '1', title: 'bread', status: TaskStatuses.Completed, todoListId: "todolistId2", description: '', startDate: '', deadline: '', addedDate: '', order: 0, priority: TaskPriorities.Low},
            {id: '2', title: 'milk', status: TaskStatuses.Completed, todoListId: "todolistId2", description: '', startDate: '', deadline: '', addedDate: '', order: 0, priority: TaskPriorities.Low},
            {id: '3', title: 'tea', status: TaskStatuses.New, todoListId: "todolistId2", description: '', startDate: '', deadline: '', addedDate: '', order: 0, priority: TaskPriorities.Low}
        ]
    })
})

test('title of specified task should be changed', () => {

    const model = {
        title: 'beer',
        description: '',
        status: TaskStatuses.New,
        priority: TaskPriorities.Low,
        startDate: '',
        deadline: ''
    }

    const action = changeTaskAC('1', model, 'todolistId2')
    const endState = tasksReducer(startState, action)

    expect(endState['todolistId2'][0].title).toBe('beer')
    expect(endState).toEqual({
        'todolistId1': [
            {id: '1', title: 'CSS', status: TaskStatuses.New, todoListId: "todolistId1", description: '', startDate: '', deadline: '', addedDate: '', order: 0, priority: TaskPriorities.Low},
            {id: '2', title: 'JS', status: TaskStatuses.Completed, todoListId: "todolistId1", description: '', startDate: '', deadline: '', addedDate: '', order: 0, priority: TaskPriorities.Low},
            {id: '3', title: 'React', status: TaskStatuses.New, todoListId: "todolistId1", description: '', startDate: '', deadline: '', addedDate: '', order: 0, priority: TaskPriorities.Low}
        ],
        'todolistId2': [
            {id: '1', title: 'beer', status: TaskStatuses.New, todoListId: "todolistId2", description: '', startDate: '', deadline: '', addedDate: '', order: 0, priority: TaskPriorities.Low},
            {id: '2', title: 'milk', status: TaskStatuses.Completed, todoListId: "todolistId2", description: '', startDate: '', deadline: '', addedDate: '', order: 0, priority: TaskPriorities.Low},
            {id: '3', title: 'tea', status: TaskStatuses.New, todoListId: "todolistId2", description: '', startDate: '', deadline: '', addedDate: '', order: 0, priority: TaskPriorities.Low}
        ]
    })
})

test('new array should be added when new todolist is added', () => {
    let newTodolist = {id: v1(), title: 'What to learn', addedDate: '', order: 0}
    const action = addTodolistAC(newTodolist)
    const endState = tasksReducer(startState, action)

    const keys = Object.keys(endState)
    const newKey = keys.find(k => k != 'todolistId1' && k != 'todolistId2')
    if (!newKey) {
        throw Error('new key should be added')
    }

    expect(keys.length).toBe(3)
    expect(endState[newKey]).toEqual([])
})

test('property with todolistId should be deleted', () => {

    const action = removeTodolistAC('todolistId2')
    const endState = tasksReducer(startState, action)

    const keys = Object.keys(endState)

    expect(keys.length).toBe(1)
    expect(endState['todolistId2']).not.toBeDefined()
})

test('empty arrays should be added when we set todolists', () => {
    const action = setTodolistsAC([
        {id: '1', title: 'title 1', addedDate: '', order: 0},
        {id: '2', title: 'title 2', addedDate: '', order: 0}
    ])

    const endState = tasksReducer({}, action)

    const keys = Object.keys(endState)

    expect(keys.length).toBe(2)
    expect(endState['1']).toStrictEqual([])
    expect(endState['2']).toStrictEqual([])
})

test('tasks should be added for todolist', () => {
    const action = setTasksAC(startState["todolistId1"], 'todolistId1')

    const endState = tasksReducer({
        "todolistId2": [],
        "todolistId1": [],
    }, action)

    expect(endState["todolistId1"].length).toBe(3)
    expect(endState["todolistId2"].length).toBe(0)
})