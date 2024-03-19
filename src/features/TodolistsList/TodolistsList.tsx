import { AppDispatch } from "app/store";
import { useSelector } from "react-redux";
import React, { useCallback, useEffect } from "react";
import {
  addTodolistTC,
  changeTodolistFilter,
  changeTodolistTitleTC,
  fetchTodolistsTC,
  FilterValuesType,
  removeTodolistTC,
} from "./todolists-reducer";
import { addTaskTC, removeTaskTC, updateTaskTC } from "./tasks-reducer";
import { Grid, Paper } from "@mui/material";
import { AddItemForm } from "common/components/AddItemForm/AddItemForm";
import { Todolist } from "./Todolist/Todolist";
import { Navigate } from "react-router-dom";
import { useAppDispatch } from "common/hooks";
import { TaskStatuses } from "common/enums";
import { selectTodolists } from "features/TodolistsList/todolists.selectors";
import { selectIsLoggedIn } from "features/auth/auth.selectors";
import { selectTasks } from "features/TodolistsList/tasks.selectors";

type PropsType = {
  demo?: boolean;
};

export const TodolistsList = ({ demo = false }: PropsType) => {
  const todolists = useSelector(selectTodolists);
  const tasks = useSelector(selectTasks);
  const isLoggedIn = useSelector(selectIsLoggedIn);

  const dispatch: AppDispatch = useAppDispatch();

  useEffect(() => {
    if (demo || !isLoggedIn) {
      return;
    }
    dispatch(fetchTodolistsTC());
  }, [dispatch, demo, isLoggedIn]);

  const removeTask = useCallback(
    (taskId: string, todolistId: string) => {
      const thunk = removeTaskTC({ taskId, todolistId });
      dispatch(thunk);
    },
    [dispatch],
  );
  const addTask = useCallback(
    (todoListId: string, title: string) => {
      const thunk = addTaskTC({ todoListId, title });
      dispatch(thunk);
    },
    [dispatch],
  );
  const changeTaskStatus = useCallback(
    (id: string, status: TaskStatuses, todolistId: string) => {
      const thunk = updateTaskTC({ taskId: id, domainModel: { status }, todolistId });
      dispatch(thunk);
    },
    [dispatch],
  );
  const changeFilter = useCallback(
    (value: FilterValuesType, todolistId: string) => {
      const action = changeTodolistFilter({ id: todolistId, filter: value });
      dispatch(action);
    },
    [dispatch],
  );
  const removeTodolist = useCallback(
    (id: string) => {
      const thunk = removeTodolistTC(id);
      dispatch(thunk);
    },
    [dispatch],
  );
  const addTodoList = useCallback(
    (title: string) => {
      const thunk = addTodolistTC(title);
      dispatch(thunk);
    },
    [dispatch],
  );
  const changeTaskTitle = useCallback(
    (id: string, title: string, todolistId: string) => {
      const thunk = updateTaskTC({ taskId: id, domainModel: { title }, todolistId });
      dispatch(thunk);
    },
    [dispatch],
  );
  const changeTodolistTitle = useCallback(
    (id: string, title: string) => {
      const thunk = changeTodolistTitleTC({ todolistId: id, title });
      dispatch(thunk);
    },
    [dispatch],
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
