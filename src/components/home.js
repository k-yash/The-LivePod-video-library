import { data } from "../data";
import { Card } from "./card";

export const Home = () => {
  return (
    <div>
      {data.map((video) => {
        return <Card video={video} />;
      })}
    </div>
  );
};
