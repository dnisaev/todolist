import React, { useCallback, useEffect } from "react";
import { AppBar, Button, CircularProgress, Container, IconButton, LinearProgress, Typography } from "@mui/material";
import Toolbar from "@mui/material/Toolbar";
import { Menu } from "@mui/icons-material";
import { TodolistsList } from "features/TodolistsList/ui/TodolistsList";
import { useSelector } from "react-redux";
import { ErrorSnackbar } from "common/components/ErrorSnackbar/ErrorSnackbar";
import { Login } from "features/auth/ui/login/Login";
import { Navigate, Route, Routes } from "react-router-dom";
import { useActions } from "common/hooks/useActions";
import { selectIsLoggedIn } from "features/auth/model/authSlice";
import { selectAppStatus, selectIsInitialized } from "app/appSlice";

type PropsType = {
  demo?: boolean;
};

export function App({ demo = false }: PropsType) {
  const { status } = useSelector(selectAppStatus);
  const isInitialized = useSelector(selectIsInitialized);
  const isLoggedIn = useSelector(selectIsLoggedIn);

  const { initializeAppTC, logoutTC } = useActions();

  useEffect(() => {
    if (!demo) {
      initializeAppTC();
    }
  }, [initializeAppTC, demo]);

  const logoutHandler = useCallback(() => {
    logoutTC();
  }, [logoutTC]);

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
