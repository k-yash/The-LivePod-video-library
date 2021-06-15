import "./videopage.css";
import { Iframe } from "./iframe";
import { useData } from "../../Contexts/datacontext";
import { useState } from "react";
import { Modal } from "../Modal/modal";
import { useParams } from "react-router-dom";
import {restApiCalls} from "../../Contexts/Utilities/RestAPICalls";
import { useAuth } from "../../Contexts/authcontext";
import Loading from "../LoadingComponent/loading";


export const VideoPage = () => {
  
  const {userId} = useAuth();
  const [showModal, setShowModal] = useState(false);
  const { videoId } = useParams();
  const {getVideoData, dispatch, ifPresentInSaved, ifPresentInLikeVideos, loading } = useData();
  const video = getVideoData(videoId);




  const likedVideosHandler = async() =>{
    if(ifPresentInLikeVideos(video.videoId)){
      const response = await restApiCalls("DELETE",`likedvideos/${userId}/${video.id}`)
      if(response.success){
        dispatch({ type: "REMOVE_FROM_LIKED_VIDEOS", payload: video })
      }
    }else{
      const response = await restApiCalls("POST",`likedvideos/${userId}`, {videoId:video.id})
      if(response.success){
        dispatch({ type: "ADD_TO_LIKED_VIDEOS", payload: video })
      }
      
    }
  }

  const savedVideosHandler = async() => {
    if(ifPresentInSaved(video.videoId)){
      const response = await restApiCalls("DELETE",`savedvideos/${userId}/${video.id}`)
      if(response.success){
        dispatch({ type: "REMOVE_FROM_SAVED_VIDEOS", payload: video })
      }
      
    }else{
      const response = await restApiCalls("POST",`savedvideos/${userId}`, {videoId:video.id})
      if(response.success){
        dispatch({ type: "ADD_TO_SAVED_VIDEOS", payload: video })
      }
      
    }
 
  }

  return (
    <div className="videopage">
      {loading?<Loading/>:
      <>
      <Iframe id={video.videoId} />
      <div className="card-content">
        <img
          className="avatar"
          src="https://yt3.ggpht.com/ytc/AAUvwnhpNjTTcnunYN6sA0COpo4a1XScMe9cTeP-45fPzw=s176-c-k-c0x00ffffff-no-rj"
          alt=""
          srcSet=""
        />
        <div className="card-description">
          <h4>{video.name}</h4>
          <p className="grey-text">{video.creator}</p>
          <div>{video.description}</div>
        </div>
      </div>
      <div className="func-icon">
        <i
          style={{
            color: ifPresentInLikeVideos(video.videoId) ? "skyblue" : "grey"
          }}
          onClick={() => likedVideosHandler() }
          className="far fa-thumbs-up"
        ></i>
        <i
          onClick={() => {
            setShowModal((val) => !val);
          }}
          className="fal fa-bars"
        ></i>

        <i
          style={{ color: ifPresentInSaved(video.videoId) ? "red" : "grey" }}
          onClick={() => savedVideosHandler() }
          className="far fa-bookmark"
        ></i>
      </div>
      <Modal showModal={showModal} setShowModal={setShowModal} />
      {/* <Modal setShowModal={setShowModal}/> */}
      </>}
    </div>
  );
};
