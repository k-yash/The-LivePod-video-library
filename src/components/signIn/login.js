import React, {useState} from 'react';
import { useAuth } from '../../Contexts/authcontext';
import {useLocation} from "react-router-dom";
import "./style.css";

export const Login = () => {

    const [loginData, setLoginData] = useState({
        email:"",
        password:""
    })

    const {authenticateUser} = useAuth();
    const { state } = useLocation();


    const inputEvent = (event) =>{
        const {name, value} = event.target;
        setLoginData((prev)=>({...prev, [name]:value}));
    }
    // console.log(loginData);

    const authenticateCredentials = () =>{
        const from = state?.from? state.from:"/";
        authenticateUser(loginData, from);
    }

    return (
        <div >
        <div class="container utility-page">
            <h1>Log In</h1>
            <div class="box">
                <i class="fa fa-envelope"></i>
                <input 
                type="email" 
                name="email" 
                id="email"
                value={loginData.email}
                onChange={inputEvent} 
                placeholder="Enter Your Email"/>
            </div>
            <div class="box">
                <i class="fa fa-key"></i>
                <input 
                type="password" 
                name="password" 
                id="password"
                value={loginData.password}
                onChange={inputEvent} 
                placeholder="Enter Your Password"/>
            </div>
            <p>don't have an account? Click here.</p>
            <button onClick={()=>{authenticateCredentials()}} class="btn">Sign In</button>
        </div>
        </div>
    )
}


