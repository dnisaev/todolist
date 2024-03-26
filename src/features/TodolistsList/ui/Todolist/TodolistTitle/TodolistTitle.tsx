import React from "react";
import { EditableSpan } from "common/components";
import { IconButton } from "@mui/material";
import { Delete } from "@mui/icons-material";
import { useActions } from "common/hooks/useActions";
import { TodolistDomainType } from "features/TodolistsList/model/todolistsSlice";

type Props = {
  todolist: TodolistDomainType;
};

export const TodolistTitle = ({ todolist }: Props) => {
  const { changeTodolistTitleTC, removeTodolistTC } = useActions();

  const changeTitleCallback = (title: string) => changeTodolistTitleTC({ todoListId: todolist.id, title });
  const removeTodolistCallback = () => removeTodolistTC(todolist.id);

  return (
    <h3 className={"removeTlButton"}>
      <EditableSpan
        title={todolist.title}
        onChange={changeTitleCallback}
        disabled={todolist.entityStatus === "loading"}
      />
      <IconButton onClick={removeTodolistCallback} disabled={todolist.entityStatus === "loading"}>
        <Delete />
      </IconButton>
    </h3>
  );
};
