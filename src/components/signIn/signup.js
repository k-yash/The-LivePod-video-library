import React, { useState } from 'react';
import { useAuth } from '../../Contexts/authcontext';
import Loading from "../LoadingComponent/loading";
import "./style.css";

export const Signup = () => {

	const {createUserCredentials, loading} = useAuth();

	const [signUpData, setSignUpData]= useState({
		name:"",
		email:"",
		password:""
	});

	const [inputError, setInputError] = useState({
        name:"",
        email:"",
        password:""
    })

	const verifyPassword = ()=> {
        const passwordRegex = new RegExp(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/);
        return passwordRegex.test(signUpData.password);
       }

    const verifyEmail = ()=>{
        const emailRegex = new RegExp(/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/);
        return emailRegex.test(signUpData.email);
    }

	const validateInput = () => {
        setInputError({
            name:"",
            email:"",
            password:""
        });
        
		let userValidate = true;
        if(!signUpData.password || !verifyPassword()){
            setInputError((prev)=>({...prev, password:"Enter a valid password, Password must contain minimum 8 characters with both lower, upper, number and special characters"}));
			userValidate = false;
        }

        if(!signUpData.email || !verifyEmail()){
            setInputError((prev)=>({...prev, email:"Enter a valid email"}));
			userValidate = false;
        }

        if(!signUpData.name){
            setInputError((prev)=>({...prev, name:"Enter a valid name"}));
			userValidate = false;
        }

		return userValidate;

    }

	const inputEvent = (event) =>{
		const {value, name} = event.target;
		setSignUpData((prevData)=>({...prevData, [name]:value}));
	}

	const signupHandler=()=>{
		if(validateInput()){
			createUserCredentials(signUpData);
		}
	}

    return (
		<div>
        {loading?<Loading/>:<div className="container utility-page">
    	<h2>Sign Up</h2>
        <div className="box ">
    		<i className="fa fa-user"></i>
    		<input 
			type="name" 
			name="name" 
			value={signUpData.name}
			onChange={inputEvent}
			id="name" 
			placeholder="Enter Your Name"/>
    	</div>
		<span>{inputError.name}</span>
    	<div className="box">
    		<i className="fa fa-envelope"></i>
    		<input 
			type="email" 
			name="email"
			value={signUpData.email} 
			onChange={inputEvent}
			id="email" 
			placeholder="Enter Your Email"/>
    	</div>
		<span>{inputError.email}</span>
    	<div className="box">
    		<i className="fa fa-key"></i>
    		<input 
			type="password" 
			name="password" 
			value={signUpData.password}
			onChange={inputEvent}
			id="password" 
			placeholder="Enter Your Password"/>
    	</div>
		<span>{inputError.password}</span>
    	<button onClick={()=>{signupHandler()}} className="btn">Sign Up</button>
    </div>}
	</div>
    )
}


