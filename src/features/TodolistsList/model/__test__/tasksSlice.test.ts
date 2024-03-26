import { TaskPriorities, TaskStatuses } from "common/enums";
import {
  addTaskTC,
  fetchTasksTC,
  removeTaskTC,
  tasksSlice,
  TasksStateType,
  updateTaskTC,
} from "features/TodolistsList/model/tasksSlice";
import { addTodolistTC, fetchTodolistsTC, removeTodolistTC } from "features/TodolistsList/model/todolistsSlice";
import { v1 } from "uuid";

let startState: TasksStateType;

beforeEach(() => {
  startState = {
    todoListId1: [
      {
        id: "1",
        title: "CSS",
        status: TaskStatuses.New,
        todoListId: "todoListId1",
        description: "",
        startDate: "",
        deadline: "",
        addedDate: "",
        order: 0,
        priority: TaskPriorities.Low,
      },
      {
        id: "2",
        title: "JS",
        status: TaskStatuses.Completed,
        todoListId: "todoListId1",
        description: "",
        startDate: "",
        deadline: "",
        addedDate: "",
        order: 0,
        priority: TaskPriorities.Low,
      },
      {
        id: "3",
        title: "React",
        status: TaskStatuses.New,
        todoListId: "todoListId1",
        description: "",
        startDate: "",
        deadline: "",
        addedDate: "",
        order: 0,
        priority: TaskPriorities.Low,
      },
    ],
    todoListId2: [
      {
        id: "1",
        title: "bread",
        status: TaskStatuses.New,
        todoListId: "todoListId2",
        description: "",
        startDate: "",
        deadline: "",
        addedDate: "",
        order: 0,
        priority: TaskPriorities.Low,
      },
      {
        id: "2",
        title: "milk",
        status: TaskStatuses.Completed,
        todoListId: "todoListId2",
        description: "",
        startDate: "",
        deadline: "",
        addedDate: "",
        order: 0,
        priority: TaskPriorities.Low,
      },
      {
        id: "3",
        title: "tea",
        status: TaskStatuses.New,
        todoListId: "todoListId2",
        description: "",
        startDate: "",
        deadline: "",
        addedDate: "",
        order: 0,
        priority: TaskPriorities.Low,
      },
    ],
  };
});

test("correct task should be deleted from correct array", () => {
  const param = { taskId: "2", todoListId: "todoListId2" };
  const action = removeTaskTC.fulfilled(param, "requestId", param);

  const endState = tasksSlice(startState, action);

  expect(endState).toEqual({
    todoListId1: [
      {
        id: "1",
        title: "CSS",
        status: TaskStatuses.New,
        todoListId: "todoListId1",
        description: "",
        startDate: "",
        deadline: "",
        addedDate: "",
        order: 0,
        priority: TaskPriorities.Low,
      },
      {
        id: "2",
        title: "JS",
        status: TaskStatuses.Completed,
        todoListId: "todoListId1",
        description: "",
        startDate: "",
        deadline: "",
        addedDate: "",
        order: 0,
        priority: TaskPriorities.Low,
      },
      {
        id: "3",
        title: "React",
        status: TaskStatuses.New,
        todoListId: "todoListId1",
        description: "",
        startDate: "",
        deadline: "",
        addedDate: "",
        order: 0,
        priority: TaskPriorities.Low,
      },
    ],
    todoListId2: [
      {
        id: "1",
        title: "bread",
        status: TaskStatuses.New,
        todoListId: "todoListId2",
        description: "",
        startDate: "",
        deadline: "",
        addedDate: "",
        order: 0,
        priority: TaskPriorities.Low,
      },
      {
        id: "3",
        title: "tea",
        status: TaskStatuses.New,
        todoListId: "todoListId2",
        description: "",
        startDate: "",
        deadline: "",
        addedDate: "",
        order: 0,
        priority: TaskPriorities.Low,
      },
    ],
  });
});

test("correct task should be added to correct array", () => {
  const task = {
    id: "0",
    title: "TypeScript",
    status: TaskStatuses.New,
    todoListId: "todoListId1",
    description: "",
    startDate: "",
    deadline: "",
    addedDate: "",
    order: 0,
    priority: TaskPriorities.Low,
  };
  const action = addTaskTC.fulfilled(task, "requestId", { title: task.title, todoListId: task.todoListId });
  const endState = tasksSlice(startState, action);

  expect(endState["todoListId1"].length).toBe(4);
  expect(endState["todoListId1"][0].title).toBe("TypeScript");
  expect(endState["todoListId2"].length).toBe(3);
  expect(endState["todoListId2"][0].id).toBeDefined();
  expect(endState["todoListId2"][0].title).toBe("bread");
  expect(endState["todoListId2"][0].status).toBe(TaskStatuses.New);
});

test("status of specified task should be changed", () => {
  const domainModel = {
    title: "bread",
    description: "",
    status: TaskStatuses.Completed,
    priority: TaskPriorities.Low,
    startDate: "",
    deadline: "",
  };
  const param = { taskId: "1", domainModel, todoListId: "todoListId2" };
  const action = updateTaskTC.fulfilled(param, "requestId", param);
  const endState = tasksSlice(startState, action);

  expect(endState["todoListId2"][0].status).toBe(TaskStatuses.Completed);
  expect(endState["todoListId2"][0].title).toBe("bread");
  expect(endState).toEqual({
    todoListId1: [
      {
        id: "1",
        title: "CSS",
        status: TaskStatuses.New,
        todoListId: "todoListId1",
        description: "",
        startDate: "",
        deadline: "",
        addedDate: "",
        order: 0,
        priority: TaskPriorities.Low,
      },
      {
        id: "2",
        title: "JS",
        status: TaskStatuses.Completed,
        todoListId: "todoListId1",
        description: "",
        startDate: "",
        deadline: "",
        addedDate: "",
        order: 0,
        priority: TaskPriorities.Low,
      },
      {
        id: "3",
        title: "React",
        status: TaskStatuses.New,
        todoListId: "todoListId1",
        description: "",
        startDate: "",
        deadline: "",
        addedDate: "",
        order: 0,
        priority: TaskPriorities.Low,
      },
    ],
    todoListId2: [
      {
        id: "1",
        title: "bread",
        status: TaskStatuses.Completed,
        todoListId: "todoListId2",
        description: "",
        startDate: "",
        deadline: "",
        addedDate: "",
        order: 0,
        priority: TaskPriorities.Low,
      },
      {
        id: "2",
        title: "milk",
        status: TaskStatuses.Completed,
        todoListId: "todoListId2",
        description: "",
        startDate: "",
        deadline: "",
        addedDate: "",
        order: 0,
        priority: TaskPriorities.Low,
      },
      {
        id: "3",
        title: "tea",
        status: TaskStatuses.New,
        todoListId: "todoListId2",
        description: "",
        startDate: "",
        deadline: "",
        addedDate: "",
        order: 0,
        priority: TaskPriorities.Low,
      },
    ],
  });
});

test("title of specified task should be changed", () => {
  const domainModel = {
    title: "beer",
    description: "",
    status: TaskStatuses.New,
    priority: TaskPriorities.Low,
    startDate: "",
    deadline: "",
  };

  const param = { taskId: "1", domainModel, todoListId: "todoListId2" };
  const action = updateTaskTC.fulfilled(param, "requestId", param);
  const endState = tasksSlice(startState, action);

  expect(endState["todoListId2"][0].title).toBe("beer");
  expect(endState).toEqual({
    todoListId1: [
      {
        id: "1",
        title: "CSS",
        status: TaskStatuses.New,
        todoListId: "todoListId1",
        description: "",
        startDate: "",
        deadline: "",
        addedDate: "",
        order: 0,
        priority: TaskPriorities.Low,
      },
      {
        id: "2",
        title: "JS",
        status: TaskStatuses.Completed,
        todoListId: "todoListId1",
        description: "",
        startDate: "",
        deadline: "",
        addedDate: "",
        order: 0,
        priority: TaskPriorities.Low,
      },
      {
        id: "3",
        title: "React",
        status: TaskStatuses.New,
        todoListId: "todoListId1",
        description: "",
        startDate: "",
        deadline: "",
        addedDate: "",
        order: 0,
        priority: TaskPriorities.Low,
      },
    ],
    todoListId2: [
      {
        id: "1",
        title: "beer",
        status: TaskStatuses.New,
        todoListId: "todoListId2",
        description: "",
        startDate: "",
        deadline: "",
        addedDate: "",
        order: 0,
        priority: TaskPriorities.Low,
      },
      {
        id: "2",
        title: "milk",
        status: TaskStatuses.Completed,
        todoListId: "todoListId2",
        description: "",
        startDate: "",
        deadline: "",
        addedDate: "",
        order: 0,
        priority: TaskPriorities.Low,
      },
      {
        id: "3",
        title: "tea",
        status: TaskStatuses.New,
        todoListId: "todoListId2",
        description: "",
        startDate: "",
        deadline: "",
        addedDate: "",
        order: 0,
        priority: TaskPriorities.Low,
      },
    ],
  });
});

test("new array should be added when new todolist is added", () => {
  let newTodolist = { id: v1(), title: "What to learn", addedDate: "", order: 0 };
  const action = addTodolistTC.fulfilled({ todolist: newTodolist }, "", newTodolist.title);
  const endState = tasksSlice(startState, action);

  const keys = Object.keys(endState);
  const newKey = keys.find((k) => k != "todoListId1" && k != "todoListId2");
  if (!newKey) {
    throw Error("new key should be added");
  }

  expect(keys.length).toBe(3);
  expect(endState[newKey]).toEqual([]);
});

test("property with todoListId should be deleted", () => {
  const action = removeTodolistTC.fulfilled({ id: "todoListId2" }, "", "todoListId2");
  const endState = tasksSlice(startState, action);

  const keys = Object.keys(endState);

  expect(keys.length).toBe(1);
  expect(endState["todoListId2"]).not.toBeDefined();
});

test("empty arrays should be added when we set todolists", () => {
  const action = fetchTodolistsTC.fulfilled(
    {
      todolists: [
        { id: "1", title: "title 1", addedDate: "", order: 0 },
        { id: "2", title: "title 2", addedDate: "", order: 0 },
      ],
    },
    "",
  );

  const endState = tasksSlice({}, action);

  const keys = Object.keys(endState);

  expect(keys.length).toBe(2);
  expect(endState["1"]).toStrictEqual([]);
  expect(endState["2"]).toStrictEqual([]);
});

test("tasks should be added for todolist", () => {
  const action = fetchTasksTC.fulfilled(
    {
      tasks: startState["todoListId1"],
      todoListId: "todoListId1",
    },
    "requestId",
    "todoListId1",
  );

  const endState = tasksSlice(
    {
      todoListId2: [],
      todoListId1: [],
    },
    action,
  );

  expect(endState["todoListId1"].length).toBe(3);
  expect(endState["todoListId2"].length).toBe(0);
});
