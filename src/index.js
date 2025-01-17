import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";

// Expose the environment variable to the global scope
window.REACT_APP_USERID = process.env.REACT_APP_USERID;

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
