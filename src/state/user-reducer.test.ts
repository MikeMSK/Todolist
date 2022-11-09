import {userReducer} from "./user-reducer";

test('test reducer should increment only age', () => {
    //start state
    const startState = {age: 20, childrenCount: 26, name: 'Dima'};
    //действие
    const endState = userReducer(startState, {type: 'INCREMENT-AGE'})
//ожидаем
    expect(endState.age).toBe(21)
    expect(endState.childrenCount).toBe(26)
})
test('test reducer should increment only childrenCount', () => {
    const startState = {age: 20, childrenCount: 26, name: 'Dima'}

    const endState = userReducer(startState, {type: 'INCREMENT-CHILDREN-COUNT'})

    expect(endState.childrenCount).toBe(27)
    expect(endState.age).toBe(20)
})

test('user reducer should change name of user', () => {
    const startState = {age: 20, childrenCount: 26, name: 'Dima'}
    const newName = 'Victor'

    const endSate = userReducer(startState, {type: 'CHANGE-NAME', newName: newName})

    expect(endSate.name).toBe(newName)
})