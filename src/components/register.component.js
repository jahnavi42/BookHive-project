import React, { useRef } from 'react'
import { useDispatch,useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import { registerUser, showMsg } from '../reduxStore/main.slice'



function Register() {
    const userRef=useRef()
    const passRef=useRef()
    const passConfRef=useRef()
    const dispatch=useDispatch()
    const navig=useNavigate()
    let isLoggedIn=useSelector(state=>state.main.isLoggedIn)

    const handleRegister=()=>{
        let username=userRef.current.value
        let pass1=passRef.current
        let pass2=passConfRef.current
        if(pass1.value!=pass2.value){
            dispatch(showMsg({msg:"Passwords don't match",type:"error"}))
            pass1.value=''
            pass2.value=''
            return
        }else{
            dispatch(registerUser({username:username,password:pass1.value}))
            dispatch(showMsg({msg:"Register Success",type:"success"}))
            navig('/login')
        }
    }

    return (
    <div>
        <div className="card" style={{margin:"200px 400px 400px"}}>
            <div className="col d-flex flex-column justify-content">
                <div className="col h2 pb-2">Sign up</div>
                <div className="col h4 pb-2"><input type="text" ref={userRef} placeholder="username"/></div>
                <div className="col h4 pb-2"><input type="password" ref={passRef} placeholder="password"/></div>
                <div className="col h4 pb-2"><input type="password" ref={passConfRef} placeholder="confirm password"/></div>
                <div className="col"><button className='btn btn-primary mb-2' onClick={handleRegister}>sign up</button></div>
            </div>
        </div>
    </div>
    )
}

export default Register