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

export const Task = React.memo(({
                                    todolistId,
                                    id,
                                    title,
                                    isDone,
                                    changeTaskTitle,
                                    changeTaskStatus,
                                    removeTask
                                }: TaskPropsType) => {
    console.log('Task is called')
    const onClickRemoveTask = () => removeTask(id, todolistId);
    const changeTaskStatusHandler = (e: ChangeEvent<HTMLInputElement>) => {
        let newIsDoneValue = e.currentTarget.checked
        changeTaskStatus(id, newIsDoneValue, todolistId)
    }
    const changeTaskTitleHandler = useCallback((newValue: string) => changeTaskTitle(id, newValue, todolistId), [changeTaskTitle, id, todolistId]);

    return <div key={id} className={isDone ? 'is-done' : ''}>
        <input type="checkbox" checked={isDone} onChange={changeTaskStatusHandler}/>
        <EditableSpan title={title} onChange={changeTaskTitleHandler}/>
        <IconButton onClick={onClickRemoveTask}><Delete/></IconButton>
    </div>
});