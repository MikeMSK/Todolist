import React, {useEffect} from 'react';
import s from './App.module.css';
import {Menu} from "@material-ui/icons";
import {
    AppBar,
    Button,
    CircularProgress,
    Container,
    IconButton,
    LinearProgress,
    Toolbar,
    Typography
} from "@material-ui/core";
import {TodolistsList} from "../features/TodolistsList/TodolistsList";
import {ErrorSnackBar} from "../components/ErrorSnackBar/ErrorSnackBar";
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "./store";
import {initializeAppTC, RequestStatusType} from "./app-reducer";
import {Route, Routes} from "react-router-dom";
import {Login} from "../features/Login/Login";
import {useAppDispatch, useAppSelector} from "./hooks/hooks";


export function App({demo = false}: AppPropsType) {

    const dispatch = useAppDispatch()
    const status = useAppSelector(state => state.app.status)
    const isInitialized = useAppSelector(state => state.app.isInitialized)

    useEffect(() => {
        dispatch(initializeAppTC())
    }, []);

    if (!isInitialized) {
        return <div style={{position: 'fixed', top: '30%', left: '50%'}}>
            <CircularProgress color={"secondary"}/>
        </div>
    }
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
                <Routes>
                    <Route path={'/*'} element={<TodolistsList demo={demo}/>}/>
                    <Route path={'/login'} element={<Login/>}/>
                </Routes>

            </Container>
        </div>
    );
}

type AppPropsType = {
    demo?: boolean
}


