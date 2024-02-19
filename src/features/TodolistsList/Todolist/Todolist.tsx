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

export const Todolist = React.memo(({id, title, tasks, removeTask, changeFilter, addTask, changeTaskStatus, changeTaskTitle, filter, removeTodolist, changeTodolistTitle, entityStatus}: TodolistPropsType) => {
    console.log('Todolist is called');

    const dispatch: AppDispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchTasksTC(id))
    }, [dispatch, id])

    const onAddTask = useCallback((title: string) =>
        addTask(id, title), [addTask, id]);
    const onAllClickHandler = useCallback(() =>
        changeFilter('all', id), [changeFilter, id]);
    const onActiveClickHandler = useCallback(() =>
        changeFilter('active', id), [changeFilter, id]);
    const onCompletedClickHandler = useCallback(() =>
        changeFilter('completed', id), [changeFilter, id]);
    const onChangeTodolistTitle = useCallback((newTitle: string) =>
        changeTodolistTitle(id, newTitle), [changeTodolistTitle, id]);

    let tasksForTodoList = tasks;
    if (filter === 'active') {
        tasksForTodoList = tasks.filter(t => t.status === TaskStatuses.New)
    }
    if (filter === 'completed') {
        tasksForTodoList = tasks.filter(t => t.status === TaskStatuses.Completed)
    }
    return (
        <div>
            <h3 className={"removeTlButton"}>
                <EditableSpan title={title} onChange={onChangeTodolistTitle}
                              disabled={entityStatus === 'loading'}/>
                <IconButton onClick={() => removeTodolist(id)}
                            disabled={entityStatus === 'loading'}><Delete/></IconButton>
            </h3>
            <div>
                <AddItemForm addItem={onAddTask} disabled={entityStatus === 'loading'}/>
            </div>
            <div>
                {tasksForTodoList.map((tasks) => {
                    return (
                        <Task key={tasks.id}
                              todolistId={id}
                              task={tasks}
                              changeTaskStatus={changeTaskStatus}
                              changeTaskTitle={changeTaskTitle}
                              removeTask={removeTask}
                              entityStatus={tasks.entityStatus}/>
                    )
                })}
            </div>
            <div>
                <Button
                    variant={filter === 'all' ? 'outlined' : 'text'}
                    onClick={onAllClickHandler}
                    color={"inherit"}>All
                </Button>
                <Button
                    variant={filter === 'active' ? 'outlined' : 'text'}
                    onClick={onActiveClickHandler}
                    color={'primary'}>Active
                </Button>
                <Button
                    variant={filter === 'completed' ? 'outlined' : 'text'}
                    onClick={onCompletedClickHandler}
                    color={'secondary'}>Completed
                </Button>
            </div>
        </div>
    );
});