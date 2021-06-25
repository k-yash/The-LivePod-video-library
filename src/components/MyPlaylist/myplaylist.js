import "./myplaylist.css";
import { usePlaylist } from "../../Contexts/playlistcontext";
import { Card } from "../Card/card";
import { restApiCalls } from "../../Contexts/Utilities/RestAPICalls";
import { useAuth } from "../../Contexts/authcontext";
import { useData } from "../../Contexts/datacontext";
import Loading from "../LoadingComponent/loading";
import { useState } from "react";


const SubMenu = (playlist) =>{
  const {dispatchPlaylist } = usePlaylist();
  const {userId} = useAuth();
  // const [subMenu, setSubMenu] = useState(false);
 

  const deletePlaylistHandler = async(playlistId) =>{
    // setSubMenu((val)=>false);
    const response = await restApiCalls("DELETE", `playlist/${playlistId}`)
    if(response.success){
      dispatchPlaylist({ type: "DELETE_PLAYLIST", payload: playlistId });
    }
    
  }
  return(
  <div>
    {/* <i class="fas fa-ellipsis-v-alt grey-text menu-btn" onClick={()=>{setSubMenu((val)=>!val)}}></i>  */}
    <i onClick={()=>{deletePlaylistHandler(playlist.id)}} class="fas fa-trash grey-text trash-can"></i>
    {/* <ul className={`sub-menu ${subMenu?"display-menu":"hide-menu"}`}>
      <li >Delete Playlist</li>
      <li>Rename</li>
    </ul> */}
  </div>
  )
}


export const MyPlaylist = () => {
  const { state, dispatchPlaylist } = usePlaylist();
  const {loading} = useData();


  return (
    <div className="utility-page">
      <h1>My Playlist</h1>
      {loading?<Loading/>:<div>
        {state.MyPlaylists.map((playlist) => {
          return (
            <div className="playlists-div">
              <div className="header">
                <div className="sub-title">{playlist.title}</div>
                {playlist.title !== "Watch later" && (<SubMenu key={playlist.id} {...playlist}/> )}
              </div>
              <div className="videos-section">
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
