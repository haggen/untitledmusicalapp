import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

import { App } from "~/src/components/App";

const element = document.getElementById("root");

if (!element) {
  throw new Error("Root element is missing");
}

const root = createRoot(element);

root.render(
  <StrictMode>
    <App />
  </StrictMode>,
);
