import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";

// 👉 ADD THIS IMPORT
import ConfigGuard from "./components/ConfigGuard.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <ConfigGuard>
      <App />
    </ConfigGuard>
  </StrictMode>
);
