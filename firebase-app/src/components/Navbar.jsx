import React from 'react'
import '../css/navbar.css'
import { signOut } from 'firebase/auth'
import { auth } from '../Firebase'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'


function Navbar() {

  const navigate = useNavigate();

  const logout = async () => {
    setTimeout(async () => {
      try {
        await signOut(auth);
        toast.success('Çıkış başarılı!');
        navigate('/auth');
      } catch (error) {
        toast.error('Çıkış başarısız: ' + error.message);
      }
    }, 500);

  }

  return (
    <div className='navbar'>
        <div className='navbar-left'>FİREBASE</div>
        <div onClick={logout} className='navbar-right'>Çıkış Yap</div>
    </div>
  )
}

export default Navbar