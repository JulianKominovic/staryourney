import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";
import { createDir, exists } from "@tauri-apps/api/fs";
import { ASSETS_FOLDER } from "./const";

if (!(await exists(ASSETS_FOLDER))) {
  await createDir(ASSETS_FOLDER)
    .then(() => console.log("assets dir created"))
    .catch(console.error);
}

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
