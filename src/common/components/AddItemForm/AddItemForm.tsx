import React, { ChangeEvent, KeyboardEvent, memo, useState } from "react";
import { IconButton, TextField } from "@mui/material";
import { AddBox } from "@mui/icons-material";

type Props = {
  addItem: (title: string) => void;
  disabled?: boolean;
};
export const AddItemForm = memo(({ addItem, disabled }: Props) => {
  const [title, setTitle] = useState("");
  const [error, setError] = useState<string | null>(null);
  const addItemHandler = () => {
    if (title.trim() !== "") {
      addItem(title.trim());
      setTitle("");
    } else {
      setError("title is required");
    }
  };
  const setTitleHandler = (event: ChangeEvent<HTMLInputElement>) => {
    setTitle(event.currentTarget.value);
  };
  const onKeyDownHandler = (event: KeyboardEvent<HTMLInputElement>) => {
    if (error !== null) {
      setError(null);
    }
    if (event.key === "Enter") {
      addItemHandler();
    }
  };

  return (
    <div>
      <TextField
        variant={"outlined"}
        value={title}
        onChange={setTitleHandler}
        onKeyDown={onKeyDownHandler}
        error={!!error}
        label={"Title"}
        helperText={error}
        disabled={disabled}
      />
      <IconButton color={"primary"} onClick={addItemHandler} disabled={disabled}>
        <AddBox />
      </IconButton>
    </div>
  );
});
