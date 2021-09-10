import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import SeatContextProvider from "./components/Store/SeatContextProvider";

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <SeatContextProvider>
        <App />
      </SeatContextProvider>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById("root")
);
