import React, {ChangeEvent, useCallback} from 'react';
import {EditableSpan} from "./EditableSpan";
import {IconButton} from "@mui/material";
import {Delete} from "@mui/icons-material";

type TaskPropsType = {
    id: string
    title: string
    isDone: boolean
    changeTaskStatus: (e: ChangeEvent<HTMLInputElement>) => void
    changeTaskTitle: (id: string, newTitle: string, todolistId: string) => void
    onClickRemoveTask: () => void
}

export const Task = (props: TaskPropsType) => {
    const changeTaskTitle = useCallback((newValue: string) => props.changeTaskTitle(props.id, newValue, props.id), [props.id, props.id]);

    return <div key={props.id} className={props.isDone ? 'is-done' : ''}>
        <input type="checkbox" checked={props.isDone} onChange={props.changeTaskStatus}/>
        <EditableSpan title={props.title} onChange={changeTaskTitle}/>
        <IconButton onClick={props.onClickRemoveTask}><Delete/></IconButton>
    </div>
}