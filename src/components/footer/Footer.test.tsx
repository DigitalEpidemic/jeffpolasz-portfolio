import { render, screen } from "@testing-library/react";
import React from "react";
import Footer, { SocialIcon } from "./Footer";

describe("Footer", () => {
  it("renders SocialIcon text", () => {
    const socialIconText = "AmIRendered?";
    render(<SocialIcon href="#" label={socialIconText} />);

    const linkElement = screen.getByRole("link", { name: socialIconText });
    expect(linkElement).toBeInTheDocument();
  });

  it("renders current year on Footer", () => {
    render(<Footer />);

    const linkElement = screen.getByText(
      new RegExp(`${new Date().getFullYear()}`)
    );
    expect(linkElement).toBeInTheDocument();
  });
});
