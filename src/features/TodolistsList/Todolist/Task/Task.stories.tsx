import type { Meta, StoryObj } from "@storybook/react";
import { action } from "@storybook/addon-actions";
import { Task } from "./Task";
import { v1 } from "uuid";
import { TaskStatuses } from "api/todolists-api";

const meta: Meta<typeof Task> = {
  title: "TODOLISTS/Task",
  component: Task,
  args: {
    task: { id: v1(), title: "React", status: TaskStatuses.New },
    todolistId: v1(),
    changeTaskStatus: action("Status changed inside Task"),
    changeTaskTitle: action("Title changed inside Task"),
    removeTask: action("Remove Button clicked changed inside Task"),
  },
};

export default meta;
type Story = StoryObj<typeof Task>;

export const TaskIsNotDoneStory: Story = {};

export const TaskIsDoneStory: Story = {
  args: {
    task: { id: v1(), title: "JS", status: TaskStatuses.Completed },
  },
};
