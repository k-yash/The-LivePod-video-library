import { createContext, useContext, useState, useEffect } from "react";
import {restApiCalls} from "./Utilities/RestAPICalls";
import {useNavigate} from "react-router-dom";
import {successToast, errorToast} from "../components/VideoPage/toast";
import axios from "axios";

export const AuthContext = createContext();

export const AuthProvider = ({children}) =>{
    const [loading, setLoading] = useState(false);
    const {isUserLoggedIn,userId, name, token: savedToken } = JSON.parse(localStorage?.getItem("login"))||{isUserLoggedIn:false, token: null};
    const [isUserLogIn, setIsUserLogIn] = useState(isUserLoggedIn);
    const [token, setToken] = useState(savedToken);
    const navigate = useNavigate();

    // useEffect(() => {
        
    //     setupAuthHeaderForServiceCalls(token);
       
    // }, [token])

    const authenticateUser = async(user, from)=>{
        setLoading(true);
        try{
            const data = await restApiCalls("POST", 'login',user);
            if(data.success){

                loginUser(data.response);
                navigate(from);
            }
        }catch(err){
            console.log("wwookkkakakaka")
            successToast("Invalid Credentials.");
            console.log(err);
            

        }finally{
            setLoading(false);
        }

    }

    const loginUser = (response) =>{
        setIsUserLogIn(true);
        setupAuthHeaderForServiceCalls(response.token)
        localStorage.setItem("login", JSON.stringify({"isUserLoggedIn": true, "userId": response.userId, "name": response.name, "token": response.token}));
        successToast("successfully logged in!")
        setToken(response.token)
        
    }

    function setupAuthHeaderForServiceCalls(token) {
        if (token) {
          return (axios.defaults.headers.common["Authorization"] =  `Bearer ${token}`);
        }
        delete axios.defaults.headers.common["Authorization"];
      }

    const createUserCredentials = async(userData)=>{
        setLoading(true)
        try{
            const response = await restApiCalls("POST", 'signup', userData);
            if(response.success){
                successToast("successfully signed up!")
                navigate("/login");
            }

        }catch(err){
            console.log(err);
        }finally{
            setLoading(false)
        }
    }

    const logOut = () =>{
        setToken(null);
        setupAuthHeaderForServiceCalls(null);
        localStorage.removeItem("login");
        setIsUserLogIn(false);
    }

    return(
        <AuthContext.Provider value={{isUserLogIn, setIsUserLogIn, authenticateUser,token, logOut, userId, createUserCredentials,setupAuthHeaderForServiceCalls, loading}}>
            {children}
        </AuthContext.Provider>
    )
    
} 

export const useAuth = () =>{
    return useContext(AuthContext);
}