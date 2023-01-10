import React, {useEffect, useState} from 'react'
import {todolistAPI} from "../api/todolist-api";

export default {
    title: 'API'
}

export const GetTodolists = () => {

    const [state, setState] = useState<any>(null)
    useEffect(() => {
        todolistAPI.getTodolists()
            .then((res) => setState(res.data))
            .catch((err) => err)
    }, [])
    return <div>{JSON.stringify(state)}</div>
}
export const CreateTodolist = () => {

    const [state, setState] = useState<any>(null)
    useEffect(() => {
        todolistAPI.createTodolists("Fantasy World")
            .then((res) => setState(res.data.data.item))
            .catch((error) => error)
    }, [])
    return <div>{JSON.stringify(state)}</div>
}
export const DeleteTodolist = () => {

    const [state, setState] = useState<any>(null)

    const todolistId = "19cbf0c0-c229-4b8b-a6ea-d8cfed5b65d3"

    useEffect(() => {
        todolistAPI.deleteTodolist(todolistId)
            .then((res) => setState(res.data))
            .catch((error) => error)
    }, [])
    return <div>{JSON.stringify(state)}</div>
}
export const UpdateTodolistTitle = () => {

    const [state, setState] = useState<any>(null)

    const todolistId = "5383e69c-a114-4ceb-8cb7-7cdb67800a9e"
    const title = "Privet Misha"

    useEffect(() => {
        todolistAPI.updateTodolistTitle(todolistId, title)
            .then((res) => setState(res.data))
            .catch((error) => error)
    }, [])
    return <div>{JSON.stringify(state)}</div>
}

export const GetTasks = () => {

    const todolistId = '4771823e-1f64-4e82-9272-02c89a9038c4'

    const [state, setState] = useState<any>(null)
    useEffect(() => {
        todolistAPI.getTask(todolistId)
            .then((res) => setState(res.data))
            .catch((err) => err)
    }, [])
    return <div>{JSON.stringify(state)}</div>
}
export const DeleteTask = () => {

    const [state, setState] = useState<any>(null)

    const todolistId = '4771823e-1f64-4e82-9272-02c89a9038c4'
    const taskId = '49213737-e693-4e80-bbb3-c0331f3b157a'

    useEffect(() => {
        todolistAPI.deleteTask(todolistId, taskId)
            .then((res) => setState(res.data))
            .catch((error) => error)
    }, [])
    return <div>{JSON.stringify(state)}</div>
}
export const CreateTask = () => {

    const [state, setState] = useState<any>(null)
    const todolistId = '5383e69c-a114-4ceb-8cb7-7cdb67800a9e'

    useEffect(() => {
        todolistAPI.createTask(todolistId, "new task")
            .then((res) => setState(res.data.data))
            .catch((error) => error)
    }, [])
    return <div>{JSON.stringify(state)}</div>
}
export const UpdateTaskTitle = () => {

    const [state, setState] = useState<any>(null)

    const todolistId = '5383e69c-a114-4ceb-8cb7-7cdb67800a9e'
    const taskId = '515747ec-2c01-4007-8a97-f7e684d595df'
    const title = 'xaxaxaxxaxaxaxaxa'

    useEffect(() => {
        todolistAPI.updateTask(todolistId, taskId, title)
            .then((res) => setState(res.data))
            .catch((error) => error)
    }, [])
    return <div>{JSON.stringify(state)}</div>
}