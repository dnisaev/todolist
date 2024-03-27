import React from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import { TodolistsList } from "features/TodolistsList/ui/TodolistsList";
import { Login } from "features/auth/ui/login/Login";
import { Container } from "@mui/material";

type Props = {
  demo: boolean;
};

export const Routing = ({ demo }: Props) => {
  return (
    <Container fixed>
      <Routes>
        <Route path={"/"} element={<TodolistsList demo={demo} />} />
        <Route path={"/todolist"} element={<Navigate to={"/"} />} />
        <Route path={"/login"} element={<Login />} />
        <Route path={"/404"} element={<h1>404: PAGE NOT FOUND</h1>} />
        <Route path={"/*"} element={<Navigate to={"/404"} />} />
      </Routes>
    </Container>
  );
};
