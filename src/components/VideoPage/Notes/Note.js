import { useState } from "react";
import EditNote from "./editNote";
import { restApiCalls } from "../../../Contexts/Utilities/RestAPICalls";
import {useData} from "../../../Contexts/datacontext";
import {darkToast} from "../toast";


const Note = ({ note}) => {
  const [editMode, setEditMode] = useState(false);
  const {dispatch} = useData();

  const deleteNote = async() =>{
    darkToast("Deleting Toast...")
    const data = await restApiCalls("DELETE", `notes/${note.videoId}/${note.id}`);
    if(data.success){
      dispatch({type:"DELETE_NOTE", payload:note.id});
    }
  }

  return editMode ? (
    <EditNote note={note} editMode={editMode} setEditMode={setEditMode} />
  ) : (
    <div class="saved-note">
      <div class="note-header">
        <div className="note-title">{note.title}</div>
        <div>
          <button
            onClick={() => deleteNote(note.id)}
            className="note-btn note-sub"
          >
            <i class="fad fa-trash"></i>
          </button>
          <button
            onClick={() => setEditMode(true)}
            className="note-btn note-sub"
          >
            <i class="fad fa-edit"></i>
          </button>
        </div>
      </div>
      <div className="note-description">{note.description}</div>
    </div>
  );
};

export default Note;
