import { SideBar } from "./sidebar";
import { LikedVideos } from "./likedvideos";
import { Home } from "./home";
import { Latest } from "./latest";
import { Saved } from "./saved";
import { MyPlaylist } from "./myplaylist";
import { History } from "./history";
import { VideoPage } from "./videopage";
import { Routes, Route } from "react-router-dom";
import { ErrorPage } from "./erroepage";

export const MainSection = ({ ...props }) => {
  return (
    <div className="main">
      <SideBar className="sidebar" {...props} />
      <div className="main-content">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/latest" element={<Latest />} />
          <Route path="/saved" element={<Saved />} />
          <Route path="/my-playlist" element={<MyPlaylist />} />
          <Route path="/liked-videos" element={<LikedVideos />} />
          <Route path="/history" element={<History />} />
          <Route path="/video/:videoId" element={<VideoPage />} />
          <Route path="/*" element={<ErrorPage />} />
        </Routes>
      </div>
    </div>
  );
};
