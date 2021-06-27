export const dataReducer = (state, action) => {
    switch (action.type) {
      case "SET":
        return(state= {...state, [action.payload.name]:action.payload.data});

      case "ADD_TO_SAVED_VIDEOS":

        return (state = { ...state, saved: [...state.saved, {video:action.payload}] });

      case "REMOVE_FROM_SAVED_VIDEOS":
        return (state = {
          ...state,
          saved: state.saved.filter(({video}) => video.videoId !== action.payload.videoId)
        });
  
      case "ADD_TO_LIKED_VIDEOS":

        return (state = { ...state, liked: [...state.liked, {video: action.payload}] });

      case "REMOVE_FROM_LIKED_VIDEOS":
        return (state = {
          ...state,
          liked: state.liked.filter(({video}) => video.videoId !== action.payload.videoId)
        });

      case "ADD_NOTE":
        return (state = {...state, notes: [...state.notes, action.payload]});
        
      case "UPDATE_NOTE":
        return (state = {...state, notes: state.notes.map((note)=> note.id === action.payload.id? action.payload: note)});
        
      case "DELETE_NOTE":
        return (state = {...state, notes: state.notes.filter((note)=>note.id !== action.payload)});  

      case "ADD_HISTORY":
        return (state = {
          ...state,
          history: [{video: action.payload}, ...state.history]
        });
  
      default:
        break;
    }
  };