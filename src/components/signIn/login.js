import React, {useState} from 'react';
import { useAuth } from '../../Contexts/authcontext';
import {useLocation, Link} from "react-router-dom";
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
        <div className ="container utility-page">
            <h2>Log In</h2>
            <div className="box">
                <i className="fa fa-envelope"></i>
                <input 
                type="email" 
                name="email" 
                id="email"
                value={loginData.email}
                onChange={inputEvent} 
                placeholder="Enter Your Email"/>
            </div>
            <div className="box">
                <i className="fa fa-key"></i>
                <input 
                type="password" 
                name="password" 
                id="password"
                value={loginData.password}
                onChange={inputEvent} 
                placeholder="Enter Your Password"/>
            </div>
            <Link to="/signup">don't have an account? Click here.</Link>
            <button onClick={()=>{authenticateCredentials()}} className="btn">Sign In</button>
        </div>
        </div>
    )
}


