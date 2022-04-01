import { render, screen } from "@testing-library/react";
import React from "react";
import Logo from "./Logo";

it("renders Logo text", () => {
  const logoText = "Foobar";
  render(<Logo logoText={logoText} />);

  const linkElement = screen.getByText(logoText);
  expect(linkElement).toBeInTheDocument();
});
