import React, { SetStateAction, useMemo, useState } from "react";
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
  excludeFilters?: string[];
}

// TODO: Animate hiding/showing cards (Framer)
const Portfolio: React.FC<PortfolioProps> = ({
  title,
  portfolioData,
  excludeFilters,
}) => {
  const [filter, setFilter] = useState("All");
  const [cardData, setCardData] = useState<CardProps[]>(portfolioData);

  const handleFilteringData = (
    filter: SetStateAction<string>,
    cardData: CardProps[]
  ) => {
    setFilter(filter);
    setCardData(cardData.length !== 0 ? cardData : portfolioData);
  };

  const uniqueFilterDataList = useMemo(() => {
    const filterList = Array.from(
      new Set(
        portfolioData
          .map((data) => data.filters?.map((filter) => filter.title))
          .flat()
      )
    ) as string[];

    const finalFilterList = filterList.filter(
      (currentListOfFilters) => !excludeFilters?.includes(currentListOfFilters)
    );

    return finalFilterList;
  }, [portfolioData, excludeFilters]);

  return (
    <Container maxW={"1300px"}>
      <Heading my={5} textAlign={"center"} textTransform={"uppercase"}>
        {title}
      </Heading>
      <FilterButtons
        filters={uniqueFilterDataList}
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
