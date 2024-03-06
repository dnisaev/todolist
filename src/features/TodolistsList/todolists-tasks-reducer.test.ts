import { addTodolist, TodolistDomainType, todolistsReducer } from "./todolists-reducer";
import { tasksReducer, TasksStateType } from "./tasks-reducer";
import { v1 } from "uuid";

test("ids should be equals", () => {
  const startTasksState: TasksStateType = {};
  const startTodolistsState: Array<TodolistDomainType> = [];
  let newTodolist = { id: v1(), title: "What to learn", addedDate: "", order: 0 };
  const action = addTodolist({ todolist: newTodolist });

  const endTasksState = tasksReducer(startTasksState, action);
  const endTodolistsState = todolistsReducer(startTodolistsState, action);

  const keys = Object.keys(endTasksState);
  const idFromTasks = keys[0];
  const idFromTodolists = endTodolistsState[0].id;

  expect(idFromTasks).toBe(action.payload.todolist.id);
  expect(idFromTodolists).toBe(action.payload.todolist.id);
});
