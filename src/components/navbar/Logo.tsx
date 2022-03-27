import {
  Flex,
  Text,
  useBreakpointValue,
  useColorModeValue,
} from "@chakra-ui/react";

const Logo = () => {
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
        Jeffrey Polasz
      </Text>
    </Flex>
  );
};

export default Logo;
