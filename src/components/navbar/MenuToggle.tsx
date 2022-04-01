import React from "react";
import { Flex, IconButton, useColorModeValue } from "@chakra-ui/react";
import { MdClose, MdMenu } from "react-icons/md";

interface MenuToggleProps {
  onToggle: () => void;
  isOpen: boolean;
}

const MenuToggle: React.FC<MenuToggleProps> = ({ onToggle, isOpen }) => {
  return (
    <Flex mr={2} display={{ base: "auto", md: "none" }}>
      <IconButton
        onClick={onToggle}
        icon={
          isOpen ? (
            <MdClose size={24} color={useColorModeValue("black", "white")} />
          ) : (
            <MdMenu size={24} color={useColorModeValue("black", "white")} />
          )
        }
        variant={"ghost"}
        aria-label={"Toggle Navigation"}
      />
    </Flex>
  );
};

export default MenuToggle;
