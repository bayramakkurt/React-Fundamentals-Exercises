import React,{useState} from 'react'
import '../App.css';

function TodoCreate({oncCreateTodo}) {

    const [newTodo, setNewTodo] = useState('');

    const clearInput = () => {
        setNewTodo('');
    }

    const createTodo = () => {
        if (!newTodo) return;
        const request = {
            id: Math.floor(Math.random() * 1000),
            content: newTodo,
        }
        oncCreateTodo(request);
        clearInput();
    }

  return (
    <div className='todo-create'>
        <input
        value={newTodo}
        onChange={(e)=>setNewTodo(e.target.value)}
        className='todo-input' type="text" placeholder='Todo Giriniz:' />
                <button onClick={createTodo} className='todo-create-button'>Todo Oluştur</button>
    </div>
  )
}

export default TodoCreate