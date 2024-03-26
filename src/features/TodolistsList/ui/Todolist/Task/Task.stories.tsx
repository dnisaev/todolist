import type { Meta, StoryObj } from "@storybook/react";
import { Task } from "features/TodolistsList/ui/Todolist/Task/Task";
import { v1 } from "uuid";
import { TaskStatuses } from "common/enums";

const meta: Meta<typeof Task> = {
  title: "TODOLISTS/Task",
  component: Task,
  args: {
    task: { id: v1(), title: "React", status: TaskStatuses.New },
    todoListId: v1(),
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
