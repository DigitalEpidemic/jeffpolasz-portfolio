import { ChakraProvider } from "@chakra-ui/react";
import { render, screen } from "@testing-library/react";
import Logo from "./Logo";

describe("Logo", () => {
  it("renders Logo text", () => {
    const logoText = "Foobar";
    render(
      <ChakraProvider>
        <Logo logoText={logoText} />
      </ChakraProvider>
    );

    const linkElement = screen.getByText(logoText);
    expect(linkElement).toBeInTheDocument();
  });
});
