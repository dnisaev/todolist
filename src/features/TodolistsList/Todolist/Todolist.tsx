import React, { useCallback } from "react";
import { AddItemForm } from "../../../components/AddItemForm/AddItemForm";
import { EditableSpan } from "../../../components/EditableSpan/EditableSpan";
import { Button, IconButton } from "@mui/material";
import { Delete } from "@mui/icons-material";
import { Task } from "./Task/Task";
import { TaskStatuses, TaskType } from "../../../api/todolists-api";
import { FilterValuesType, TodolistDomainType } from "../todolists-reducer";

type TodolistPropsType = {
  todolist: TodolistDomainType;
  tasks: Array<TaskType>;
  addTask: (todolistId: string, title: string) => void;
  removeTask: (taskId: string, todolistId: string) => void;
  changeFilter: (value: FilterValuesType, todolistId: string) => void;
  changeTaskStatus: (id: string, status: TaskStatuses, todolistId: string) => void;
  changeTaskTitle: (id: string, newTitle: string, todolistId: string) => void;
  removeTodolist: (id: string) => void;
  changeTodolistTitle: (id: string, newTitle: string) => void;
  demo?: boolean;
};

export const Todolist = React.memo(
  ({
    todolist,
    tasks,
    addTask,
    removeTask,
    changeFilter,
    changeTaskStatus,
    changeTaskTitle,
    removeTodolist,
    changeTodolistTitle,
    demo = false,
  }: TodolistPropsType) => {
    console.log("Todolist is called");

    // const dispatch: AppDispatch = useDispatch();

    // useEffect(() => {
    //     if (demo) {
    //         return
    //     }
    //     dispatch(fetchTasksTC(todolist.id))
    // }, [dispatch, todolist.id, demo])

    const addTaskHandler = useCallback((title: string) => addTask(todolist.id, title), [addTask, todolist.id]);
    const changeTodolistTitleHandler = useCallback(
      (newTitle: string) => changeTodolistTitle(todolist.id, newTitle),
      [changeTodolistTitle, todolist.id],
    );
    const onAllClickHandler = useCallback(() => changeFilter("all", todolist.id), [changeFilter, todolist.id]);
    const onActiveClickHandler = useCallback(() => changeFilter("active", todolist.id), [changeFilter, todolist.id]);
    const onCompletedClickHandler = useCallback(
      () => changeFilter("completed", todolist.id),
      [changeFilter, todolist.id],
    );

    let tasksForTodoList = tasks;
    if (todolist.filter === "active") {
      tasksForTodoList = tasks.filter((t) => t.status === TaskStatuses.New);
    }
    if (todolist.filter === "completed") {
      tasksForTodoList = tasks.filter((t) => t.status === TaskStatuses.Completed);
    }
    return (
      <div>
        <h3 className={"removeTlButton"}>
          <EditableSpan
            title={todolist.title}
            onChange={changeTodolistTitleHandler}
            disabled={todolist.entityStatus === "loading"}
          />
          <IconButton onClick={() => removeTodolist(todolist.id)} disabled={todolist.entityStatus === "loading"}>
            <Delete />
          </IconButton>
        </h3>
        <div>
          <AddItemForm addItem={addTaskHandler} disabled={todolist.entityStatus === "loading"} />
        </div>
        <div>
          {tasksForTodoList.map((tasks) => {
            return (
              <Task
                key={tasks.id}
                todolistId={todolist.id}
                task={tasks}
                changeTaskStatus={changeTaskStatus}
                changeTaskTitle={changeTaskTitle}
                removeTask={removeTask}
                entityStatus={tasks.entityStatus}
              />
            );
          })}
        </div>
        <div>
          <Button
            variant={todolist.filter === "all" ? "outlined" : "text"}
            onClick={onAllClickHandler}
            color={"inherit"}
          >
            All
          </Button>
          <Button
            variant={todolist.filter === "active" ? "outlined" : "text"}
            onClick={onActiveClickHandler}
            color={"primary"}
          >
            Active
          </Button>
          <Button
            variant={todolist.filter === "completed" ? "outlined" : "text"}
            onClick={onCompletedClickHandler}
            color={"secondary"}
          >
            Completed
          </Button>
        </div>
      </div>
    );
  },
);
