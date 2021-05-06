import { createContext, useContext, useReducer, useState } from "react";
import {data} from "../data";
import {dataReducer} from "../Reducres/dataReducer";

export const DataContext = createContext();


export const DataContextProvider = ({ children }) => {

  const [videoData, setVedioData] = useState(data);

  const [state, dispatch] = useReducer(dataReducer, {
    latest: [],
    saved: [],
    playlist: [],
    liked: [],
    history: []
  });

  const onSearchData = (event) => {
    const filterData = data.filter((item) => {
      return item.name.toLowerCase().includes(event.target.value.toLowerCase());
    });
    setVedioData(filterData);
    
  };

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
      value={{ state, dispatch, ifPresentInSaved, ifPresentInLikeVideos, videoData, setVedioData, onSearchData }}
    >
      {children}
    </DataContext.Provider>
  );
};

export const useData = () => {
  return useContext(DataContext);
};
