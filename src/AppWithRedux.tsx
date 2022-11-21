import React, {Reducer, useReducer} from 'react';
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
    ActionsTypesTodolists,
    addTodolist_AC,
    changeTodolistFilter_AC,
    changeTodolistTitle_AC,
    removeTodolist_AC,
    todolistReducer
} from "./state/todolists-reducer";
import {
    ActionsTypesTasks,
    addTask_AC,
    changeTaskStatus_AC,
    changeTaskTitle_AC,
    removeTask_AC,
    tasksReducer
} from "./state/tasks-reducer";
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "./state/store";
import TodoListWithRedux from "./TodoListWithRedux";


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

    const todolists = useSelector<AppRootStateType, TodoListType[]>(state => state.todolists);
    const dispatch = useDispatch()

    // const addTask = (title: string, todoListId: string) => {
    //     dispatch(addTask_AC(title, todoListId))
    // }
    // const removeTask = (taskId: string, todoListId: string) => {
    //     dispatch(removeTask_AC(taskId, todoListId))
    // }
    // const changeTaskStatus = (taskId: string, newTaskStatus: boolean, todoListId: string) => {
    //     dispatch(changeTaskStatus_AC(taskId, todoListId, newTaskStatus))
    // }
    // const changeTaskTitle = (taskId: string, title: string, todoListId: string) => {
    //     dispatch(changeTaskTitle_AC(taskId, todoListId, title))
    // }

    const addTodoList = (title: string) => {
        dispatch(addTodolist_AC(title))
    }
    // const removeTodoList = (todoListId: string) => {
    //     dispatch(removeTodolist_AC(todoListId))
    // }
    // const changeTodoListFilter = (filter: FilterValuesType, todoListId: string) => {
    //     dispatch(changeTodolistFilter_AC(todoListId, filter))
    // }
    // const changeTodoListTitle = (title: string, todoListId: string) => {
    //     dispatch(changeTodolistTitle_AC(todoListId, title))
    // }

    // const getFilteredTasks = (task: Array<TaskType>, filter: FilterValuesType) => {
    //     let tasksForTodoList = task;
    //     if (filter === "active") {
    //         tasksForTodoList = task.filter(t => !t.isDone)
    //     }
    //     if (filter === "completed") {
    //         tasksForTodoList = task.filter(t => t.isDone)
    //     }
    //     return tasksForTodoList
    // }
    // const filteredTasks = getFilteredTasks(tasks[todo.id], todo.filter)

    const todoListComponents = todolists.map(todo => {

        return (
            <Grid item key={todo.id}>
                <Paper variant={"outlined"}
                       style={{width: "280px", padding: "20px"}}>

                    <TodoListWithRedux todolist={todo}/>
                </Paper>
            </Grid>
        )
    })

    return (
        <div className="App">
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
        </div>
    )
}

export default AppWithRedux;
