import {setAppErrorAC, setAppStatusAC} from "../app/app-reducer";
import {ResponceType} from "../api/todolist-api";
import {Dispatch} from "redux";
import {AppActionType} from "../app/store";


export const handleServerAppError = <T>(res: ResponceType<T>, dispatch: Dispatch<AppActionType>) => {
    if (res.messages.length) {
        dispatch(setAppErrorAC(res.messages[0]))
    } else {
        dispatch(setAppErrorAC('some error'))
    }
    dispatch(setAppStatusAC("failed"))
}

export const handleNetworkError = (err: { message: string }, dispatch: Dispatch<AppActionType>) => {
    dispatch(setAppErrorAC(err.message ? err.message : 'Some error occurred'))
    dispatch(setAppStatusAC("failed"))
}