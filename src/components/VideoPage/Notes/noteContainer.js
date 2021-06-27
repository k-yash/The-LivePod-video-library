import "./notesStyles.css";
import EditNote from "./editNote";
import Note from "./Note";
import { useData } from "../../../Contexts/datacontext";
import { useState, useEffect } from "react";
import { restApiCalls } from "../../../Contexts/Utilities/RestAPICalls";

const notess = [
  { id: 1, title: "Hello all", description: "he is a nice guy" },
  { id: 2, title: "how are you?", description: "Fine thank you!" }
];

const NoteContainer = ({videoId}) => {
  const { state , loading, dispatch} = useData();

  useEffect(()=>{
    (async ()=>{
      const data = await restApiCalls("GET", `notes/${videoId}`)
      if(data){
        dispatch({type:"SET", payload:{name: "notes", data:data.response}})
      }
    })()

    return () =>{
      dispatch({type:"SET", payload:{name: "notes", data:[]}})
    }
  },[videoId])


  const [notes, setNotes] = useState(notess);



  const removeNote = (id) => {
    setNotes(notes.filter((note) => note.id !== id));
  };

  console.log(state.notes)

  return (
    <>
      <h2 style={{color:"white"}}>Notes..</h2>
      <EditNote videoId={videoId} />
      <div>
        {state.notes.map((note) => {
          return <Note note={note} removeNote={removeNote} />;
        })}
      </div>
    </>
  );
};

export default NoteContainer;
