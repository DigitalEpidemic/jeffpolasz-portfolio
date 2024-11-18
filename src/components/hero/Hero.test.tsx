import { ChakraProvider } from "@chakra-ui/react";
import { render, screen } from "@testing-library/react";
import Hero from "./Hero";

describe("Hero", () => {
  it("renders Hero text", () => {
    const firstName = "Jeff";
    const lastName = "Polasz";
    const tagline = "I am a tagline!";
    const actionText = "Do Something Cool";

    render(
      <ChakraProvider>
        <Hero
          backgroundImage="https://arlo-static-demo-dark.netlify.app/static/40a019176f85445c7910d98269bfbd0b/f3a00/bg-image-02.webp"
          profileImage="https://i.pravatar.cc/200"
          firstName={firstName}
          lastName={lastName}
          tagline={tagline}
          actionText={actionText}
        />
      </ChakraProvider>
    );

    const firstNameElement = screen.getByText(firstName);
    const lastNameElement = screen.getByText(lastName);
    const taglineElement = screen.getByText(tagline);
    const profileImageElement = screen.getByRole("img", {
      name: "profile-picture",
    });
    const backgroundImageElement = screen.getByLabelText(
      "hero-background-image"
    );
    const actionButtonElement = screen.getByRole("button", {
      name: actionText,
    });

    expect(firstNameElement).toBeInTheDocument();
    expect(lastNameElement).toBeInTheDocument();
    expect(taglineElement).toBeInTheDocument();
    expect(profileImageElement).toBeInTheDocument();
    expect(backgroundImageElement).toBeInTheDocument();
    expect(actionButtonElement).toBeInTheDocument();
  });

  it("does not render Action Button when no prop is passed", () => {
    render(
      <ChakraProvider>
        <Hero
          backgroundImage=""
          profileImage=""
          firstName=""
          lastName=""
          tagline=""
        />
      </ChakraProvider>
    );

    const actionButtonElement = screen.queryByRole("button");

    expect(actionButtonElement).not.toBeInTheDocument();
  });
});
