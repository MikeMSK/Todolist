import React, {ChangeEvent, memo, useCallback, useEffect} from 'react';
import {Checkbox, IconButton} from "@material-ui/core";
import {EditableSpan} from "./EditableSpan";
import {Delete} from "@material-ui/icons";
import {changeTaskStatusAC, changeTaskTitleAC, removeTaskTC, fetchTaskTC, removeTaskAC} from "./state/tasks-reducer";
import {TaskStatuses, TaskType, todolistAPI} from "./api/todolist-api";
import {useAppDispatch} from "./app/hooks";
import {removeTodolistAC} from "./state/todolists-reducer";


type TaskWithReduxPropsType = {
    task: TaskType
    todoID: string
}

export const TaskWithRedux = memo(({task, todoID}: TaskWithReduxPropsType) => {

    const dispatch = useAppDispatch();

    const removeTask = useCallback(() => {
        dispatch(removeTaskTC(todoID, task.id))
    }, []);

    // useEffect(() => {
    //     const thunk = fetchTaskTC(props.id);
    //     dispatch(thunk)
    // }, []);

    const changeStatus = (e: ChangeEvent<HTMLInputElement>) => {
        let newIsDoneValue;
        e.currentTarget.checked
            ? newIsDoneValue = TaskStatuses.Completed
            : newIsDoneValue = TaskStatuses.New

        const action = changeTaskStatusAC(task.id, newIsDoneValue, todoID);
        dispatch(action);
    }
    const changeTaskTitle = (newValue: string) => {
        const action = changeTaskTitleAC(task.id, newValue, todoID);
        dispatch(action)
    }

    return (
        <div key={task.id}
             className={task.status === TaskStatuses.Completed
                 ? "is-done"
                 : ""}>
            <Checkbox checked={task.status === TaskStatuses.Completed}
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



