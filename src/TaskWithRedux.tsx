import React, {ChangeEvent, memo, useCallback} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {Checkbox, IconButton} from "@material-ui/core";
import {EditableSpan} from "./EditableSpan";
import {Delete} from "@material-ui/icons";
import {AppRootStateType} from "./state/store";
import {TaskType} from "./Todolist";
import {changeTaskStatusAC, changeTaskTitleAC, removeTaskAC} from "./state/tasks-reducer";


type TaskWithReduxPropsType = {
    task: TaskType
    todoID: string
}

export const TaskWithRedux = memo(({task, todoID}: TaskWithReduxPropsType) => {

    const dispatch = useDispatch();

    const removeTask = () => {
            const action = removeTaskAC(task.id, todoID);
            dispatch(action);
        }
    const changeStatus =(e: ChangeEvent<HTMLInputElement>) => {
            let newIsDoneValue = e.currentTarget.checked;
            const action = changeTaskStatusAC(task.id, newIsDoneValue, todoID);
            dispatch(action);
        }
    const changeTaskTitle = (newValue: string) => {
            const action = changeTaskTitleAC(task.id, newValue, todoID);
            dispatch(action)
        }

    return (
        <div key={task.id}
             className={task.isDone ? "is-done" : ""}>
            <Checkbox checked={task.isDone}
                      color="primary"
                      onChange={changeStatus}/>
            <EditableSpan value={task.title}
                          onChange={changeTaskTitle}/>
            <IconButton onClick={removeTask}>
                <Delete/>
            </IconButton>
        </div>
    )
})



