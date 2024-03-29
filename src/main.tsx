import React from "react";
import { createRoot } from "react-dom/client";

import { App } from "./app/app.component";

import "./style.css";

const root = createRoot(document.getElementById("app")!);
root.render(<App />);
