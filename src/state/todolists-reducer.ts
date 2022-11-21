import {FilterValuesType, TodoListType} from "../AppWithRedux";
import {v1} from "uuid";


// export const todoListId_1 = v1()
// export const todoListId_2 = v1()
// const initialStateTodolists: TodoListType[] = [
//     {id: todoListId_1, title: "What to learn", filter: "all"},
//     {id: todoListId_2, title: "What to buy", filter: "all"},
// ]
const initialStateTodolists: TodoListType[] = []
export const todolistReducer = (state: TodoListType[] = initialStateTodolists,
                                action: ActionsTypesTodolists): Array<TodoListType> => {
    switch (action.type) {
        case ADD_TODOLIST:
            return [...state, {id: action.todolistID, title: action.title, filter: 'all'}]
        case REMOVE_TODOLIST:
            return state.filter(tl => tl.id != action.id)
        case CHANGE_TODOLIST_TITLE:
            return state.map(tl => tl.id === action.id
                ? {...tl, title: action.title}
                : tl)
        case CHANGE_TODOLIST_FILTER:
            return state.map(tl => tl.id === action.id
                ? {...tl, filter: action.filter}
                : tl)
        default:
            return state;
    }
}

export type ActionsTypesTodolists = AddTodolist_TypeAC
    | RemoveTodolist_TypeAC
    | ChangeTodolistTitle_TypeAC
    | ChangeTodolistFilter_TypeAC

export type AddTodolist_TypeAC = {
    type: 'ADD-TODOLIST'
    title: string
    todolistID: string
}
export type RemoveTodolist_TypeAC = {
    type: 'REMOVE-TODOLIST',
    id: string
}
export type ChangeTodolistTitle_TypeAC = {
    type: 'CHANGE-TODOLIST-TITLE',
    id: string
    title: string
}
export type ChangeTodolistFilter_TypeAC = {
    type: 'CHANGE-TODOLIST-FILTER',
    id: string
    filter: FilterValuesType
}

export const ADD_TODOLIST = 'ADD-TODOLIST'
export const REMOVE_TODOLIST = 'REMOVE-TODOLIST'
export const CHANGE_TODOLIST_TITLE = 'CHANGE-TODOLIST-TITLE'
export const CHANGE_TODOLIST_FILTER = 'CHANGE-TODOLIST-FILTER'

export const addTodolist_AC = (title: string): AddTodolist_TypeAC => {
    return {type: ADD_TODOLIST, title, todolistID: v1()}
}
export const removeTodolist_AC = (todolistID: string): RemoveTodolist_TypeAC => {
    return {type: REMOVE_TODOLIST, id: todolistID}
}
export const changeTodolistTitle_AC = (todolistID: string, title: string): ChangeTodolistTitle_TypeAC => {
    return {type: CHANGE_TODOLIST_TITLE, id: todolistID, title}
}
export const changeTodolistFilter_AC = (todolistID: string, filter: FilterValuesType): ChangeTodolistFilter_TypeAC => {
    return {type: CHANGE_TODOLIST_FILTER, id: todolistID, filter: filter}
}



