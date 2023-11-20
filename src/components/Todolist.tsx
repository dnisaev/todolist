import React, {ChangeEvent, KeyboardEvent, useState} from 'react';
import {FilterValuesType} from "../App";

type PropsType = {
    title: string
    tasks: Array<TaskType>
    removeTask: (taskId: string) => void
    changeFilter: (value: FilterValuesType) => void
    addTask: (title: string) => void
}

type TaskType = {
    id: string
    title: string
    isDone: boolean
}

export function Todolist(props: PropsType) {

    let [title, setTitle] = useState('');

    const addTask = () => {
        props.addTask(title);
        setTitle('');
    };

    const onChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
        setTitle(event.currentTarget.value);
    };

    const onKeyDownHandler = (event: KeyboardEvent<HTMLInputElement>) => {
        if (event.key === 'Enter') {
            addTask()
        }
    };

    const onAllClickHandler = () => {
        props.changeFilter('all')
    };

    const onActiveClickHandler = () => {
        props.changeFilter('active')
    };

    const obCopletedClickHandler = () => {
        props.changeFilter('completed')
    }

    return (
        <div>
            <h3>{props.title}</h3>
            <div>
                <input value={title}
                       onChange={onChangeHandler}
                       onKeyDown={onKeyDownHandler}
                />
                <button onClick={addTask}>+</button>
            </div>
            <ul>
                {props.tasks.map((tasks) => {
                    // console.log(props)
                    // debugger
                    return (
                        <li key={tasks.id}>
                            <input type="checkbox" checked={tasks.isDone}/>
                            <span>{tasks.title}</span>
                            <button onClick={() => {
                                return (props.removeTask(tasks.id))
                            }}>✖️
                            </button>
                        </li>)
                })}
            </ul>
            <div>
                <button onClick={onAllClickHandler}>All
                </button>
                <button onClick={onActiveClickHandler}>Active
                </button>
                <button onClick={obCopletedClickHandler}>Completed
                </button>
            </div>
        </div>
    );
}