import React, {ChangeEvent, KeyboardEvent, useState} from 'react';

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
            <input value={title}
                   onChange={onChangeHandler}
                   onKeyDown={onKeyDownHandler}
                   className={error ? 'error' : ''}
            />
            <button onClick={addItem}>+</button>
            {error && <div className={'error-message'}>{error}</div>}
        </div>
    );
};