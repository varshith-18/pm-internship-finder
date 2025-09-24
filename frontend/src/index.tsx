import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import "./styles/style.css";
import App from "./App";// keep as './App', no extension
import reportWebVitals from "./reportWebVitals.ts";

const rootElement = document.getElementById("root");

if (rootElement) {
  const root = ReactDOM.createRoot(rootElement);
  root.render(
    <React.StrictMode>
      <App />
    </React.StrictMode>
  );
}

// Optional: measure performance
reportWebVitals();
