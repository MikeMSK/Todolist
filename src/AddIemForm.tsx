import React, {ChangeEvent, KeyboardEvent, useState} from 'react';
import {IconButton, TextField} from "@material-ui/core";
import {AddCircleTwoTone} from "@material-ui/icons";

type AddIemFormPropsType = {
    addItem: (title: string) => void
}

const AddIemForm = (props: AddIemFormPropsType) => {
    const [title, setTitle] = useState<string>("")
    const [error, setError] = useState<boolean>(false)
    const onChangeSetLocalTitle = (e: ChangeEvent<HTMLInputElement>) => {
        error && setError(false)
        setTitle(e.currentTarget.value)
    }
    const onEnterDownAddItem = (e: KeyboardEvent<HTMLInputElement>) => e.key === "Enter" && addItem()
    const addItem = () => {
        const trimmedTitle = title.trim()
        if (trimmedTitle !== "") {
            props.addItem(trimmedTitle)
        } else {
            setError(true)
        }
        setTitle("")
    }
    const errorMessage = error
        ? <div style={{fontWeight: "bold", color: "hotpink"}}>Title is required!</div>
        : null

    return (
        <div>
            <TextField size={"small"}
                       variant={"outlined"}
                       value={title}
                       onChange={onChangeSetLocalTitle}
                       onKeyDown={onEnterDownAddItem}
                       label={"Title"}
                       error={error}
                       helperText={error && "Title is required!"}
            />
            <IconButton onClick={addItem}
                        color={"primary"}>
                <AddCircleTwoTone/>
            </IconButton>
            {/*{errorMessage}*/}
        </div>
    );
};

export default AddIemForm;