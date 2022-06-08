import { CardTagListType } from "../components/portfolio/CardTag";

export const CardTagList: CardTagListType = {
  UNITY: {
    title: "Unity",
    background: "black",
    color: "white",
  },
  ANDROID: {
    title: "Android",
    colorScheme: "green",
  },
  IOS: {
    title: "iOS",
    colorScheme: "blue",
  },
  UE4: {
    title: "UE4",
    colorScheme: "red",
  },
  REACTNATIVE: {
    title: "React Native",
    colorScheme: "cyan",
  },
  REACT: {
    title: "React",
    colorScheme: "blue",
  },
  VUE: {
    title: "Vue",
    colorScheme: "green",
  },
  BS4: {
    title: "BootStrap 4",
    colorScheme: "purple",
  },
} as const;
