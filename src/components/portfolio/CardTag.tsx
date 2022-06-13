import React from "react";
import { Tag, TagProps } from "@chakra-ui/react";

export interface CardTagProps {
  title: string;
  colorScheme?: TagProps["colorScheme"];
  background?: string;
  color?: string;
}

export type CardTagListType = {
  [key: string]: CardTagProps;
};

const CardTag: React.FC<CardTagProps> = ({
  title,
  colorScheme,
  background,
  color,
}) => {
  return (
    <Tag
      aria-label={title}
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
