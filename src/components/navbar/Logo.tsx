import React from "react";
import {
  Link,
  Text,
  useBreakpointValue,
  useColorModeValue,
} from "@chakra-ui/react";

interface LogoProps {
  logoText: string;
}

const Logo: React.FC<LogoProps> = ({ logoText }) => {
  return (
    <Text
      as={Link}
      textAlign={useBreakpointValue({ base: "center", md: "left" })}
      fontFamily={"heading"}
      fontSize={"xl"}
      fontWeight={"semibold"}
      color={useColorModeValue("gray.800", "white")}
      p={2}
      _hover={{
        textDecoration: "none",
      }}
    >
      {logoText}
    </Text>
  );
};

export default Logo;
