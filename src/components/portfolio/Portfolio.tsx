import React from "react";
import {
  Box,
  Button,
  Container,
  Flex,
  Heading,
  Image,
  Link,
  ListItem,
  SimpleGrid,
  Text,
  UnorderedList,
  useBreakpointValue,
  useColorModeValue,
} from "@chakra-ui/react";

interface PortfolioProps {
  title: string;
}

const Portfolio: React.FC<PortfolioProps> = ({ title }) => {
  return (
    <Container maxW={"1300px"}>
      <Heading mt={5} textAlign={"center"} textTransform={"uppercase"}>
        {title}
      </Heading>
      <SimpleGrid
        columns={useBreakpointValue({ sm: 1, md: 2, lg: 3 })}
        spacing={10}
        py={10}
        mx={5}
        justifyItems={"center"}
      >
        <Card title={"Tappy Road"} description={"test"} appStore={"test"} />
        <Card
          title={"Shinobi Jump"}
          thumbnail={
            "https://jeffpolasz.com/images/shinobi-jump-featuredimg.jpg"
          }
          feature1={"test123"}
          googlePlay={
            "https://play.google.com/store/apps/details?id=com.adknown.shinobijump"
          }
        />
        <Card
          title={"Perfect Knife"}
          description={"what"}
          feature1={"happens?"}
          googlePlay="testing"
          appStore={"boffum"}
        />
        <Card
          title={"Perfect Knife"}
          feature1={"happens?"}
          googlePlay="testing"
          gitHub={"allofthem"}
        />
      </SimpleGrid>
    </Container>
  );
};

interface CardProps {
  thumbnail?: string;
  title?: string;
  description?: string;
  feature1?: string;
  feature2?: string;
  feature3?: string;
  googlePlay?: string;
  appStore?: string;
  gitHub?: string;
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
        <Text>{title}</Text>
        {!description && (
          <UnorderedList mb={5}>
            {feature1 && <ListItem>{feature1}</ListItem>}
            {feature2 && <ListItem>{feature2}</ListItem>}
            {feature3 && <ListItem>{feature3}</ListItem>}
          </UnorderedList>
        )}
        {(!feature1 || !feature2 || !feature3) && description}
        <Flex justifyContent={"space-around"}>
          {googlePlay && (
            <Link
              href={googlePlay}
              isExternal={true}
              _hover={{ textDecoration: "none" }}
            >
              <Button>Google Play</Button>
            </Link>
          )}
          {appStore && (
            <Link
              href={appStore}
              isExternal={true}
              _hover={{ textDecoration: "none" }}
            >
              <Button>App Store</Button>
            </Link>
          )}
          {gitHub && (
            <Link
              href={gitHub}
              isExternal={true}
              _hover={{ textDecoration: "none" }}
            >
              <Button>GitHub</Button>
            </Link>
          )}
        </Flex>
      </Box>
    </Box>
  );
};

export default Portfolio;
