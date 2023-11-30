import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";

import App from "./App.jsx";

import AuthContextProvider from "./Contextos/AuthContext.jsx";
import DigitalesContextProvider from "./Contextos/ModuleContexts/DigitalesContext.jsx";
import HerramientasContextProvider from "./Contextos/ModuleContexts/HerramientasContext.jsx";

import "./components.css";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <AuthContextProvider>
      <HerramientasContextProvider>
        <DigitalesContextProvider>
          <BrowserRouter>
            <App />
          </BrowserRouter>
        </DigitalesContextProvider>
      </HerramientasContextProvider>
    </AuthContextProvider>
  </React.StrictMode>
);
