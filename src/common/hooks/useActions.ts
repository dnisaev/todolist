import { useMemo } from "react";
import { ActionCreatorsMapObject, bindActionCreators } from "redux";
import { useAppDispatch } from "common/hooks/useAppDispatch";
import { todolistsActions, todolistsThunks } from "features/TodolistsList/model/todolistsSlice";
import { tasksThunks } from "features/TodolistsList/model/tasksSlice";
import { authThunks } from "features/auth/model/authSlice";

const actionsAll = { ...todolistsThunks, ...tasksThunks, ...todolistsActions, ...authThunks };

type AllActions = typeof actionsAll;

export const useActions = () => {
  const dispatch = useAppDispatch();

  return useMemo(
    () => bindActionCreators<AllActions, RemapActionCreators<AllActions>>(actionsAll, dispatch),
    [dispatch],
  );
};

// Types
type ReplaceReturnType<T> = T extends (...args: any[]) => any
  ? (...args: Parameters<T>) => ReturnType<ReturnType<T>>
  : () => T;

type RemapActionCreators<T extends ActionCreatorsMapObject> = {
  [K in keyof T]: ReplaceReturnType<T[K]>;
};
