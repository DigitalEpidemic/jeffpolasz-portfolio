import {
  Box,
  Collapse,
  Flex,
  Link,
  Stack,
  Text,
  useColorModeValue,
  useDisclosure,
} from "@chakra-ui/react";
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
        py={2}
        px={4}
        borderBottom={1}
        borderStyle={"solid"}
        borderColor={useColorModeValue("gray.200", "gray.900")}
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
        <MenuToggle onToggle={onToggle} isOpen={isOpen} />
      </Flex>

      <Collapse in={isOpen} animateOpacity>
        <MobileNavDropdown />
      </Collapse>
    </Box>
  );
};

const DesktopNav = () => {
  return (
    <Flex display={{ base: "none", md: "flex" }} ml={10}>
      <Stack direction={"row"} spacing={4}>
        {NAV_ITEMS.map((navItem) => (
          <Link
            key={navItem.label}
            p={2}
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
          background: "gray.200",
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
