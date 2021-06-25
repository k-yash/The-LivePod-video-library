import { useData } from "../../Contexts/datacontext";
import { Card } from "../Card/card";
import Loading from "../LoadingComponent/loading";

export const Saved = () => {
  const { state, loading } = useData();
  return (
    <div className="main-div">
      <h1>Saved Videos</h1>
      {loading?<Loading/>:
      <div className="videos-section">
        {state.saved.map(({video}) => {
          return <Card key={video.id} video={video} />;
        })}
      </div>}
    </div>
  );
};
