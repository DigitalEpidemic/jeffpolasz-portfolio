import { ChakraProvider } from "@chakra-ui/react";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { BrowserRouter } from "react-router";
import * as utils from "../common/utils";
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

    const downloadFileSpy = vi.fn();
    vi.spyOn(utils, "downloadFile").mockImplementation(downloadFileSpy);
    const linkElement = screen.getByText("Download Resume as .PDF");

    expect(linkElement).toBeInTheDocument();

    userEvent.click(linkElement);
    expect(utils.downloadFile).toHaveBeenCalled();
  });
});
