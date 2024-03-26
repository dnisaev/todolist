import React, { memo, useEffect } from "react";
import { AddItemForm } from "common/components/AddItemForm/AddItemForm";
import { EditableSpan } from "common/components/EditableSpan/EditableSpan";
import { Button, IconButton } from "@mui/material";
import { Delete } from "@mui/icons-material";
import { Task } from "features/TodolistsList/ui/Todolist/Task/Task";
import { TodolistDomainType } from "features/TodolistsList/model/todolistsSlice";
import { TaskStatuses } from "common/enums";
import { TaskType } from "features/TodolistsList/api/tasksApi.types";
import { useActions } from "common/hooks/useActions";

type Props = {
  todolist: TodolistDomainType;
  tasks: Array<TaskType>;
  demo?: boolean;
};

export const Todolist = memo(({ todolist, tasks, demo = false }: Props) => {
  const { addTaskTC, fetchTasksTC, changeTodolistTitleTC, changeTodolistFilter, removeTodolistTC } = useActions();

  useEffect(() => {
    if (demo) {
      return;
    }
    fetchTasksTC(todolist.id);
  }, [fetchTasksTC, todolist.id, demo]);

  const addTaskCallback = (title: string) => addTaskTC({ todoListId: todolist.id, title });

  const changeTitleCallback = (title: string) => changeTodolistTitleTC({ todoListId: todolist.id, title });

  const onAllClickHandler = () => changeTodolistFilter({ filter: "all", id: todolist.id });
  const onActiveClickHandler = () => changeTodolistFilter({ filter: "active", id: todolist.id });
  const onCompletedClickHandler = () => changeTodolistFilter({ filter: "completed", id: todolist.id });

  let tasksForTodoList = tasks;

  if (todolist.filter === "active") {
    tasksForTodoList = tasks.filter((t) => t.status === TaskStatuses.New);
  }
  if (todolist.filter === "completed") {
    tasksForTodoList = tasks.filter((t) => t.status === TaskStatuses.Completed);
  }
  return (
    <div>
      <h3 className={"removeTlButton"}>
        <EditableSpan
          title={todolist.title}
          onChange={changeTitleCallback}
          disabled={todolist.entityStatus === "loading"}
        />
        <IconButton onClick={() => removeTodolistTC(todolist.id)} disabled={todolist.entityStatus === "loading"}>
          <Delete />
        </IconButton>
      </h3>
      <div>
        <AddItemForm addItem={addTaskCallback} disabled={todolist.entityStatus === "loading"} />
      </div>
      <div>
        {tasksForTodoList.map((tasks) => {
          return <Task key={tasks.id} todoListId={todolist.id} task={tasks} entityStatus={tasks.entityStatus} />;
        })}
      </div>
      <div>
        <Button variant={todolist.filter === "all" ? "outlined" : "text"} onClick={onAllClickHandler} color={"inherit"}>
          All
        </Button>
        <Button
          variant={todolist.filter === "active" ? "outlined" : "text"}
          onClick={onActiveClickHandler}
          color={"primary"}
        >
          Active
        </Button>
        <Button
          variant={todolist.filter === "completed" ? "outlined" : "text"}
          onClick={onCompletedClickHandler}
          color={"secondary"}
        >
          Completed
        </Button>
      </div>
    </div>
  );
});
