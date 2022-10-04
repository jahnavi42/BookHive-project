import React, { useEffect, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import { validateLogin } from '../reduxStore/main.slice'

function Login() {
  const userRef=useRef()
  const passRef=useRef()
  const dispatch=useDispatch()
  const navig=useNavigate()
  let isLoggedIn=useSelector(state=>state.main.isLoggedIn)
  let username=null,password=null
  const handleLogin=()=>{
    username=userRef.current.value
    password=passRef.current.value
    dispatch(validateLogin({username:username,password:password}))
  }

  useEffect(()=>{
    if(isLoggedIn){
      navig('/')
    }
  },[isLoggedIn])

  return (
    <div>
      <div className="card" style={{margin:"200px 400px 400px"}}>
        <div className="col d-flex flex-column justify-content">
          <div className="col h2 pb-2">Login</div>
          <div className="col h4 pb-2"><input type="text" ref={userRef} placeholder="username"/></div>
          <div className="col h4 pb-2"><input type="password" ref={passRef} placeholder="password"/></div>
          <div className="col"><button className='btn btn-primary mb-2' onClick={handleLogin}>sign in</button></div>
          <div className="col">New here? <Link to="/register"> create an account</Link></div>
        </div>
      </div>
    </div>
  )
}

export default Login