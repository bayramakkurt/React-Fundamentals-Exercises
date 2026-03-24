import React, { useState } from 'react'
import '../App.css';
import { useDispatch } from 'react-redux';
import type { TodoType } from '../types/Types';
import { createTodo } from '../redux/todoSlice';

function TodoCreate() {

  const dispatch = useDispatch()

  const [newTodo, setNewTodo] = useState<string>('');

  const handleCreatetodo = () => {
    if (newTodo.trim().length == 0){
      alert('Lütfen bir todo giriniz!');
      return;
    }

    const payload:TodoType = {
      id: Math.floor(Math.random() * 1000),
      content: newTodo
    }

    dispatch(createTodo(payload));
    setNewTodo('');
  }


  return (
    <div className='todo-create'>
        <input
        value={newTodo}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => setNewTodo(e.target.value)}
        placeholder='Todo giriniz...' className='todo-input' type="text" />
        <button onClick={handleCreatetodo} className='todo-create-button'>Oluştur</button>
    </div>
  )
}

export default TodoCreate