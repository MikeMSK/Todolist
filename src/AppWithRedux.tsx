import React, {useCallback, useEffect} from 'react';
import './App.css';
import {Todolist} from './Todolist';
import {AddItemForm} from './AddItemForm';
import {todolistsSelector} from "./state/selectors/todolistsSelector";
import {TaskType} from "./api/todolist-api";
import {useSelector} from 'react-redux';
import {AppRootStateType} from './state/store';
import {
    addTodolistAC, changeTodolistFilterAC, changeTodolistTitleAC,
    fetchTodolistsTC, FilterValuesType, removeTodolistAC,
    TodolistDomainType,
} from './state/todolists-reducer';
import {addTaskAC, addTaskTC} from './state/tasks-reducer';
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

    const addTask = useCallback(
        (title: string, todolistId: string) => {
            const thunk = addTaskTC(title, todolistId);
            dispatch(thunk);
        },
        [dispatch]);
    const changeFilter = useCallback(
        (value: FilterValuesType, todolistId: string) => {
            const action = changeTodolistFilterAC(todolistId, value);
            dispatch(action);
        },
        [dispatch])
    const removeTodolist = useCallback(
        (id: string) => {
            const action = removeTodolistAC(id);
            dispatch(action);
        },
        [dispatch])
    const changeTodolistTitle = useCallback(
        (id: string, title: string) => {
            const action = changeTodolistTitleAC(id, title);
            dispatch(action);
        },
        [dispatch])
    const addTodolist = useCallback(
        (title: string) => {
            const action = addTodolistAC(title);
            dispatch(action);
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

                    <AddItemForm addItem={addTodolist}/>
                </Grid>
                <Grid container spacing={3}>

                    {todolists.map(tl => {
                        return (
                            <Grid item key={tl.id}>
                                <Paper style={{padding: "10px"}}>
                                    <Todolist id={tl.id}
                                              title={tl.title}
                                              tasks={tasks[tl.id]}

                                              changeFilter={changeFilter}
                                              addTask={addTask}
                                              filter={tl.filter}
                                              removeTodolist={removeTodolist}
                                              changeTodolistTitle={changeTodolistTitle}
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