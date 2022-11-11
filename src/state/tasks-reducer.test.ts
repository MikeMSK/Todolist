import React from "react";
import {
    addTask_AC, changeTaskStatus_AC, changeTaskTitle_AC,
    removeTask_AC, tasksReducer
} from "./tasks-reducer";
import {TasksStateType} from "../App";
import {addTodolist_AC} from "./todolists-reducer";
import {throws} from "assert";
import {Simulate} from "react-dom/test-utils";
import touchEnd = Simulate.touchEnd;

test('correct task should be DELETED from correct array', () => {

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
    const action = removeTask_AC('2', 'todoListId_2')

    const endState = tasksReducer(startState, action)

    expect(endState['todoListId_1'].length).toBe(3)
    expect(endState['todoListId_2'].length).toBe(2)
    expect(endState['todoListId_2'].every(t => t.id != '2')).toBeTruthy();
})
test('correct task should be ADD from correct array', () => {

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
    const action = addTask_AC('privet mir', 'todoListId_2')

    const endState = tasksReducer(startState, action)

    expect(endState['todoListId_1'].length).toBe(3)
    expect(endState['todoListId_2'].length).toBe(4)
    expect(endState['todoListId_2'].length).toBeDefined()
    expect(endState['todoListId_2'].every(t => t.title === 'privet mir')).toBeFalsy();
})
test('should be change STATUS from correct task', () => {

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
    const action = changeTaskStatus_AC('2', 'todoListId_2', false)

    const endState = tasksReducer(startState, action)

    expect(endState['todoListId_2'].length).toBe(3)
    expect(endState['todoListId_2'][1].isDone).toBe(false)
})
test('should be change TITLE from correct task', () => {

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
    const action = changeTaskTitle_AC('1',
        'todoListId_1',
        'gamardjoba')

    const endState = tasksReducer(startState, action)

    expect(endState['todoListId_1'].length).toBe(3)
    expect(endState['todoListId_1'][0].title).toBe('gamardjoba')
})
test('new property with new array  should be added when new todolist is added', () => {

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
    const action = addTodolist_AC('title no matter')

    const endState = tasksReducer(startState, action)

    const keys = Object.keys(endState)

    const newKey = keys.find(f => f !== 'todoListId_1' && f !== 'todoListId_2')
    if (!newKey) {
        throw Error('new key should b added')
    }
    expect(keys.length).toBe(3)
    expect(endState[newKey]).toEqual([])
})

