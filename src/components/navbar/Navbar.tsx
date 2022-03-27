import {
  Box,
  Collapse,
  Flex,
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
        py={{ base: 2 }}
        px={{ base: 4 }}
        borderBottom={1}
        borderStyle={"solid"}
        borderColor={useColorModeValue("gray.200", "gray.900")}
        align="center"
      >
        <Logo logoText="Jeffrey Polasz" />
        <MenuToggle onToggle={onToggle} isOpen={isOpen} />

        <Collapse in={isOpen} animateOpacity>
          <MobileNavDropdown />
        </Collapse>
      </Flex>
    </Box>
  );
};

const MobileNavDropdown = () => {
  return (
    <Stack
      bg={useColorModeValue("white", "gray.800")}
      p={4}
      display={{ md: "none" }}
    >
      {NAV_ITEMS.map((navItem) => (
        <MobileNavItem key={navItem.label} {...navItem} />
      ))}
    </Stack>
  );
};

const MobileNavItem: React.FC<NavItemProps> = ({ label }) => {
  return <Text>{label}</Text>;
};

interface NavItemProps {
  label: string;
  subLabel?: string;
  children?: Array<NavItemProps>;
  href?: string;
}

const NAV_ITEMS: Array<NavItemProps> = [
  {
    label: "Inspiration",
    children: [
      {
        label: "Explore Design Work",
        subLabel: "Trending Design to inspire you",
        href: "#",
      },
      {
        label: "New & Noteworthy",
        subLabel: "Up-and-coming Designers",
        href: "#",
      },
    ],
  },
  {
    label: "Find Work",
    children: [
      {
        label: "Job Board",
        subLabel: "Find your dream design job",
        href: "#",
      },
      {
        label: "Freelance Projects",
        subLabel: "An exclusive list for contract work",
        href: "#",
      },
    ],
  },
  {
    label: "Learn Design",
    href: "#",
  },
  {
    label: "Hire Designers",
    href: "#",
  },
];

export default Navbar;
