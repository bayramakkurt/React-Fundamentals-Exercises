import React, { useState } from 'react'
import '../App.css';
import { IoMdRemoveCircleOutline } from "react-icons/io";
import { MdModeEdit } from "react-icons/md";
import { FaCheck } from "react-icons/fa";
import type { TodoType } from '../types/Types';
import { useDispatch } from 'react-redux';
import { removeTodoById, updateTodoById } from '../redux/todoSlice';

interface TodoProps {
    todoProps: TodoType
}

function Todo({todoProps}: TodoProps) {
  const {id, content} = todoProps;
  const [editable, setEditable] = useState<boolean>(false);
  const [newTodo, setNewTodo] = useState<string>(content);

  const dispatch = useDispatch();

  const handleRemoveTodo = () => {
    dispatch(removeTodoById(id));
  }

  const handleUpdateTodo = () => {
    const payload:TodoType = {
      id,
      content: newTodo
    }
    dispatch(updateTodoById(payload));
    setEditable(false);
  }

  return (
    <div className='todo-card'>
        {editable ? <input value={newTodo} onChange={(e: React.ChangeEvent<HTMLInputElement>) => setNewTodo(e.target.value)} className='todo-edit-input' type="text" /> : <span>{content}</span>}
        <div>
            <IoMdRemoveCircleOutline onClick={handleRemoveTodo} className='todo-icon'/>
            {editable ? <FaCheck onClick={handleUpdateTodo} className='todo-icon'/> : <MdModeEdit onClick={()=> setEditable(true)} className='todo-icon'/>}
        </div>
    </div>
  )
}

export default Todo