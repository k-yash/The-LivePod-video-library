import "./videopage.css";
import { Iframe } from "./iframe";
import { useData } from "../datacontext";
import { useState } from "react";
import { Modal } from "./Modal/modal";
import { useParams } from "react-router-dom";
import { data } from "../data";

export const getVideoData = (videoId) => {
  return data.find((video) => video.id === videoId);
};

export const VideoPage = () => {
  const [showModal, setShowModal] = useState(false);
  const { videoId } = useParams();
  const { dispatch, ifPresentInSaved, ifPresentInLikeVideos } = useData();
  const video = getVideoData(videoId);
  return (
    <div className="videopage">
      <Iframe id={video.id} />
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
        </div>
      </div>
      <div className="func-icon">
        <i
          style={{
            color: ifPresentInLikeVideos(video.id) ? "skyblue" : "grey"
          }}
          onClick={() =>
            ifPresentInLikeVideos(video.id)
              ? dispatch({ type: "REMOVE_FROM_LIKED_VIDEOS", payload: video })
              : dispatch({ type: "ADD_TO_LIKED_VIDEOS", payload: video })
          }
          className="far fa-thumbs-up"
        ></i>
        <i
          onClick={() => {
            setShowModal((val) => !val);
          }}
          className="fal fa-bars"
        ></i>

        <i
          style={{ color: ifPresentInSaved(video.id) ? "red" : "grey" }}
          onClick={() =>
            ifPresentInSaved(video.id)
              ? dispatch({ type: "REMOVE_FROM_SAVED_VIDEOS", payload: video })
              : dispatch({ type: "ADD_TO_SAVED_VIDEOS", payload: video })
          }
          className="far fa-bookmark"
        ></i>
      </div>
      <Modal showModal={showModal} setShowModal={setShowModal} />
      {/* <Modal setShowModal={setShowModal}/> */}
    </div>
  );
};
