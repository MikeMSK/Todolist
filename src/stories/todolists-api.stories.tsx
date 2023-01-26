import React, {useEffect, useState} from 'react'
import {todolistAPI} from "../api/todolist-api";

export default {
    title: 'API'
}

//get
export const GetTodolists = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {

        todolistAPI.getTodolists()
            .then((res) => setState(res))
            .catch((err) => err)
    }, [])

    return <div>{JSON.stringify(state)}</div>
}
//post
export const CreateTodolist = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        let title = "Zzzzzzzzz"

        todolistAPI.createTodolist(title)
            .then((res) => setState(res.data.item))
            .catch((error) => error)
    }, [])

    return <div>{JSON.stringify(state)}</div>
}
//delete
export const DeleteTodolist = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        const todolistId = "c4c9127b-46d4-4202-bdd9-dea4227a2c1e"

        todolistAPI.deleteTodolist(todolistId)
            .then((res) => setState(res))
            .catch((error) => error)
    }, [])

    return <div>{JSON.stringify(state)}</div>
}
//put
export const UpdateTodolistTitle = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        const todolistId = "5383e69c-a114-4ceb-8cb7-7cdb67800a9e"
        const title = "Privet Misha"

        todolistAPI.updateTodolistTitle(todolistId, title)
            .then((res) => setState(res))
            .catch((error) => error)
    }, [])

    return <div>{JSON.stringify(state)}</div>
}


//task
export const GetTasks = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        const todolistId = '4771823e-1f64-4e82-9272-02c89a9038c4'

        todolistAPI.getTask(todolistId)
            .then((res) => setState(res))
            .catch((err) => err)
    }, [])

    return <div>{JSON.stringify(state)}</div>
}
export const CreateTask = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        const todolistId = '5383e69c-a114-4ceb-8cb7-7cdb67800a9e'

        todolistAPI.createTask(todolistId, "new task")
            .then((res) => setState(res.data))
            .catch((error) => error)
    }, [])

    return <div>{JSON.stringify(state)}</div>
}
export const DeleteTask = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        const todolistId = '4771823e-1f64-4e82-9272-02c89a9038c4'
        const taskId = '49213737-e693-4e80-bbb3-c0331f3b157a'

        todolistAPI.deleteTask(todolistId, taskId)
            .then((res) => setState(res.data))
            .catch((error) => error)
    }, [])

    return <div>{JSON.stringify(state)}</div>
}
export const UpdateTaskTitle = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        const todolistId = '5383e69c-a114-4ceb-8cb7-7cdb67800a9e'
        const taskId = '515747ec-2c01-4007-8a97-f7e684d595df'
        const model = {
            title: 'task.title',
            description: 'task.description',
            status: 0,
            priority: 0,
            startDate: 'task.startDate',
            deadline: 'task.deadline',
        }

        todolistAPI.updateTask(todolistId, taskId, model)
            .then((res) => setState(res.data))
            .catch((error) => error)
    }, [])

    return <div>{JSON.stringify(state)}</div>
}