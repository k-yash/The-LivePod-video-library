import React from 'react';
import "./style.css";

export const Signup = () => {
    return (
        <div className="container">
    	<h1>Sign Up</h1>
        <div className="box utility-page">
    		<i className="fa fa-user"></i>
    		<input type="name" name="name" id="name" placeholder="Enter Your Name"/>
    	</div>
    	<div className="box">
    		<i className="fa fa-envelope"></i>
    		<input type="email" name="email" id="email" placeholder="Enter Your Email"/>
    	</div>
    	<div className="box">
    		<i className="fa fa-key"></i>
    		<input type="password" name="password" id="password" placeholder="Enter Your Password"/>
    	</div>
    	<button className="btn">Sign Up</button>
    </div>
    )
}


