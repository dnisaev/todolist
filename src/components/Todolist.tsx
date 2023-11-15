import React from "react";
import {FilterValuesType} from "../App";

type PropsType = {
    title: string
    tasks: Array<TaskType>
    removeTask: (taskId: number) => void
    changeFilter: (value: FilterValuesType) => void
}

type TaskType = {
    id: number
    title: string
    isDone: boolean
}

export function Todolist(props: PropsType) {
    return (
        <div>
            <h3>{props.title}</h3>
            <div>
                <input/>
                <button> +</button>
            </div>
            <ul>
                {props.tasks.map((tasks) => {
                    // console.log(props)
                    // debugger
                    return (
                        <li key={tasks.id}>
                            <input type="checkbox" checked={tasks.isDone}/>
                            <span>{tasks.title}</span>
                            <button onClick={()=>{return(props.removeTask(tasks.id))}}>✖️</button>
                        </li>)
                })}
            </ul>
            <div>
                <button onClick={()=>{props.changeFilter('all')}}>All</button>
                <button onClick={()=>{props.changeFilter('active')}}>Active</button>
                <button onClick={()=>{props.changeFilter('completed')}}>Completed</button>
            </div>
        </div>
    );
}