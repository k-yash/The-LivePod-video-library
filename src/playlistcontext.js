import { createContext, useContext, useReducer } from "react";
// import { useCurrVideo } from "./routecontext";
import { v4 as uuid } from "uuid";

export const PlaylistContext = createContext();

export const MyPlaylists = [{ id: uuid(), title: "Watch later", videos: [] }];

const playlistReducer = (state, action) => {
  console.log(state.MyPlaylists);

  switch (action.type) {
    case "ADD_PLAYLIST":
      return (state = {
        MyPlaylists: state.MyPlaylists.concat(action.payload)
      });
    // break;
    case "ADD_TO_PLAYLIST":
      return (state = {
        MyPlaylists: state.MyPlaylists.map((thisPlaylist) =>
          thisPlaylist.id === action.payload.id
            ? {
                ...thisPlaylist,
                videos: [...thisPlaylist.videos, action.payload.video]
              }
            : thisPlaylist
        )
      });

    case "REMOVE_FROM_PLAYLIST":
      return (state = {
        MyPlaylists: state.MyPlaylists.map((thisPlaylist) =>
          thisPlaylist.id === action.payload.id
            ? {
                ...thisPlaylist,
                videos: thisPlaylist.videos.filter(
                  ({ id }) => id !== action.payload.video.id
                )
              }
            : thisPlaylist
        )
      });
    case "DELETE_WISHLIST":
      return (state = {
        MyPlaylists: state.MyPlaylists.filter(({ id }) => id !== action.payload)
      });

    default:
      return state;
  }
};

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
