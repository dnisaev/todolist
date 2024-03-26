import React, { memo, useEffect } from "react";
import { AddItemForm } from "common/components/AddItemForm/AddItemForm";
import { TodolistDomainType } from "features/TodolistsList/model/todolistsSlice";
import { TaskType } from "features/TodolistsList/api/tasksApi.types";
import { useActions } from "common/hooks/useActions";
import { FilterTasksButtons } from "features/TodolistsList/ui/Todolist/FilterTaskButton/FilterTasksButtons";
import { Tasks } from "features/TodolistsList/ui/Todolist/Tasks/Tasks";
import { TodolistTitle } from "features/TodolistsList/ui/Todolist/TodolistTitle/TodolistTitle";

type Props = {
  todolist: TodolistDomainType;
  tasks: Array<TaskType>;
  demo?: boolean;
};

export const Todolist = memo(({ todolist, tasks, demo = false }: Props) => {
  const { addTaskTC, fetchTasksTC } = useActions();

  useEffect(() => {
    if (demo) {
      return;
    }
    fetchTasksTC(todolist.id);
  }, [fetchTasksTC, todolist.id, demo]);

  const addTaskCallback = (title: string) => {
    return addTaskTC({ todoListId: todolist.id, title }).unwrap();
  };

  return (
    <div>
      <TodolistTitle todolist={todolist} />
      <AddItemForm addItem={addTaskCallback} disabled={todolist.entityStatus === "loading"} />
      <Tasks todolist={todolist} tasks={tasks} />
      <FilterTasksButtons todolist={todolist} />
    </div>
  );
});
