import React, {useCallback, useEffect} from 'react';
import './App.css';
import {AppBar, Button, CircularProgress, Container, IconButton, LinearProgress, Typography} from "@mui/material";
import Toolbar from '@mui/material/Toolbar';
import {Menu} from "@mui/icons-material";
import {TodolistsList} from '../features/TodolistsList/TodolistsList';
import {useDispatch, useSelector} from "react-redux";
import {AppDispatch, AppRootStateType} from "./store";
import {initializeAppTC, RequestStatusType} from "./app-reducer";
import {ErrorSnackbar} from '../components/ErrorSnackbar/ErrorSnackbar';
import {Login} from '../features/Login/Login';
import {BrowserRouter, Navigate, Route, Routes} from "react-router-dom";
import {logoutTC} from "../features/Login/auth-reducer";

type PropsType = {
    demo?: boolean
}

function App({demo = false}: PropsType) {
    console.log('App is called')

    const status = useSelector<AppRootStateType, RequestStatusType>(state => state.app.status)
    const isInitialized = useSelector<AppRootStateType, boolean>(state => state.app.isInitialized)
    const isLoggedIn = useSelector<AppRootStateType, boolean>(state => state.auth.isLoggedIn)
    const dispatch: AppDispatch = useDispatch()

    useEffect(() => {
        dispatch(initializeAppTC())
    }, [dispatch])

    const logoutHandler = useCallback(() => {
        dispatch(logoutTC())
    }, [dispatch])

    if (!isInitialized) {
        return <div
            style={{position: 'fixed', top: '30%', textAlign: 'center', width: '100%'}}>
            <CircularProgress/>
        </div>
    }

    return (
        <BrowserRouter>
            <div className="App">
                <ErrorSnackbar/>
                <AppBar position={'static'}>
                    <Toolbar>
                        <IconButton edge={'start'} color={'inherit'} aria-label={'menu'}>
                            <Menu/>
                        </IconButton>
                        <Typography variant={'h6'}>
                            Todolist
                        </Typography>
                        {isLoggedIn
                            ? <Button color={'inherit'} onClick={logoutHandler}>Logout</Button>
                            : <Button color={'inherit'}>Login</Button>
                        }
                    </Toolbar>
                    {status === 'loading' && <LinearProgress/>}
                </AppBar>
                <Container fixed>
                    <Routes>
                        <Route path={'/'} element={<TodolistsList demo={demo}/>}/>
                        <Route path={'/todolist'} element={<Navigate to={'/'}/>}/>
                        <Route path={'/login'} element={<Login/>}/>
                        <Route path={'/404'} element={<h1>404: PAGE NOT FOUND</h1>}/>
                        <Route path={'/*'} element={<Navigate to={'/404'}/>}/>
                    </Routes>
                </Container>
            </div>
        </BrowserRouter>
    );
}

export default App;