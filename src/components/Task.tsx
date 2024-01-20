import React, {ChangeEvent, useCallback} from 'react';
import {EditableSpan} from "./EditableSpan";
import {IconButton} from "@mui/material";
import {Delete} from "@mui/icons-material";

type TaskPropsType = {
    todolistId: string
    id: string
    title: string
    isDone: boolean
    changeTaskStatus: (id: string, isDone: boolean, todolistId: string) => void
    changeTaskTitle: (id: string, newTitle: string, todolistId: string) => void
    removeTask: (taskId: string, todolistId: string) => void
}

export const Task = React.memo((props: TaskPropsType) => {
    const onClickRemoveTask = () => props.removeTask(props.id, props.todolistId);
    const changeTaskStatus = (e: ChangeEvent<HTMLInputElement>) => {
        let newIsDoneValue = e.currentTarget.checked
        props.changeTaskStatus(props.id, newIsDoneValue, props.todolistId)
    }
    const changeTaskTitle = useCallback((newValue: string) => props.changeTaskTitle(props.id, newValue, props.todolistId), [props.id, props.todolistId]);

    return <div key={props.id} className={props.isDone ? 'is-done' : ''}>
        <input type="checkbox" checked={props.isDone} onChange={changeTaskStatus}/>
        <EditableSpan title={props.title} onChange={changeTaskTitle}/>
        <IconButton onClick={onClickRemoveTask}><Delete/></IconButton>
    </div>
});