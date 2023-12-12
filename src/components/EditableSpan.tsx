import React, {ChangeEvent, useState} from 'react';

type EditableSpanType = {
    value: string
    onChange: (newTitle: string) => void
}
export const EditableSpan = (props: EditableSpanType) => {

    let [editMode, setEditMode] = useState(false);
    let [title, setTitle] = useState(props.value);

    const activateEditMode = () => {
        setEditMode(!editMode);
        setTitle(title);
    }

    const onChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
        setTitle(event.currentTarget.value);
    };

    const activateViewMode = () => {
        setEditMode(!editMode);
        props.onChange(title);
    }

    return editMode
        ? <input value={title}
                 onBlur={activateViewMode}
                 onChange={onChangeHandler}
                 autoFocus/>
        : <span onDoubleClick={activateEditMode}>{title}</span>
};