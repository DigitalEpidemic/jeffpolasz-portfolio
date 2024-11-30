import { ChakraProvider } from "@chakra-ui/react";
import { render, screen } from "@testing-library/react";
import { BrowserRouter } from "react-router";
import Logo from "./Logo";

describe("Logo", () => {
  it("renders Logo text", () => {
    const logoText = "Foobar";
    render(
      <ChakraProvider>
        <BrowserRouter>
          <Logo logoText={logoText} />
        </BrowserRouter>
      </ChakraProvider>
    );

    const linkElement = screen.getByText(logoText);
    expect(linkElement).toBeInTheDocument();
  });
});
