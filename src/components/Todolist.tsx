import React, {ChangeEvent, useCallback} from 'react';
import {FilterValuesType} from "../App";
import {AddItemForm} from "./AddItemForm";
import {EditableSpan} from "./EditableSpan";
import {Button, IconButton} from "@mui/material";
import {Delete} from "@mui/icons-material";
import {Task} from "./Task";

type TodolistPropsType = {
    id: string
    title: string
    tasks: Array<TaskType>
    removeTask: (taskId: string, todolistId: string) => void
    changeFilter: (value: FilterValuesType, todolistId: string) => void
    addTask: (title: string, todolistId: string) => void
    changeTaskStatus: (id: string, isDone: boolean, todolistId: string) => void
    changeTaskTitle: (id: string, newTitle: string, todolistId: string) => void
    filter: FilterValuesType
    removeTodolist: (id: string) => void
    changeTodolistTitle: (id: string, newTitle: string) => void
};

export type TaskType = {
    id: string
    title: string
    isDone: boolean
};

export const Todolist = React.memo((props: TodolistPropsType) => {
    console.log('Todolist called');
    const addTask = useCallback((title: string)=>{
        props.addTask(title, props.id)
    },[props.addTask, props.id]);
    const onAllClickHandler = useCallback(() => {
        props.changeFilter('all', props.id)
    },[props.changeFilter, props.id]);
    const onActiveClickHandler = useCallback(() => {
        props.changeFilter('active', props.id)
    },[props.changeFilter, props.id]);
    const onCompletedClickHandler = useCallback(() => {
        props.changeFilter('completed', props.id)
    },[props.changeFilter, props.id]);

    const changeTodolistTitle = useCallback((newTitle: string) => props.changeTodolistTitle(props.id, newTitle),[props.changeTodolistTitle, props.id]);

    let tasksForTodoList = props.tasks;
    if (props.filter === 'active') {
        tasksForTodoList = props.tasks.filter(task => !task.isDone)
    }
    if (props.filter === 'completed') {
        tasksForTodoList = props.tasks.filter(task => task.isDone)
    }
    return (
        <div>
            <h3 className={"removeTlButton"}>
                <EditableSpan title={props.title} onChange={changeTodolistTitle}/>
                <IconButton onClick={() => props.removeTodolist(props.id)}><Delete /></IconButton>
            </h3>
            <div>
                <AddItemForm addItem={addTask}/>
            </div>
            <div>
                {tasksForTodoList.map((tasks) => {
                    const onClickRemoveTask = () => props.removeTask(tasks.id, props.id);
                    const changeTaskStatus = (e: ChangeEvent<HTMLInputElement>) => {
                        let newIsDoneValue = e.currentTarget.checked
                        props.changeTaskStatus(tasks.id, newIsDoneValue, props.id)
                    }

                    return (
                        <Task key={tasks.id}
                              id={tasks.id}
                              title={tasks.title}
                              isDone={tasks.isDone}
                              changeTaskStatus={changeTaskStatus}
                              changeTaskTitle={props.changeTaskTitle}
                              onClickRemoveTask={onClickRemoveTask}/>
                )})};
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