import React from "react";
import { render, screen } from "@testing-library/react";
import Hero from "./Hero";

it("renders Hero text", () => {
  const firstName = "Jeff";
  const lastName = "Polasz";
  const tagline = "I am a tagline!";

  render(
    <Hero
      backgroundImage="https://arlo-static-demo-dark.netlify.app/static/40a019176f85445c7910d98269bfbd0b/f3a00/bg-image-02.webp"
      profileImage="https://i.pravatar.cc/200"
      firstName={firstName}
      lastName={lastName}
      tagline={tagline}
    />
  );

  const firstNameElement = screen.getByText(firstName);
  const lastNameElement = screen.getByText(lastName);
  const taglineElement = screen.getByText(tagline);
  const profileImageElement = screen.getByRole("img", {
    name: "profile-picture",
  });
  const backgroundImageElement = screen.getByLabelText("hero-background-image");

  expect(firstNameElement).toBeInTheDocument();
  expect(lastNameElement).toBeInTheDocument();
  expect(taglineElement).toBeInTheDocument();
  expect(profileImageElement).toBeInTheDocument();
  expect(backgroundImageElement).toBeInTheDocument();
});
