import { useData } from "../../Contexts/datacontext";
import { Card } from "../Card/card";

export const Home = () => {

  const {videoData} = useData();

  return (
    <div>
      {videoData.map((video) => {
        return <Card video={video} />;
      })}
    </div>
  );
};
