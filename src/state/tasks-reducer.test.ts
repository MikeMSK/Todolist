import {createTaskAC, deleteTaskAC, setTasksAC, tasksReducer, updateTaskAC} from './tasks-reducer';
import {TasksStateType} from '../AppWithRedux';
import {v1} from 'uuid';
import {createTodolistAC, deleteTodolistAC, setTodolistsAC} from './todolists-reducer';
import {TaskPriorities, TaskStatuses} from "../api/todolist-api";

let startState: TasksStateType = {};
beforeEach(() => {
    startState = {
        'todolistId1': [
            {
                id: v1(), title: "HTML&CSS", status: TaskStatuses.Completed,
                description: '', completed: true, priority: TaskPriorities.Low,
                startDate: '', deadline: '', todoListId: 'todolistId1', order: 0, addedDate: ''
            },
            {
                id: v1(), title: "JS", status: TaskStatuses.Completed,
                description: '', completed: true, priority: TaskPriorities.Low,
                startDate: '', deadline: '', todoListId: 'todolistId1', order: 0, addedDate: '',
            }
        ],
        'todolistId2': [
            {
                id: v1(), title: "Milk", status: TaskStatuses.New,
                description: '', completed: true, priority: TaskPriorities.Low,
                startDate: '', deadline: '', todoListId: 'todolistId2', order: 0, addedDate: '',
            },
            {
                id: v1(), title: "React Book", status: TaskStatuses.New,
                description: '', completed: true, priority: TaskPriorities.Low,
                startDate: '', deadline: '', todoListId: 'todolistId2', order: 0, addedDate: '',
            }
        ]
    };
});

test('correct task should be deleted from correct array', () => {
    const action = deleteTaskAC("2", "todolistId2");

    const endState = tasksReducer(startState, action)

    expect(endState["todolistId1"].length).toBe(2);
    expect(endState["todolistId2"].length).toBe(2);
    expect(endState["todolistId2"].every(t => t.id != "2")).toBeTruthy();
});

test('correct task should be added to correct array', () => {
    const action = createTaskAC({
        id: v1(), title: "тууууууццц", status: TaskStatuses.Completed,
        description: '', completed: true, priority: TaskPriorities.Low,
        startDate: '', deadline: '', todoListId: 'todolistId1', order: 0, addedDate: '',
    });

    const endState = tasksReducer(startState, action)

    expect(endState["todolistId1"].length).toBe(2);
    expect(endState["todolistId2"].length).toBe(3);
    expect(endState["todolistId2"][0].id).toBeDefined();
    expect(endState["todolistId2"][0].title).toBe("juce");
    expect(endState["todolistId2"][0].status).toBe(TaskStatuses.New);
});

test('status of specified task should be changed', () => {
    const action = updateTaskAC("2", {status: TaskStatuses.New}, "todolistId2");

    const endState = tasksReducer(startState, action)

    expect(endState["todolistId1"][1].status).toBe(TaskStatuses.Completed);
    expect(endState["todolistId2"][1].status).toBe(TaskStatuses.New);
});

test('title of specified task should be changed', () => {
    const action = updateTaskAC("2", {title: 'React Book'}, "todolistId2");

    const endState = tasksReducer(startState, action)

    expect(endState["todolistId1"][1].title).toBe("JS");
    expect(endState["todolistId2"][1].title).toBe("React Book");
    expect(endState["todolistId2"][0].title).toBe("Milk");
});

test('new array should be added when new todolist is added', () => {
    const action = createTodolistAC({
        id: 'newTodo',
        addedDate: "",
        order: 0,
        title: ''
    });

    const endState = tasksReducer(startState, action)


    const keys = Object.keys(endState);
    const newKey = keys.find(k => k != "todolistId1" && k != "todolistId2");
    if (!newKey) {
        throw Error("new key should be added")
    }

    expect(keys.length).toBe(3);
    expect(endState[newKey]).toEqual([]);
});

test('propertry with todolistId should be deleted', () => {
    const action = deleteTodolistAC("todolistId2");

    const endState = tasksReducer(startState, action)

    const keys = Object.keys(endState);

    expect(keys.length).toBe(1);
    expect(endState["todolistId2"]).not.toBeDefined();
});

test('empty arrays should be added when w set todolists', () => {

    const action = setTodolistsAC([
        {id: '1', title: "title 1", addedDate: '', order: 0},
        {id: '2', title: "title 2", addedDate: '', order: 0}
    ]);

    const endState = tasksReducer({}, action)

    const keys = Object.keys(endState);

    expect(keys.length).toBe(2);
    expect(endState["1"]).toStrictEqual([]);
    expect(endState["2"]).toStrictEqual([]);
});

test('empty arrays should be added when w set tasks', () => {

    const action = setTasksAC('todolistId1', startState['todolistId2']);

    const endState = tasksReducer({
        'todolistId2': [],
        'todolistId1': []
    }, action)

    expect(endState['todolistId1'].length).toBe(2);
    expect(endState['todolistId2'].length).toBe(0);
});
