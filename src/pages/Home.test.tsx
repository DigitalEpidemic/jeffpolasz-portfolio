import { ChakraProvider } from "@chakra-ui/react";
import { render, screen } from "@testing-library/react";
import { BrowserRouter } from "react-router";
import { Home } from "./Home";

describe("Home", () => {
  // TODO: Change for something real on the page
  it("renders Hello, World! text", () => {
    render(
      <ChakraProvider>
        <BrowserRouter>
          <Home />
        </BrowserRouter>
      </ChakraProvider>
    );

    const linkElement = screen.getByText(/hello, world!/i);
    expect(linkElement).toBeInTheDocument();
  });

  it("hides horizontal scrollbar", () => {
    render(
      <ChakraProvider>
        <BrowserRouter>
          <Home />
        </BrowserRouter>
      </ChakraProvider>
    );

    const homeContainer = screen.getByTestId("Home");
    expect(getComputedStyle(homeContainer).overflowX).toBe("hidden");
  });
});
