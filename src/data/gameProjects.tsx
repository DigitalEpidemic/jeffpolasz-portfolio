import { CardProps } from "../components/portfolio/Card";
import { CardTagList } from "./CardTagList";

export const gameProjects: CardProps[] = [
  {
    filters: [CardTagList.UNITY, CardTagList.ANDROID, CardTagList.IOS],
    title: "Shinobi Jump",
    thumbnail: "https://jeffpolasz.com/images/shinobi-jump-featuredimg.jpg",
    feature1: "Hand drawn UI and game art",
    feature2: "Perfected using a dark colour palette",
    feature3: "Developed & published in 10 days",
    googlePlay:
      "https://play.google.com/store/apps/details?id=com.adknown.shinobijump",
    appStore: "https://apps.apple.com/ca/app/shinobi-jump/id1502583004",
  },
  {
    filters: [CardTagList.UE4],
    title: "UE4 Game",
    description: "Test UE4 description",
    gitHub: "test2",
  },
  {
    filters: [CardTagList.UNITY],
    title: "Perfect Knife",
    thumbnail: "https://jeffpolasz.com/images/perfect-knife-featuredimg.jpg",
    description: "what",
    feature1: "happens?",
    googlePlay: "testing",
    appStore: "boffum",
  },
  {
    filters: [CardTagList.UNITY, CardTagList.IOS],
    title: "Regular Knife",
    feature1: "happens?",
    googlePlay: "testing",
    appStore: "boffum",
  },
];
