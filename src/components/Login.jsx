import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Footer from './Footer';

function Login() {
  const navigate=useNavigate();
  const [email,setEmail]=useState('');
  const [password,setPassword]=useState('');
  function handleBack(){
    navigate('/')
  }

  function handleInput(e){
    e.preventDefault();

    if(!email.trim() || !password.trim()) {
      return alert('All feilds are required');
  }
    navigate('/createBook');
  }

  

  return (
    <>
    <div className='m-4 p-4 '>
      <form action="">
      <input className='border border-amber-400' type="text" placeholder='Enter Email'     value={email} onChange={(e)=>setEmail(e.target.value)}/>
      <input className='border border-amber-400' type="text" placeholder='Enter Password' value={password} onChange={(e)=>setPassword(e.target.value)}/>
      <button className='p-2 m-2' onClick={handleBack}>Back</button>
      <button className='p-2 m-2' onClick={handleInput}>Login</button>
      </form>
    </div>
    <Footer/>
    </>

  )
}

export default Login
