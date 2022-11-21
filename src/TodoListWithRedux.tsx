import React, {ChangeEvent, FC} from 'react';
import {FilterValuesType, TasksStateType, TodoListType} from "./AppWithRedux";
import AddIemForm from "./AddIemForm";
import EditableSpan from "./EditableSpan";
import {
    Button,
    ButtonGroup, Checkbox,
    IconButton,
    List,
    ListItem, Typography
} from "@material-ui/core";
import {HighlightOffTwoTone} from "@material-ui/icons";
import {useDispatch, useSelector} from "react-redux";
import {addTask_AC, changeTaskStatus_AC, changeTaskTitle_AC, removeTask_AC} from "./state/tasks-reducer";
import {changeTodolistFilter_AC, changeTodolistTitle_AC, removeTodolist_AC} from "./state/todolists-reducer";
import {AppRootStateType} from "./state/store";


export type TaskType = {
    id: string
    title: string
    isDone: boolean
}
type TodoListWithReduxPropsType = {
    todolist: TodoListType
}

const TodoListWithRedux: FC<TodoListWithReduxPropsType> = ({todolist}) => {
    const {id, title, filter} = todolist

    let tasks = useSelector<AppRootStateType, TaskType[]>(state => state.tasks[id]);
    const dispatch = useDispatch()

    if (filter === "active") {
        tasks = tasks.filter(t => !t.isDone)
    }
    if (filter === "completed") {
        tasks = tasks.filter(t => t.isDone)
    }

    //------------------------------------------------------------------------------------------------------------------------
    const getTasksListItem = (task: TaskType) => {

        const removeTask = () => {
            dispatch(removeTask_AC(task.id, id))
        }
        const changeTaskStatus = (e: ChangeEvent<HTMLInputElement>) => {
            dispatch(changeTaskStatus_AC(task.id, id, e.currentTarget.checked))
        }
        const changeTaskTitle = (title: string) => {
            dispatch(changeTaskTitle_AC(task.id, id, title))
        }

        return (
            <ListItem key={task.id}
                      style={{
                          padding: "0px",
                          justifyContent: "space-between",
                          textDecoration: task.isDone ? "line-through" : "none"
                      }}
                      className={task.isDone ? "isDone" : "notIsDone"}>
                <Checkbox size={"small"}
                          color={"primary"}
                          onChange={changeTaskStatus}
                          checked={task.isDone}
                />
                <EditableSpan title={task.title}
                              changeTitle={changeTaskTitle}
                />
                <IconButton onClick={removeTask}
                            size={"small"}>
                    <HighlightOffTwoTone/>
                </IconButton>
            </ListItem>
        )
    }
    //------------------------------------------------------------------------------------------------------------------------

    const tasksList = tasks
        ? <List>{tasks.map(getTasksListItem)}</List>
        : <span>Your taskslist is empty :(</span>

    const addTask = (title: string) => {
        dispatch(addTask_AC(title, id))
    }
    const changeTodoListFilter = (filter: FilterValuesType) => () => {
        dispatch(changeTodolistFilter_AC(id, filter))
    }
    const removeTodoList = () => {
        dispatch(removeTodolist_AC(id))
    }
    const changeTodoListTitle = (title: string) => {
        dispatch(changeTodolistTitle_AC(id, title))
    }

    return (
        <div>
            <Typography variant={"h5"}
                        align={"center"}
                        style={{fontWeight: "bold", marginBottom: "20px"}}
            >
                <EditableSpan title={title}
                              changeTitle={changeTodoListTitle}
                />
                <IconButton onClick={removeTodoList}
                            size={"small"}>
                    <HighlightOffTwoTone/>
                </IconButton>
            </Typography>
            <AddIemForm addItem={addTask}/>
            {tasksList}
            <div>
                <ButtonGroup fullWidth
                             disableElevation
                             variant={"contained"}
                             size={"small"}>
                    <Button color={filter === "all" ? "secondary" : "primary"}
                            onClick={changeTodoListFilter("all")}
                            style={{fontSize: "0.7em"}}
                    >All
                    </Button>
                    <Button color={filter === "active" ? "secondary" : "primary"}
                            onClick={changeTodoListFilter("active")}
                            style={{fontSize: "0.7em"}}
                    >Active
                    </Button>
                    <Button color={filter === "completed" ? "secondary" : "primary"}
                            onClick={changeTodoListFilter("completed")}
                            style={{fontSize: "0.7em"}}
                    >Completed
                    </Button>
                </ButtonGroup>
            </div>
        </div>)
};

export default TodoListWithRedux;