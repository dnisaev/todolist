import React, {ChangeEvent} from 'react';
import {FilterValuesType} from "../App";
import {AddItemForm} from "./AddItemForm";
import {EditableSpan} from "./EditableSpan";

type PropsType = {
    id: string
    title: string
    tasks: Array<TaskType>
    removeTask: (taskId: string, todolistId: string) => void
    changeFilter: (value: FilterValuesType, todolistId: string) => void
    addTask: (title: string, todolistId: string) => void
    changeTaskStatus: (id: string, isDone: boolean, todolistId: string) => void
    filter: FilterValuesType
    removeTodolist: (id: string) => void
    editTask: (id: string, title: string, todolistId: string) => void
    editTodolist: (title: string, todolistId: string) => void
};

export type TaskType = {
    id: string
    title: string
    isDone: boolean
};

export function Todolist(props: PropsType) {
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

    const editTodolistHandler = () => props.editTodolist(props.title, props.id);
    return (
        <div>
            <h3 className={"removeTlButton"}><EditableSpan value={props.title} onChange={editTodolistHandler}/></h3>
            <button onClick={() => props.removeTodolist(props.id)}>✖️</button>
            <div>
                <AddItemForm addItem={addTask}/>
            </div>
            <ul>
                {props.tasks.map((tasks) => {
                    const onClickHandler = () => props.removeTask(tasks.id, props.id);
                    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
                        let newIsDoneValue = e.currentTarget.checked
                        props.changeTaskStatus(tasks.id, newIsDoneValue, props.id)
                    }
                    const editTaskHandler = () => props.editTask(tasks.id, tasks.title, props.id);
                    return (
                        <li key={tasks.id} className={tasks.isDone ? 'is-done' : ''}>
                            <input type="checkbox" checked={tasks.isDone} onChange={onChangeHandler}/>
                            <EditableSpan value={tasks.title} onChange={editTaskHandler}/>
                            <button onClick={onClickHandler}>✖️</button>
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