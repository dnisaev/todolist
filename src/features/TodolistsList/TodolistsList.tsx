import { useSelector } from "react-redux";
import React, { useCallback, useEffect } from "react";
import { Grid, Paper } from "@mui/material";
import { AddItemForm } from "common/components/AddItemForm/AddItemForm";
import { Todolist } from "./Todolist/Todolist";
import { Navigate } from "react-router-dom";
import { TaskStatuses } from "common/enums";
import { selectTodolists } from "features/TodolistsList/todolists-selectors";
import { selectIsLoggedIn } from "features/auth/auth-selectors";
import { selectTasks } from "features/TodolistsList/tasks-selectors";
import { useActions } from "common/hooks/useActions";
import { FilterValuesType } from "features/TodolistsList/todolists-reducer";

type PropsType = {
  demo?: boolean;
};

export const TodolistsList = ({ demo = false }: PropsType) => {
  const todolists = useSelector(selectTodolists);
  const tasks = useSelector(selectTasks);
  const isLoggedIn = useSelector(selectIsLoggedIn);

  const {
    addTodolistTC,
    removeTodolistTC,
    fetchTodolistsTC,
    changeTodolistTitleTC,
    removeTaskTC,
    addTaskTC,
    updateTaskTC,
    changeTodolistFilter,
  } = useActions();

  useEffect(() => {
    if (demo || !isLoggedIn) {
      return;
    }
    fetchTodolistsTC();
  }, [fetchTodolistsTC, demo, isLoggedIn]);

  const removeTask = useCallback(
    (taskId: string, todolistId: string) => {
      removeTaskTC({ taskId, todolistId });
    },
    [removeTaskTC],
  );
  const addTask = useCallback(
    (todoListId: string, title: string) => {
      addTaskTC({ todoListId, title });
    },
    [addTaskTC],
  );
  const changeTaskStatus = useCallback(
    (id: string, status: TaskStatuses, todolistId: string) => {
      updateTaskTC({ taskId: id, domainModel: { status }, todolistId });
    },
    [updateTaskTC],
  );
  const changeFilter = useCallback(
    (value: FilterValuesType, todolistId: string) => {
      changeTodolistFilter({ id: todolistId, filter: value });
    },
    [changeTodolistFilter],
  );
  const removeTodolist = useCallback(
    (id: string) => {
      removeTodolistTC(id);
    },
    [removeTodolistTC],
  );
  const addTodoList = useCallback(
    (title: string) => {
      addTodolistTC(title);
    },
    [addTodolistTC],
  );
  const changeTaskTitle = useCallback(
    (id: string, title: string, todolistId: string) => {
      updateTaskTC({ taskId: id, domainModel: { title }, todolistId });
    },
    [updateTaskTC],
  );
  const changeTodolistTitle = useCallback(
    (id: string, title: string) => {
      changeTodolistTitleTC({ todolistId: id, title });
    },
    [changeTodolistTitleTC],
  );

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
                <Todolist
                  key={tl.id}
                  todolist={tl}
                  tasks={tasksForTodoList}
                  removeTask={removeTask}
                  changeFilter={changeFilter}
                  addTask={addTask}
                  changeTaskStatus={changeTaskStatus}
                  removeTodolist={removeTodolist}
                  changeTaskTitle={changeTaskTitle}
                  changeTodolistTitle={changeTodolistTitle}
                  demo={demo}
                />
              </Paper>
            </Grid>
          );
        })}
      </Grid>
    </>
  );
};
