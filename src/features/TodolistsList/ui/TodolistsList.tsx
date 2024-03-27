import { useSelector } from "react-redux";
import React, { useEffect } from "react";
import { Grid, Paper } from "@mui/material";
import { AddItemForm } from "common/components/AddItemForm/AddItemForm";
import { Todolist } from "features/TodolistsList/ui/Todolist/Todolist";
import { Navigate } from "react-router-dom";
import { useActions } from "common/hooks/useActions";
import { selectTodolists } from "features/TodolistsList/model/todolistsSlice";
import { selectTasks } from "features/TodolistsList/model/tasksSlice";
import { selectIsLoggedIn } from "features/auth/model/authSlice";

type Props = {
  demo?: boolean;
};

export const TodolistsList = ({ demo = false }: Props) => {
  const todolists = useSelector(selectTodolists);
  const tasks = useSelector(selectTasks);
  const { isLoggedIn } = useSelector(selectIsLoggedIn);
  const { addTodolistTC, fetchTodolistsTC } = useActions();

  useEffect(() => {
    if (demo || !isLoggedIn) {
      return;
    }
    fetchTodolistsTC();
  }, [fetchTodolistsTC, demo, isLoggedIn]);

  const addTodoList = (title: string) => {
    return addTodolistTC(title).unwrap();
  };

  if (!isLoggedIn) {
    return <Navigate to={"/login"} />;
  }

  return (
    <>
      <Grid container style={{ padding: "20px" }}>
        <AddItemForm addItem={addTodoList} />
      </Grid>
      <Grid container spacing={3}>
        {todolists.map((tl) => {
          let tasksForTodoList = tasks[tl.id];
          return (
            <Grid key={tl.id} item>
              <Paper style={{ padding: "10px" }}>
                <Todolist key={tl.id} todolist={tl} tasks={tasksForTodoList} demo={demo} />
              </Paper>
            </Grid>
          );
        })}
      </Grid>
    </>
  );
};
