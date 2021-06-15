import { useData } from "../../Contexts/datacontext";
import { Card } from "../Card/card";
import Loading from "../LoadingComponent/loading";

export const History = () => {
  const { state , loading} = useData();
  console.log("final",state.history)
  return (
    <div className="utility-page">
      <h1>Watch History</h1>
      {loading?<Loading/>:
      <div className="video-content">
        {state.history.map(({video}) => {
          return <Card video={video} />;
        })}
      </div>}
    </div>
  );
};
