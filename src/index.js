import { StrictMode } from "react";
import ReactDOM from "react-dom";
import { DataContextProvider } from "./Contexts/datacontext";
// import { RouteProvider, CurrVideoProvider } from "./routecontext";
import { PlaylistProvider } from "./Contexts/playlistcontext";
import { BrowserRouter as Router } from "react-router-dom";

import App from "./App";

const rootElement = document.getElementById("root");
ReactDOM.render(
  <StrictMode>
    <Router>
        <PlaylistProvider>
            <DataContextProvider>
              <App />
            </DataContextProvider>
        </PlaylistProvider>
    </Router>
  </StrictMode>,
  rootElement
);
