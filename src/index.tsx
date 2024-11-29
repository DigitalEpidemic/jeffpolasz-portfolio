import { ChakraProvider } from "@chakra-ui/react";
import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router";
import App from "./App";
import { NavbarProvider } from "./providers/NavbarProvider";

const container = document.getElementById("root");
const root = ReactDOM.createRoot(container as HTMLElement);

root.render(
  <React.StrictMode>
    <ChakraProvider>
      <NavbarProvider>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </NavbarProvider>
    </ChakraProvider>
  </React.StrictMode>
);
