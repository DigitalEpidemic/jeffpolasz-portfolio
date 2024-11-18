import { ChakraProvider } from "@chakra-ui/react";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Navbar from "./Navbar";

it("renders Navbar at 100vw width", () => {
  render(
    <ChakraProvider>
      <Navbar sticky />
    </ChakraProvider>
  );

  const menuButton = screen.getByRole("button", { name: "Toggle Navigation" });
  const navbar = screen.getByLabelText("Navigation Bar");
  userEvent.click(menuButton);

  expect(getComputedStyle(navbar).width).toBe("100vw");
});
