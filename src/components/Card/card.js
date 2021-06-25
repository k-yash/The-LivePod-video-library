import { Thumbnail } from "./thumbnail";
import { Link } from "react-router-dom";
import { useData } from "../../Contexts/datacontext";
import {restApiCalls} from "../../Contexts/Utilities/RestAPICalls";
import { useAuth } from "../../Contexts/authcontext";

export const Card = ({ video }) => {
  const { dispatch } = useData();
  const {userId} = useAuth();

  const addToHistoryHandler = async() =>{
    const response = await restApiCalls("POST", `history`, {videoId:video.id});
    if(response.success){
      dispatch({ type: "ADD_HISTORY", payload: video });
    }
  }

  return (
    <>
      <Link style={{ textDecoration: "none" }} to={`/video/${video.videoId}`}>
        <div
          className="card"
          onClick={() => { addToHistoryHandler()}}
        >
          <Thumbnail id={video.videoId} />
          <div className="card-content">
            <img
              className="avatar"
              src="https://yt3.ggpht.com/ytc/AAUvwnhpNjTTcnunYN6sA0COpo4a1XScMe9cTeP-45fPzw=s176-c-k-c0x00ffffff-no-rj"
              alt=""
              srcSet=""
            />
            <div className="card-description">
              <div style={{ color: "white", fontSize:"1rem" }}>{video.name}</div>
              <p className="grey-text">{video.creator}</p>
            </div>
          </div>
        </div>
      </Link>
    </>
  );
};

// export const HorizontalCard = ({ video }) => {
//   const { setRoute } = useRoute();
//   const { setCurrent } = useCurrVideo();
//   const { dispatch } = useData();

//   const playMyhVideo = () => {
//     dispatch({ type: "ADD_HISTORY", payload: video });
//     setCurrent(video);
//     setRoute("VideoPage");
//   };

//   return (
//     <>
//       <div
//         clasName="h-card"
//         onClick={() => {
//           playMyhVideo();
//         }}
//       >
//         <Thumbnail id={video.videoId} />
//         <div className="card-content">
//           <div className="card-description">
//             <h4>{video.name}</h4>
//             <p className="grey-text">{video.creator}</p>
//           </div>
//         </div>
//       </div>
//     </>
//   );
// };
