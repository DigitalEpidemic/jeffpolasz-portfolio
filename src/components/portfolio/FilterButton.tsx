import React from "react";
import { Button, Flex } from "@chakra-ui/react";
import { CardProps } from "./Card";

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
      cardProps.filters?.some((cardTagProps) => cardTagProps.title === filter)
    );

    handleFilteringData(filter, data);
  };

  const allFilter = ["All"];

  return (
    <Flex justifyContent={"center"} flexWrap={"wrap"}>
      {allFilter.concat(filters).map((filter, index) => {
        return (
          <Button
            variant={selectedFilter === filter ? "outline" : "solid"}
            key={index}
            mx={1}
            mb={2}
            onClick={() => handleOnClick(filter)}
          >
            {filter}
          </Button>
        );
      })}
    </Flex>
  );
};

export default FilterButtons;
