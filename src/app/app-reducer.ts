//app-reducer.tsx

export type AppErrorActionsType =
    | ReturnType<typeof setErrorAC>
    | ReturnType<typeof setStatusAC>
export type RequestStatusType = 'idle' | 'loading' | 'succeeded' | 'failed'
export type InitialStateType = {
    status: RequestStatusType
    error: string | null
}

const initialState: InitialStateType = {
    status: 'loading',
    error: null
}

export const appReducer = (
    state: InitialStateType = initialState, action: AppErrorActionsType): InitialStateType => {

    switch (action.type) {
        case 'APP/SET-STATUS':
            return {...state, status: action.status}
        case 'APP/SET-ERROR':
            return {...state, error: action.error}
        default:
            return {...state}
    }
}

export const setErrorAC = (error: string | null) => ({
    type: 'APP/SET-ERROR',
    error: error
} as const)
export const setStatusAC = (status: RequestStatusType) => ({
    type: 'APP/SET-STATUS',
    status: status
} as const)
