import React, {ChangeEvent, KeyboardEvent, useState} from 'react';
import {IconButton, TextField} from "@mui/material";
import {AddBox} from "@mui/icons-material";

type AddItemFormType = {
    addItem: (title: string) => void
}
export const AddItemForm = (props: AddItemFormType) => {
    const [title, setTitle] = useState('');
    const [error, setError] = useState<string | null>(null);
    const addItem = () => {
        if (title.trim() !== '') {
            props.addItem(title.trim());
            setTitle('');
        } else {
            setError('title is required');
        }
    };
    const onChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
        setTitle(event.currentTarget.value);
    };
    const onKeyDownHandler = (event: KeyboardEvent<HTMLInputElement>) => {
        setError(null);
        if (event.key === 'Enter') {
            addItem()
        }
    };

    return (
        <div>
            <TextField
                variant={'outlined'}
                value={title}
                onChange={onChangeHandler}
                onKeyDown={onKeyDownHandler}
                error={!!error}
                label={'Title'}
                helperText={error}
            />
            <IconButton color={'primary'} onClick={addItem}><AddBox/></IconButton>
        </div>
    );
};