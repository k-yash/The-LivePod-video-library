import React from 'react';
import "./style.css";

export const Signup = () => {
    return (
        <div class="container">
    	<h1>Sign Up</h1>
        <div class="box utility-page">
    		<i class="fa fa-user"></i>
    		<input type="name" name="name" id="name" placeholder="Enter Your Name"/>
    	</div>
    	<div class="box">
    		<i class="fa fa-envelope"></i>
    		<input type="email" name="email" id="email" placeholder="Enter Your Email"/>
    	</div>
    	<div class="box">
    		<i class="fa fa-key"></i>
    		<input type="password" name="password" id="password" placeholder="Enter Your Password"/>
    	</div>
    	<button class="btn">Sign Up</button>
    </div>
    )
}


