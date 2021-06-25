import { useData } from "../../Contexts/datacontext";
import { Card } from "../Card/card";
import Loading from "../LoadingComponent/loading";

export const LikedVideos = () => {
  const { state, loading } = useData();
  return (
    <div>
      <h1>Liked Videos</h1>
      {loading?<Loading/>:
      <div className="videos-section">
        {state.liked.map(({video}) => {
          return <Card key={video.id} video={video} />;
        })}
      </div>}
    </div>
  );
};
