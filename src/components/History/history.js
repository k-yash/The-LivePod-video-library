import { useData } from "../../Contexts/datacontext";
import { Card } from "../Card/card";

export const History = () => {
  const { state } = useData();
  return (
    <div className="utility-page">
      <h1>Watch History</h1>
      <div className="video-content">
        {state.history.map((video) => {
          return <Card video={video} />;
        })}
      </div>
    </div>
  );
};
