import React, {useCallback} from 'react';
import './App.css';
import {TaskType, Todolist} from "./components/Todolist";
import {AddItemForm} from "./components/AddItemForm";
import {AppBar, Button, Container, Grid, IconButton, Paper, Typography} from "@mui/material";
import Toolbar from '@mui/material/Toolbar';
import {Menu} from "@mui/icons-material";
import {
    addTodolistAC,
    changeTodolistFilterAC,
    changeTodolistTitleAC,
    removeTodolistAC
} from "./state/todolists-reducer";
import {addTaskAC, changeTaskStatusAC, changeTaskTitleAC, removeTaskAC} from "./state/tasks-reducer";
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "./state/store";

export type FilterValuesType = 'active' | 'all' | 'completed';
export type TodolistsType = {
    id: string
    title: string
    filter: FilterValuesType
};
export type TasksStateType = {
    [key: string]: Array<TaskType>
};

function AppWithRedux() {
    console.log('App is called')
    const todolists = useSelector<AppRootStateType, Array<TodolistsType>>(state => state.todolists);
    const tasks = useSelector<AppRootStateType, TasksStateType>(state => state.tasks);
    const dispatch = useDispatch();

    const removeTask = useCallback((id: string, todolistId: string)=>{
        const action = removeTaskAC(id, todolistId);
        dispatch(action);
    },[dispatch]);
    const addTask = useCallback((title: string, todolistId: string)=>{
        const action = addTaskAC(title, todolistId);
        dispatch(action);
    },[dispatch]);
    const changeTaskStatus = useCallback((id: string, isDone: boolean, todolistId: string)=>{
        const action = changeTaskStatusAC(id, isDone, todolistId);
        dispatch(action);
    },[dispatch]);
    const changeFilter = useCallback((value: FilterValuesType, todolistId: string)=>{
        const action = changeTodolistFilterAC(todolistId, value);
        dispatch(action);
    },[dispatch]);
    const removeTodolist = useCallback((id: string)=>{
        const action = removeTodolistAC(id);
        dispatch(action);
    },[dispatch]);
    const addTodoList = useCallback((title:string)=>{
        const action = addTodolistAC(title);
        dispatch(action);
    },[dispatch]);
    const changeTaskTitle = useCallback((id: string, title: string, todolistId: string)=>{
        const action = changeTaskTitleAC(id, title, todolistId);
        dispatch(action);
    },[dispatch]);
    const changeTodolistTitle = useCallback((id: string, title: string)=>{
        const action = changeTodolistTitleAC(id, title);
        dispatch(action);
    },[dispatch]);

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
                <Grid container spacing={3}>
                    {
                        todolists.map(todolist => {
                            let tasksForTodoList = tasks[todolist.id]
                            return <Grid key={todolist.id} item>
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
export default AppWithRedux;