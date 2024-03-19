import React, { useCallback, useEffect } from "react";
import "./App.css";
import { AppBar, Button, CircularProgress, Container, IconButton, LinearProgress, Typography } from "@mui/material";
import Toolbar from "@mui/material/Toolbar";
import { Menu } from "@mui/icons-material";
import { TodolistsList } from "features/TodolistsList/TodolistsList";
import { useSelector } from "react-redux";
import { AppDispatch } from "./store";
import { initializeAppTC } from "./app-reducer";
import { ErrorSnackbar } from "common/components/ErrorSnackbar/ErrorSnackbar";
import { Login } from "features/auth/Login";
import { Navigate, Route, Routes } from "react-router-dom";
import { logoutTC } from "features/auth/auth-reducer";
import { useAppDispatch } from "common/hooks";
import { selectAppStatus, selectIsInitialized } from "app/app.selectors";
import { selectIsLoggedIn } from "features/auth/auth.selectors";

type PropsType = {
  demo?: boolean;
};

export function App({ demo = false }: PropsType) {
  const status = useSelector(selectAppStatus);
  const isInitialized = useSelector(selectIsInitialized);
  const isLoggedIn = useSelector(selectIsLoggedIn);

  const dispatch: AppDispatch = useAppDispatch();

  useEffect(() => {
    if (!demo) {
      dispatch(initializeAppTC());
    }
  }, [dispatch, demo]);

  const logoutHandler = useCallback(() => {
    dispatch(logoutTC());
  }, [dispatch]);

  if (!isInitialized) {
    return (
      <div style={{ position: "fixed", top: "30%", textAlign: "center", width: "100%" }}>
        <CircularProgress />
      </div>
    );
  }

  return (
    <div className="App">
      <ErrorSnackbar />
      <AppBar position={"static"}>
        <Toolbar>
          <IconButton edge={"start"} color={"inherit"} aria-label={"menu"}>
            <Menu />
          </IconButton>
          <Typography variant={"h6"}>Todolist</Typography>
          {isLoggedIn ? (
            <Button color={"inherit"} onClick={logoutHandler}>
              Logout
            </Button>
          ) : (
            <Button color={"inherit"}>Login</Button>
          )}
        </Toolbar>
        {status === "loading" && <LinearProgress />}
      </AppBar>
      <Container fixed>
        <Routes>
          <Route path={"/"} element={<TodolistsList demo={demo} />} />
          <Route path={"/todolist"} element={<Navigate to={"/"} />} />
          <Route path={"/login"} element={<Login />} />
          <Route path={"/404"} element={<h1>404: PAGE NOT FOUND</h1>} />
          <Route path={"/*"} element={<Navigate to={"/404"} />} />
        </Routes>
      </Container>
    </div>
  );
}
