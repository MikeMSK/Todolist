import {
    createTodolistAC, updateTodolistTitleAC,
    FilterValuesType, deleteTodolistAC, setTodolistsAC, TodolistDomainType,
    todolistsReducer, updateTodolistFilterAC, updateTodolistEntityStatusAC
} from './todolists-reducer';
import {v1} from 'uuid';
import {RequestStatusType} from "../../app/app-reducer";

let todolistId1: string;
let todolistId2: string;
let startState: Array<TodolistDomainType> = [];

beforeEach(() => {
    todolistId1 = v1();
    todolistId2 = v1();
    startState = [
        {id: todolistId1, title: "What to learn", filter: "all", entityStatus: 'idle', addedDate: '', order: 0},
        {id: todolistId2, title: "What to buy", filter: "all", entityStatus: 'idle', addedDate: '', order: 0}
    ]
})

test('correct todolist should be removed', () => {
    const endState = todolistsReducer(startState, deleteTodolistAC(todolistId1))

    expect(endState.length).toBe(1);
    expect(endState[0].id).toBe(todolistId2);
});
test('correct todolist should be added', () => {
    let newTodolistTitle = {
        id: 'newTodo',
        addedDate: "",
        order: 0,
        title: ''
    };

    const endState = todolistsReducer(startState, createTodolistAC(newTodolistTitle))

    expect(endState.length).toBe(3);
    expect(endState[0].title).toBe(newTodolistTitle.title);
    expect(endState[0].filter).toBe("all");
});
test('correct todolist should change its name', () => {
    let newTodolistTitle = "New Todolist";

    const action = updateTodolistTitleAC(todolistId2, newTodolistTitle);

    const endState = todolistsReducer(startState, action);

    expect(endState[0].title).toBe("What to learn");
    expect(endState[1].title).toBe(newTodolistTitle);
});

test('correct filter of todolist should be changed', () => {
    let newFilter: FilterValuesType = "completed";

    const action = updateTodolistFilterAC(todolistId2, newFilter);

    const endState = todolistsReducer(startState, action);

    expect(endState[0].filter).toBe("all");
    expect(endState[1].filter).toBe(newFilter);
});
test('todolists should be set the state server', () => {

    let todolists = [
        {id: '1', title: "What to fack", addedDate: '', order: 0},
        {id: '2', title: "What to fack2", addedDate: '', order: 0},
        {id: '3', title: "What to fack3", addedDate: '', order: 0},
    ]

    const action = setTodolistsAC(todolists)

    const endState = todolistsReducer([], action);

    expect(endState[0].id).toBe("1");
    expect(endState[1].title).toBe("What to fack2");
    expect(endState.length).toBe(3);
});

test('should be changed entityStatus', () => {
    let newStatus: RequestStatusType = 'loading'

    const action = updateTodolistEntityStatusAC(todolistId2, newStatus)

    const endState = todolistsReducer(startState, action);

    expect(endState[1].entityStatus).toBe('loading');
    expect(endState[0].entityStatus).toBe('idle');
});