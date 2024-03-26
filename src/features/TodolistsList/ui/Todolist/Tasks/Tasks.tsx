import React from "react";
import { Task } from "features/TodolistsList/ui/Todolist/Tasks/Task/Task";
import { TodolistDomainType } from "features/TodolistsList/model/todolistsSlice";
import { TaskStatuses } from "common/enums";
import { TaskType } from "features/TodolistsList/api/tasksApi.types";

type Props = {
  todolist: TodolistDomainType;
  tasks: Array<TaskType>;
};

export const Tasks = ({ todolist, tasks }: Props) => {
  const { filter, id } = todolist;

  let tasksForTodoList = tasks;

  if (filter === "active") {
    tasksForTodoList = tasks.filter((t) => t.status === TaskStatuses.New);
  }
  if (filter === "completed") {
    tasksForTodoList = tasks.filter((t) => t.status === TaskStatuses.Completed);
  }

  return (
    <div>
      {tasksForTodoList.map((t) => {
        return <Task key={t.id} todoListId={id} task={t} entityStatus={t.entityStatus} />;
      })}
    </div>
  );
};
