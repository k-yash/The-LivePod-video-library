import { createContext, useContext, useState } from "react";
import {restApiCalls} from "./Utilities/RestAPICalls";
import {useNavigate} from "react-router-dom";
import {successToast} from "../components/VideoPage/toast";

export const AuthContext = createContext();

export const AuthProvider = ({children}) =>{
    const [loading, setLoading] = useState(false);
    const {isUserLoggedIn,userId, name } = JSON.parse(localStorage?.getItem("login"))||{isUserLoggedIn:false};
    const [isUserLogIn, setIsUserLogIn] = useState(isUserLoggedIn);
    const navigate = useNavigate();

    const authenticateUser = async(user, from)=>{
        setLoading(true);
        try{
            const response = await restApiCalls("POST", 'login',user);
            if(response.success){
                setIsUserLogIn(true);
                localStorage.setItem("login", JSON.stringify({"isUserLoggedIn":response.success, "userId": response.userId, "name": response.name}));
                successToast("successfully logged in!")
                navigate(from);
            }
        }catch(err){
            console.log(err);

        }finally{
            setLoading(false);
        }

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
        localStorage.removeItem("login");
        setIsUserLogIn(false);
    }

    return(
        <AuthContext.Provider value={{isUserLogIn, setIsUserLogIn, authenticateUser, logOut, userId, createUserCredentials, loading}}>
            {children}
        </AuthContext.Provider>
    )
    
} 

export const useAuth = () =>{
    return useContext(AuthContext);
}