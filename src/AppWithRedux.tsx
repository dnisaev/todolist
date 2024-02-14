import React, {useCallback, useEffect} from 'react';
import './App.css';
import {Todolist} from "./components/Todolist";
import {AddItemForm} from "./components/AddItemForm";
import {AppBar, Button, Container, Grid, IconButton, Paper, Typography} from "@mui/material";
import Toolbar from '@mui/material/Toolbar';
import {Menu} from "@mui/icons-material";
import {
    addTodolistTC,
    changeTodolistFilterAC,
    changeTodolistTitleTC, fetchThenTodolistsTC, FilterValuesType,
    removeTodolistTC, TodolistDomainType
} from "./state/todolists-reducer";
import {
    addTaskTC,
    changeTaskTitleTC,
    removeTaskTC,
    updateTaskStatusTC
} from "./state/tasks-reducer";
import {useDispatch, useSelector} from "react-redux";
import {AppDispatch, AppRootStateType} from "./state/store";
import {TaskStatuses, TaskType} from "./api/todolists-api";

export type TasksStateType = {
    [key: string]: Array<TaskType>
};

function AppWithRedux() {
    console.log('App is called')

    const dispatch: AppDispatch = useDispatch();

    useEffect(()=>{
        dispatch(fetchThenTodolistsTC())
    },[dispatch])

    const todolists = useSelector<AppRootStateType, Array<TodolistDomainType>>(state => state.todolists);
    const tasks = useSelector<AppRootStateType, TasksStateType>(state => state.tasks);

    const removeTask = useCallback((id: string, todolistId: string)=>{
        const thunk = removeTaskTC(id, todolistId);
        dispatch(thunk);
    },[dispatch]);

    const addTask = useCallback((todolistId: string, title: string)=>{
        const thunk = addTaskTC(todolistId, title);
        dispatch(thunk);
    },[dispatch]);

    const changeTaskStatus = useCallback((id: string, status: TaskStatuses, todolistId: string)=>{
        const thunk = updateTaskStatusTC(id, status, todolistId);
        dispatch(thunk);
    },[dispatch]);

    const changeFilter = useCallback((value: FilterValuesType, todolistId: string)=>{
        const action = changeTodolistFilterAC(todolistId, value);
        dispatch(action);
    },[dispatch]);

    const removeTodolist = useCallback((id: string)=>{
        const thunk = removeTodolistTC(id);
        dispatch(thunk);
    },[dispatch]);

    const addTodoList = useCallback((title:string)=>{
        const thunk = addTodolistTC(title);
        dispatch(thunk);
    },[dispatch]);

    const changeTaskTitle = useCallback((id: string, title: string, todolistId: string)=>{
        const thunk = changeTaskTitleTC(id, title, todolistId);
        dispatch(thunk);
    },[dispatch]);

    const changeTodolistTitle = useCallback((id: string, title: string)=>{
        const thunk = changeTodolistTitleTC(id, title);
        dispatch(thunk);
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