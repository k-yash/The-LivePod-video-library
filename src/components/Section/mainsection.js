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
import { Signup} from "../signIn/signup";
import { Login } from "../signIn/login";
import {PrivateRoute} from "../privateRoute";

export const MainSection = ({ ...props }) => {
  return (
    <div className="main">
      <SideBar className="sidebar" {...props} />
      <div className="main-content">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/latest" element={<Latest />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/video/:videoId" element={<VideoPage />} />
          <PrivateRoute path="/saved" element={<Saved />} />
          <PrivateRoute path="/my-playlist" element={<MyPlaylist />} />
          <PrivateRoute path="/liked-videos" element={<LikedVideos />} />
          <PrivateRoute path="/history" element={<History />} />
          <Route path="/*" element={<ErrorPage />} />
        </Routes>
      </div>
    </div>
  );
};
