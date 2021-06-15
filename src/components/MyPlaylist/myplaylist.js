import "./myplaylist.css";
import { usePlaylist } from "../../Contexts/playlistcontext";
import { Card } from "../Card/card";
import { restApiCalls } from "../../Contexts/Utilities/RestAPICalls";
import { useAuth } from "../../Contexts/authcontext";
import { useData } from "../../Contexts/datacontext";
import Loading from "../LoadingComponent/loading";
import { useState } from "react";


export const MyPlaylist = () => {
  const { state, dispatchPlaylist } = usePlaylist();
  const {loading} = useData();
  const {userId} = useAuth();
  const [subMenu, setSubMenu] = useState(false);

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
                <div className="sub-title">{playlist.title}</div>
                
                {playlist.title !== "Watch later" && (<>
                  <div><i class="fas fa-ellipsis-v-alt grey-text menu-btn" onClick={()=>{setSubMenu((val)=>!val)}}></i> 
                  <ul className={`sub-menu ${subMenu?"display-menu":"hide-menu"}`}>
                    <li>Delete</li>
                    <li>Rename</li>
                  </ul>
                  </div>
                 
                  </>
                  // <button
                  //   onClick={() => { deletePlaylistHandler(playlist.id)}}
                  // >
                  //   Delete Wishlist
                  // </button>
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
