import {AppDispatch, AppRootStateType} from "../../app/store";
import {useDispatch, useSelector} from "react-redux";
import React, {useCallback, useEffect} from "react";
import {
    addTodolistTC,
    changeTodolistFilterAC, changeTodolistTitleTC,
    fetchTodolistsTC,
    FilterValuesType, removeTodolistTC,
    TodolistDomainType
} from "./todolists-reducer";
import {addTaskTC, removeTaskTC, TasksStateType, updateTaskTC} from "./tasks-reducer";
import {TaskStatuses} from "../../api/todolists-api";
import {Grid, Paper} from "@mui/material";
import {AddItemForm} from "../../components/AddItemForm/AddItemForm";
import {Todolist} from "./Todolist/Todolist";

type PropsType = {
    demo?: boolean
}

export const TodolistsList = ({demo = false}: PropsType) => {
    console.log('TodolistsList is called');

    const dispatch: AppDispatch = useDispatch();

    useEffect(() => {
        if (demo) {
            return
        }
        dispatch(fetchTodolistsTC())
    }, [dispatch, demo])

    const todolists = useSelector<AppRootStateType, Array<TodolistDomainType>>(state => state.todolists);
    const tasks = useSelector<AppRootStateType, TasksStateType>(state => state.tasks);

    const removeTask = useCallback((id: string, todolistId: string) => {
        const thunk = removeTaskTC(id, todolistId);
        dispatch(thunk);
    }, [dispatch]);
    const addTask = useCallback((todolistId: string, title: string) => {
        const thunk = addTaskTC(todolistId, title);
        dispatch(thunk);
    }, [dispatch]);
    const changeTaskStatus = useCallback((id: string, status: TaskStatuses, todolistId: string) => {
        const thunk = updateTaskTC(id, {status}, todolistId);
        dispatch(thunk);
    }, [dispatch]);
    const changeFilter = useCallback((value: FilterValuesType, todolistId: string) => {
        const action = changeTodolistFilterAC(todolistId, value);
        dispatch(action);
    }, [dispatch]);
    const removeTodolist = useCallback((id: string) => {
        const thunk = removeTodolistTC(id);
        dispatch(thunk);
    }, [dispatch]);
    const addTodoList = useCallback((title: string) => {
        const thunk = addTodolistTC(title);
        dispatch(thunk);
    }, [dispatch]);
    const changeTaskTitle = useCallback((id: string, title: string, todolistId: string) => {
        const thunk = updateTaskTC(id, {title}, todolistId);
        dispatch(thunk);
    }, [dispatch]);
    const changeTodolistTitle = useCallback((id: string, title: string) => {
        const thunk = changeTodolistTitleTC(id, title);
        dispatch(thunk);
    }, [dispatch]);

    return (
        <>
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
                                          entityStatus={todolist.entityStatus}
                                          demo={demo}
                                />
                            </Paper>
                        </Grid>
                    })
                }
            </Grid>
        </>
    )
};