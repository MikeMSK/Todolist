import React, {useState, KeyboardEvent, ChangeEvent} from 'react';
import {FilterValuesType} from "./App";
import AddIemForm from "./AddIemForm";
import EditableSpan from "./EditableSpan";
import {
    Button, ButtonGroup, Checkbox, IconButton, List, ListItem, Typography
} from "@material-ui/core";
import {HighlightOffTwoTone} from "@material-ui/icons";

type TodoListPropsType = {
    todoListId: string
    title: string
    tasks: Array<TaskType>
    filter: FilterValuesType
    removeTask: (taskId: string, todoListId: string) => void
    changeTodoListFilter: (filter: FilterValuesType, todoListId: string) => void
    addTask: (title: string, todoListId: string) => void
    changeTaskStatus: (taskId: string, isDone: boolean, todoListId: string) => void
    removeTodoList: (todoListId: string) => void
    changeTaskTitle: (taskId: string, title: string, todoListId: string) => void
    changeTodoListTitle: (title: string, todoListId: string) => void
}

export type TaskType = {
    id: string
    title: string
    isDone: boolean
}


export const TodoList = (props: TodoListPropsType) => {

    const getTasksListItem = (t: TaskType) => {
        const removeTask = () => props.removeTask(t.id, props.todoListId)
        const changeTaskStatus = (e: ChangeEvent<HTMLInputElement>) =>
            props.changeTaskStatus(t.id, e.currentTarget.checked, props.todoListId)
        const changeTaskTitle = (title: string) =>
            props.changeTaskTitle(t.id, title, props.todoListId)
        return <ListItem key={t.id}
                         style={{
                             padding: "0px",
                             justifyContent: "space-between",
                             textDecoration: t.isDone ? "line-through" : "none"
                         }}
                         className={t.isDone ? "isDone" : "notIsDone"}>

            <Checkbox size={"small"}
                      color={"primary"}
                      onChange={changeTaskStatus}
                      checked={t.isDone}/>

            <EditableSpan title={t.title}
                          changeTitle={changeTaskTitle}/>

            <IconButton onClick={removeTask}
                        size={"small"}>
                <HighlightOffTwoTone/>
            </IconButton>
        </ListItem>
    }
    const tasksList = props.tasks.length
        ? <List>{props.tasks.map(getTasksListItem)}</List>
        : <span>Your taskslist is empty :(</span>

    const addTask = (title: string) => {
        props.addTask(title, props.todoListId)
    }
    const handlerCreator = (filter: FilterValuesType) =>
        () => props.changeTodoListFilter(filter, props.todoListId)

    const removeTodoList = () => props.removeTodoList(props.todoListId)
    const changeTodoListTitle = (title: string) => props.changeTodoListTitle(title, props.todoListId)
    return <div>
        <Typography variant={"h5"}
                    align={"center"}
                    style={{fontWeight: "bold", marginBottom: "20px"}}>
            <EditableSpan title={props.title}
                          changeTitle={changeTodoListTitle}/>

            <IconButton onClick={removeTodoList}
                        size={"small"}>
                <HighlightOffTwoTone/>
            </IconButton>
        </Typography>
        <AddIemForm addItem={addTask}/>
        {tasksList}
        <div>
            <ButtonGroup fullWidth
                         disableElevation
                         variant={"contained"}
                         size={"small"}>
                <Button
                    color={props.filter === "all" ? "secondary" : "primary"}
                    onClick={handlerCreator("all")}
                    style={{fontSize: "0.7em"}}
                >All</Button>
                <Button
                    color={props.filter === "active" ? "secondary" : "primary"}
                    onClick={handlerCreator("active")}
                    style={{fontSize: "0.7em"}}
                >Active</Button>
                <Button
                    color={props.filter === "completed" ? "secondary" : "primary"}
                    onClick={handlerCreator("completed")}
                    style={{fontSize: "0.7em"}}
                >Completed</Button>
            </ButtonGroup>
        </div>
    </div>
        ;
};
