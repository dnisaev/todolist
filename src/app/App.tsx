import React from 'react';
import './App.css';
import {AppBar, Button, Container, IconButton, Typography} from "@mui/material";
import Toolbar from '@mui/material/Toolbar';
import {Menu} from "@mui/icons-material";
import { TodolistsList } from '../features/TodolistsList/TodolistsList';

function App() {
    console.log('App is called')

    return (
        <div className="App">
            <AppBar position={'static'}>
                <Toolbar>
                    <IconButton edge={'start'} color={'inherit'} aria-label={'menu'}>
                        <Menu/>
                    </IconButton>
                    <Typography variant={'h6'}>
                        Todolist
                    </Typography>
                    <Button color={'inherit'}>Login</Button>
                </Toolbar>
            </AppBar>
            <Container fixed>
                <TodolistsList/>
            </Container>
        </div>
    );
}

export default App;