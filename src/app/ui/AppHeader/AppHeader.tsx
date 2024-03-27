import React from "react";
import Toolbar from "@mui/material/Toolbar";
import { AppBar, Button, IconButton, LinearProgress, Typography } from "@mui/material";
import { Menu } from "@mui/icons-material";
import { useSelector } from "react-redux";
import { selectIsLoggedIn } from "features/auth/model/authSlice";
import { selectAppStatus } from "app/model/appSlice";
import { useActions } from "common/hooks/useActions";

export const AppHeader = () => {
  const { status } = useSelector(selectAppStatus);
  const { isLoggedIn } = useSelector(selectIsLoggedIn);
  const { logoutTC } = useActions();

  const logoutHandler = () => logoutTC();

  return (
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
  );
};
