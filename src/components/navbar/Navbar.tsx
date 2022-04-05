import {
  Box,
  Button,
  ChakraProps,
  Collapse,
  ColorMode,
  Flex,
  FormLabel,
  Link,
  Stack,
  Switch,
  Text,
  useColorMode,
  useColorModeValue,
  useDisclosure,
} from "@chakra-ui/react";
import { BsFillMoonStarsFill, BsSunFill } from "react-icons/bs";
import Logo from "./Logo";
import MenuToggle from "./MenuToggle";

interface NavbarProps {
  sticky?: boolean;
}

const Navbar: React.FC<NavbarProps> = ({ sticky = false }) => {
  const { onToggle, isOpen } = useDisclosure();
  const { colorMode, toggleColorMode } = useColorMode();

  const stickyStyle: ChakraProps = {
    position: "fixed",
    w: "100%",
    zIndex: "200",
    top: "0",
  };

  return (
    <Box {...(sticky ? { ...stickyStyle } : {})}>
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
        <Flex justify="center" align="center">
          <FormLabel htmlFor="dark-mode" my={0} fontSize={"sm"}>
            Dark Mode?
          </FormLabel>
          <Switch
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

const DesktopNav = () => {
  return (
    <Flex display={{ base: "none", md: "flex" }} ml={{ md: 2, lg: 10 }}>
      <Stack direction={"row"} spacing={4}>
        {NAV_ITEMS.map((navItem) => (
          <Link
            key={navItem.label}
            py={2}
            px={{ md: 1, lg: 2 }}
            href={navItem.href ?? "#"}
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
  const { onToggle } = useDisclosure();

  return (
    <Stack spacing={4} onClick={children && onToggle}>
      <Flex
        px={6}
        py={3}
        mt={-2}
        as={Link}
        href={href ?? "#"}
        justify={"space-between"}
        align={"center"}
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

interface NavItemProps {
  label: string;
  subLabel?: string;
  children?: Array<NavItemProps>;
  href?: string;
}

const NAV_ITEMS: Array<NavItemProps> = [
  {
    label: "Game Projects",
    href: "#",
  },
  {
    label: "Web Projects",
    href: "#",
  },
  {
    label: "Resume",
    href: "#",
  },
  {
    label: "Contact Me",
    href: "#",
  },
];

export default Navbar;
