export const playlistReducer = (state, action) => {
    console.log(state.MyPlaylists);
  
    switch (action.type) {
      case "ADD_PLAYLIST":
        return (state = {
          MyPlaylists: state.MyPlaylists.concat(action.payload)
        });
  
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
  