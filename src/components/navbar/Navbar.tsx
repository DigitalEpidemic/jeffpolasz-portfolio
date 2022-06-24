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
  return (
    <Flex display={{ base: "none", md: "flex" }} ml={{ md: 2, lg: 10 }}>
      <Stack direction={"row"} spacing={4}>
        {NAV_ITEMS.map((navItem) => (
          <Link
            as={ScrollLink}
            key={navItem.label}
            to={navItem.label}
            spy={true}
            ignoreCancelEvents
            duration={400}
            smooth={"easeInOutQuint"}
            offset={-61}
            py={2}
            px={{ md: 1, lg: 2 }}
            _hover={{
              color: useColorModeValue("black", "gray.200"),
              textDecoration: "none",
            }}
          >
            {navItem.label}
          </Link>
        ))}
      </Stack>
    </Flex>
  );
};

const MobileNavDropdown = () => {
  return (
    <Stack
      bg={useColorModeValue("white", "gray.800")}
      pt={2}
      pb={4}
      display={{ md: "none" }}
    >
      {NAV_ITEMS.map((navItem) => (
        <MobileNavItem key={navItem.label} {...navItem} />
      ))}
    </Stack>
  );
};

const MobileNavItem: React.FC<NavItemProps> = ({ label, children, href }) => {
  const { onClose } = useNavbar();

  return (
    <Stack spacing={4}>
      <Flex
        px={6}
        py={3}
        mt={-2}
        as={ScrollLink}
        to={label}
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
          {label}
        </Text>
      </Flex>
    </Stack>
  );
};

export interface NavItemProps {
  label: string;
  subLabel?: string;
  children?: Array<NavItemProps>;
  href: string;
}

export default Navbar;
