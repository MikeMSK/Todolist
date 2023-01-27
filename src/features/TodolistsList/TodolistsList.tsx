import React, {useCallback, useEffect} from "react";
import {useAppDispatch, useAppSelector} from "../../app/hooks/hooks";
import {todolistsSelector} from "../../app/selectors/todolistsSelector";
import {
    createTodolistTC, deleteTodolistTC, fetchTodolistsTC, FilterValuesType,
    updateTodolistFilterAC, updateTodolistTitleTC
} from "./todolists-reducer";
import {createTaskTC, deleteTaskTC, updateTaskTC} from "./tasks-reducer";
import {TaskStatuses} from "../../api/todolist-api";
import {Grid, Paper} from "@material-ui/core";
import {AddItemForm} from "../../components/AddItemForm/AddItemForm";
import {Todolist} from "./Todolist/Todolist";

type TodolistsListType = {}

export const TodolistsList: React.FC<TodolistsListType> = () => {

//hook
    const todolists = useAppSelector(todolistsSelector)
    const tasks = useAppSelector(state => state.tasks)
    const dispatch = useAppDispatch();

//getStartTodo
    useEffect(() => {
        const thunk = fetchTodolistsTC()
        dispatch(thunk);
    }, []);

//task
    const createTask = useCallback(
        (title: string, todolistId: string) => {
            const thunk = createTaskTC(title, todolistId);
            dispatch(thunk);
        },
        [dispatch]);
    const deleteTask = useCallback(
        (taskId: string, todolistId: string) => {
            const thunk = deleteTaskTC(todolistId, taskId)
            dispatch(thunk)
        },
        [dispatch]);
    const updateTaskStatus = useCallback(
        (taskId: string, status: TaskStatuses, todolistId: string) => {
            const thunk = updateTaskTC(todolistId, taskId, {status});
            dispatch(thunk);
        },
        [dispatch])
    const updateTaskTitle = useCallback(
        (taskId: string, newTitle: string, todolistId: string) => {
            const thunk = updateTaskTC(todolistId, taskId, {title: newTitle});
            dispatch(thunk)
        },
        [dispatch])

//todolist
    const createTodolist = useCallback(
        (title: string) => {
            const thunk = createTodolistTC(title);
            dispatch(thunk);
        },
        [dispatch]);
    const updateFilter = useCallback(
        (value: FilterValuesType, todolistId: string) => {
            const action = updateTodolistFilterAC(todolistId, value);
            dispatch(action);
        },
        [dispatch])
    const updateTodolistTitle = useCallback(
        (id: string, title: string) => {
            const thunk = updateTodolistTitleTC(id, title);
            dispatch(thunk);
        },
        [dispatch])
    const deleteTodolist = useCallback(
        (id: string) => {
            const thunk = deleteTodolistTC(id);
            dispatch(thunk);
        },
        [dispatch])

    return (
        <>
            <Grid container style={{padding: "20px"}}>
                <AddItemForm addItem={createTodolist}/>
            </Grid>
            <Grid container spacing={3}>

                {todolists.map((tl) => {
                    let allTodolistTask = tasks[tl.id]

                    return (
                        <Grid item key={tl.id}>
                            <Paper style={{padding: "10px"}}>
                                <Todolist id={tl.id}
                                          title={tl.title}
                                          tasks={tasks[tl.id]}

                                          deleteTask={deleteTask}
                                          updateTaskTitle={updateTaskTitle}
                                          updateTaskStatus={updateTaskStatus}
                                          changeFilter={updateFilter}
                                          addTask={createTask}
                                          filter={tl.filter}
                                          removeTodolist={deleteTodolist}
                                          updateTodolistTitle={updateTodolistTitle}
                                />
                            </Paper>
                        </Grid>)
                })}
            </Grid>
        </>)
}