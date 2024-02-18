import React, {useCallback, useEffect} from 'react';
import {AddItemForm} from "../../../components/AddItemForm/AddItemForm";
import {EditableSpan} from "../../../components/EditableSpan/EditableSpan";
import {Button, IconButton} from "@mui/material";
import {Delete} from "@mui/icons-material";
import {Task} from "./Task/Task";
import {TaskStatuses, TaskType} from "../../../api/todolists-api";
import {FilterValuesType} from "../todolists-reducer";
import {useDispatch} from "react-redux";
import {fetchTasksTC} from "../tasks-reducer";
import {AppDispatch} from "../../../app/store";
import {RequestStatusType} from "../../../app/app-reducer";

type TodolistPropsType = {
    id: string
    title: string
    tasks: Array<TaskType>
    removeTask: (taskId: string, todolistId: string) => void
    changeFilter: (value: FilterValuesType, todolistId: string) => void
    addTask: (todolistId: string, title: string) => void
    changeTaskStatus: (id: string, status: TaskStatuses, todolistId: string) => void
    changeTaskTitle: (id: string, newTitle: string, todolistId: string) => void
    filter: FilterValuesType
    removeTodolist: (id: string) => void
    changeTodolistTitle: (id: string, newTitle: string) => void
    entityStatus: RequestStatusType
};

export const Todolist = React.memo((props: TodolistPropsType) => {
    console.log('Todolist is called');

    const dispatch: AppDispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchTasksTC(props.id))
    }, [dispatch, props.id])

    const addTask = useCallback((title: string) =>
        props.addTask(props.id, title), [props.addTask, props.id]);
    const onAllClickHandler = useCallback(() =>
        props.changeFilter('all', props.id), [props.changeFilter, props.id]);
    const onActiveClickHandler = useCallback(() =>
        props.changeFilter('active', props.id), [props.changeFilter, props.id]);
    const onCompletedClickHandler = useCallback(() =>
        props.changeFilter('completed', props.id), [props.changeFilter, props.id]);
    const changeTodolistTitle = useCallback((newTitle: string) =>
        props.changeTodolistTitle(props.id, newTitle), [props.changeTodolistTitle, props.id]);

    let tasksForTodoList = props.tasks;
    if (props.filter === 'active') {
        tasksForTodoList = props.tasks.filter(task => task.status === TaskStatuses.New)
    }
    if (props.filter === 'completed') {
        tasksForTodoList = props.tasks.filter(task => task.status === TaskStatuses.Completed)
    }
    return (
        <div>
            <h3 className={"removeTlButton"}>
                <EditableSpan title={props.title} onChange={changeTodolistTitle}
                              disabled={props.entityStatus === 'loading'}/>
                <IconButton onClick={() => props.removeTodolist(props.id)}
                            disabled={props.entityStatus === 'loading'}><Delete/></IconButton>
            </h3>
            <div>
                <AddItemForm addItem={addTask} disabled={props.entityStatus === 'loading'}/>
            </div>
            <div>
                {tasksForTodoList.map((tasks) => {
                    return (
                        <Task key={tasks.id}
                              todolistId={props.id}
                              task={tasks}
                              changeTaskStatus={props.changeTaskStatus}
                              changeTaskTitle={props.changeTaskTitle}
                              removeTask={props.removeTask}
                              entityStatus={tasks.entityStatus}/>
                    )
                })}
            </div>
            <div>
                <Button
                    variant={props.filter === 'all' ? 'outlined' : 'text'}
                    onClick={onAllClickHandler}
                    color={"inherit"}>All
                </Button>
                <Button
                    variant={props.filter === 'active' ? 'outlined' : 'text'}
                    onClick={onActiveClickHandler}
                    color={'primary'}>Active
                </Button>
                <Button
                    variant={props.filter === 'completed' ? 'outlined' : 'text'}
                    onClick={onCompletedClickHandler}
                    color={'secondary'}>Completed
                </Button>
            </div>
        </div>
    );
});