import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { ChakraProvider } from "@chakra-ui/react";
import { NavbarProvider } from "./providers/NavbarProvider";

// TODO: Create custom theme + dark mode toggle
ReactDOM.render(
  <React.StrictMode>
    <ChakraProvider>
      <NavbarProvider>
        <App />
      </NavbarProvider>
    </ChakraProvider>
  </React.StrictMode>,
  document.getElementById("root")
);
