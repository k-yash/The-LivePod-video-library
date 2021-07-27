import "./notesStyles.css";
import EditNote from "./editNote";
import Note from "./Note";
import logo from "./notesLogin.png";
import { useData } from "../../../Contexts/datacontext";
import { useAuth } from "../../../Contexts/authcontext";
import { useEffect } from "react";
import { restApiCalls } from "../../../Contexts/Utilities/RestAPICalls";
import {infoToast} from "../toast";




const NoteContainer = ({videoId}) => {
  const { state , loading, dispatch, setLoading} = useData();
  const {isUserLogIn} = useAuth();

  useEffect(()=>{
    // setLoading(true);
    (async ()=>{
      const data = await restApiCalls("GET", `notes/${videoId}`);
      console.log(data);
      if(data){
        dispatch({type:"SET", payload:{name: "notes", data:data.response}})
      }
    })()

    return () =>{
      dispatch({type:"SET", payload:{name: "notes", data:[]}})
    }
  },[videoId])

  return (
 <>
     { isUserLogIn? <div>
      <h2 style={{color:"white"}}>Notes..</h2>
      <EditNote videoId={videoId} />
      <div>
        {state.notes.map((note) => {
          return <Note note={note} />;
        })}
      </div>
      </div>:
      <div className="Login-notes">
        <img src={logo} alt=""
            srcSet=""/>
          <button onClick={()=>infoToast("Login to add Notes!")}>Add Notes</button>
      
      </div>
      }
    </>
  );
};

export default NoteContainer;
