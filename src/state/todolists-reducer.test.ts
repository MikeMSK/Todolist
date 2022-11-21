import {v1} from "uuid";
import {FilterValuesType, TodoListType} from "../AppWithRedux";
import {
    addTodolist_AC, changeTodolistFilter_AC, changeTodolistTitle_AC,
    removeTodolist_AC, todolistReducer
} from "./todolists-reducer";

//-----initial date----------------
let todolistID1: string
let todolistID2: string
let startState: Array<TodoListType>

beforeEach(() => {
    todolistID1 = v1()
    todolistID2 = v1()

    startState = [
        {id: todolistID1, title: 'What to lern', filter: 'all'},
        {id: todolistID2, title: 'What to buy', filter: 'all'}
    ]
})
//-----------------------------------


test('correct todolist should be removed', () => {

    const endState = todolistReducer(startState, removeTodolist_AC(todolistID1))

    expect(endState.length).toBe(1);
    expect(endState[0].id).toBe(todolistID2)
})
test('correct todolist should be added', () => {

    let newTodolistTitle = 'New todolist'

    const endState = todolistReducer(startState, addTodolist_AC(newTodolistTitle))

    expect(endState[2].title).toBe('New todolist')
})
test('correct todolist should change its name', () => {

    let newTodolistTitle = 'New todolist'

    const endState = todolistReducer(startState, changeTodolistTitle_AC(todolistID2, newTodolistTitle))

    expect(endState[0].title).toBe('What to learn')
    expect(endState[1].title).toBe(newTodolistTitle)
})
test('correct filter of todolist should be change', () => {

    let newFilter: FilterValuesType = 'completed'

    const endState: Array<TodoListType> = todolistReducer(
        startState,
        changeTodolistFilter_AC(todolistID2, newFilter))

    expect(endState[0].filter).toBe('all')
    expect(endState[1].filter).toBe(newFilter)
})


