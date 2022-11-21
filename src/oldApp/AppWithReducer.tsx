import React, {Reducer, useReducer} from 'react';
// import './App.css';
// import TodoList, {TaskType} from "./TodoList";
// import {v1} from "uuid";
// import AddIemForm from "./AddIemForm";
// import {
//     AppBar,
//     Button, Container, Grid,
//     IconButton, Paper,
//     Toolbar,
//     Typography
// } from "@material-ui/core";
// import {Menu} from "@material-ui/icons";
// import {
//     ActionsTypesTodolists,
//     addTodolist_AC,
//     changeTodolistFilter_AC,
//     changeTodolistTitle_AC,
//     removeTodolist_AC,
//     todolistReducer
// } from "./state/todolists-reducer";
// import {
//     ActionsTypesTasks,
//     addTask_AC,
//     changeTaskStatus_AC,
//     changeTaskTitle_AC,
//     removeTask_AC,
//     tasksReducer
// } from "./state/tasks-reducer";
//
//
// export type FilterValuesType = "all" | "active" | "completed"
// export type TodoListType = {
//     id: string
//     title: string
//     filter: FilterValuesType
// }
// export type TasksStateType = {
//     [todoListId: string]: Array<TaskType>
// }
//
//
// function AppWithReducer() {
//     const todoListId_1 = v1()
//     const todoListId_2 = v1()
//
//     const [todoLists, dispatchTodoLists] = useReducer<Reducer<TodoListType[], ActionsTypesTodolists>>(todolistReducer, [
//         {id: todoListId_1, title: "What to learn", filter: "all"},
//         {id: todoListId_2, title: "What to buy", filter: "all"},
//     ]);
//     const [tasks, dispatchTasks] = useReducer<Reducer<TasksStateType, ActionsTypesTasks>>(tasksReducer, {
//         [todoListId_1]: [
//             {id: v1(), title: "HTML&CSS", isDone: true},
//             {id: v1(), title: "JS/TS", isDone: true},
//             {id: v1(), title: "React", isDone: false},
//             {id: v1(), title: "Redux", isDone: false},
//             {id: v1(), title: "RTK", isDone: false},
//         ],
//         [todoListId_2]: [
//             {id: v1(), title: "Water", isDone: true},
//             {id: v1(), title: "Beer", isDone: true},
//             {id: v1(), title: "Toilet paper", isDone: false},
//             {id: v1(), title: "Buckwheat", isDone: false},
//             {id: v1(), title: "Meet", isDone: false},
//         ]
//     })
//
//     const addTask = (title: string, todoListId: string) => {
//         dispatchTasks(addTask_AC(title, todoListId))
//     }
//     const removeTask = (taskId: string, todoListId: string) => {
//         dispatchTasks(removeTask_AC(taskId, todoListId))
//     }
//     const changeTaskStatus = (taskId: string, newTaskStatus: boolean, todoListId: string) => {
//         dispatchTasks(changeTaskStatus_AC(taskId, todoListId, newTaskStatus))
//     }
//     const changeTaskTitle = (taskId: string, title: string, todoListId: string) => {
//         dispatchTasks(changeTaskTitle_AC(taskId, todoListId, title))
//     }
//
//     const addTodoList = (title: string) => {
//         const action = addTodolist_AC(title)
//         dispatchTodoLists(action)
//         dispatchTasks(action)
//     }
//     const removeTodoList = (todoListId: string) => {
//         const action = removeTodolist_AC(todoListId)
//         dispatchTodoLists(action)
//         dispatchTasks(action)
//     }
//     const changeTodoListFilter = (filter: FilterValuesType, todoListId: string) => {
//         dispatchTodoLists(changeTodolistFilter_AC(todoListId, filter))
//     }
//     const changeTodoListTitle = (title: string, todoListId: string) => {
//         dispatchTodoLists(changeTodolistTitle_AC(todoListId, title))
//     }
//
//
//     //GUI:
//     const getFilteredTasks = (t: Array<TaskType>, f: FilterValuesType) => {
//         let tasksForTodoList = t;Array<TaskType>
//         if (f === "active") {
//             tasksForTodoList = t.filter(t => !t.isDone)
//         }
//         if (f === "completed") {
//             tasksForTodoList = t.filter(t => t.isDone)
//         }
//         return tasksForTodoList
//     }
//
//     const todoListComponents = todoLists.map(tl => {
//         const filteredTasks = getFilteredTasks(tasks[tl.id], tl.filter)
//         return <Grid item key={tl.id}>
//             <Paper variant={"outlined"}
//                 // elevation={8}
//                    style={{width: "280px", padding: "20px"}}>
//
//                 <TodoList title={tl.title}
//                           filter={tl.filter}
//                           todoListId={tl.id}
//                           tasks={filteredTasks}
//
//                           addTask={addTask}
//                           removeTask={removeTask}
//                           removeTodoList={removeTodoList}
//                           changeTaskTitle={changeTaskTitle}
//                           changeTaskStatus={changeTaskStatus}
//                           changeTodoListTitle={changeTodoListTitle}
//                           changeTodoListFilter={changeTodoListFilter}
//                 />
//             </Paper>
//         </Grid>
//     })
//
//     return <div className="App">
//         <AppBar position="static">
//             <Toolbar style={{justifyContent: "space-between"}}>
//                 <IconButton edge="start"
//                             color="inherit"
//                             aria-label="menu">
//                     <Menu/>
//                 </IconButton>
//                 <Typography variant="h6">
//                     Todolists
//                 </Typography>
//                 <Button color="inherit"
//                         variant={"outlined"}>
//                     Login
//                 </Button>
//             </Toolbar>
//         </AppBar>
//         <Container fixed>
//             <Grid container style={{padding: "20px 0"}}>
//                 <AddIemForm addItem={addTodoList}/>
//             </Grid>
//             <Grid container spacing={5}>
//                 {todoListComponents}
//             </Grid>
//         </Container>
//     </div>
// }
//
// export default AppWithReducer;
