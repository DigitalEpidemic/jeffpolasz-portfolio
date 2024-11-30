import { ChakraProvider } from "@chakra-ui/react";
import { render, screen } from "@testing-library/react";
import { BrowserRouter } from "react-router";
import { Resume } from "./Resume";

describe("Resume", () => {
  it("renders download resume text", () => {
    render(
      <ChakraProvider>
        <BrowserRouter>
          <Resume />
        </BrowserRouter>
      </ChakraProvider>
    );

    const linkElement = screen.getByText("Download Resume as .PDF");
    expect(linkElement).toBeInTheDocument();
  });
});
