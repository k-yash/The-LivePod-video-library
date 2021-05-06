import { createContext, useContext, useReducer } from "react";
// import {data} from "../data";

export const DataContext = createContext();

const dataReducer = (state, action) => {
  switch (action.type) {
    case "ADD_TO_SAVED_VIDEOS":
      // if(ifPresentInSaved()){
      return (state = { ...state, saved: [...state.saved, action.payload] });
    // return state;
    // break;
    case "REMOVE_FROM_SAVED_VIDEOS":
      return (state = {
        ...state,
        saved: state.saved.filter((video) => video.id !== action.payload.id)
      });

    case "ADD_TO_LIKED_VIDEOS":
      // if(ifPresentInSaved()){
      return (state = { ...state, liked: [...state.liked, action.payload] });
    // return state;
    // break;
    case "REMOVE_FROM_LIKED_VIDEOS":
      return (state = {
        ...state,
        liked: state.liked.filter((video) => video.id !== action.payload.id)
      });
    // break;
    case "ADD_HISTORY":
      return (state = {
        ...state,
        history: [action.payload, ...state.history]
      });
    // break;

    default:
      break;
  }
};

export const DataContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(dataReducer, {
    latest: [],
    saved: [],
    playlist: [],
    liked: [],
    history: []
  });

  const ifPresentInSaved = (id) => {
    const val = state.saved.some((video) => video.id === id);
    return val;
  };

  const ifPresentInLikeVideos = (id) => {
    const val = state.liked.some((video) => video.id === id);
    return val;
  };

  return (
    <DataContext.Provider
      value={{ state, dispatch, ifPresentInSaved, ifPresentInLikeVideos }}
    >
      {children}
    </DataContext.Provider>
  );
};

export const useData = () => {
  return useContext(DataContext);
};
