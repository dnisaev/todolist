import React, { ChangeEvent, useState } from "react";
import { TextField } from "@mui/material";

type EditableSpanType = {
  title: string;
  onChange: (newValue: string) => void;
  disabled?: boolean;
};
export const EditableSpan = React.memo(({ title, onChange, disabled }: EditableSpanType) => {
  console.log("EditableSpan is called");
  let [editMode, setEditMode] = useState(false);
  let [value, setValue] = useState("");
  const activateEditMode = () => {
    if (!disabled) {
      setEditMode(true);
      setValue(title);
    }
  };
  const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setValue(e.currentTarget.value);
  };
  const activateViewMode = () => {
    setEditMode(false);
    onChange(value);
  };

  return editMode ? (
    <TextField variant={"outlined"} value={value} onBlur={activateViewMode} onChange={onChangeHandler} autoFocus />
  ) : (
    <span onDoubleClick={activateEditMode}>{title}</span>
  );
});
