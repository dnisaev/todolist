import React, {ChangeEvent, useState} from 'react';
import {TextField} from "@mui/material";

type EditableSpanType = {
    title: string
    onChange: (newValue: string) => void
}
export const EditableSpan = (props: EditableSpanType) => {

    let [editMode, setEditMode] = useState(false);
    let [title, setTitle] = useState('');

    const activateEditMode = () => {
        setEditMode(true);
        setTitle(props.title);
    }

    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setTitle(e.currentTarget.value);
    };

    const activateViewMode = () => {
        setEditMode(false);
        props.onChange(title);
    }

    return editMode
        ? <TextField
            variant={'outlined'}
            value={title}
            onBlur={activateViewMode}
            onChange={onChangeHandler}
            autoFocus/>
        : <span onDoubleClick={activateEditMode}>{props.title}</span>
};