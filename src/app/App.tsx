import React from 'react';
import s from './App.module.css';
import {Menu} from "@material-ui/icons";
import {AppBar, Button, Container, IconButton, LinearProgress, Toolbar, Typography} from "@material-ui/core";
import {TodolistsList} from "../features/TodolistsList/TodolistsList";
import {ErrorSnackBar} from "../components/ErrorSnackBar/ErrorSnackBar";
import {useSelector} from "react-redux";
import {AppRootStateType} from "./store";
import {RequestStatusType} from "./app-reducer";


export function App({demo = false}: AppPropsType) {

    const status = useSelector<AppRootStateType, RequestStatusType>(state => state.app.status)

    return (
        <div className={s.app}>
            <ErrorSnackBar/>
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
                <div className={s.lineProgress}>
                    {status === 'loading' && <LinearProgress color={"secondary"}/>}
                </div>
            </AppBar>
            <Container fixed>
                <TodolistsList demo={demo}/>
            </Container>
        </div>
    );
}

type AppPropsType = {
    demo?: boolean
}


