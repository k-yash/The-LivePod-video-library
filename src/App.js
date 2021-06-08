import "./styles.css";
import { useState, useEffect } from "react";
import { NavBar } from "./components/Navbar/navbar";
import { MainSection } from "./components/Section/mainsection";
import {toast} from "react-toastify";
import { restApiCalls } from "./Contexts/Utilities/RestAPICalls";
import { useAuth } from "./Contexts/authcontext";
import { usePlaylist } from "./Contexts/playlistcontext";
import { useData } from "./Contexts/datacontext";

toast.configure();
export default function App() {

  const {dispatchPlaylist} = usePlaylist();
  const {dispatch} = useData();
  const {isUserLogIn}  = useAuth();
  const {userId} = JSON.parse(localStorage?.getItem("login"))||{userId:null};

  useEffect(()=>{
    if(isUserLogIn){
      (async()=>{
      try{
        const response = await restApiCalls("GET",`savedvideos/${userId}`);
        dispatch({type:"SET", payload:{name: "saved", data:response.response.savedVideos}})

      }catch(error){
        console.log(error);
      }})()
    }
    },[])

  useEffect(()=>{
    if(isUserLogIn){
      (async()=>{
      try{
        const response = await restApiCalls("GET",`likedVideos/${userId}`);
        dispatch({type:"SET", payload:{name: "liked", data:response.response.likedVideos}})

      }catch(error){
        console.log(error);
      }})()
    }
    },[])

  useEffect(()=>{
    if(isUserLogIn){
      (async()=>{
      try{
        const response = await restApiCalls("GET",`history/${userId}`);
        dispatch({type:"SET", payload:{name: "history", data:response.response.historyVideos}})

      }catch(error){
        console.log(error);
      }})()
    }
    },[])

  useEffect(()=>{
    if(isUserLogIn){
      (async()=>{
      try{
        const response = await restApiCalls("GET",`playlist/${userId}`);
        console.log(response.response.playlists)
        dispatchPlaylist({type: "SET_PLAYLIST", payload: response.response.playlists})

      }catch(error){
        console.log(error);
      }})()
    }
    },[])

  const [openBars, setOpenBars] = useState(false);
  return (
    <div className="App">
      <NavBar setOpenBars={setOpenBars} />
      <MainSection setOpenBars={setOpenBars} openBars={openBars} />
    </div>
  );
}
