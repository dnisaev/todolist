import React, {ChangeEvent, KeyboardEvent, useState} from 'react';
import {IconButton, TextField} from "@mui/material";
import {AddBox} from "@mui/icons-material";

type AddItemFormType = {
    addItem: (title: string) => void
    disabled?: boolean
}
export const AddItemForm = React.memo(({addItem, disabled}: AddItemFormType) => {
    console.log('AddItemForm is called');
    const [title, setTitle] = useState('');
    const [error, setError] = useState<string | null>(null);
    const addItemHandler = () => {
        if (title.trim() !== '') {
            addItem(title.trim());
            setTitle('');
        } else {
            setError('title is required');
        }
    };
    const onChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
        setTitle(event.currentTarget.value);
    };
    const onKeyDownHandler = (event: KeyboardEvent<HTMLInputElement>) => {
        if (error !== null) {
            setError(null)
        }
        if (event.key === 'Enter') {
            addItemHandler()
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
                disabled={disabled}
            />
            <IconButton color={'primary'} onClick={addItemHandler} disabled={disabled}><AddBox/></IconButton>
        </div>
    );
});