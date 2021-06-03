import { createContext, useContext, useState } from "react";
import {restApiCalls} from "./Utilities/RestAPICalls";
import {useNavigate} from "react-router-dom";

export const AuthContext = createContext();

export const AuthProvider = ({children}) =>{
    const {isUserLoggedIn,userId, name } = JSON.parse(localStorage?.getItem("login"));
    const [isUserLogIn, setIsUserLogIn] = useState(isUserLoggedIn);
    const navigate = useNavigate();

    const authenticateUser = async(user, from)=>{
        try{
            console.log("Hello")
            const response = await restApiCalls("POST", 'login',user);
            console.log(response);
            if(response.success){
                setIsUserLoggedIn(true);
                localStorage.setItem("login", JSON.stringify({"isUserLoggedIn":isUserLogIn, "userId": response.userId, "name": response.name}));
                navigate(from);
            }
        }catch(err){
            console.log(err);

        }

    }

    const logOut = () =>{
        localStorage.removeItem("login");
        setIsUserLoggedIn(false);
    }

    return(
        <AuthContext.Provider value={{isUserLogIn, setIsUserLogIn, authenticateUser, logOut}}>
            {children}
        </AuthContext.Provider>
    )
    
} 

export const useAuth = () =>{
    return useContext(AuthContext);
}