import { SideBar } from "./sidebar";
import { LikedVideos } from "../LikedVideos/likedvideos";
import { Home } from "../Home/home";
import { Latest } from "../Latest/latest";
import { Saved } from "../Saved/saved";
import { MyPlaylist } from "../MyPlaylist/myplaylist";
import { History } from "../History/history";
import { VideoPage } from "../VideoPage/videopage";
import { Routes, Route } from "react-router-dom";
import { ErrorPage } from "../erroepage";

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
