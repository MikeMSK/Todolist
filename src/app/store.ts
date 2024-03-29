import {TaskActionType, tasksReducer} from '../features/TodolistsList/tasks-reducer';
import {TodolistActionType, todolistsReducer} from '../features/TodolistsList/todolists-reducer';
import {applyMiddleware, compose, legacy_createStore} from 'redux';
import {combineReducers} from "redux";
import thunkMiddleware, {ThunkAction, ThunkDispatch} from "redux-thunk";
import {appReducer} from "./app-reducer";
import {authReducer} from "../features/Login/auth-reducer";


// ---для расширения в браузере Redux
declare global {
    interface Window {
        __REDUX_DEVTOOLS_EXTENSION_COMPOSE__?: typeof compose;
    }
}

// объединяя reducer-ы с помощью combineReducers,
// мы задаём структуру нашего единственного объекта-состояния
const rootReducer = combineReducers({
    app: appReducer,
    tasks: tasksReducer,
    todolists: todolistsReducer,
    auth: authReducer,
})

// ---для расширения в браузере Redux
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
// export const store = legacy_createStore(rootReducer, applyMiddleware(thunkMiddleware), composeEnhancers());

// непосредственно создаём store
export const store = legacy_createStore(rootReducer, applyMiddleware(thunkMiddleware));

// определить автоматически тип всего объекта состояния
export type AppRootStateType = ReturnType<typeof rootReducer>
export type RootState = ReturnType<typeof store.getState>

// все типы экшенов ждя всего App
export type AppActionType = TodolistActionType | TaskActionType

// типизация санок
export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, RootState, unknown, AppActionType>
export type AppDispatch = ThunkDispatch<RootState, unknown, AppActionType>
// а это, чтобы можно было в консоли браузера обращаться к store в любой момент
// @ts-ignore
window.store = store;
