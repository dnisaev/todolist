import React, {useReducer} from 'react';
import './App.css';
import {TaskType, Todolist} from "./components/Todolist";
import {v1} from "uuid";
import {AddItemForm} from "./components/AddItemForm";
import {AppBar, Button, Container, Grid, IconButton, Paper, Typography} from "@mui/material";
import Toolbar from '@mui/material/Toolbar';
import {Menu} from "@mui/icons-material";
import {
    addTodolistAC,
    changeTodolistFilterAC,
    changeTodolistTitleAC, removeTodolistAC,
    todolistsReducer
} from "./state/todolists-reducer";
import {addTaskAC, changeTaskStatusAC, changeTaskTitleAC, removeTaskAC, tasksReducer} from "./state/tasks-reducer";

export type FilterValuesType = 'active' | 'all' | 'completed';
export type TodolistsType = {
    id: string
    title: string
    filter: FilterValuesType
};
export type TasksStateType = {
    [key: string]: Array<TaskType>
};

function AppWithReducers() {
    let todolistID1 = v1()
    let todolistID2 = v1()

    let [todolists, dispatchToTodolists] = useReducer(todolistsReducer, [
        {id: todolistID1, title: 'What to learn', filter: 'all'},
        {id: todolistID2, title: 'What to buy', filter: 'all'},
    ])
    let [tasks, dispatchToTasks] = useReducer(tasksReducer, {
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
        const action = removeTaskAC(id, todolistId);
        dispatchToTasks(action);
    }
    function addTask(title: string, todolistId: string) {
        const action = addTaskAC(title, todolistId);
        dispatchToTasks(action);
    }
    function changeTaskStatus(id: string, isDone: boolean, todolistId: string) {
        const action = changeTaskStatusAC(id, isDone, todolistId);
        dispatchToTasks(action);
    }
    function changeFilter(value: FilterValuesType, todolistId: string) {
        const action = changeTodolistFilterAC(todolistId, value);
        dispatchToTodolists(action);
    }
    function removeTodolist(id: string) {
        const action = removeTodolistAC(id);
        dispatchToTodolists(action);
    }
    function addTodoList(title: string) {
        const action = addTodolistAC(title);
        dispatchToTodolists(action);
        dispatchToTasks(action);
    }
    function changeTaskTitle(id: string, title: string, todolistId: string) {
        const action = changeTaskTitleAC(id, title, todolistId);
        dispatchToTasks(action);
    }
    function changeTodolistTitle(id: string, title: string) {
        const action = changeTodolistTitleAC(id, title);
        dispatchToTodolists(action);
    }

    return (
        <div className="App">
            <AppBar position={'static'}>
                <Toolbar>
                    <IconButton edge={'start'} color={'inherit'} aria-label={'menu'}>
                        <Menu/>
                    </IconButton>
                    <Typography variant={'h6'}>
                        Todolist
                    </Typography>
                    <Button color={'inherit'}>Login</Button>
                </Toolbar>
            </AppBar>
            <Container fixed>
                <Grid container style={{padding: '20px'}}>
                    <AddItemForm addItem={addTodoList}/>
                </Grid>
                <Grid container spacing={'3'}>
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
                            return <Grid item>
                                <Paper style={{padding: '10px'}}>
                                    <Todolist key={todolist.id}
                                              id={todolist.id}
                                              title={todolist.title}
                                              tasks={tasksForTodoList}
                                              removeTask={removeTask}
                                              changeFilter={changeFilter}
                                              addTask={addTask}
                                              changeTaskStatus={changeTaskStatus}
                                              filter={todolist.filter}
                                              removeTodolist={removeTodolist}
                                              changeTaskTitle={changeTaskTitle}
                                              changeTodolistTitle={changeTodolistTitle}
                                    />
                                </Paper>
                            </Grid>
                        })
                    }
                </Grid>
            </Container>
        </div>
    );
}
export default AppWithReducers;