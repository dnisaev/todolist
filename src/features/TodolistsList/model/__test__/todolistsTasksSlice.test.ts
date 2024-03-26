import { addTodolistTC, TodolistDomainType, todolistsSlice } from "features/TodolistsList/model/todolistsSlice";
import { tasksSlice, TasksStateType } from "features/TodolistsList/model/tasksSlice";
import { v1 } from "uuid";

test("ids should be equals", () => {
  const startTasksState: TasksStateType = {};
  const startTodolistsState: Array<TodolistDomainType> = [];
  let newTodolist = { id: v1(), title: "What to learn", addedDate: "", order: 0 };
  const action = addTodolistTC.fulfilled({ todolist: newTodolist }, "", newTodolist.title);

  const endTasksState = tasksSlice(startTasksState, action);
  const endTodolistsState = todolistsSlice(startTodolistsState, action);

  const keys = Object.keys(endTasksState);
  const idFromTasks = keys[0];
  const idFromTodolists = endTodolistsState[0].id;

  expect(idFromTasks).toBe(action.payload.todolist.id);
  expect(idFromTodolists).toBe(action.payload.todolist.id);
});
