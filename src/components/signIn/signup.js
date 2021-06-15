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
	})

	const inputEvent = (event) =>{
		const {value, name} = event.target;
		setSignUpData((prevData)=>({...prevData, [name]:value}));
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
    	<button onClick={()=>{createUserCredentials(signUpData)}} className="btn">Sign Up</button>
    </div>}
	</div>
    )
}


