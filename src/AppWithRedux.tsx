import React, {useCallback, useEffect} from 'react';
import './App.css';
import {Todolist} from './Todolist';
import {AddItemForm} from './AddItemForm';
import {todolistsSelector} from "./state/selectors/todolistsSelector";
import {TaskStatuses, TaskType} from "./api/todolist-api";
import {
    changeTodolistFilterAC, fetchTodolistsTC, FilterValuesType,
    deleteTodolistTC, createTodolistTC, updateTodolistTitleTC,
} from './state/todolists-reducer';
import {createTaskTC, deleteTaskTC, updateTaskTC} from './state/tasks-reducer';
import {Menu} from "@material-ui/icons";
import {
    AppBar, Button, Container, Grid, IconButton, Paper, Toolbar, Typography
} from "@material-ui/core";
import {useAppDispatch, useAppSelector} from "./app/hooks";

export function AppWithRedux() {
    const todolists = useAppSelector(todolistsSelector)
    const tasks = useAppSelector(state => state.tasks)
    const dispatch = useAppDispatch();

    useEffect(() => {
        const thunk = fetchTodolistsTC()
        dispatch(thunk);
    }, []);

    const createTask = useCallback(
        (title: string, todolistId: string) => {
            const thunk = createTaskTC(title, todolistId);
            dispatch(thunk);
        },
        [dispatch]);
    const deleteTask = useCallback(
        (taskId: string, todolistId: string) => {
            const thunk = deleteTaskTC(todolistId, taskId)
            dispatch(thunk)
        },
        [dispatch]);
    const updateTaskStatus = useCallback(
        (taskId: string, status: TaskStatuses, todolistId: string) => {
            const thunk = updateTaskTC(todolistId, taskId, {status});
            dispatch(thunk);
        },
        [dispatch])
    const updateTaskTitle = useCallback(
        (taskId: string, newTitle: string, todolistId: string) => {
            const thunk = updateTaskTC(todolistId, taskId, {title: newTitle});
            dispatch(thunk)
        },
        [dispatch])
    const updateFilter = useCallback(
        (value: FilterValuesType, todolistId: string) => {
            const thunk = changeTodolistFilterAC(todolistId, value);
            dispatch(thunk);
        },
        [dispatch])
    const deleteTodolist = useCallback(
        (id: string) => {
            const thunk = deleteTodolistTC(id);
            dispatch(thunk);
        },
        [dispatch])
    const updateTodolistTitle = useCallback(
        (id: string, title: string) => {
            const thunk = updateTodolistTitleTC(id, title);
            dispatch(thunk);
        },
        [dispatch])
    const createTodolist = useCallback(
        (title: string) => {
            const thunk = createTodolistTC(title);
            dispatch(thunk);
        },
        [dispatch]);

    return (
        <div className="App">
            <AppBar position="static">
                <Toolbar>
                    <IconButton edge="start" color="inherit" aria-label="menu">
                        <Menu/>
                    </IconButton>
                    <Typography variant="h6">
                        News
                    </Typography>
                    <Button color="inherit">Login</Button>
                </Toolbar>
            </AppBar>
            <Container fixed>
                <Grid container style={{padding: "20px"}}>

                    <AddItemForm addItem={createTodolist}/>
                </Grid>
                <Grid container spacing={3}>

                    {todolists.map((tl) => {
                        return (
                            <Grid item key={tl.id}>
                                <Paper style={{padding: "10px"}}>
                                    <Todolist id={tl.id}
                                              title={tl.title}
                                              tasks={tasks[tl.id]}

                                              deleteTask={deleteTask}
                                              updateTaskTitle={updateTaskTitle}
                                              updateTaskStatus={updateTaskStatus}
                                              changeFilter={updateFilter}
                                              addTask={createTask}
                                              filter={tl.filter}
                                              removeTodolist={deleteTodolist}
                                              updateTodolistTitle={updateTodolistTitle}
                                    />
                                </Paper>
                            </Grid>)
                    })}
                </Grid>
            </Container>
        </div>);
}


export type TasksStateType = {
    [key: string]: Array<TaskType>
}