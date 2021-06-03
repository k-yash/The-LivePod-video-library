import "./styles.css";
import { useState, useEffect } from "react";
import { NavBar } from "./components/Navbar/navbar";
import { MainSection } from "./components/Section/mainsection";
import {toast} from "react-toastify";
import { restApiCalls } from "./Contexts/Utilities/RestAPICalls";
import { useAuth } from "./Contexts/authcontext";

toast.configure();
export default function App() {

  const {isUserLogIn}  = useAuth();
  const {userId} = JSON.parse(localStorage?.getItem("login"))||{userId:null};
  console.log(userId);

  useEffect(()=>{
    if(isUserLogIn){
      (async()=>{
      try{
        const response = await restApiCalls("GET",`savedvideos/${userId}`);
        console.log(response); 

      }catch(error){
        console.log(error);
      }})()
    }
    })

  useEffect(()=>{
    if(isUserLogIn){
      (async()=>{
      try{
        const response = await restApiCalls("GET",`likedVideos/${userId}`);
        console.log(response); 

      }catch(error){
        console.log(error);
      }})()
    }
    })

  useEffect(()=>{
    if(isUserLogIn){
      (async()=>{
      try{
        const response = await restApiCalls("GET",`history/${userId}`);
        console.log(response); 

      }catch(error){
        console.log(error);
      }})()
    }
    })

  useEffect(()=>{
    if(isUserLogIn){
      (async()=>{
      try{
        const response = await restApiCalls("GET",`playlist/${userId}`);
        console.log(response); 

      }catch(error){
        console.log(error);
      }})()
    }
    })


  const [openBars, setOpenBars] = useState(false);
  return (
    <div className="App">
      <NavBar setOpenBars={setOpenBars} />
      <MainSection setOpenBars={setOpenBars} openBars={openBars} />
    </div>
  );
}
