import { createContext, useContext, useEffect, useReducer, useState } from "react";
import {dataReducer} from "../Reducres/dataReducer";
import {restApiCalls} from "./Utilities/RestAPICalls";

export const DataContext = createContext();


export const DataContextProvider = ({ children }) => {

  const [state, dispatch] = useReducer(dataReducer, {
    videos:[],
    latest: [],
    saved: [],
    playlist: [],
    liked: [],
    history: []
  });

  const [videoData, setVedioData] = useState(state.videos);

  useEffect(()=>{
    (async ()=>{
      try{
       const data = await restApiCalls("GET","videos");
       setVedioData(data.Videos);
       dispatch({type:"SET", payload:{name: "videos", data:data.Videos}})

  
      }catch(error){
        console.log(error);
      }
      
    })()
  },[])

  const getVideoData = (videoId) => {
    return state.videos.find((video) => video.videoId == videoId);
  };
  
  const onSearchData = (event) => {
    const filterData = state.videos.filter((item) => {
      return item.name.toLowerCase().includes(event.target.value.toLowerCase());
    });
    setVedioData(filterData);
    
  };

  const ifPresentInSaved = (id) => {
    const val = state.saved.some(({video}) => video.videoId === id);
    return val;
  };

  const ifPresentInLikeVideos = (id) => {
    const val = state.liked.some(({video}) => video.videoId === id);
    return val;
  };

  return (
    <DataContext.Provider
      value={{ state, dispatch, ifPresentInSaved, ifPresentInLikeVideos, videoData, setVedioData, onSearchData, getVideoData }}
    >
      {children}
    </DataContext.Provider>
  );
};

export const useData = () => {
  return useContext(DataContext);
};
