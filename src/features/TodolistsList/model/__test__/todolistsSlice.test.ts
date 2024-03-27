import {
  addTodolistTC,
  changeTodolistEntityStatus,
  changeTodolistFilter,
  changeTodolistTitleTC,
  fetchTodolistsTC,
  FilterValuesType,
  removeTodolistTC,
  TodolistDomainType,
  todolistsSlice,
} from "features/TodolistsList/model/todolistsSlice";
import { v1 } from "uuid";
import { RequestStatusType } from "app/model/appSlice";

let todoListId1: string;
let todoListId2: string;

let startState: Array<TodolistDomainType>;

beforeEach(() => {
  todoListId1 = v1();
  todoListId2 = v1();

  startState = [
    { id: todoListId1, title: "What to learn", filter: "all", entityStatus: "idle", addedDate: "", order: 0 },
    { id: todoListId2, title: "What to buy", filter: "all", entityStatus: "idle", addedDate: "", order: 0 },
  ];
});

test("correct todolist should be removed", () => {
  const endState = todolistsSlice(startState, removeTodolistTC.fulfilled({ id: todoListId1 }, "", todoListId1));

  expect(endState.length).toBe(1);
  expect(endState[0].id).toBe(todoListId2);
});

test("correct todolist should be added", () => {
  let newTodolist = { id: v1(), title: "New Todolist", filter: "all", entityStatus: "idle", addedDate: "", order: 0 };

  const endState = todolistsSlice(
    startState,
    addTodolistTC.fulfilled({ todolist: newTodolist }, "", newTodolist.title),
  );

  expect(endState.length).toBe(3);
  expect(endState[0].title).toBe("New Todolist");
  expect(endState[0].entityStatus).toBe("idle");
});

test("correct todolist should change its name", () => {
  let newTodolistTitle = "New Todolist";

  const endState = todolistsSlice(
    startState,
    changeTodolistTitleTC.fulfilled({ id: todoListId2, title: newTodolistTitle }, "", {
      todoListId: todoListId2,
      title: newTodolistTitle,
    }),
  );

  expect(endState[0].title).toBe("What to learn");
  expect(endState[1].title).toBe(newTodolistTitle);
});

test("correct filter of todolist should be changed", () => {
  let newFilter: FilterValuesType = "completed";

  const endState = todolistsSlice(startState, changeTodolistFilter({ id: todoListId2, filter: newFilter }));

  expect(endState[0].filter).toBe("all");
  expect(endState[1].filter).toBe(newFilter);
});

test("todolists should be set to the state", () => {
  const action = fetchTodolistsTC.fulfilled({ todolists: startState }, "");

  const endState = todolistsSlice([], action);
  expect(endState.length).toBe(2);
});

test("correct entity status of todolist should be changed", () => {
  let newStatus: RequestStatusType = "succeeded";

  const endState = todolistsSlice(startState, changeTodolistEntityStatus({ id: todoListId2, status: newStatus }));

  expect(endState[0].entityStatus).toBe("idle");
  expect(endState[1].entityStatus).toBe(newStatus);
});
