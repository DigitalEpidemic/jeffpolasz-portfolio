import React from "react";
import {
  Flex,
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
    <Flex flex={1} justify={{ base: "start", md: "start" }}>
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
    </Flex>
  );
};

export default Logo;
