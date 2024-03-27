import { TaskPriorities, TaskStatuses } from "common/enums";
import { RequestStatusType } from "app/appSlice";

export type TaskType = {
  id: string;
  title: string;
  description: string;
  todoListId: string;
  order: number;
  status: TaskStatuses;
  priority: TaskPriorities;
  startDate: string;
  deadline: string;
  addedDate: string;
  completed?: boolean;
  entityStatus?: RequestStatusType;
};
export type UpdateTaskModelType = {
  title: string;
  description: string;
  status: TaskStatuses;
  priority: TaskPriorities;
  startDate: string;
  deadline: string;
};
export type GetTasksResponse = {
  items: Array<TaskType>;
  totalCount: number;
  error: string;
};
