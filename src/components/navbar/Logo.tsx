import React from "react";
import {
  Link,
  Text,
  useBreakpointValue,
  useColorModeValue,
} from "@chakra-ui/react";
import { animateScroll } from "react-scroll";

interface LogoProps {
  logoText: string;
}

const Logo: React.FC<LogoProps> = ({ logoText }) => {
  return (
    <Text
      as={Link}
      onClick={() => {
        animateScroll.scrollToTop({ duration: 400, smooth: "easeInOutQuint" });
      }}
      textAlign={useBreakpointValue({ base: "center", md: "left" })}
      fontFamily={"heading"}
      fontSize={"2xl"}
      fontWeight={"semibold"}
      color={useColorModeValue("gray.800", "white")}
      p={1}
      _hover={{
        textDecoration: "none",
      }}
    >
      {logoText}
    </Text>
  );
};

export default Logo;
