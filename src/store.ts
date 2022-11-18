import {combineReducers, createStore} from "redux";
import {tasksReducer} from "./state/tasks-reducer";
import {todolistReducer} from "./state/todolists-reducer";
import {TasksStateType, TodoListType} from "./AppWithRedux";


// type AppRootState = {
//     todolists: Array<TodoListType>
//     tasks: TasksStateType
// }
export type AppRootState = ReturnType<typeof rootReducer>

const rootReducer = combineReducers({
    todolists: todolistReducer,
    tasks: tasksReducer
})

export const store = createStore(rootReducer)


// @ts-ignore
window.store = store;