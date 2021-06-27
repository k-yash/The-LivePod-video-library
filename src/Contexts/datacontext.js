import { createContext, useContext, useEffect, useReducer, useState } from "react";
import {dataReducer} from "../Reducres/dataReducer";
import {restApiCalls} from "./Utilities/RestAPICalls";

export const DataContext = createContext();


export const DataContextProvider = ({ children }) => {
  
  const [loading, setLoading] = useState(true);

  const [state, dispatch] = useReducer(dataReducer, {
    videos:[],
    latest: [],
    saved: [],
    playlist: [],
    liked: [],
    notes:[],
    history: []
  });

  const [videoData, setVideoData] = useState(state.videos);

  useEffect(()=>{
    setLoading(true);
    (async ()=>{
      try{
       const data = await restApiCalls("GET","videos");
       setVideoData(data.videos);
       dispatch({type:"SET", payload:{name: "videos", data:data.videos}})
  
      }catch(error){
        console.log(error);
      }finally{
        setLoading(false);
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
    setVideoData(filterData);
    
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
      value={{ state, dispatch, ifPresentInSaved, ifPresentInLikeVideos, videoData, setVideoData, onSearchData, getVideoData, loading, setLoading }}
    >
      {children}
    </DataContext.Provider>
  );
};

export const useData = () => {
  return useContext(DataContext);
};
