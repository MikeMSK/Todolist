import React from "react";
import {Task} from "./Task";
import {action} from "@storybook/addon-actions";
import {TaskPriorities, TaskStatuses, TaskType} from "../../../../api/todolist-api";

export default {
    title: "Task",
    component: Task
}
const changeTaskStatusCallback = action("Changed task status")
const removeTaskCallback = action("Removed task")
const changeTaskTitleCallback = action("Changed task title")

export const TaskBaseExample = (props: any) => {
    return (
        <div>
            <Task task={{
                id: '1',
                title: "Task_1",
                status: TaskStatuses.Completed,
                description: '',
                completed: true,
                priority: TaskPriorities.Low,
                startDate: '',
                deadline: '',
                todoListId: 'todolistId1',
                order: 0,
                addedDate: ''
            }}
                  todolistId={'todolistId1'}
                  deleteTask={removeTaskCallback}
                  updateTaskStatus={changeTaskStatusCallback}
                  updateTaskTitle={changeTaskTitleCallback}
            />
            <Task task={{
                id: '2', title: "Task_2", status: TaskStatuses.New, description: '',
                completed: true, priority: TaskPriorities.Low, startDate: '', deadline: '',
                todoListId: 'todolistId2', order: 0, addedDate: ''
            }}
                  todolistId={'todolistId2'}
                  deleteTask={removeTaskCallback}
                  updateTaskStatus={changeTaskStatusCallback}
                  updateTaskTitle={changeTaskTitleCallback}
            />
        </div>
    )
}
