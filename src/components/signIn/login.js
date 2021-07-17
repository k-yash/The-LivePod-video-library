import React, {useState} from 'react';
import { useAuth } from '../../Contexts/authcontext';
import {useLocation, Link} from "react-router-dom";
import "./style.css";
import Loading from "../LoadingComponent/loading";


export const Login = () => {

    const [loginData, setLoginData] = useState({
        email:"",
        password:""
    })

    const [inputError, setInputError] = useState({
        email:"",
        password:""
    })

    const {authenticateUser, loading} = useAuth();
    const { state } = useLocation();


    const verifyEmail = ()=>{
        const emailRegex = new RegExp(/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/);
        return emailRegex.test(loginData.email);
    }

	const validateInput = () => {
        setInputError({
            email:"",
            password:""
        });
        
		let userValidate = true;
        if(!loginData.password){
            setInputError((prev)=>({...prev, password:"Enter a valid password"}));
			userValidate = false;
        }

        if(!loginData.email || !verifyEmail()){
            setInputError((prev)=>({...prev, email:"Enter a valid email"}));
			userValidate = false;
        }

		return userValidate;

    }

    const inputEvent = (event) =>{
        const {name, value} = event.target;
        setLoginData((prev)=>({...prev, [name]:value}));
    }

    const authenticateCredentials = () =>{
        if(validateInput()){
            const from = state?.from? state.from:"/";
            authenticateUser(loginData, from);
        }
        
    }

    return (
        <div >
        {loading?<Loading/>:<div className ="container utility-page">
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
            <span>{inputError.email}</span>
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
            <span>{inputError.password}</span><br/>
            <Link to="/signup">don't have an account? Click here.</Link>
            <button onClick={()=>{authenticateCredentials()}} className="btn">Sign In</button>
        </div>}
        </div>
    )
}


