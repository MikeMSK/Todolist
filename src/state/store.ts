import {combineReducers, legacy_createStore} from "redux";
import {tasksReducer} from "./tasks-reducer";
import {todolistReducer} from "./todolists-reducer";

// обьединение редюсеров в один общий (но вызывает он все редьюсеры)
const rootReducer = combineReducers({
    tasks: tasksReducer,
    todolists: todolistReducer
})
//создаем стор
export const store = legacy_createStore(rootReducer)

export type AppRootStateType = ReturnType<typeof rootReducer>

// @ts-ignore
window.store = store