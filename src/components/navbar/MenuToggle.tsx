import React from "react";
import { Flex, IconButton } from "@chakra-ui/react";
import { GrClose, GrMenu } from "react-icons/gr";

interface HamburgerMenuProps {
  onToggle: () => void;
  isOpen: boolean;
}

const HamburgerMenu: React.FC<HamburgerMenuProps> = ({ onToggle, isOpen }) => {
  return (
    <Flex mr={2} display={{ base: "auto", md: "none" }}>
      <IconButton
        onClick={onToggle}
        icon={isOpen ? <GrClose /> : <GrMenu />}
        variant={"ghost"}
        aria-label={"Toggle Navigation"}
      />
    </Flex>
  );
};

export default HamburgerMenu;
