import {todolistAPI, TodolistType} from "../api/todolist-api";
import {Dispatch} from "redux";
import {AppActionType, AppThunk} from "./store";

const initialState: Array<TodolistDomainType> = []

export const todolistsReducer = (state: Array<TodolistDomainType> = initialState,
                                 action: TodolistsActionType): Array<TodolistDomainType> => {
    switch (action.type) {
        case 'SET-TODOLISTS': {
            return action.todolists.map((tl) => {
                return {
                    ...tl, filter: "all"
                }
            })
        }
        case 'DELETE-TODOLIST': {
            return state.filter(tl => tl.id != action.id)
        }
        case 'CREATE-TODOLIST': {
            const newTodolist: TodolistDomainType = {...action.todolist, filter: 'all'}
            return [newTodolist, ...state]
        }
        case 'UPDATE-TODOLIST-TITLE': {
            const todolist = state.find(tl => tl.id === action.id);
            if (todolist) {
                todolist.title = action.title;
            }
            return [...state]
        }
        case 'CHANGE-TODOLIST-FILTER': {
            const todolist = state.find(tl => tl.id === action.id);
            if (todolist) {
                // если нашёлся - изменим ему заголовок
                todolist.filter = action.filter;
            }
            return [...state]
        }
        default:
            return state;
    }
}
//action creator
export const deleteTodolistAC = (
    todolistId: string): DeleteTodolistActionType => {
    return {type: 'DELETE-TODOLIST', id: todolistId}
}
export const createTodolistAC = (
    todolist: TodolistType): CreateTodolistActionType => {
    return {type: 'CREATE-TODOLIST', todolist}
}
export const updateTodolistTitleAC = (
    id: string, title: string): UpdateTodolistTitleActionType => {
    return {type: 'UPDATE-TODOLIST-TITLE', id: id, title: title}
}
export const changeTodolistFilterAC = (
    id: string, filter: FilterValuesType): ChangeTodolistFilterActionType => {
    return {type: 'CHANGE-TODOLIST-FILTER', id: id, filter: filter}
}
export const setTodolistsAC = (
    todolists: TodolistType[]): SetTodolistsActionType => {
    return {type: 'SET-TODOLISTS', todolists}
}

//thunk
export const fetchTodolistsTC = (): AppThunk => {
    return (dispatch: Dispatch<AppActionType>) => {
        todolistAPI.getTodolists()
            .then((res) => {
                dispatch(setTodolistsAC(res))
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


export type DeleteTodolistActionType = {
    type: 'DELETE-TODOLIST',
    id: string
}
export type CreateTodolistActionType = {
    type: 'CREATE-TODOLIST',
    todolist: TodolistType
}
export type UpdateTodolistTitleActionType = {
    type: 'UPDATE-TODOLIST-TITLE',
    id: string
    title: string
}
export type ChangeTodolistFilterActionType = {
    type: 'CHANGE-TODOLIST-FILTER',
    id: string
    filter: FilterValuesType
}
export type SetTodolistsActionType = {
    type: 'SET-TODOLISTS',
    todolists: TodolistType[]
}
export type TodolistsActionType = DeleteTodolistActionType
    | CreateTodolistActionType
    | UpdateTodolistTitleActionType
    | ChangeTodolistFilterActionType
    | SetTodolistsActionType
export type FilterValuesType = "all" | "active" | "completed";
export type TodolistDomainType = TodolistType & { filter: FilterValuesType }