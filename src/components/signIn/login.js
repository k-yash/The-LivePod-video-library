import React from 'react';
import "./style.css";

export const Login = () => {
    return (
        <div class="container utility-page">
            <h1>Log In</h1>
            <div class="box">
                <i class="fa fa-envelope"></i>
                <input type="email" name="email" id="email" placeholder="Enter Your Email"/>
            </div>
            <div class="box">
                <i class="fa fa-key"></i>
                <input type="password" name="password" id="password" placeholder="Enter Your Password"/>
            </div>
            <p>don't have an account? Click here.</p>
            <button class="btn">Sign In</button>
        </div>
    )
}


