import React from "react";
import {
  Box,
  Button,
  Flex,
  Image,
  Link,
  ListItem,
  Stack,
  Tag,
  Text,
  UnorderedList,
  useBreakpointValue,
  useColorModeValue,
} from "@chakra-ui/react";

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
  filter?: string[];
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
  filter,
}) => {
  // TODO: Create Tags for Web Projects. Possibly create helper/mapping?
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
          {filter?.includes("Unity") && (
            <Tag
              size={"sm"}
              background={useColorModeValue("gray.600", "gray.800")}
              color={useColorModeValue("gray.200", "gray.100")}
            >
              Unity
            </Tag>
          )}
          {filter?.includes("UE4") && (
            <Tag size={"sm"} background={"black"} color={"white"}>
              UE4
            </Tag>
          )}
          {filter?.includes("Android") && (
            <Tag size={"sm"} colorScheme={"green"}>
              Android
            </Tag>
          )}
          {filter?.includes("iOS") && (
            <Tag size={"sm"} colorScheme={"blue"}>
              iOS
            </Tag>
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
