import React,{useState} from 'react';
import './App.css'
import TodoCreate from './components/TodoCreate'
import TodoList from './components/TodoList'

function App() {

  const[todos, setTodos] = useState([]);


  const createTodo = (newTodo) => {
    setTodos([...todos, newTodo]);

  }

  const removeTodo = (id) => {
    setTodos([...todos.filter((todo) => todo.id !== id)]);
  }

  const updateTodo = (newTodo) => {
    const updatedTodos = todos.map((todo) => {
      if (todo.id === newTodo.id) {
        return newTodo;
      }
      return todo;
    });

    setTodos([...updatedTodos]);
  }


  return (
    <div className='App'>
      <div className='main'>
        <TodoCreate oncCreateTodo = {createTodo} />
        <TodoList todos = {todos} onRemoveTodo = {removeTodo} onUpdateTodo={updateTodo}/>
      </div>
    </div>
  )
}

export default App
