import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import type { TodoInitialState, TodoType } from '../types/Types'


const initialState:TodoInitialState = {
    todos: []
}

export const todoSlice = createSlice({
    name: 'todo',
    initialState,
    reducers: {
        createTodo : (state: TodoInitialState, action: PayloadAction<TodoType>)=>{
            state.todos = [...state.todos, action.payload]
        },
        removeTodoById : (state: TodoInitialState, action: PayloadAction<number>)=>{
            state.todos = [...state.todos.filter((todo: TodoType) => todo.id !== action.payload)]
        },
        updateTodoById : (state: TodoInitialState, action: PayloadAction<TodoType>)=>{
            state.todos = [...state.todos.map((todo: TodoType) => {
                if (todo.id === action.payload.id){
                    return action.payload
                }
                return todo;
            })]
        }
    }
})



export const {createTodo, removeTodoById, updateTodoById} = todoSlice.actions

export default todoSlice.reducer