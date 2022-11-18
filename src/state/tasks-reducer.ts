import {TasksStateType} from "../AppWithRedux";
import {v1} from "uuid";
import {TaskType} from "../TodoList";
import {
    ADD_TODOLIST,
    AddTodolist_TypeAC,
    REMOVE_TODOLIST,
    RemoveTodolist_TypeAC,
    todoListId_1, todoListId_2
} from "./todolists-reducer";

const initialState: TasksStateType = {
    [todoListId_1]: [
        {id: v1(), title: "HTML&CSS", isDone: true},
        {id: v1(), title: "JS/TS", isDone: true},
        {id: v1(), title: "React", isDone: false},
        {id: v1(), title: "Redux", isDone: false},
        {id: v1(), title: "RTK", isDone: false},
    ],
    [todoListId_2]: [
        {id: v1(), title: "Water", isDone: true},
        {id: v1(), title: "Beer", isDone: true},
        {id: v1(), title: "Toilet paper", isDone: false},
        {id: v1(), title: "Buckwheat", isDone: false},
        {id: v1(), title: "Meet", isDone: false},
    ]
}

export const tasksReducer = (state: TasksStateType = initialState,
                             action: ActionsTypes): TasksStateType => {
    switch (action.type) {
        case ADD_TASK:
            const newTask: TaskType = {
                id: v1(),
                title: action.title,
                isDone: false
            }
            return {
                ...state,
                [action.todolistID]: [newTask, ...state[action.todolistID]]
            }
        case REMOVE_TASK:
            return {
                ...state,
                [action.todolistID]: state[action.todolistID].filter((t) => t.id !== action.taskID)
            }
        case CHANGE_TASK_TITLE:
            return {
                ...state,
                [action.todolistID]: state[action.todolistID].map(t => t.id === action.taskID
                    ? {...t, title: action.title}
                    : t)
            }
        case CHANGE_TASK_STATUS:
            return {
                ...state,
                [action.todolistID]: state[action.todolistID].map(t => t.id === action.taskID
                    ? {...t, isDone: action.status}
                    : t)
            }

        case ADD_TODOLIST:
            return {...state, [action.todolistID]: []}
        case REMOVE_TODOLIST:
            const stateCopy = {...state}
            delete stateCopy[action.id]
            return stateCopy
        default:
            return state;
    }
}

export type ActionsTypes = AddTask_TypeAC
    | RemoveTask_TypeAC
    | ChangeTaskTitle_TypeAC
    | ChangeTaskStatus_TypeAC
    | AddTodolist_TypeAC
    | RemoveTodolist_TypeAC

export type AddTask_TypeAC = {
    type: 'ADD-TASK'
    title: string
    todolistID: string
}
export type RemoveTask_TypeAC = {
    type: 'REMOVE-TASK',
    taskID: string
    todolistID: string
}
export type ChangeTaskTitle_TypeAC = {
    type: 'CHANGE-TASK-TITLE',
    taskID: string
    todolistID: string
    title: string
}
export type ChangeTaskStatus_TypeAC = {
    type: 'CHANGE-TASK-STATUS',
    taskID: string
    todolistID: string
    status: boolean
}

export const ADD_TASK = 'ADD-TASK'
export const REMOVE_TASK = 'REMOVE-TASK'
export const CHANGE_TASK_TITLE = 'CHANGE-TASK-TITLE'
export const CHANGE_TASK_STATUS = 'CHANGE-TASK-STATUS'

export const addTask_AC = (title: string, todolistID: string): AddTask_TypeAC => {
    return {type: ADD_TASK, title, todolistID}
}
export const removeTask_AC = (taskID: string, todolistID: string): RemoveTask_TypeAC => {
    return {type: REMOVE_TASK, taskID, todolistID,}
}
export const changeTaskTitle_AC = (taskID: string, todolistID: string, title: string): ChangeTaskTitle_TypeAC => {
    return {type: CHANGE_TASK_TITLE, taskID, todolistID, title}
}
export const changeTaskStatus_AC = (taskID: string, todolistID: string, status: boolean): ChangeTaskStatus_TypeAC => {
    return {type: CHANGE_TASK_STATUS, taskID, todolistID, status}
}



