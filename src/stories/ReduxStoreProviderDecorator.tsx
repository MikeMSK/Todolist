import React from 'react'
import {Provider} from 'react-redux'
import {applyMiddleware, combineReducers, createStore, legacy_createStore} from 'redux'
import {v1} from 'uuid'
import {AppRootStateType} from '../app/store'
import {tasksReducer} from '../features/TodolistsList/tasks-reducer'
import {todolistsReducer} from '../features/TodolistsList/todolists-reducer'
import {TaskPriorities, TaskStatuses} from "../api/todolist-api";
import {appReducer} from "../app/app-reducer";
import thunkMiddleware from "redux-thunk";


const rootReducer = combineReducers({
    app: appReducer,
    tasks: tasksReducer,
    todolists: todolistsReducer
})

const initialGlobalState = {
    auth: {isLoggedIn: false},
    app: {
        status: 'idle',
        error: null,
        isInitialized: false,
    },
    todolists: [
        {id: 'todolistId1', title: "What to learn", filter: "all", entityStatus: 'idle', addedDate: '', order: 0},
        {id: 'todolistId2', title: "What to buy", filter: "all", entityStatus: 'loading', addedDate: '', order: 0}
    ],
    tasks: {
        ['todolistId1']: [
            {
                id: v1(), title: "HTML&CSS", status: TaskStatuses.Completed,
                description: '', completed: true, priority: TaskPriorities.Low,
                startDate: '', deadline: '', todoListId: 'todolistId1', order: 0, addedDate: ''
            },
            {
                id: v1(), title: "JS", status: TaskStatuses.Completed,
                description: '', completed: true, priority: TaskPriorities.Low,
                startDate: '', deadline: '', todoListId: 'todolistId1', order: 0, addedDate: '',
            }
        ],
        ['todolistId2']: [
            {
                id: v1(), title: "Milk", status: TaskStatuses.Completed,
                description: '', completed: true, priority: TaskPriorities.Low,
                startDate: '', deadline: '', todoListId: 'todolistId2', order: 0, addedDate: '',
            },
            {
                id: v1(), title: "React Book", status: TaskStatuses.Completed,
                description: '', completed: true, priority: TaskPriorities.Low,
                startDate: '', deadline: '', todoListId: 'todolistId2', order: 0, addedDate: '',
            }
        ]
    }
}

// export const storyBookStore = createStore(rootReducer, initialGlobalState as AppRootStateType)
export const storyBookStore = legacy_createStore(rootReducer,
    initialGlobalState as AppRootStateType,
    applyMiddleware(thunkMiddleware));

export const ReduxStoreProviderDecorator = (storyFn: any) => (
    <Provider
        store={storyBookStore}>{storyFn()}
    </Provider>)
