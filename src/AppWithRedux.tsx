import React, {useReducer, useState} from 'react';
import './App.css';
import TodoList, {TaskType} from "./TodoList";
import {v1} from "uuid";
import AddIemForm from "./AddIemForm";
import {
    AppBar,
    Button, Container, Grid,
    IconButton, Paper,
    Toolbar,
    Typography
} from "@material-ui/core";
import {Menu} from "@material-ui/icons";
import {
    addTodolist_AC,
    changeTodolistFilter_AC,
    changeTodolistTitle_AC,
    removeTodolist_AC,
    todolistReducer
} from "./state/todolists-reducer";
import {addTask_AC, changeTaskStatus_AC, changeTaskTitle_AC, removeTask_AC, tasksReducer} from "./state/tasks-reducer";
import {useDispatch, useSelector} from "react-redux";
import {AppRootState} from "./store";

export type FilterValuesType = "all" | "active" | "completed"
export type TodoListType = {
    id: string
    title: string
    filter: FilterValuesType
}
export type TasksStateType = {
    [todoListId: string]: Array<TaskType>
}


function AppWithRedux() {

    const dispatch = useDispatch()

    const todolists = useSelector<AppRootState, Array<TodoListType>>(state => state.todolists)
    const tasks = useSelector<AppRootState, TasksStateType>(state => state.tasks)

    //C:
    const addTask = (title: string, todoListId: string) => {
        dispatch(addTask_AC(title, todoListId))
    }
    //U:
    const changeTaskStatus = (taskId: string, todoListId: string, newTaskStatus: boolean) => {
        dispatch(changeTaskStatus_AC(taskId, todoListId, newTaskStatus))
    }
    const changeTaskTitle = (taskId: string, title: string, todoListId: string) => {
        dispatch(changeTaskTitle_AC(taskId, todoListId, title))
    }
    //D:
    const removeTask = (taskId: string, todoListId: string) => {
        dispatch(removeTask_AC(taskId, todoListId))
    }

    //D:
    const removeTodoList = (todoListId: string) => {
        const action = removeTodolist_AC(todoListId)
        dispatch(action)
    }
    //U:
    const changeTodoListFilter = (filter: FilterValuesType, todoListId: string) => {
        dispatch(changeTodolistFilter_AC(todoListId, filter))
    }
    const changeTodoListTitle = (title: string, todoListId: string) => {
        dispatch(changeTodolistTitle_AC(todoListId, title))
    }
    //C:
    const addTodoList = (title: string) => {
        const action = addTodolist_AC(title)
        dispatch(action)
    }

    //GUI:
    const getFilteredTasks = (t: Array<TaskType>, f: FilterValuesType) => {
        let tasksForTodoList = t;
        if (f === "active") {
            tasksForTodoList = t.filter(t => !t.isDone)
        }
        if (f === "completed") {
            tasksForTodoList = t.filter(t => t.isDone)
        }
        return tasksForTodoList
    }

    const todoListComponents = todolists.map(tl => {
        const filteredTasks = getFilteredTasks(tasks[tl.id], tl.filter)
        return <Grid item key={tl.id}>
            <Paper variant={"outlined"}
                // elevation={8}
                   style={{width: "280px", padding: "20px"}}>
                <TodoList title={tl.title}
                          filter={tl.filter}
                          todoListId={tl.id}
                          tasks={filteredTasks}

                          addTask={addTask}
                          removeTask={removeTask}
                          removeTodoList={removeTodoList}
                          changeTaskTitle={changeTaskTitle}
                          changeTaskStatus={changeTaskStatus}
                          changeTodoListTitle={changeTodoListTitle}
                          changeTodoListFilter={changeTodoListFilter}
                />
            </Paper>
        </Grid>
    })

    return <div className="App">
        <AppBar position="static">
            <Toolbar style={{justifyContent: "space-between"}}>
                <IconButton edge="start"
                            color="inherit"
                            aria-label="menu">
                    <Menu/>
                </IconButton>
                <Typography variant="h6">
                    Todolists
                </Typography>
                <Button color="inherit"
                        variant={"outlined"}>
                    Login
                </Button>
            </Toolbar>
        </AppBar>
        <Container fixed>
            <Grid container style={{padding: "20px 0"}}>
                <AddIemForm addItem={addTodoList}/>
            </Grid>
            <Grid container spacing={5}>
                {todoListComponents}
            </Grid>
        </Container>
    </div>;
}

export default AppWithRedux;
