import { useReducer } from "react";
import { restApiCalls } from "../../../Contexts/Utilities/RestAPICalls";
import {useData} from "../../../Contexts/datacontext";
import {darkToast} from "../toast";

const initialNoteState = {
  id: "",
  videoId: "",
  title: "",
  description: ""
};

const noteReducer = (state, { type, payload }) => {
  switch (type) {
    case "SET_ID":
      return { ...state, _id: payload };

    case "SET_TITLE":
      return { ...state, title: payload, id: 5 };

    case "SET_DESCRIPTION":
      return { ...state, description: payload };

    case "CLEAR_FIELDS":
      return { initialNoteState };

    default:
      return state;
  }
};

const EditNote = ({ note = initialNoteState, videoId, editMode=false, setEditMode }) => {

  const [noteState, noteDispatch] = useReducer(noteReducer, note);
  const {dispatch} = useData();

  const addNote = async(noteState) => {
    darkToast("Adding Toast...");
    const data = await restApiCalls("POST", `notes/${videoId}`, {title: noteState.title, description: noteState.description});
    if(data.success){
      dispatch({type:"ADD_NOTE", payload: data.response});
    }
   
  };

  const updateNote = async(noteState) =>{
    darkToast("Updating Toast...")
    const data = await restApiCalls("POST", `notes/${videoId}/${note.id}`, {title: noteState.title, description: noteState.description});
    if(data.success){
      dispatch({type:"UPDATE_NOTE", payload: data.response});
      setEditMode(false);
    }
  }

  return (
    <div className="notes-div">
      <div>
        <input
          placeholder="Title"
          value={noteState.title}
          onChange={(event) =>
            noteDispatch({ type: "SET_TITLE", payload: event.target.value })
          }
        />
        <button
          onClick={() => {editMode ? updateNote(noteState): addNote(noteState);
          }}
          className="note-btn"
        >
          <i class="fad fa-plus-circle"></i>
        </button>
      </div>
      <textarea
        placeholder="Description"
        value={noteState.description}
        onChange={(event) => {
          noteDispatch({
            type: "SET_DESCRIPTION",
            payload: event.target.value
          });
        }}
      />
    </div>
  );
};

export default EditNote;
