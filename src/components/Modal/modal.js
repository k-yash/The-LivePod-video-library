import { useEffect, useRef, useState } from "react";
import { v4 as uuid } from "uuid";
import { usePlaylist } from "../../playlistcontext";
import { useParams } from "react-router-dom";
import { getVideoData } from "../videopage";
import "./modal.css";

export const Modal = ({ showModal, setShowModal }) => {
  const { videoId } = useParams();
  const [playlist, setPlaylist] = useState("");
  const [showInputBox, setShowInputbox] = useState(false);
  const { state, dispatch, ifPresentInPlaylist } = usePlaylist();
  const videoss = getVideoData(videoId);
  const inputRef = useRef(null);

  useEffect(() => {
    inputRef.current.focus();
  });

  const playlistHandler = (id) => {
    if (ifPresentInPlaylist(id, videoss.id)) {
      dispatch({
        type: "REMOVE_FROM_PLAYLIST",
        payload: { id: id, video: videoss }
      });
    } else {
      dispatch({
        type: "ADD_TO_PLAYLIST",
        payload: { id: id, video: videoss }
      });
    }
  };

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
                  checked={ifPresentInPlaylist(id, videoss.id)}
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
              onClick={() => {
                setShowModal((val) => !val);
                setShowInputbox((val) => !val);
                dispatch({
                  type: "ADD_PLAYLIST",
                  payload: { id: uuid(), title: playlist, videos: [videoss] }
                });
                setPlaylist("");
              }}
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
