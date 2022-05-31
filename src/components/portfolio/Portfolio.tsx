import React, { SetStateAction, useState } from "react";
import {
  Container,
  Heading,
  SimpleGrid,
  useBreakpointValue,
} from "@chakra-ui/react";
import FilterButtons from "./FilterButton";
import Card, { CardProps } from "./Card";

interface PortfolioProps {
  title: string;
  portfolioData: CardProps[];
}

// TODO: Animate hiding/showing cards (Framer)
const Portfolio: React.FC<PortfolioProps> = ({ title, portfolioData }) => {
  const [filter, setFilter] = useState("all");
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

export default Portfolio;
