import React, { ChangeEvent, KeyboardEvent, memo, useState } from "react";
import { IconButton, TextField } from "@mui/material";
import { AddBox } from "@mui/icons-material";
import { BaseResponseType } from "common/types";

type Props = {
  addItem: (title: string) => Promise<unknown>;
  disabled?: boolean;
};
export const AddItemForm = memo(({ addItem, disabled }: Props) => {
  const [title, setTitle] = useState("");
  const [error, setError] = useState<string | null>(null);
  const addItemHandler = () => {
    if (title.trim() !== "") {
      addItem(title.trim())
        .then(() => {
          setTitle("");
        })
        .catch((err: BaseResponseType) => {
          if (err?.resultCode) {
            setError(err.messages[0]);
          }
        });
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
