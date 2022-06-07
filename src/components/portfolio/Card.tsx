import React from "react";
import {
  Box,
  Button,
  Flex,
  Image,
  Link,
  ListItem,
  Stack,
  Text,
  UnorderedList,
  useBreakpointValue,
  useColorModeValue,
} from "@chakra-ui/react";
import CardTag from "./CardTag";

export interface CardProps {
  title: string;
  thumbnail?: string;
  description?: string;
  feature1?: string;
  feature2?: string;
  feature3?: string;
  googlePlay?: string;
  appStore?: string;
  gitHub?: string;
  filters?: string[];
}

const Card: React.FC<CardProps> = ({
  thumbnail,
  title,
  description,
  feature1,
  feature2,
  feature3,
  googlePlay,
  appStore,
  gitHub,
  filters,
}) => {
  const widthVariants = useBreakpointValue({ sm: "100%", xl: "390px" });
  return (
    <Box
      w={widthVariants}
      rounded={"10px"}
      overflow={"hidden"}
      boxShadow={"sm"}
      border={"1px"}
      borderColor={useColorModeValue("gray.200", "gray.700")}
      bg={useColorModeValue("gray.50", "gray.700")}
    >
      <Image
        w={"100%"}
        src={thumbnail || "https://via.placeholder.com/400x200"}
      />
      <Box p={5}>
        <Text fontSize={"xl"}>{title}</Text>
        <Stack isInline align={"baseline"} my={2}>
          {filters?.includes("Unity") && (
            <CardTag
              title={"Unity"}
              background={useColorModeValue("gray.600", "gray.800")}
              color={useColorModeValue("gray.200", "gray.100")}
            />
          )}
          {filters?.includes("UE4") && (
            <CardTag title={"UE4"} background={"black"} color={"white"} />
          )}
          {filters?.includes("Android") && (
            <CardTag title={"Android"} colorScheme={"green"} />
          )}
          {filters?.includes("iOS") && (
            <CardTag title={"iOS"} colorScheme={"blue"} />
          )}
          {filters?.includes("React Native") && (
            <CardTag title={"React Native"} colorScheme={"cyan"} />
          )}
          {filters?.includes("React") && (
            <CardTag title={"React"} colorScheme={"blue"} />
          )}
          {filters?.includes("Vue") && (
            <CardTag title={"Vue"} colorScheme={"green"} />
          )}
          {filters?.includes("BootStrap 4") && (
            <CardTag title={"BootStrap 4"} colorScheme={"purple"} />
          )}
        </Stack>
        {!description && (feature1 || feature2 || feature3) && (
          <Text mb={1}>Highlights:</Text>
        )}
        {!description && (
          <UnorderedList mb={5}>
            {feature1 && <ListItem>{feature1}</ListItem>}
            {feature2 && <ListItem>{feature2}</ListItem>}
            {feature3 && <ListItem>{feature3}</ListItem>}
          </UnorderedList>
        )}
        {(!feature1 || !feature2 || !feature3) && description}
        <Flex justifyContent={"center"}>
          {googlePlay && (
            <Link
              href={googlePlay}
              isExternal={true}
              _hover={{ textDecoration: "none" }}
            >
              <Button mx={1}>Google Play</Button>
            </Link>
          )}
          {appStore && (
            <Link
              href={appStore}
              isExternal={true}
              _hover={{ textDecoration: "none" }}
            >
              <Button mx={1}>App Store</Button>
            </Link>
          )}
          {gitHub && (
            <Link
              href={gitHub}
              isExternal={true}
              _hover={{ textDecoration: "none" }}
            >
              <Button mx={1}>GitHub</Button>
            </Link>
          )}
        </Flex>
      </Box>
    </Box>
  );
};

export default Card;
