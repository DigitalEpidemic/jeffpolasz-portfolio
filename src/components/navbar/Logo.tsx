import React from "react";
import {
  Link,
  Text,
  useBreakpointValue,
  useColorModeValue,
} from "@chakra-ui/react";
import { animateScroll } from "react-scroll";
import { useNavbar } from "../../providers/NavbarProvider";

interface LogoProps {
  logoText: string;
}

const Logo: React.FC<LogoProps> = ({ logoText }) => {
  const { onClose } = useNavbar();
  const { isAnimating } = useNavbar();

  const handleClick = () => {
    animateScroll.scrollToTop({
      duration: 400,
      smooth: "easeInOutQuint",
      ignoreCancelEvents: true,
    });
    onClose();
  };

  return (
    <Text
      as={Link}
      onClick={handleClick}
      textAlign={useBreakpointValue({ base: "center", md: "left" })}
      fontFamily={"heading"}
      fontSize={"2xl"}
      fontWeight={"semibold"}
      color={useColorModeValue("gray.800", "white")}
      p={1}
      style={isAnimating ? { pointerEvents: "none" } : {}}
      _hover={{
        textDecoration: "none",
      }}
    >
      {logoText}
    </Text>
  );
};

export default Logo;
