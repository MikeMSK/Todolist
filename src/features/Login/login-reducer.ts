import {Dispatch} from "redux";
import {authAPI, LoginParamsType, todolistAPI} from "../../api/todolist-api";
import {handleNetworkError, handleServerAppError} from "../../utils/error-utils";
import {AppErrorActionsType, setAppStatusAC} from "../../app/app-reducer";
import {updateTaskAC} from "../TodolistsList/tasks-reducer";


const initialState;

export const loginReducer = (state, action: LoginActionType) => {
    switch (typeof action) {

        default:
            state
    }
}
//actions creator
export const loginAC = (email, password, rememberMe) => (
    {type: 'LOGIN', email, password, rememberMe} as const
)

//thunk
export const loginTC = (data: LoginParamsType) => {
    return (dispatch: Dispatch<LoginActionType | AppErrorActionsType>) => {
        dispatch(setAppStatusAC("loading"))
        authAPI.login(data)
            .then((res) => {
                if (res.resultCode === 0) {
                    dispatch(loginAC())
                    dispatch(setAppStatusAC('succeeded'))
                } else {
                    handleServerAppError(res, dispatch)
                }
            })
            .catch((err) => handleNetworkError(err, dispatch))
    }
}
//types
type LoginActionType =
    | ReturnType<typeof loginAC>
