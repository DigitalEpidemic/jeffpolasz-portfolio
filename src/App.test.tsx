import React from "react";
import { render, screen } from "@testing-library/react";
import App from "./App";

it("renders Hello, World! text", () => {
  render(<App />);

  const linkElement = screen.getByText(/hello, world!/i);
  expect(linkElement).toBeInTheDocument();
});
