import { render, screen } from "@testing-library/react";
import React from "react";
import Card, { CardProps } from "./Card";

describe("Card", () => {
  it("renders title on card", () => {
    const mockPortfolioData: CardProps[] = [
      {
        filter: ["unity", "android", "ios"],
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

    render(<Card title={mockPortfolioData[0].title} />);

    const cardTitle = screen.getByText(mockPortfolioData[0].title);

    expect(cardTitle).toBeInTheDocument();
  });

  it("renders Highlights text when at least 1 feature is passed in", () => {
    const mockPortfolioData: CardProps[] = [
      {
        filter: ["unity", "android", "ios"],
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
      <Card
        title={mockPortfolioData[0].title}
        feature1={mockPortfolioData[0].feature1}
      />
    );

    const highlightsText = screen.getByText(/highlights/i);

    expect(highlightsText).toBeInTheDocument();
  });
});
