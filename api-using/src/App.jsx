import { useEffect } from 'react';
import './App.css'
import axios from 'axios'

const BASE_URL = "http://localhost:3005";

function App() {
  const getAllUsers = async ()=>{
    const response = await axios.get(BASE_URL + "/users");
  }

  const getUserById = async (userId)=>{
    const response = await axios.get(BASE_URL + "/users/" + userId);
  }

  const createUser = async (user)=>{
    const response = await axios.post(BASE_URL + "/users", user);
  }

  const updateUser = async (userId, user)=>{
    const response = await axios.put(BASE_URL + "/users/" + userId, user);
  }

  const deleteUser = async (userId)=>{
    const response = await axios.delete(BASE_URL + "/users/" + userId);
  }

  useEffect(()=>{  //Component ilk yüklendiğinde çalışır ve sadece bir kere çalışır.
    getAllUsers();
    getUserById(1);
    //createUser({name: "New User", email: "new.user@example.com"});
    getAllUsers();
    updateUser(1, {name: "Updated User", email: "updated.user@example.com"});
  },[])

  return (
    <div></div>
  )
}

export default App
