import { useData } from "../../Contexts/datacontext";
import { Card } from "../Card/card";
import Loading from "../LoadingComponent/loading";

export const History = () => {
  const { state , loading} = useData();
  console.log("final",state.history)
  return (
    <div >
      <h1>Watch History</h1>
      {loading?<Loading/>:
      <div className="videos-section">
        {state.history.map(({video}) => {
          return <Card video={video} />;
        })}
      </div>}
    </div>
  );
};
