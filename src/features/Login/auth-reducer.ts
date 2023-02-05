import {Dispatch} from "redux";
import {authAPI, LoginParamsType} from "../../api/todolist-api";
import {handleNetworkError, handleServerAppError} from "../../utils/error-utils";
import {AppErrorActionsType, setAppStatusAC} from "../../app/app-reducer";
import {AppActionType, AppThunk} from "../../app/store";


const initialState = {
    isLoggedIn: false
}

export const authReducer = (state: initialStateType = initialState, action: LoginActionType): initialStateType => {
    switch (action.type) {
        case 'login/SET-IS-LOGGED-IN':
            return {...state, isLoggedIn: action.value}
        default:
            return state
    }
}
// actions creator
export const setIsLoggedIn = (value: boolean) => ({type: 'login/SET-IS-LOGGED-IN', value} as const)

//thunk
export const loginTC = (data: LoginParamsType) => {
    return (dispatch: Dispatch<AppErrorActionsType | AppActionType | LoginActionType>) => {
        dispatch(setAppStatusAC("loading"))
        authAPI.login(data)
            .then((res) => {
                if (res.resultCode === 0) {
                    alert('login - yes')
                    dispatch(setIsLoggedIn(true))
                    dispatch(setAppStatusAC('succeeded'))
                } else {
                    handleServerAppError(res, dispatch)
                }
            })
            .catch((err) => handleNetworkError(err, dispatch))
    }
}
// types
type initialStateType = {
    isLoggedIn: boolean
}
export type LoginActionType =
    | ReturnType<typeof setIsLoggedIn>
