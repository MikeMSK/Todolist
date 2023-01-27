import React, {ChangeEvent, memo, useCallback} from 'react';
import {Checkbox, IconButton} from "@material-ui/core";
import {EditableSpan} from '../../../../components/EditableSpan/EditableSpan';
import {Delete} from "@material-ui/icons";
import {TaskStatuses, TaskType} from "../../../../api/todolist-api";


type TaskWithReduxPropsType = {
    task: TaskType
    todolistId: string
    updateTaskStatus: (taskId: string, status: TaskStatuses, todolistId: string) => void
    updateTaskTitle: (taskId: string, newTitle: string, todolistId: string) => void
    deleteTask: (taskId: string, todolistId: string) => void
}

export const Task = memo((props: TaskWithReduxPropsType) => {

        const onClickHandler = useCallback(() => {
                props.deleteTask(props.task.id, props.todolistId)
            },
            [props.task.id, props.todolistId]);

        const onChangeHandler = useCallback((e: ChangeEvent<HTMLInputElement>) => {
                let newIsDoneValue = e.currentTarget.checked
                props.updateTaskStatus(props.task.id, newIsDoneValue
                    ? TaskStatuses.Completed
                    : TaskStatuses.New, props.todolistId)
            },
            [props.task.id, props.todolistId]);

        const onTitleChangeHandler = useCallback((newValue: string) => {
                props.updateTaskTitle(props.task.id, newValue, props.todolistId)
            },
            [props.task.id, props.todolistId]);

        return (
            <div key={props.task.id}
                 className={props.task.status === TaskStatuses.Completed
                     ? "is-done"
                     : ""}>
                <Checkbox checked={props.task.status === TaskStatuses.Completed}
                          color="primary"
                          onChange={onChangeHandler}/>
                <EditableSpan value={props.task.title}
                              onChange={onTitleChangeHandler}/>
                <IconButton onClick={onClickHandler}>
                    <Delete/>
                </IconButton>
            </div>
        )
    }
)



