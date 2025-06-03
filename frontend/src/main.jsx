import React from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { AppContextPovider } from "./context/AppContext.jsx";
import { BrowserRouter } from "react-router-dom";

// Import your Publishable Key

createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <AppContextPovider>
      <App />
    </AppContextPovider>
  </BrowserRouter>
);
