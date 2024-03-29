import React, {ChangeEvent, KeyboardEvent, memo, useState} from 'react';
import {IconButton, TextField} from "@material-ui/core";
import {AddBox} from "@material-ui/icons";

export const AddItemForm = memo(({disabled = false, addItem}: AddItemFormPropsType) => {
    let [title, setTitle] = useState("")
    let [error, setError] = useState<string | null>(null)

    const addItemHandler = () => {
        if (title.trim() !== "") {
            addItem(title);
            setTitle("");
        } else {
            setError("Title is required");
        }
    }
    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setTitle(e.currentTarget.value)
    }
    const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        if (error) {
            setError(null)
        }
        if (e.charCode === 13) {
            addItemHandler();
        }
    }
    return (
        <div>
            <TextField variant={'outlined'}
                       error={!!error}
                       value={title}
                       onChange={onChangeHandler}
                       onKeyPress={onKeyPressHandler}
                       label={'Title'}
                       helperText={error}
                       disabled={disabled}
            />
            <IconButton color={'primary'}
                        onClick={addItemHandler}
                        disabled={disabled}>
                <AddBox/>
            </IconButton>
        </div>
    )
})


type AddItemFormPropsType = {
    addItem: (title: string) => void
    disabled?: boolean
}