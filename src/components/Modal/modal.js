import { useEffect, useRef, useState } from "react";
import { v4 as uuid } from "uuid";
import { usePlaylist } from "../../Contexts/playlistcontext";
import { useParams } from "react-router-dom";
// import { getVideoData } from "../VideoPage/videopage";
import {darkToast} from "../VideoPage/toast";
import "./modal.css";
import { useData } from "../../Contexts/datacontext";
import {restApiCalls} from "../../Contexts/Utilities/RestAPICalls";
import { useAuth } from "../../Contexts/authcontext";

export const Modal = ({ showModal, setShowModal }) => {
  const { videoId } = useParams();
  const {getVideoData} = useData();
  const [playlist, setPlaylist] = useState("");
  const [showInputBox, setShowInputbox] = useState(false);
  const { state, dispatchPlaylist, ifPresentInPlaylist } = usePlaylist();
  const videoss = getVideoData(videoId);
  const inputRef = useRef(null);
  const {userId} = useAuth();

  useEffect(() => {
    inputRef.current.focus();
  });

  const playlistHandler = async(playlistId) => {
    if (ifPresentInPlaylist(playlistId, videoss.videoId)) {
      const response = await restApiCalls("DELETE", `playlist/${playlistId}/${videoss.id}`);
      if(response.success){
        dispatchPlaylist({ type: "REMOVE_FROM_PLAYLIST", payload: { id: playlistId, videoId: videoss.videoId }});
        darkToast("Removed from playlist!")};
    } else {
     const response = await restApiCalls("POST", `playlist/${playlistId}`, {videoId: videoss.id});
     if(response.success){
        dispatchPlaylist({ type: "ADD_TO_PLAYLIST", payload: { id: playlistId, video: videoss }});
        darkToast("Added to playlist!");
     }
    }
  };

  const createNewPlaylist = async() =>{
    const response = await restApiCalls("POST", `playlist`, {playlistName:playlist, videoId: videoss.id});
    if(response.success){
      dispatchPlaylist({type: "SET_PLAYLIST", payload: response.response.playlists});
      setShowModal((val) => !val);
      setShowInputbox((val) => !val);
      darkToast("Video added to Playlist!");
      setPlaylist("");
    }
    
  }

  return (
    <div className={`modal-bg ${showModal ? "" : "hide"} `}>
      <div className="modal">
        <div class="modal-heading">
          Save to...
          <i
            onClick={() => {
              setShowModal((val) => !val);

              showInputBox
                ? setShowInputbox((val) => !val)
                : setShowInputbox((val) => val);
            }}
            class="fas fa-times"
            
          ></i>
        </div>
        <div className="modal-playlists">
          {state.MyPlaylists.map(({ id, title }) => {
            return (
              <div>
                <input
                  checked={ifPresentInPlaylist(id, videoss.videoId)}
                  onClick={() => playlistHandler(id)}
                  type="checkbox"
                />
                <label>{title}</label>
              </div>
            );
          })}
        </div>
        <div className="modal-add">
          <div
            onClick={() => {
              setShowInputbox((val) => !val);
            }}
            className={`${showInputBox ? "hide" : ""}`}
          >
            <i class="fas fa-plus"></i>
            <span>Create new playlist</span>
          </div>
          <div className={`${showInputBox ? "" : "hide"}`}>
            <input
              ref={inputRef}
              value={playlist}
              onChange={(event) => setPlaylist(event.target.value)}
            />
            <button
              onClick={() => { createNewPlaylist(); }}
              disabled={!playlist}
            >
              Create
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
