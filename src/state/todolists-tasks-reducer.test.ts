import {TasksStateType, TodoListType} from "../App";
import {addTodolist_AC, removeTodolist_AC, todolistReducer} from "./todolists-reducer";
import {changeTaskTitle_AC, tasksReducer} from "./tasks-reducer";

test('ids should be equals', () => {

    const startTasksState: TasksStateType = {};
    const startTodolistsState: Array<TodoListType> = [];

    const action = addTodolist_AC('new todo');

    const endTasksState = tasksReducer(startTasksState, action);
    const endTodolistsState = todolistReducer(startTodolistsState, action);

    const keys = Object.keys(endTasksState);
    const idFromTasks = keys[0]
    const idFromTodolists = endTodolistsState[0].id

    expect(idFromTasks).toBe(action.todolistID);
    expect(idFromTodolists).toBe(action.todolistID)
})
test('property with todolistID should be deleted', () => {
    const startState: TasksStateType = {
        'todoListId_1': [
            {id: "1", title: "HTML&CSS", isDone: true},
            {id: "2", title: "JS/TS", isDone: true},
            {id: "3", title: "React", isDone: false},
        ],
        'todoListId_2': [
            {id: "1", title: "Water", isDone: true},
            {id: "2", title: "Beer", isDone: true},
            {id: "3", title: "Toilet paper", isDone: false},
        ]
    }
    const action = removeTodolist_AC('todoListId_1')

    const endState = tasksReducer(startState, action)

    const keys = Object.keys(endState);

    expect(keys.length).toBe(1)

    expect(endState['todoListId_1']).not.toBeDefined()
})