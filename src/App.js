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
  const {dispatch, setLoading} = useData();
  const {isUserLogIn, token, setupAuthHeaderForServiceCalls}  = useAuth();


  useEffect(()=>{
    console.log('hi1')
    setupAuthHeaderForServiceCalls(token);
  },[])

  useEffect(()=>{
    console.log("hi2")
    if(isUserLogIn){
      setLoading(true);
      (async()=>{
      try{
        const response = await restApiCalls("GET",`savedvideos`);
        dispatch({type:"SET", payload:{name: "saved", data:response.response.savedVideos}})

      }catch(error){
        console.log(error);
      }finally{
        setLoading(false)
      }})()
    }
    },[token])

  useEffect(()=>{
    console.log("hi3")
    if(isUserLogIn){
      setLoading(true);
      (async()=>{
      try{
        const response = await restApiCalls("GET",`likedVideos`);
        dispatch({type:"SET", payload:{name: "liked", data:response.response.likedVideos}})

      }catch(error){
        console.log(error);
      }finally{
        setLoading(false)
      }})()
    }
    },[token])

  useEffect(()=>{
    console.log("hi4")
    if(isUserLogIn){
      setLoading(true);
      (async()=>{
      try{
        const response = await restApiCalls("GET",`history`);
        dispatch({type:"SET", payload:{name: "history", data:response.response.historyVideos}})

      }catch(error){
        console.log(error);
      }finally{
        setLoading(false)
      }})()
    }
    },[token])

  useEffect(()=>{
    console.log("hi5")
    if(isUserLogIn){
      setLoading(true);
      (async()=>{
      try{
        const response = await restApiCalls("GET",`playlist`);
        // console.log(response.response.playlists)
        dispatchPlaylist({type: "SET_PLAYLIST", payload: response.response.playlists})

      }catch(error){
        console.log(error);
      }finally{
        setLoading(false)
      }})()
    }
    },[token])

  const [openBars, setOpenBars] = useState(false);
  return (
    <div className="App">
      <NavBar setOpenBars={setOpenBars} />
      <MainSection setOpenBars={setOpenBars} openBars={openBars} />
    </div>
  );
}
