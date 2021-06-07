import "./myplaylist.css";
import { usePlaylist } from "../../Contexts/playlistcontext";
import { Card } from "../Card/card";
export const MyPlaylist = () => {
  const { state, dispatch } = usePlaylist();
  console.log("woka",state.MyPlaylists)

  return (
    <div className="utility-page">
      <h1>My Playlist</h1>
      <div>
        {state.MyPlaylists.map((playlist) => {
          return (
            <div className="playlists-div">
              <div className="header">
                <h2>{playlist.name}</h2>
                {playlist.name !== "Watch later" && (
                  <button
                    onClick={() => {
                      dispatch({
                        type: "DELETE_WISHLIST",
                        payload: playlist.id
                      });
                    }}
                  >
                    Delete Wishlist
                  </button>
                )}
              </div>
              <div className="section">
                {playlist.videos.map(({video}) => {
                  return <Card video={video} />;
                })}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
