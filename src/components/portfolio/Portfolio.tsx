import {
  Container,
  Heading,
  SimpleGrid,
  useBreakpointValue,
} from "@chakra-ui/react";
import { AnimatePresence, motion } from "framer-motion";
import React, { SetStateAction, useMemo, useState } from "react";
import Card, { CardProps } from "./Card";
import FilterButtons from "./FilterButton";

interface PortfolioProps {
  title: string;
  portfolioData: CardProps[];
  excludeFilters?: string[];
  forceSameHeight?: boolean;
  maxCardThumbnailHeight?: number;
  maxCardThumbnailWidth?: number;
}

const Portfolio: React.FC<PortfolioProps> = ({
  title,
  portfolioData,
  excludeFilters,
  forceSameHeight,
  maxCardThumbnailHeight,
  maxCardThumbnailWidth,
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
    <Container id={title} minH={"580px"} maxW={"1300px"}>
      <Heading my={5} textAlign={"center"} textTransform={"uppercase"}>
        {title}
      </Heading>
      <FilterButtons
        filters={uniqueFilterDataList}
        selectedFilter={filter}
        handleFilteringData={handleFilteringData}
        portfolioData={portfolioData}
      />
      <AnimatePresence mode="wait">
        <SimpleGrid
          columns={useBreakpointValue({ sm: 1, md: 2, lg: 3 })}
          autoRows={forceSameHeight ? "1fr" : "auto"}
          spacing={10}
          py={3}
          mx={5}
          justifyItems={"center"}
        >
          {cardData.map((data) => (
            <motion.div
              key={data.title}
              layout
              initial={{ x: screen.width, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: -screen.width, opacity: 0 }}
            >
              <Card
                {...data}
                forceSameHeight={forceSameHeight}
                maxCardThumbnailHeight={maxCardThumbnailHeight}
                maxCardThumbnailWidth={maxCardThumbnailWidth}
              />
            </motion.div>
          ))}
        </SimpleGrid>
      </AnimatePresence>
    </Container>
  );
};

export default Portfolio;
