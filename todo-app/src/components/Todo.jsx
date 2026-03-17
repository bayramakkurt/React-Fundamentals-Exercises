import {React} from 'react';
import { IoIosRemoveCircle } from "react-icons/io";
import { MdEditSquare } from "react-icons/md";
import { FaCheckToSlot } from "react-icons/fa6";
import '../App.css';
import { useState } from "react";

function Todo({todo, onRemoveTodo, onUpdateTodo}) {
    const {id, content} = todo;

    const [editable, setEditable] = useState(false);
    const [editedContent, setEditedContent] = useState(content);

    const removeTodo = () => {
        onRemoveTodo(id);
    }

    const updateTodo = () => {
        const request = {
            id:id,
            content: editedContent
        }
        onUpdateTodo(request);
        setEditable(!editable);
    }

  return (
    <div style={{display:'flex', flexDirection:'row',alignItems:'center',justifyContent:'space-between', border:'1px solid lightgrey',padding:'10px', marginTop:'6px'}}>
        <div>
            {
                editable ? <input className='todo-input' type="text"
                style={{width:'480px'}} defaultValue={editedContent} onChange={(e)=>setEditedContent(e.target.value)} /> : content
            }
        </div>
        <div>
            <IoIosRemoveCircle onClick={removeTodo} className='todo-icons' />
            {
                editable ? <FaCheckToSlot  className='todo-icons' onClick={updateTodo} /> : <MdEditSquare onClick={()=>setEditable(true)} className='todo-icons' />
            }
        </div>
    </div>
  )
}

export default Todo