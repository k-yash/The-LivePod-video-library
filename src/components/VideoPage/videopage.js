import "./videopage.css";
import { Iframe } from "./iframe";
import { useData } from "../../Contexts/datacontext";
import { useState } from "react";
import { Modal } from "../Modal/modal";
import { useParams } from "react-router-dom";
import {restApiCalls} from "../../Contexts/Utilities/RestAPICalls";
import { useAuth } from "../../Contexts/authcontext";
import Loading from "../LoadingComponent/loading";
import NoteContainer from "./Notes/noteContainer";
import {infoToast, darkToast} from "./toast";


export const VideoPage = () => {
  
  const {isUserLogIn} = useAuth();
  const [showModal, setShowModal] = useState(false);
  const { videoId } = useParams();
  const {getVideoData, dispatch, ifPresentInSaved, ifPresentInLikeVideos, loading } = useData();
  const video = getVideoData(videoId);


  const likedVideosHandler = async() =>{
    if(ifPresentInLikeVideos(video.videoId)){
      const response = await restApiCalls("DELETE",`likedvideos/${video.id}`)
      if(response.success){
        dispatch({ type: "REMOVE_FROM_LIKED_VIDEOS", payload: video })
        darkToast("Removed from liked videos");
      }
    }else{
      const response = await restApiCalls("POST",`likedvideos`, {videoId:video.id})
      if(response.success){
        dispatch({ type: "ADD_TO_LIKED_VIDEOS", payload: video });
        darkToast("Added to liked videos");
      }
      
    }
  }

  const savedVideosHandler = async() => {
    if(ifPresentInSaved(video.videoId)){
      const response = await restApiCalls("DELETE",`savedvideos/${video.id}`)
      if(response.success){
        dispatch({ type: "REMOVE_FROM_SAVED_VIDEOS", payload: video })
        darkToast("Removed from saved videos");
      }
      
    }else{
      const response = await restApiCalls("POST",`savedvideos`, {videoId:video.id})
      if(response.success){
        dispatch({ type: "ADD_TO_SAVED_VIDEOS", payload: video })
        darkToast("Added to saved videos");
      }
      
    }
 
  }

  const loginFirst = () =>{
    return infoToast("Please Login first!");
  }

  return (
    <div className="videopage">
      {loading?<Loading/>:
      <>
      <div>
        <Iframe id={video.videoId} />
        <div className="card-content">
          <img
            className="avatar"
            src="https://yt3.ggpht.com/ytc/AAUvwnhpNjTTcnunYN6sA0COpo4a1XScMe9cTeP-45fPzw=s176-c-k-c0x00ffffff-no-rj"
            alt=""
            srcSet=""
          />
          <div className="card-description">
            <h4 style={{color:"white"}}>{video.name}</h4>
            <p className="grey-text">{video.creator}</p>
            <div>{video.description}</div>
          </div>
        </div>
        <div className="func-icon">
          <i
            style={{
              color: ifPresentInLikeVideos(video.videoId) ? "skyblue" : "grey"
            }}
            onClick={() => isUserLogIn?likedVideosHandler(): loginFirst() }
            className="far fa-thumbs-up"
          ></i>
          <i
            onClick={() => {  isUserLogIn? setShowModal((val) => !val): loginFirst() }}
            className="fal fa-bars"
            style={{color:"grey"}}
          ></i>

          <i
            style={{ color: ifPresentInSaved(video.videoId) ? "red" : "grey" }}
            onClick={() =>isUserLogIn? savedVideosHandler() : loginFirst() }
            className="far fa-bookmark"
          ></i>
          <Modal showModal={showModal} setShowModal={setShowModal} />
        </div>

      </div>

      <div>
        <NoteContainer videoId = {video.id}/>
      </div>
      </>}
    </div>
  );
};
