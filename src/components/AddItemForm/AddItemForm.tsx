import React, {ChangeEvent, KeyboardEvent, useState} from 'react';
import {IconButton, TextField} from "@mui/material";
import {AddBox} from "@mui/icons-material";

type AddItemFormType = {
    addItem: (title: string) => void
    disabled?: boolean
}
export const AddItemForm = React.memo((props: AddItemFormType) => {
    console.log('AddItemForm is called');
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
        if (error !== null) {
            setError(null)
        }
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
            <IconButton color={'primary'} onClick={addItem} disabled={props.disabled}><AddBox/></IconButton>
        </div>
    );
});