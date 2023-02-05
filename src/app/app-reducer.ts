import {authAPI} from "../api/todolist-api";
import {Dispatch} from "redux";
import {handleNetworkError, handleServerAppError,} from "../utils/error-utils";
import {LoginActionType, setIsLoggedIn} from "../features/Login/auth-reducer";


const initialState: InitialStateType = {
    status: 'idle',
    error: null,
    isInitialized: false,
}

export const appReducer = (
    state: InitialStateType = initialState, action: AppErrorActionsType): InitialStateType => {

    switch (action.type) {
        case 'APP/SET-STATUS':
            return {...state, status: action.status}
        case 'APP/SET-ERROR':
            return {...state, error: action.error}
        case 'APP/SET-IS-INITIALIZED':
            return {...state, isInitialized: action.value}
        default:
            return {...state}
    }
}

//action
export const setAppErrorAC = (error: string | null) => (
    {type: 'APP/SET-ERROR', error} as const)
export const setAppStatusAC = (status: RequestStatusType) => (
    {type: 'APP/SET-STATUS', status} as const)
export const setAppInitializedAC = (value: boolean) => (
    {type: 'APP/SET-IS-INITIALIZED', value} as const)

//thunk
export const initializeAppTC = () => {
    return (dispatch: Dispatch<AppErrorActionsType | LoginActionType>) => {
        authAPI.me()
            .then((res) => {
                if (res.resultCode === 0) {
                    dispatch(setIsLoggedIn(true))
                } else {
                    handleServerAppError(res, dispatch)
                }
                dispatch(setAppInitializedAC(true))
            })
            .catch((err) => handleNetworkError(err, dispatch))
    }
}

//type
export type AppErrorActionsType =
    | ReturnType<typeof setAppErrorAC>
    | ReturnType<typeof setAppStatusAC>
    | ReturnType<typeof setAppInitializedAC>
export type RequestStatusType = 'idle' | 'loading' | 'succeeded' | 'failed'
export type InitialStateType = {
    // происходит ли сейчас взаимодействие с сервером
    status: RequestStatusType
    // если ошибка какая-то глобальная произойдет - запишем текст ошибки сюда
    error: string | null
    // true когда приложение проинициализировалось (проверили пользователя, настройки получили)
    isInitialized: boolean
}