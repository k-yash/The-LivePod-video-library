import { createContext, useContext, useReducer } from "react";
import { playlistReducer } from "../Reducres/playlistReducer";
import { v4 as uuid } from "uuid";

export const PlaylistContext = createContext();

export const MyPlaylists = [{ id: uuid(), title: "Watch later", videos: [] }];


export const PlaylistProvider = ({ children }) => {
  const [state, dispatch] = useReducer(playlistReducer, { MyPlaylists });

  const ifPresentInPlaylist = (playlistId, videoId) => {
    const resultedPlaylist = state.MyPlaylists.find(
      (playlist) => playlist.id === playlistId
    );
    const val = resultedPlaylist.videos.some((video) => video.id === videoId);

    return val;
  };

  return (
    <PlaylistContext.Provider value={{ state, dispatch, ifPresentInPlaylist }}>
      {children}
    </PlaylistContext.Provider>
  );
};

export const usePlaylist = () => {
  return useContext(PlaylistContext);
};
