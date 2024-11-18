import { ChakraProvider } from "@chakra-ui/react";
import { render, screen } from "@testing-library/react";
import { CardTagList } from "../../data/CardTagList";
import Card, { CardProps } from "./Card";

describe("Card", () => {
  it("renders title on card", () => {
    const mockPortfolioData: CardProps[] = [
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
    ];

    render(
      <ChakraProvider>
        <Card title={mockPortfolioData[0].title} />
      </ChakraProvider>
    );

    const cardTitle = screen.getByText(mockPortfolioData[0].title);

    expect(cardTitle).toBeInTheDocument();
  });

  it("renders Highlights text when at least 1 feature is passed in", () => {
    const mockPortfolioData: CardProps[] = [
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
    ];

    render(
      <ChakraProvider>
        <Card
          title={mockPortfolioData[0].title}
          feature1={mockPortfolioData[0].feature1}
        />
      </ChakraProvider>
    );

    const highlightsText = screen.getByText(/highlights/i);

    expect(highlightsText).toBeInTheDocument();
  });
});
