import { StrictMode } from "react";
import ReactDOM from "react-dom";
import { DataContextProvider } from "./Contexts/datacontext";
// import { RouteProvider, CurrVideoProvider } from "./routecontext";
import { PlaylistProvider } from "./Contexts/playlistcontext";
import { BrowserRouter as Router } from "react-router-dom";
import {AuthProvider} from "./Contexts/authcontext";

import App from "./App";

const rootElement = document.getElementById("root");
ReactDOM.render(
  <StrictMode>
    <Router>
      <AuthProvider>
        <PlaylistProvider>
          <DataContextProvider>
            <App />
          </DataContextProvider>
        </PlaylistProvider>
      </AuthProvider>
    </Router>
  </StrictMode>,
  rootElement
);
