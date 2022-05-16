import React, { Dispatch, SetStateAction, useState } from "react";
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
  Stack,
  Tag,
  Text,
  UnorderedList,
  useBreakpointValue,
  useColorModeValue,
} from "@chakra-ui/react";

// TODO: Use filterData as actual Card data
const filterData: CardProps[] = [
  {
    filter: "unity",
    title: "Unity Game",
    description: "Test unity description",
    gitHub: "test",
  },
  {
    filter: "ue4",
    title: "UE4 Game",
    description: "Test UE4 description",
    gitHub: "test2",
  },
];

interface PortfolioProps {
  title: string;
}

const Portfolio: React.FC<PortfolioProps> = ({ title }) => {
  const [filter, setFilter] = useState("unity");
  const [cardData, setCardData] = useState(); // TODO: Render cards based on filter state

  return (
    <Container maxW={"1300px"}>
      <Heading my={5} textAlign={"center"} textTransform={"uppercase"}>
        {title}
      </Heading>
      <FilterButtons filters={["unity", "ue4"]} setFilter={setFilter} />
      <SimpleGrid
        columns={useBreakpointValue({ sm: 1, md: 2, lg: 3 })}
        spacing={10}
        py={5}
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
          title={"Circle Avoider"}
          feature1={"happens?"}
          googlePlay="testing"
          gitHub={"allofthem"}
        />
      </SimpleGrid>
    </Container>
  );
};

interface FilterButtonsProps {
  filters: string[];
  setFilter: Dispatch<SetStateAction<string>>;
}

const FilterButtons: React.FC<FilterButtonsProps> = ({
  filters,
  setFilter,
}) => {
  const handleOnClick = (filter: React.SetStateAction<string>) => {
    console.log(filter);

    if (filter === "all") {
      setFilter("");
      return;
    }

    setFilter(filter);
  };

  const allFilter = ["all"];

  return (
    <Flex justifyContent={"center"}>
      {allFilter.concat(filters).map((filter, index) => {
        return (
          <Button key={index} mx={1} onClick={() => handleOnClick(filter)}>
            {filter}
          </Button>
        );
      })}
    </Flex>
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
  filter?: string;
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
        <Stack isInline align={"baseline"}>
          <Tag
            size={"sm"}
            background={useColorModeValue("gray.600", "gray.800")}
            color={useColorModeValue("gray.200", "gray.100")}
          >
            Unity
          </Tag>
          <Tag size={"sm"} background={"black"} color={"white"}>
            UE4
          </Tag>
          <Tag size={"sm"} colorScheme={"green"}>
            Android
          </Tag>
          <Tag size={"sm"} colorScheme={"blue"}>
            iOS
          </Tag>
        </Stack>
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

export default Portfolio;
