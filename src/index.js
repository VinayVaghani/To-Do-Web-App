import React from "react";
import { createRoot } from "react-dom/client";
import App from "./App";

// Import Bootstrap CSS (must come before your custom CSS)
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

const container = document.getElementById("root");
const root = createRoot(container);
root.render(<App />);
