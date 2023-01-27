import React, {memo, useCallback, useEffect, useMemo} from 'react';
import {Button, IconButton} from "@material-ui/core";
import {Delete} from "@material-ui/icons";
import {Task} from "./Task/Task";
import {TaskStatuses, TaskType} from "../../../api/todolist-api";
import {FilterValuesType} from "../todolists-reducer";
import {fetchTaskTC} from "../tasks-reducer";
import {useAppDispatch} from "../../../app/hooks/hooks";
import {EditableSpan} from "../../../components/EditableSpan/EditableSpan";
import {AddItemForm} from '../../../components/AddItemForm/AddItemForm';

export const Todolist = memo((props: PropsType) => {

    const dispatch = useAppDispatch();

    useEffect(() => {
        const thunk = fetchTaskTC(props.id);
        dispatch(thunk)
    }, []);

    const removeTodolist = () => {
        props.removeTodolist(props.id);
    }

    const createTask = useCallback(
        (title: string) => {
            props.addTask(title, props.id);
        },
        [props.addTask, props.id]);
    const updateTodolistTitle = useCallback(
        (title: string) => {
            props.updateTodolistTitle(props.id, title);
        },
        [props.id, props.updateTodolistTitle]);

    const onAllClickHandler = useCallback(
        () => {
            props.changeFilter("all", props.id)
        },
        [props.id, props.changeFilter]);
    const onActiveClickHandler = useCallback(
        () => {
            props.changeFilter("active", props.id);
        },
        [props.id, props.changeFilter]);
    const onCompletedClickHandler = useCallback(
        () => {
            props.changeFilter("completed", props.id);
        },
        [props.id, props.changeFilter]);


    const getFilteredTasks = (tasks: TaskType[], filter: FilterValuesType): TaskType[] => {
        if (props.filter === "active") {
            return tasks.filter(t => t.status === TaskStatuses.New);
        }
        if (props.filter === "completed") {
            return tasks.filter(t => t.status === TaskStatuses.Completed);
        }
        return tasks
    }
    const newTasks = useMemo(
        () => getFilteredTasks(props.tasks, props.filter),
        [props.tasks, props.filter]);

    return (
        <div>
            <h3>
                <EditableSpan value={props.title}
                              onChange={updateTodolistTitle}/>
                <IconButton onClick={removeTodolist}>
                    <Delete/>
                </IconButton>
            </h3>
            <AddItemForm addItem={createTask}/>
            <div>
                {newTasks.map(t => {
                    return (
                        <>
                            <Task key={t.id}
                                  task={t}
                                  todolistId={props.id}

                                  deleteTask={props.deleteTask}
                                  updateTaskTitle={props.updateTaskTitle}
                                  updateTaskStatus={props.updateTaskStatus}/>
                        </>
                    )
                })}
            </div>
            <div style={{paddingTop: "10px"}}>
                <ButtonWithMemo variant={props.filter === 'all' ? 'outlined' : 'text'}
                                title={'All'}
                                color={'inherit'}
                                onClick={onAllClickHandler}/>
                <ButtonWithMemo variant={props.filter === 'active' ? 'outlined' : 'text'}
                                title={'Active'}
                                color={'primary'}
                                onClick={onActiveClickHandler}/>
                <ButtonWithMemo variant={props.filter === 'completed' ? 'outlined' : 'text'}
                                title={'Completed'}
                                color={'secondary'}
                                onClick={onCompletedClickHandler}/>
            </div>
        </div>
    )
})

type PropsType = {
    id: string
    title: string
    filter: FilterValuesType
    tasks: Array<TaskType>
    updateTaskStatus: (taskId: string, status: TaskStatuses, todolistId: string) => void
    updateTaskTitle: (taskId: string, newTitle: string, todolistId: string) => void
    deleteTask: (taskId: string, todolistId: string) => void
    changeFilter: (value: FilterValuesType, todolistId: string) => void
    addTask: (title: string, todolistId: string) => void
    removeTodolist: (id: string) => void
    updateTodolistTitle: (id: string, newTitle: string) => void
}
//---------------------------------------------------------------------------------
type ButtonWithMemoPropsType = {
    variant: 'text' | 'outlined' | 'contained'
    color: 'inherit' | 'primary' | 'secondary' | 'default';
    onClick: () => void
    title: string
}

const ButtonWithMemo = memo((props: ButtonWithMemoPropsType) => {
    return (
        <Button variant={props.variant}
                onClick={props.onClick}
                color={props.color}>
            {props.title}
        </Button>
    )
})


