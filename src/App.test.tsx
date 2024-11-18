import { ChakraProvider } from "@chakra-ui/react";
import { render, screen } from "@testing-library/react";
import App from "./App";

describe("App", () => {
  it("renders Hello, World! text", () => {
    render(
      <ChakraProvider>
        <App />
      </ChakraProvider>
    );

    const linkElement = screen.getByText(/hello, world!/i);
    expect(linkElement).toBeInTheDocument();
  });
});

it("hides horizontal scrollbar", () => {
  render(
    <ChakraProvider>
      <App />
    </ChakraProvider>
  );

  const app = screen.getByTestId("App");
  expect(getComputedStyle(app).overflowX).toBe("hidden");
});
