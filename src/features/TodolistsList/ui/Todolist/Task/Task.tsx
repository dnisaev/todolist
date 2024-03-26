import React, { ChangeEvent, memo } from "react";
import { EditableSpan } from "common/components/EditableSpan/EditableSpan";
import { IconButton } from "@mui/material";
import { Delete } from "@mui/icons-material";
import { RequestStatusType } from "app/appSlice";
import { TaskStatuses } from "common/enums";
import { useActions } from "common/hooks/useActions";

type Props = {
  task: {
    id: string;
    title: string;
    status: TaskStatuses;
  };
  todoListId: string;
  entityStatus?: RequestStatusType;
};

export const Task = memo(({ todoListId, task, entityStatus }: Props) => {
  const { removeTaskTC, updateTaskTC } = useActions();

  const removeTaskHandler = () => removeTaskTC({ taskId: task.id, todoListId });
  const changeTaskStatusHandler = (e: ChangeEvent<HTMLInputElement>) => {
    if (entityStatus !== "loading") {
      const status = e.currentTarget.checked ? TaskStatuses.Completed : TaskStatuses.New;
      updateTaskTC({
        taskId: task.id,
        domainModel: { status },
        todoListId,
      });
    }
  };
  const changeTaskTitleHandler = (title: string) =>
    updateTaskTC({
      taskId: task.id,
      domainModel: { title },
      todoListId,
    });

  return (
    <div key={task.id} className={task.status === TaskStatuses.Completed ? "is-done" : ""}>
      <input type="checkbox" checked={task.status === TaskStatuses.Completed} onChange={changeTaskStatusHandler} />
      <EditableSpan title={task.title} onChange={changeTaskTitleHandler} disabled={entityStatus === "loading"} />
      <IconButton onClick={removeTaskHandler} disabled={entityStatus === "loading"}>
        <Delete />
      </IconButton>
    </div>
  );
});
