import React from "react";
import { Tag, TagProps } from "@chakra-ui/react";

interface CardTagProps {
  title: string;
  colorScheme?: TagProps["colorScheme"];
  background?: string;
  color?: string;
}

const CardTag: React.FC<CardTagProps> = ({
  title,
  colorScheme,
  background,
  color,
}) => {
  return (
    <Tag
      size={"sm"}
      colorScheme={colorScheme}
      background={background}
      color={color}
    >
      {title}
    </Tag>
  );
};

export default CardTag;
