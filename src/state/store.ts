import {TaskActionType, tasksReducer} from './tasks-reducer';
import {TodolistsActionType, todolistsReducer} from './todolists-reducer';
import {applyMiddleware, compose, legacy_createStore} from 'redux';
import {combineReducers} from "redux";
import thunkMiddleware, {ThunkAction, ThunkDispatch} from "redux-thunk";

// ---для расширения в браузере Redux
declare global {
    interface Window {
        __REDUX_DEVTOOLS_EXTENSION_COMPOSE__?: typeof compose;
    }
}

// объединяя reducer-ы с помощью combineReducers,
// мы задаём структуру нашего единственного объекта-состояния
const rootReducer = combineReducers({
    tasks: tasksReducer,
    todolists: todolistsReducer
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
export type AppActionType = TodolistsActionType | TaskActionType

// типизация санок
export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, RootState, unknown, AppActionType>
export type AppDispatch = ThunkDispatch<RootState, unknown, AppActionType>
// а это, чтобы можно было в консоли браузера обращаться к store в любой момент
// @ts-ignore
window.store = store;
