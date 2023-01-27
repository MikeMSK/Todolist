import {todolistAPI, TodolistType} from "../../api/todolist-api";
import {Dispatch} from "redux";
import {AppActionType, AppThunk} from "../../app/store";

const initialState: Array<TodolistDomainType> = []

export const todolistsReducer = (state: Array<TodolistDomainType> = initialState,
                                 action: TodolistActionType): Array<TodolistDomainType> => {
    switch (action.type) {
        case 'SET-TODOLISTS':
            return action.todolists.map(tl => ({...tl, filter: "all"}))
        case 'CREATE-TODOLIST':
            return [{...action.todolist, filter: 'all'}, ...state]
        case 'UPDATE-TODOLIST-TITLE':
            return state.map(tl => tl.id === action.todolistId ? {...tl, title: action.title} : tl)
        case 'UPDATE-TODOLIST-FILTER':
            return state.map(tl => tl.id === action.todolistId ? {...tl, filter: action.filter} : tl)
        case 'DELETE-TODOLIST':
            return state.filter(tl => tl.id !== action.todolistId)
        default:
            return state;
    }
}
//action creators
export const setTodolistsAC = (todolists: TodolistType[]) => ({type: 'SET-TODOLISTS', todolists} as const)
export const createTodolistAC = (todolist: TodolistType) => ({type: 'CREATE-TODOLIST', todolist} as const)
export const updateTodolistTitleAC = (todolistId: string, title: string) => ({
    type: 'UPDATE-TODOLIST-TITLE',
    todolistId,
    title
} as const)
export const updateTodolistFilterAC = (todolistId: string, filter: FilterValuesType) => ({
    type: 'UPDATE-TODOLIST-FILTER',
    todolistId,
    filter
} as const)
export const deleteTodolistAC = (todolistId: string) => ({type: 'DELETE-TODOLIST', todolistId} as const)
//thunks
export const fetchTodolistsTC = (): AppThunk => {
    return (dispatch: Dispatch<AppActionType>) => {
        todolistAPI.getTodolists()
            .then((res) => {
                dispatch(setTodolistsAC(res))
            })
    }
}
export const createTodolistTC = (title: string): AppThunk => {
    return (dispatch: Dispatch<AppActionType>) => {
        todolistAPI.createTodolist(title)
            .then((res) => {
                dispatch(createTodolistAC(res.data.item))
            })
    }
}
export const updateTodolistTitleTC = (todolistId: string, title: string): AppThunk => {
    return (dispatch: Dispatch<AppActionType>) => {
        todolistAPI.updateTodolistTitle(todolistId, title)
            .then((res) => {
                dispatch(updateTodolistTitleAC(todolistId, title))
            })
    }
}
export const deleteTodolistTC = (todoloistId: string): AppThunk => {
    return (dispatch: Dispatch<AppActionType>) => {
        todolistAPI.deleteTodolist(todoloistId)
            .then((res) => {
                dispatch(deleteTodolistAC(todoloistId))
            })
    }
}


//types
export type FilterValuesType = 'all' | 'active' | 'completed';
export type TodolistDomainType = TodolistType & { filter: FilterValuesType }
export type TodolistActionType =
    | ReturnType<typeof setTodolistsAC>
    | ReturnType<typeof createTodolistAC>
    | ReturnType<typeof updateTodolistTitleAC>
    | ReturnType<typeof updateTodolistFilterAC>
    | ReturnType<typeof deleteTodolistAC>
