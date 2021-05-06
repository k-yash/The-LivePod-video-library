import { StrictMode } from "react";
import ReactDOM from "react-dom";
import { DataContextProvider } from "./datacontext";
import { RouteProvider, CurrVideoProvider } from "./routecontext";
import { PlaylistProvider } from "./playlistcontext";
import { BrowserRouter as Router } from "react-router-dom";

import App from "./App";

const rootElement = document.getElementById("root");
ReactDOM.render(
  <StrictMode>
    <Router>
      <RouteProvider>
        <PlaylistProvider>
          <CurrVideoProvider>
            <DataContextProvider>
              <App />
            </DataContextProvider>
          </CurrVideoProvider>
        </PlaylistProvider>
      </RouteProvider>
    </Router>
  </StrictMode>,
  rootElement
);
