import { useData } from "../../Contexts/datacontext";
import { Card } from "../Card/card";
export const Saved = () => {
  const { state } = useData();
  return (
    <div className="utility-page">
      <h1>Saved Videos</h1>
      <div className="video-content">
        {state.saved.map(({video}) => {
          return <Card video={video} />;
        })}
      </div>
    </div>
  );
};
