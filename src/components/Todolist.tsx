import React, {ChangeEvent} from 'react';
import {FilterValuesType} from "../App";
import {AddItemForm} from "./AddItemForm";
import {EditableSpan} from "./EditableSpan";

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

export function Todolist(props: TodolistPropsType) {
    const addTask = (title: string) => {
        props.addTask(title, props.id)
    };
    const onAllClickHandler = () => {
        props.changeFilter('all', props.id)
    };
    const onActiveClickHandler = () => {
        props.changeFilter('active', props.id)
    };
    const onCompletedClickHandler = () => {
        props.changeFilter('completed', props.id)
    };

    const changeTodolistTitle = (newTitle: string) => props.changeTodolistTitle(props.id, newTitle);
    return (
        <div>
            <h3 className={"removeTlButton"}><EditableSpan title={props.title} onChange={changeTodolistTitle}/></h3>
            <button onClick={() => props.removeTodolist(props.id)}>✖️</button>
            <div>
                <AddItemForm addItem={addTask}/>
            </div>
            <ul>
                {props.tasks.map((tasks) => {
                    const onClickRemoveTask = () => props.removeTask(tasks.id, props.id);
                    const changeTaskStatus = (e: ChangeEvent<HTMLInputElement>) => {
                        let newIsDoneValue = e.currentTarget.checked
                        props.changeTaskStatus(tasks.id, newIsDoneValue, props.id)
                    }
                    const changeTaskTitle = (newValue: string) => props.changeTaskTitle(tasks.id, newValue, props.id);
                    return (
                        <li key={tasks.id} className={tasks.isDone ? 'is-done' : ''}>
                            <input type="checkbox" checked={tasks.isDone} onChange={changeTaskStatus}/>
                            <EditableSpan title={tasks.title} onChange={changeTaskTitle}/>
                            <button onClick={onClickRemoveTask}>✖️</button>
                        </li>)
                })}
            </ul>
            <div>
                <button className={props.filter === 'all' ? 'active-filter' : ''}
                        onClick={onAllClickHandler}>All
                </button>
                <button className={props.filter === 'active' ? 'active-filter' : ''}
                        onClick={onActiveClickHandler}>Active
                </button>
                <button className={props.filter === 'completed' ? 'active-filter' : ''}
                        onClick={onCompletedClickHandler}>Completed
                </button>
            </div>
        </div>
    );
}