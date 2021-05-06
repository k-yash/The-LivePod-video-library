import { useData } from "../datacontext";
import { Card } from "./card";

export const LikedVideos = () => {
  const { state } = useData();
  return (
    <div className="utility-page">
      <h1>Liked Videos</h1>
      <div className="video-content">
        {state.liked.map((video) => {
          return <Card video={video} />;
        })}
      </div>
    </div>
  );
};
