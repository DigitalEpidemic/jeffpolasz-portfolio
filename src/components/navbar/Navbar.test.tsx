import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import React from "react";
import Navbar from "./Navbar";

it("renders Navbar at 100vw width", () => {
  render(<Navbar sticky />);

  const menuButton = screen.getByRole("button", { name: "Toggle Navigation" });
  const navbar = screen.getByLabelText("navbar");
  userEvent.click(menuButton);

  expect(getComputedStyle(navbar).width).toBe("100vw");
});
