import { useData } from "../../Contexts/datacontext";
import { HomeCard } from "./homeCard";

export const Home = () => {

  const {videoData} = useData();
  return (
    <div>
      {videoData.map((video) => {
        return <HomeCard key = {video.id} video={video} />;
      })}
    </div>
  );
};
