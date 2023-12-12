import React, {useState} from 'react';
import './App.css';
import {TaskType, Todolist} from "./components/Todolist";
import {v1} from "uuid";
import {AddItemForm} from "./components/AddItemForm";

export type FilterValuesType = 'active' | 'all' | 'completed';
type TodolistsType = {
    id: string
    title: string
    filter: FilterValuesType
};
type TasksStateType = {
    [key: string]: Array<TaskType>
};

function App() {

    let todolistID1 = v1()
    let todolistID2 = v1()

    let [todolists, setTodolists] = useState<Array<TodolistsType>>([
        {id: todolistID1, title: 'What to learn', filter: 'all'},
        {id: todolistID2, title: 'What to buy', filter: 'all'},
    ])
    let [tasks, setTasks] = useState<TasksStateType>({
        [todolistID1]: [
            {id: v1(), title: 'HTML&CSS', isDone: true},
            {id: v1(), title: 'JS', isDone: true},
            {id: v1(), title: 'ReactJS', isDone: false},

        ],
        [todolistID2]: [
            {id: v1(), title: 'Rest API', isDone: true},
            {id: v1(), title: 'GraphQL', isDone: false},
        ]
    })

    function removeTask(id: string, todolistId: string) {
        let todolistTasks = tasks[todolistId]
            tasks[todolistId] = todolistTasks.filter(task => task.id !== id)
        setTasks({...tasks})
    }
    function addTask(title: string, todolistId: string) {
        let task = {id: v1(), title: title, isDone: false};
        let todolistTasks = tasks[todolistId];
        tasks[todolistId] = [task, ...todolistTasks]
        setTasks({...tasks});
    }
    function changeTaskStatus(id: string, isDone: boolean, todolistId: string) {
        let todolistTasks = tasks[todolistId];
        let task = todolistTasks.find(t => t.id === id)
        if (task) {
            task.isDone = isDone;
            setTasks({...tasks})
        }
    }
    function changeFilter(value: FilterValuesType, todolistId: string) {
        let todolist = todolists.find(tl => tl.id === todolistId);
        if (todolist) {
            todolist.filter = value
            setTodolists([...todolists])
        }
    }
    function removeTodolist(id: string){
        setTodolists(todolists.filter(todolist => todolist.id !== id));
        delete tasks[id];
        setTasks({...tasks})
    }

    function addTodoList(title: string) {
        let newTodolistId = v1();
        let newTodolist: TodolistsType = {id: newTodolistId, title: title, filter: 'all'};
        setTodolists([newTodolist, ...todolists]);
        setTasks({...tasks, [newTodolistId]:[]});
    }

    function addEditedTask(id: string, title: string, todolistId: string) {
        let todolistTasks = tasks[todolistId];
        let task = todolistTasks.find(t => t.id === id)
        if (task) {
            task.title = title;
            setTasks({...tasks})
        }
    }

    function addEditedTodolist(title: string, todolistId: string) {
        let todolist = todolists.find(tl => tl.id === todolistId);
        if (todolist) {
            todolist.title = title
            setTodolists([...todolists])
        }
    }

    return (
        <div className="App">
            <AddItemForm addItem={addTodoList}/>
            {
                todolists.map(todolist => {
                    let allTodolistTasks = tasks[todolist.id]
                    let tasksForTodoList = allTodolistTasks
                    if (todolist.filter === 'active') {
                        tasksForTodoList = allTodolistTasks.filter(task => !task.isDone)
                    }
                    if (todolist.filter === 'completed') {
                        tasksForTodoList = allTodolistTasks.filter(task => task.isDone)
                    }
                    return <Todolist key={todolist.id}
                                     id={todolist.id}
                                     title={todolist.title}
                                     tasks={tasksForTodoList}
                                     removeTask={removeTask}
                                     changeFilter={changeFilter}
                                     addTask={addTask}
                                     changeTaskStatus={changeTaskStatus}
                                     filter={todolist.filter}
                                     removeTodolist={removeTodolist}
                                     editTask={addEditedTask}
                                     editTodolist={addEditedTodolist}
                    />
                })
            }
        </div>
    );
}

export default App;
