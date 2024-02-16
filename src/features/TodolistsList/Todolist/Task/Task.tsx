import React, {ChangeEvent, useCallback} from 'react';
import {EditableSpan} from "../../../../components/EditableSpan/EditableSpan";
import {IconButton} from "@mui/material";
import {Delete} from "@mui/icons-material";
import {TaskStatuses} from "../../../../api/todolists-api";

type TaskPropsType = {
    task: {
        id: string
        title: string
        status: TaskStatuses
    }
    todolistId: string
    changeTaskStatus: (id: string, status: TaskStatuses, todolistId: string) => void
    changeTaskTitle: (id: string, newTitle: string, todolistId: string) => void
    removeTask: (taskId: string, todolistId: string) => void
}

export const Task = React.memo(({
                                    todolistId,
                                    task,
                                    changeTaskTitle,
                                    changeTaskStatus,
                                    removeTask
                                }: TaskPropsType) => {
    console.log('Task is called')
    const onClickRemoveTask = () => removeTask(task.id, todolistId);
    const changeTaskStatusHandler = (e: ChangeEvent<HTMLInputElement>) => {
        let newIsDoneValue = e.currentTarget.checked
        changeTaskStatus(task.id, newIsDoneValue ? TaskStatuses.Completed : TaskStatuses.New, todolistId)
    }
    const changeTaskTitleHandler = useCallback((newValue: string) => changeTaskTitle(task.id, newValue, todolistId), [changeTaskTitle, task.id, todolistId]);

    return <div key={task.id} className={task.status === TaskStatuses.Completed ? 'is-done' : ''}>
        <input type="checkbox" checked={task.status === TaskStatuses.Completed} onChange={changeTaskStatusHandler}/>
        <EditableSpan title={task.title} onChange={changeTaskTitleHandler}/>
        <IconButton onClick={onClickRemoveTask}><Delete/></IconButton>
    </div>
});