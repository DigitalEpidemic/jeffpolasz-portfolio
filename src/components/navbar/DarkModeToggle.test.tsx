import { render, screen } from "@testing-library/react";
import React from "react";
import DarkModeToggle from "./DarkModeToggle";
import moonSVG from "./images/moon.svg";
import sunSVG from "./images/sun.svg";

describe("DarkModeToggle", () => {
  it("renders toggle", () => {
    render(
      <DarkModeToggle
        isSwitch
        colorMode={"light"}
        toggleColorMode={() => {
          /* */
        }}
      />
    );

    const toggleElement = screen.getByLabelText("Dark Mode Toggle");

    expect(toggleElement).toBeInTheDocument();
  });

  it("renders moon icon when dark mode is set", () => {
    render(
      <DarkModeToggle
        isSwitch
        colorMode={"dark"}
        toggleColorMode={() => {
          /* */
        }}
      />
    );

    const toggleElement = screen.getByLabelText("Dark Mode Toggle");
    const switchThumbElement = toggleElement.firstChild?.lastChild?.firstChild;

    expect(switchThumbElement).toHaveStyle(`background-image: url(${moonSVG})`);
  });

  it("renders sun icon when light mode is set", () => {
    render(
      <DarkModeToggle
        isSwitch
        colorMode={"light"}
        toggleColorMode={() => {
          /* */
        }}
      />
    );

    const toggleElement = screen.getByLabelText("Dark Mode Toggle");
    const switchThumbElement = toggleElement.firstChild?.lastChild?.firstChild;

    expect(switchThumbElement).toHaveStyle(`background-image: url(${sunSVG})`);
  });
});
