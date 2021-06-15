import "./myplaylist.css";
import { usePlaylist } from "../../Contexts/playlistcontext";
import { Card } from "../Card/card";
import { restApiCalls } from "../../Contexts/Utilities/RestAPICalls";
import { useAuth } from "../../Contexts/authcontext";
import { useData } from "../../Contexts/datacontext";
import Loading from "../LoadingComponent/loading";


export const MyPlaylist = () => {
  const { state, dispatchPlaylist } = usePlaylist();
  const {loading} = useData();
  const {userId} = useAuth();

  const deletePlaylistHandler = async(playlistId) =>{
    const response = await restApiCalls("DELETE", `playlist/${userId}/${playlistId}`)
    if(response.success){
      dispatchPlaylist({ type: "DELETE_PLAYLIST", payload: playlistId });
    }
    
  }

  return (
    <div className="utility-page">
      <h1>My Playlist</h1>
      {loading?<Loading/>:<div>
        {state.MyPlaylists.map((playlist) => {
          return (
            <div className="playlists-div">
              <div className="header">
                <h2>{playlist.title}</h2>
                {playlist.title !== "Watch later" && (
                  <button
                    onClick={() => { deletePlaylistHandler(playlist.id)}}
                  >
                    Delete Wishlist
                  </button>
                )}
              </div>
              <div className="section">
                {playlist.videos.map(({video}) => {
                  return <Card key={video.id} video={video} />;
                })}
              </div>
            </div>
          );
        })}
      </div>}
    </div>
  );
};
