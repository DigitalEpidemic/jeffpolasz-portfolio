import { ChakraProvider } from "@chakra-ui/react";
import React from "react";
import { createRoot } from "react-dom/client";
import App from "./App";
import { NavbarProvider } from "./providers/NavbarProvider";

const container = document.getElementById("root");
const root = createRoot(container as HTMLElement);

root.render(
  <React.StrictMode>
    <ChakraProvider>
      <NavbarProvider>
        <App />
      </NavbarProvider>
    </ChakraProvider>
  </React.StrictMode>
);
