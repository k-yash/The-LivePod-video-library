export const dataReducer = (state, action) => {
    switch (action.type) {
      case "ADD_TO_SAVED_VIDEOS":

        return (state = { ...state, saved: [...state.saved, action.payload] });

      case "REMOVE_FROM_SAVED_VIDEOS":
        return (state = {
          ...state,
          saved: state.saved.filter((video) => video.id !== action.payload.id)
        });
  
      case "ADD_TO_LIKED_VIDEOS":

        return (state = { ...state, liked: [...state.liked, action.payload] });

      case "REMOVE_FROM_LIKED_VIDEOS":
        return (state = {
          ...state,
          liked: state.liked.filter((video) => video.id !== action.payload.id)
        });

      case "ADD_HISTORY":
        return (state = {
          ...state,
          history: [action.payload, ...state.history]
        });
  
      default:
        break;
    }
  };