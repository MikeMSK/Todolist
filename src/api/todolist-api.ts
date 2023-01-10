import axios from "axios";

const setting = {
    withCredentials: true,
    headers: {
        "API-KEY": "5a806959-8f18-4ed7-837f-0bbad2316e6b"
    }
}
const instance = axios.create({
    baseURL: 'https://social-network.samuraijs.com/api/1.1/',
    ...setting
})

type TodolistTypeResponce = {
    id: string,
    title: string,
    addedDate: string,
    order: number
}
type ResponceType<D = {}> = {
    resultCode: number
    messages: Array<string>
    data: D
}
type TaskTypeResponce = {
    description: string,
    title: string,
    completed: boolean,
    status: number,
    priority: number,
    startDate: string,
    deadline: string,
    id: string,
    todoListId: string,
    order: number,
    addedDate: string,
}
type GetTasksResponse = {
    items: TaskTypeResponce[],
    totalCount: string,
    error: string | null
}

export type UpdateTaskType = {
    title: string
    description: string
    status: number
    priority: number
    startDate: string
    deadline: string
}

export const todolistAPI = {
    getTodolists() {
        return instance.get<TodolistTypeResponce[]>(
            "todo-lists")
    },
    deleteTodolist(id: string) {
        return instance.delete<ResponceType>(
            `todo-lists/${id}`)
    },
    createTodolists(title: string) {
        return instance.post<ResponceType<{ item: TodolistTypeResponce }>>(
            "todo-lists",
            {title: title})
    },
    updateTodolistTitle(id: string, title: string) {
        return instance.put<ResponceType>(
            `todo-lists/${id}`,
            {title: title})
    },

    getTask(todolistId: string) {
        return instance.get<GetTasksResponse>(
            `todo-lists/${todolistId}/tasks`)
    },
    deleteTask(todolistId: string, taskId: string) {
        return instance.delete<ResponceType>(
            `todo-lists/${todolistId}/tasks/${taskId}`)
    },
    createTask(todolistId: string, title: string) {
        return instance.post<ResponceType>(
            `todo-lists/${todolistId}/tasks`,
            {title: title})
    },
    updateTask(todolistId: string, taskId: string, model: UpdateTaskType) {
        return instance.put<ResponceType>(
            `todo-lists/${todolistId}/tasks/${taskId}`,
            {title: model.title})
    },
}