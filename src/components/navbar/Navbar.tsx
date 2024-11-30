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

const NavItem = ({
  label,
  href,
  isMobile = false,
  onClick,
  isAnimating,
}: {
  label: string;
  href?: string;
  isMobile?: boolean;
  onClick?: () => void;
  isAnimating?: boolean;
}) => {
  const commonProps = {
    py: isMobile ? 3 : 2,
    px: isMobile ? 6 : { md: 1, lg: 2 },
    mt: isMobile ? -2 : 0,
    justify: isMobile ? "space-between" : undefined,
    fontWeight: isMobile ? 600 : undefined,
    color: useColorModeValue(
      isMobile ? "gray.600" : "inherit",
      isMobile ? "gray.200" : "inherit"
    ),
    _hover: {
      background: isMobile
        ? useColorModeValue("gray.200", "gray.700")
        : undefined,
      textDecoration: "none",
      color: useColorModeValue("black", "gray.200"),
    },
  };

  if (!href) {
    return (
      <Link
        as={ScrollLink}
        to={label}
        spy
        duration={400}
        smooth={"easeInOutQuint"}
        offset={-61}
        ignoreCancelEvents
        onClick={onClick}
        style={isAnimating ? { pointerEvents: "none" } : undefined}
        {...commonProps}
      >
        {label}
      </Link>
    );
  }

  return (
    <Link as={RouterLink} to={href} {...commonProps}>
      {label}
    </Link>
  );
};

const DesktopNav = () => {
  const { isAnimating } = useNavbar();

  return (
    <Flex display={{ base: "none", md: "flex" }} ml={{ md: 2, lg: 10 }}>
      <Stack direction={"row"} spacing={4}>
        {NAV_ITEMS.map((navItem) => (
          <NavItem
            key={navItem.label}
            label={navItem.label}
            href={navItem.href}
            isAnimating={isAnimating}
          />
        ))}
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
      <Stack>
        {NAV_ITEMS.map((navItem) => (
          <NavItem
            label={navItem.label}
            href={navItem.href}
            isMobile
            onClick={onClose}
          />
        ))}
      </Stack>
    </Stack>
  );
};

export default Navbar;
