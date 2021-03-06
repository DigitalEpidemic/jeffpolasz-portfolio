import { CardProps } from "../components/portfolio/Card";
import { CardTagList } from "./CardTagList";

export const webProjects: CardProps[] = [
  {
    filters: [CardTagList.REACTNATIVE],
    title: "PowerCalc",
    thumbnail: "https://jeffpolasz.com/images/power-calc-img.jpg",
    feature1: "Hand drawn UI and game art",
    feature2: "Perfected using a dark colour palette",
    feature3: "Developed & published in 10 days",
    gitHub: "#",
  },
  {
    filters: [CardTagList.REACT],
    title: "React Site",
    description: "Test UE4 description",
    gitHub: "test2",
  },
  {
    filters: [CardTagList.VUE],
    title: "Vue Site",
    description: "what",
    feature1: "happens?",
    googlePlay: "testing",
    appStore: "boffum",
  },
  {
    filters: [CardTagList.BS4],
    title: "Bootstrap Game",
    feature1: "happens?",
    googlePlay: "testing",
    appStore: "boffum",
  },
];
