import {TodolistActionType} from './todolists-reducer';
import {TaskPriorities, TaskStatuses, TaskType, todolistAPI, UpdateTaskModelType} from "../../api/todolist-api";
import {Dispatch} from "redux";
import {AppActionType, AppRootStateType, AppThunk} from "../../app/store";
import {AppErrorActionsType, setAppStatusAC} from "../../app/app-reducer";
import {handleNetworkError, handleServerAppError} from "../../utils/error-utils";

const initialState: TasksStateType = {}
//reducer
export const tasksReducer = (state: TasksStateType = initialState,
                             action: TaskActionType): TasksStateType => {
    switch (action.type) {
        case 'SET-TODOLISTS':
            const stateCopy = {...state}
            action.todolists.forEach(tl => {
                stateCopy[tl.id] = []
            })
            return stateCopy
        case 'SET-TASKS':
            return {...state, [action.todolistId]: action.tasks}

        case 'DELETE-TASK':
            return {...state, [action.todolistId]: state[action.todolistId].filter(t => t.id !== action.taskId)}
        case 'CREATE-TASK':
            return {...state, [action.task.todoListId]: [action.task, ...state[action.task.todoListId]]}
        case 'UPDATE-TASK':
            return {
                ...state, [action.todolistId]: state[action.todolistId]
                    .map(t => t.id === action.taskId ? {...t, ...action.model} : t)
            }

        case'CREATE-TODOLIST':
            return {...state, [action.todolist.id]: []}
        case'DELETE-TODOLIST':
            const copyState = {...state};
            delete copyState[action.todolistId];
            return copyState;
        default:
            return state;
    }
}
//action creators
export const setTasksAC = (todolistId: string, tasks: TaskType[]) => ({type: 'SET-TASKS', todolistId, tasks} as const)
export const createTaskAC = (task: TaskType) => ({type: 'CREATE-TASK', task} as const)
export const updateTaskAC = (taskId: string, model: UpdateDomainTaskType, todolistId: string) => (
    {type: 'UPDATE-TASK', model, todolistId, taskId} as const)
export const deleteTaskAC = (taskId: string, todolistId: string) => ({type: 'DELETE-TASK', taskId, todolistId} as const)

//thunks
export const fetchTaskTC = (todolistId: string): AppThunk => {
    return (dispatch: Dispatch<AppActionType>) => {
        dispatch(setAppStatusAC("loading"))
        todolistAPI.getTask(todolistId)
            .then((res) => {
                dispatch(setTasksAC(todolistId, res.items))
                dispatch(setAppStatusAC("succeeded"))
            })
            .catch((err) => handleNetworkError(err, dispatch))
    }
}
export const createTaskTC = (title: string, todolistId: string): AppThunk => {
    return (dispatch: Dispatch<AppActionType>) => {
        dispatch(setAppStatusAC("loading"))
        todolistAPI.createTask(todolistId, title)
            .then((res) => {
                if (res.resultCode === 0) {
                    const newTask = res.data.item
                    dispatch(createTaskAC(newTask))
                    dispatch(setAppStatusAC("succeeded"))
                } else {
                    handleServerAppError(res, dispatch)
                }
            })
            .catch((err) => handleNetworkError(err, dispatch))
    }
}
export const updateTaskTC = (todolistId: string, taskId: string, domainModel: UpdateDomainTaskType): AppThunk => {
    return (dispatch: Dispatch<AppActionType>, getState: () => AppRootStateType) => {
        const task = getState().tasks[todolistId].find(t => t.id === taskId)

        if (!task) throw new Error('task not found')

        const apiModel: UpdateTaskModelType = {
            title: task.title,
            description: task.description,
            status: task.status,
            priority: task.priority,
            startDate: task.startDate,
            deadline: task.deadline,
            ...domainModel
        }

        todolistAPI.updateTask(todolistId, taskId, apiModel)
            .then((res) => {
                if (res.resultCode === 0) {
                    dispatch(updateTaskAC(taskId, domainModel, todolistId))
                } else {
                    handleServerAppError(res, dispatch)
                }
            })
            .catch((err) => handleNetworkError(err, dispatch))
    }
}
export const deleteTaskTC = (todolistId: string, taskId: string): AppThunk => {
    return (dispatch: Dispatch<AppActionType>) => {
        todolistAPI.deleteTask(todolistId, taskId)
            .then(() => {
                dispatch(deleteTaskAC(taskId, todolistId))
            })
            .catch((err) => handleNetworkError(err, dispatch))
    }
}

// types
export type TaskActionType =
    | ReturnType<typeof setTasksAC>
    | ReturnType<typeof createTaskAC>
    | ReturnType<typeof updateTaskAC>
    | ReturnType<typeof deleteTaskAC>
    | TodolistActionType
    | AppErrorActionsType
export type UpdateDomainTaskType = {
    title?: string
    description?: string
    status?: TaskStatuses
    priority?: TaskPriorities
    startDate?: string
    deadline?: string
}
export type TasksStateType = {
    [key: string]: Array<TaskType>
}


//thunks
//async await (example)
// export const _fetchTaskTC = (todolistId: string): AppThunk => async dispatch => {
//     try {
//         const response = await todolistAPI.getTask(todolistId)
//         dispatch(setTasksAC(todolistId, response.items))
//     } catch (e: any) {
//         throw new Error(e)
//     }
//
// }