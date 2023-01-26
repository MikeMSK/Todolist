import {TasksStateType} from '../AppWithRedux';
import {CreateTodolistActionType, DeleteTodolistActionType, SetTodolistsActionType} from './todolists-reducer';
import {TaskPriorities, TaskStatuses, TaskType, todolistAPI, UpdateTaskModelType} from "../api/todolist-api";
import {Dispatch} from "redux";
import {AppActionType, AppRootStateType, AppThunk} from "./store";
import {Simulate} from "react-dom/test-utils";
import error = Simulate.error;

const initialState: TasksStateType = {}

export const tasksReducer = (state: TasksStateType = initialState,
                             action: TaskActionType): TasksStateType => {
    switch (action.type) {
        case 'SET-TODOLISTS': {
            const stateCopy = {...state}
            action.todolists.forEach(tl => {
                stateCopy[tl.id] = []
            })

            return stateCopy
        }
        case 'SET-TASKS': {
            const stateCopy = {...state}
            stateCopy[action.todolistId] = action.tasks
            return stateCopy
        }

        case 'DELETE-TASK': {
            const stateCopy = {...state}
            const tasks = stateCopy[action.todolistId];
            const newTasks = tasks.filter(t => t.id != action.taskId);
            stateCopy[action.todolistId] = newTasks;
            return stateCopy;
        }
        case 'CREATE-TASK': {
            const stateCopy = {...state}
            const newTask: TaskType = action.task
            const tasks = stateCopy[newTask.todoListId];
            const newTasks = [newTask, ...tasks];
            stateCopy[newTask.todoListId] = newTasks;
            return stateCopy;
        }
        case 'UPDATE-TASK': {
            return {
                ...state,
                [action.todolistId]: state[action.todolistId]
                    .map(t => t.id === action.taskId
                        ? {...t, ...action.model}
                        : t)
            }
        }
        case'CREATE-TODOLIST': {
            return {
                ...state,
                [action.todolist.id]: []
            }
        }
        case'DELETE-TODOLIST': {
            const copyState = {...state};
            delete copyState[action.id];
            return copyState;
        }
        default:
            return state;
    }
}
//action creator
export const deleteTaskAC = (
    taskId: string, todolistId: string): DeleteTaskActionType => {
    return {type: 'DELETE-TASK', taskId: taskId, todolistId: todolistId}
}
export const createTaskAC = (
    task: TaskType): CreateTaskActionType => {
    return {type: 'CREATE-TASK', task}
}
export const updateTaskAC = (
    taskId: string, model: UpdateDomainTaskType, todolistId: string): UpdateTaskActionType => {
    return {type: 'UPDATE-TASK', model, todolistId, taskId}
}
export const setTasksAC = (
    todolistId: string, tasks: TaskType[]): SetTasksActionType => {
    return {type: 'SET-TASKS', todolistId, tasks}
}

//thunk
//async await (example)
export const _fetchTaskTC = (todolistId: string): AppThunk => async dispatch => {
    try {
        const response = await todolistAPI.getTask(todolistId)
        dispatch(setTasksAC(todolistId, response.items))
    } catch (e: any) {
        throw new Error(e)
    }

}

export const fetchTaskTC = (todolistId: string): AppThunk => {
    return (dispatch: Dispatch<AppActionType>) => {
        todolistAPI.getTask(todolistId)
            .then((res) => {
                dispatch(setTasksAC(todolistId, res.items))
            })
    }
}
export const deleteTaskTC = (todolistId: string, taskId: string): AppThunk => {
    return (dispatch: Dispatch<AppActionType>) => {
        todolistAPI.deleteTask(todolistId, taskId)
            .then(() => {
                dispatch(deleteTaskAC(taskId, todolistId))
            })
    }
}
export const createTaskTC = (title: string, todolistId: string): AppThunk => {
    return (dispatch: Dispatch<AppActionType>) => {
        todolistAPI.createTask(todolistId, title)
            .then((res) => {
                const newTask = res.data.item
                dispatch(createTaskAC(newTask))
            })
    }
}

export const updateTaskTC = (todolistId: string, taskId: string, domainModel: UpdateDomainTaskType): AppThunk => {
    return (dispatch: Dispatch<AppActionType>, getState: () => AppRootStateType) => {
        const task = getState().tasks[todolistId].find(t => t.id === taskId)
        if (!task) {
            console.warn('task not found in the state')
            throw new Error('task not found')
            return;
        }
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
                dispatch(updateTaskAC(taskId, domainModel, todolistId))
            })
    }
}

export type UpdateDomainTaskType = {
    title?: string
    description?: string
    status?: TaskStatuses
    priority?: TaskPriorities
    startDate?: string
    deadline?: string
}
export type DeleteTaskActionType = {
    type: 'DELETE-TASK',
    todolistId: string
    taskId: string
}
export type CreateTaskActionType = {
    type: 'CREATE-TASK',
    task: TaskType
}
export type UpdateTaskActionType = {
    type: 'UPDATE-TASK',
    todolistId: string
    taskId: string
    model: UpdateDomainTaskType
}
export type SetTasksActionType = {
    type: 'SET-TASKS',
    tasks: TaskType[]
    todolistId: string
}
export type TaskActionType = DeleteTaskActionType | CreateTaskActionType
    | UpdateTaskActionType
    | CreateTodolistActionType
    | DeleteTodolistActionType
    | SetTodolistsActionType
    | SetTasksActionType