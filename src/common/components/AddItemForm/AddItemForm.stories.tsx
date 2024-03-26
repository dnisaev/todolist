import { AddItemForm } from "common/components/AddItemForm/AddItemForm";
import { action } from "@storybook/addon-actions";

export default {
  title: "TODOLISTS/AddItemForm",
  component: AddItemForm,
};

export const AddItemFormStory = () => {
  return <AddItemForm disabled={false} addItem={action("Button clicked inside form").call} />;
};

export const AddItemFormDisabledStory = () => {
  return <AddItemForm disabled={true} addItem={action("Button clicked inside form").call} />;
};
