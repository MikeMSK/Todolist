import React from 'react';
import './index.css';
import {ThemeProvider} from '@material-ui/core/styles';
import {createTheme} from '@material-ui/core/styles';
import * as serviceWorker from './serviceWorker';
import {teal, yellow} from "@material-ui/core/colors";
import {CssBaseline} from "@material-ui/core";
import {createRoot} from "react-dom/client";
import {Provider} from "react-redux";
import {store} from "./state/store";
import AppWithRedux from "./AppWithRedux";

const theme = createTheme({
    palette: {
        primary: teal,
        secondary: yellow,
        type: "dark"
    }
})

const container = document.getElementById('root') as HTMLElement;
const root = createRoot(container);
root.render(
    <Provider store={store}>
        <ThemeProvider theme={theme}>
            <CssBaseline/>
            <AppWithRedux/>
        </ThemeProvider>
    </Provider>
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();

