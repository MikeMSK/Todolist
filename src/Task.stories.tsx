import React from "react";
import {Task} from "./Task";
import {action} from "@storybook/addon-actions";

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
            <Task task={{id: "1", isDone: true, title: "Task_1"}}
                  removeTask={removeTaskCallback}
                  changeTaskStatus={changeTaskStatusCallback}
                  changeTaskTitle={changeTaskTitleCallback}
            />
            <Task task={{id: "2", isDone: false, title: "Task_2"}}
                  removeTask={removeTaskCallback}
                  changeTaskStatus={changeTaskStatusCallback}
                  changeTaskTitle={changeTaskTitleCallback}
            />
        </div>
    )
}