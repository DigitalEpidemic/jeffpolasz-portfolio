import {
  Box,
  ChakraProps,
  Collapse,
  Flex,
  Link,
  Stack,
  Text,
  useColorMode,
  useColorModeValue,
} from "@chakra-ui/react";
import { Link as RouterLink } from "react-router";
import { Link as ScrollLink } from "react-scroll";
import { NAV_ITEMS } from "../../data/navItems";
import { useNavbar } from "../../providers/NavbarProvider";
import DarkModeToggle from "./DarkModeToggle";
import Logo from "./Logo";
import MenuToggle from "./MenuToggle";

interface NavbarProps {
  sticky?: boolean;
}

const Navbar: React.FC<NavbarProps> = ({ sticky = false }) => {
  const { onToggle, isOpen } = useNavbar();
  const { colorMode, toggleColorMode } = useColorMode();

  const stickyStyle: ChakraProps = {
    position: "fixed",
    w: "100vw",
    zIndex: "200",
    top: "0",
  };

  return (
    <Box aria-label="Navigation Bar" {...(sticky ? { ...stickyStyle } : {})}>
      <Flex
        bg={useColorModeValue("white", "gray.800")}
        color={useColorModeValue("gray.600", "white")}
        minH={"60px"}
        py={2}
        px={4}
        borderBottom={1}
        borderStyle={"solid"}
        borderColor={useColorModeValue("gray.200", "gray.700")}
        align="center"
      >
        <Flex
          flex={1}
          align={"center"}
          justify={{ base: "start", md: "start" }}
        >
          <Logo logoText="Jeffrey Polasz" />
          <DesktopNav />
        </Flex>

        <Stack direction={"row"} spacing={7}>
          <DarkModeToggle
            colorMode={colorMode}
            toggleColorMode={toggleColorMode}
            isSwitch
          />
          <MenuToggle onToggle={onToggle} isOpen={isOpen} />
        </Stack>
      </Flex>

      <Collapse in={isOpen} animateOpacity>
        <MobileNavDropdown />
      </Collapse>
    </Box>
  );
};

const DesktopNav = () => {
  const { isAnimating } = useNavbar();
  const commonProps = {
    py: 2,
    px: { md: 1, lg: 2 },
    _hover: {
      color: useColorModeValue("black", "gray.200"),
      textDecoration: "none",
    },
  };

  return (
    <Flex display={{ base: "none", md: "flex" }} ml={{ md: 2, lg: 10 }}>
      <Stack direction={"row"} spacing={4}>
        {NAV_ITEMS.map((navItem) => {
          if (navItem.href === undefined) {
            return (
              <Link
                as={ScrollLink}
                key={navItem.label}
                to={navItem.label}
                spy={true}
                ignoreCancelEvents
                duration={400}
                smooth={"easeInOutQuint"}
                offset={-61}
                style={isAnimating ? { pointerEvents: "none" } : {}}
                {...commonProps}
              >
                {navItem.label}
              </Link>
            );
          } else {
            return (
              <Link
                as={RouterLink}
                key={navItem.label}
                to={navItem.href}
                {...commonProps}
              >
                {navItem.label}
              </Link>
            );
          }
        })}
      </Stack>
    </Flex>
  );
};

const MobileNavDropdown = () => {
  const { onClose } = useNavbar();

  return (
    <Stack
      bg={useColorModeValue("white", "gray.800")}
      pt={2}
      pb={4}
      display={{ md: "none" }}
    >
      {NAV_ITEMS.map((navItem) => {
        if (navItem.href === undefined) {
          return (
            <Stack key={navItem.label} spacing={4}>
              <Flex
                px={6}
                py={3}
                mt={-2}
                as={ScrollLink}
                to={navItem.label}
                spy={true}
                duration={400}
                smooth={"easeInOutQuint"}
                offset={-61}
                justify={"space-between"}
                align={"center"}
                onClick={onClose}
                _hover={{
                  background: useColorModeValue("gray.200", "gray.700"),
                  textDecoration: "none",
                }}
              >
                <Text
                  fontWeight={600}
                  color={useColorModeValue("gray.600", "gray.200")}
                >
                  {navItem.label}
                </Text>
              </Flex>
            </Stack>
          );
        } else {
          return (
            <Stack key={navItem.label} spacing={4}>
              <Flex
                px={6}
                py={3}
                mt={-2}
                as={RouterLink}
                to={navItem.href}
                justify={"space-between"}
                align={"center"}
                onClick={onClose}
                _hover={{
                  background: useColorModeValue("gray.200", "gray.700"),
                  textDecoration: "none",
                }}
              >
                <Text
                  fontWeight={600}
                  color={useColorModeValue("gray.600", "gray.200")}
                >
                  {navItem.label}
                </Text>
              </Flex>
            </Stack>
          );
        }
      })}
    </Stack>
  );
};

export default Navbar;
