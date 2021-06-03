import {Route, Navigate, useNavigate} from "react-router-dom";
import {useAuth} from "../Contexts/authcontext";


import React from 'react'

export const PrivateRoute = ({path, ...props}) => {
    const {isUserLogIn} = useAuth();

    return (
       isUserLogIn? 
       <Route {...props} path={path}/> : 
       <Navigate state= {{from :path}} replace to="/login" />
    )
}

