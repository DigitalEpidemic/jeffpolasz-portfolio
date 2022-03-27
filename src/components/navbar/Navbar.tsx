import { Box, Flex, useColorModeValue, useDisclosure } from "@chakra-ui/react";
import Logo from "./Logo";
import MenuToggle from "./MenuToggle";

const Navbar = () => {
  const { onToggle, isOpen } = useDisclosure();
  return (
    <Box>
      <Flex
        bg={useColorModeValue("white", "gray.800")}
        color={useColorModeValue("gray.600", "white")}
        minH={"60px"}
        py={{ base: 2 }}
        px={{ base: 4 }}
        borderBottom={1}
        borderStyle={"solid"}
        borderColor={useColorModeValue("gray.200", "gray.900")}
        align="center"
      >
        <Logo logoText="Jeffrey Polasz" />
        <MenuToggle onToggle={onToggle} isOpen={isOpen} />
      </Flex>
    </Box>
  );
};

export default Navbar;
