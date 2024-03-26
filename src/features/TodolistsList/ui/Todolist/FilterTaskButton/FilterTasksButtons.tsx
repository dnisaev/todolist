import React from "react";
import { Button } from "@mui/material";
import { FilterValuesType, TodolistDomainType } from "features/TodolistsList/model/todolistsSlice";
import { useActions } from "common/hooks/useActions";

type Props = {
  todolist: TodolistDomainType;
};

export const FilterTasksButtons = ({ todolist }: Props) => {
  const { filter, id } = todolist;
  const { changeTodolistFilter } = useActions();

  const changeTasksFilterHandler = (filter: FilterValuesType) => {
    changeTodolistFilter({ filter, id });
  };

  return (
    <div>
      <Button
        variant={filter === "all" ? "outlined" : "text"}
        onClick={() => changeTasksFilterHandler("all")}
        color={"inherit"}
      >
        All
      </Button>
      <Button
        variant={filter === "active" ? "outlined" : "text"}
        onClick={() => changeTasksFilterHandler("active")}
        color={"primary"}
      >
        Active
      </Button>
      <Button
        variant={filter === "completed" ? "outlined" : "text"}
        onClick={() => changeTasksFilterHandler("completed")}
        color={"secondary"}
      >
        Completed
      </Button>
    </div>
  );
};
