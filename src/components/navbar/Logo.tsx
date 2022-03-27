import React from "react";
import {
  Flex,
  Text,
  useBreakpointValue,
  useColorModeValue,
} from "@chakra-ui/react";

interface LogoProps {
  logoText: string;
}

const Logo: React.FC<LogoProps> = ({ logoText }) => {
  return (
    <Flex
      flex={{ base: 1 }}
      ml={{ base: 2 }}
      justify={{ base: "start", md: "start" }}
    >
      <Text
        textAlign={useBreakpointValue({ base: "center", md: "left" })}
        fontFamily={"heading"}
        color={useColorModeValue("gray.800", "white")}
      >
        {logoText}
      </Text>
    </Flex>
  );
};

export default Logo;
