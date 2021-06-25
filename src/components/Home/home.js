import { useData } from "../../Contexts/datacontext";
import { HomeCard } from "./homeCard";
import Loading from "../LoadingComponent/loading";

export const Home = () => {

  const {videoData, loading} = useData();
  return (
    <div className="videos-section">
      {loading?<Loading/>:videoData.map((video) => {
        return <HomeCard key = {video.id} video={video} />;
      })}

    </div>
  );
};
