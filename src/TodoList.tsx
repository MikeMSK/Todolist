import React, {ChangeEvent, memo, useCallback} from 'react';
import {FilterValuesType} from './AppWithRedux';
import {AddItemForm} from './AddItemForm';
import {EditableSpan} from './EditableSpan';
import {Button, Checkbox, IconButton} from "@material-ui/core";
import {Delete} from "@material-ui/icons";
import {Task} from "./Task";
import {TaskWithRedux} from "./TaskWithRedux";


export type TaskType = {
    id: string
    title: string
    isDone: boolean
}

type PropsType = {
    id: string
    title: string
    filter: FilterValuesType
    tasks: Array<TaskType>
    // removeTask: (taskId: string, todolistId: string) => void
    // changeTaskStatus: (id: string, isDone: boolean, todolistId: string) => void
    // changeTaskTitle: (taskId: string, newTitle: string, todolistId: string) => void
    changeFilter: (value: FilterValuesType, todolistId: string) => void
    addTask: (title: string, todolistId: string) => void
    removeTodolist: (id: string) => void
    changeTodolistTitle: (id: string, newTitle: string) => void
}

export const Todolist = memo((props: PropsType) => {
    console.log('todolist')

    const removeTodolist = () => {
        props.removeTodolist(props.id);
    }

    const addTask = useCallback(
        (title: string) => {
            props.addTask(title, props.id);
        },
        [props.addTask, props.id]);
    const changeTodolistTitle = useCallback(
        (title: string) => {
            props.changeTodolistTitle(props.id, title);
        },
        []);


    const onAllClickHandler = useCallback(
        () => {
            props.changeFilter("all", props.id)
        },
        []);
    const onActiveClickHandler = useCallback(
        () => {
            props.changeFilter("active", props.id);
        },
        []);
    const onCompletedClickHandler = useCallback(
        () => {
            props.changeFilter("completed", props.id);
        },
        []);

    let tasks = props.tasks
    if (props.filter === "active") {
        tasks = tasks.filter(t => t.isDone === false);
    }
    if (props.filter === "completed") {
        tasks = tasks.filter(t => t.isDone === true);
    }

    // const removeTask = useCallback(
    //     (taskId: string) => {
    //         props.removeTask(taskId, props.id)
    //     },
    //     [props.removeTask, props.id])
    //
    // const changeTaskStatus = useCallback(
    //     (taskId: string, status: boolean) => {
    //         props.changeTaskStatus(taskId, status, props.id);
    //     },
    //     [props.changeTaskStatus, props.id])
    //
    // const changeTaskTitle = useCallback(
    //     (taskId: string, newValue: string) => {
    //         props.changeTaskTitle(taskId, newValue, props.id);
    //     },
    //     [props.changeTaskStatus, props.id])

    return (
        <div>
            <h3>
                <EditableSpan value={props.title}
                              onChange={changeTodolistTitle}/>
                <IconButton onClick={removeTodolist}>
                    <Delete/>
                </IconButton>
            </h3>
            <AddItemForm addItem={addTask}/>
            <div>
                {tasks.map(t => {
                    return (<>
                            {/*<Task key={t.id}*/}
                            {/*      task={t}*/}
                            {/*      removeTask={removeTask}*/}
                            {/*      changeTaskStatus={changeTaskStatus}*/}
                            {/*      changeTaskTitle={changeTaskTitle}/>*/}
                            <TaskWithRedux key={t.id}
                                           task={t}
                                           todoID={props.id}/>
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
