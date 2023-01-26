import React, {ChangeEvent, memo, useCallback} from 'react';
import {Checkbox, IconButton} from "@material-ui/core";
import {EditableSpan} from "./EditableSpan";
import {Delete} from "@material-ui/icons";
import {
    updateTaskStatusAC,
    updateTaskTitleAC,
    deleteTaskTC,
    fetchTaskTC,
    deleteTaskAC,
    updateTaskStatusTC
} from "./state/tasks-reducer";
import {TaskStatuses, TaskType, todolistAPI} from "./api/todolist-api";
import {useAppDispatch} from "./app/hooks";
import {deleteTodolistAC} from "./state/todolists-reducer";


type TaskWithReduxPropsType = {
    task: TaskType
    todolistId: string
}

export const TaskWithRedux = memo(({task, todoID}: TaskWithReduxPropsType) => {

        const dispatch = useAppDispatch();

        const removeTask = useCallback(() => {
            dispatch(deleteTaskTC(todoID, task.id))
        }, []);

        const updateStatus = useCallback(
            (todoID: string, taskId: string, status: TaskStatuses, e: ChangeEvent<HTMLInputElement>) => {
                // let newIsDoneValue;
                console.log(e.currentTarget.checked)
                // ? newIsDoneValue = TaskStatuses.Completed
                // : newIsDoneValue = TaskStatuses.New

                const thunk = updateTaskStatusTC(todolistId, taskId, e.currentTarget.checked);
                dispatch(thunk);
            },
            [dispatch])
        // const action = updateTaskStatusAC(task.id, e.currentTarget.checked, todoID);
        // dispatch(action);


        const changeTaskTitle = (newValue: string) => {
            const action = updateTaskTitleAC(task.id, newValue, todoID);
            dispatch(action)
        }

        return (
            <div key={task.id}
                 className={task.status === TaskStatuses.Completed
                     ? "is-done"
                     : ""}>
                <Checkbox checked={task.status === TaskStatuses.Completed}
                          color="primary"
                          onChange={updateStatus}/>
                <EditableSpan value={task.title}
                              onChange={changeTaskTitle}/>
                <IconButton onClick={removeTask}>
                    <Delete/>
                </IconButton>
            </div>
        )
    }
)



