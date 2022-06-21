import React from "react";
import { Button, ColorMode, Flex, Switch } from "@chakra-ui/react";
import { BsFillMoonStarsFill, BsSunFill } from "react-icons/bs";
import moonsvg from "./images/moon.svg";
import sunsvg from "./images/sun.svg";

interface DarkModeToggleProps {
  colorMode: ColorMode;
  toggleColorMode: () => void;
  isSwitch?: boolean;
}

const DarkModeToggle: React.FC<DarkModeToggleProps> = ({
  colorMode,
  toggleColorMode,
  isSwitch = false,
}) => {
  return (
    <>
      {isSwitch ? (
        <Flex
          aria-label="Dark Mode Toggle"
          justify="center"
          align="center"
          pr={1}
        >
          <Switch
            sx={{
              ".chakra-switch__thumb": {
                background: `${colorMode === "dark" ? "gray.900" : "white"}`,
                backgroundImage: `url(${
                  colorMode === "dark" ? moonsvg : sunsvg
                }) !important`,
              },
              ".chakra-switch__track": {
                background: `${
                  colorMode === "dark"
                    ? "var(--chakra-colors-gray-700)"
                    : "var(--chakra-colors-gray-300)"
                } !important`,
              },
            }}
            size={"lg"}
            isChecked={colorMode === "dark"}
            onChange={toggleColorMode}
            id="dark-mode"
          />
        </Flex>
      ) : (
        <Button variant={"ghost"} onClick={toggleColorMode} bg={""}>
          {colorMode === "light" ? (
            <BsFillMoonStarsFill size={18} />
          ) : (
            <BsSunFill size={18} />
          )}
        </Button>
      )}
    </>
  );
};

export default DarkModeToggle;
