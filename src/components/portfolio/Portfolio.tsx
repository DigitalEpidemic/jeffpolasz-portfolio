import React, { SetStateAction, useState } from "react";
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

interface PortfolioProps {
  title: string;
  portfolioData: CardProps[];
}

// TODO: Animate hiding/showing cards
const Portfolio: React.FC<PortfolioProps> = ({ title, portfolioData }) => {
  const [filter, setFilter] = useState("");
  const [cardData, setCardData] = useState(portfolioData);

  const handleFilteringData = (
    filter: SetStateAction<string>,
    cardData: CardProps[]
  ) => {
    setFilter(filter);
    setCardData(cardData.length !== 0 ? cardData : portfolioData);
  };

  return (
    <Container maxW={"1300px"}>
      <Heading my={5} textAlign={"center"} textTransform={"uppercase"}>
        {title}
      </Heading>
      <FilterButtons
        filters={["unity", "ue4"]}
        selectedFilter={filter}
        handleFilteringData={handleFilteringData}
        portfolioData={portfolioData}
      />
      <SimpleGrid
        columns={useBreakpointValue({ sm: 1, md: 2, lg: 3 })}
        spacing={10}
        py={5}
        mx={5}
        justifyItems={"center"}
      >
        {cardData.map((data) => (
          <Card key={data.title} {...data} />
        ))}
      </SimpleGrid>
    </Container>
  );
};

interface FilterButtonsProps {
  filters: string[];
  selectedFilter: string;
  handleFilteringData: (
    filter: React.SetStateAction<string>,
    cardData: CardProps[]
  ) => void;
  portfolioData: CardProps[];
}

const FilterButtons: React.FC<FilterButtonsProps> = ({
  filters,
  selectedFilter,
  handleFilteringData,
  portfolioData,
}) => {
  const handleOnClick = (filter: React.SetStateAction<string>) => {
    const data = portfolioData.filter((cardProps) =>
      cardProps.filter?.includes(filter.toString())
    );

    handleFilteringData(filter, data);
  };

  const allFilter = ["all"];

  return (
    <Flex justifyContent={"center"}>
      {allFilter.concat(filters).map((filter, index) => {
        return (
          <Button
            variant={selectedFilter === filter ? "outline" : "solid"}
            key={index}
            mx={1}
            onClick={() => handleOnClick(filter)}
          >
            {filter}
          </Button>
        );
      })}
    </Flex>
  );
};

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
          {filter?.includes("unity") && (
            <Tag
              size={"sm"}
              background={useColorModeValue("gray.600", "gray.800")}
              color={useColorModeValue("gray.200", "gray.100")}
            >
              Unity
            </Tag>
          )}
          {filter?.includes("ue4") && (
            <Tag size={"sm"} background={"black"} color={"white"}>
              UE4
            </Tag>
          )}
          {filter?.includes("android") && (
            <Tag size={"sm"} colorScheme={"green"}>
              Android
            </Tag>
          )}
          {filter?.includes("ios") && (
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

export default Portfolio;
