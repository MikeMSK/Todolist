import React, {memo, useCallback, useEffect, useMemo} from 'react';
import {Button, IconButton} from "@material-ui/core";
import {Delete} from "@material-ui/icons";
import {Task} from "./Task/Task";
import {TaskStatuses, TaskType} from "../../../api/todolist-api";
import {FilterValuesType, TodolistDomainType} from "../todolists-reducer";
import {fetchTaskTC} from "../tasks-reducer";
import {useAppDispatch} from "../../../app/hooks/hooks";
import {EditableSpan} from "../../../components/EditableSpan/EditableSpan";
import {AddItemForm} from '../../../components/AddItemForm/AddItemForm';

export const Todolist = memo(({demo = false, ...props}: PropsType) => {

    const dispatch = useAppDispatch();

    useEffect(() => {
        if (demo) return
        const thunk = fetchTaskTC(props.todolist.id);
        dispatch(thunk)
    }, []);

    const removeTodolist = () => {
        props.deleteTodolist(props.todolist.id);
    }

    const createTask = useCallback(
        (title: string) => props.createTask(title, props.todolist.id),
        [props.createTask, props.todolist.id]);

    const updateTodolistTitle = useCallback(
        (title: string) => props.updateTodolistTitle(props.todolist.id, title),
        [props.todolist.id, props.updateTodolistTitle]);
//handler
    const onAllClickHandler = useCallback(
        () => props.updateFilter("all", props.todolist.id),
        [props.todolist.id, props.updateFilter]);
    const onActiveClickHandler = useCallback(
        () => props.updateFilter("active", props.todolist.id),
        [props.todolist.id, props.updateFilter]);
    const onCompletedClickHandler = useCallback(
        () => props.updateFilter("completed", props.todolist.id),
        [props.todolist.id, props.updateFilter]);


    const getFilteredTasks = (tasks: TaskType[], filter: FilterValuesType): TaskType[] => {
        if (props.todolist.filter === "active") {
            return tasks.filter(t => t.status === TaskStatuses.New);
        }
        if (props.todolist.filter === "completed") {
            return tasks.filter(t => t.status === TaskStatuses.Completed);
        }
        return tasks
    }
    const newTasks = useMemo(
        () => getFilteredTasks(props.tasks, props.todolist.filter),
        [props.tasks, props.todolist.filter]);

    return (
        <>
            <h3>
                <EditableSpan value={props.todolist.title}
                              onChange={updateTodolistTitle}/>
                <IconButton onClick={removeTodolist}
                            disabled={props.todolist.entityStatus === 'loading'}>
                    <Delete/>
                </IconButton>
            </h3>
            <AddItemForm addItem={createTask}
                         disabled={props.todolist.entityStatus === 'loading'}/>
            <div>
                {newTasks.map(t => {
                    return (
                        <>
                            <Task key={t.id}
                                  task={t}
                                  todolistId={props.todolist.id}

                                  deleteTask={props.deleteTask}
                                  updateTaskTitle={props.updateTaskTitle}
                                  updateTaskStatus={props.updateTaskStatus}/>
                        </>
                    )
                })}
            </div>
            <div style={{paddingTop: "10px"}}>
                <ButtonWithMemo variant={props.todolist.filter === 'all' ? 'outlined' : 'text'}
                                title={'All'}
                                color={'inherit'}
                                onClick={onAllClickHandler}/>
                <ButtonWithMemo variant={props.todolist.filter === 'active' ? 'outlined' : 'text'}
                                title={'Active'}
                                color={'primary'}
                                onClick={onActiveClickHandler}/>
                <ButtonWithMemo variant={props.todolist.filter === 'completed' ? 'outlined' : 'text'}
                                title={'Completed'}
                                color={'secondary'}
                                onClick={onCompletedClickHandler}/>
            </div>
        </>
    )
})

type PropsType = {
    todolist: TodolistDomainType
    updateFilter: (value: FilterValuesType, todolistId: string) => void
    updateTodolistTitle: (id: string, newTitle: string) => void
    deleteTodolist: (id: string) => void

    tasks: Array<TaskType>
    createTask: (title: string, todolistId: string) => void
    updateTaskStatus: (taskId: string, status: TaskStatuses, todolistId: string) => void
    updateTaskTitle: (taskId: string, newTitle: string, todolistId: string) => void
    deleteTask: (taskId: string, todolistId: string) => void

    demo?: boolean
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


