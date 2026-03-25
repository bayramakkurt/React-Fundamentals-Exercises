import React, { useState } from 'react'
import '../css/auth.css'
import {FaGoogle} from 'react-icons/fa'
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { toast } from 'react-toastify';
import {auth} from '../Firebase.jsx'
import { useNavigate } from 'react-router-dom';


const provider = new GoogleAuthProvider();

function Auth() {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const register = async () => {
    try {
      const response = await createUserWithEmailAndPassword(auth, email, password);
      const user = response.user;
      if(user){
        toast.success('Kayıt başarılı! Kullanıcı: ' + user.email);
        setEmail('');
        setPassword('');

      }
    } catch (error) {
      toast.error('Kayıt başarısız: ' + error.message);
    }
  }

  const loginWithEmail = async () => {
    try {
      const response = await signInWithEmailAndPassword(auth, email, password);
      const user = response.user;
      if(user){
        toast.success('Giriş başarılı! Kullanıcı: ' + user.email);
        setEmail('');
        setPassword('');
        navigate('/');
      }
    } catch (error) {
      toast.error('Giriş başarısız: ' + error.message);
    }
  }
  const loginWithGoogle = async () => {
    try {
      const response = await signInWithPopup(auth, provider)
      const credential = GoogleAuthProvider.credentialFromResult(response);
      const token = credential.accessToken;
      const user = response.user;
      if(user){
        toast.success('Google ile giriş başarılı! Kullanıcı: ' + user.email);
        navigate('/');
      }
    } catch (error) {
      toast.error('Google ile giriş başarısız: ' + error.message);
    }
  }


  return (
    <div className='auth'>
        <h3 className='auth-header'>Giriş Yap / Kaydol</h3>
        <div className='input-div'>
            <input value={email} onChange={(e) => setEmail(e.target.value)} type="text" placeholder='Email' />
            <input value={password} onChange={(e) => setPassword(e.target.value)} type="password" placeholder='Parola' />
        </div>
        <div style={{flexDirection:'column'}}>
          <div>
            <button onClick={loginWithGoogle} className='google-login-button'><FaGoogle/> Google ile Giriş Yap</button>
          </div>
          <div style={{flexDirection:'row', marginTop:'10px'}}>
            <button onClick={loginWithEmail} className='login-button'>Giriş Yap</button>
            <button onClick={register} className='register-button'>Kaydol</button>
          </div>

        </div>
    </div>
  )
}

export default Auth