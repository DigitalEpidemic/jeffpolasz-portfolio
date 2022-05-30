import { render, screen } from "@testing-library/react";
import React from "react";
import Portfolio, { CardProps } from "./Portfolio";

it("renders Portfolio and mock data", () => {
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

  const title = "Game Stuff";

  render(<Portfolio title={title} portfolioData={mockPortfolioData} />);

  const portfolioTitle = screen.getByText(title);
  expect(portfolioTitle).toBeInTheDocument();

  expect(screen.getByText(mockPortfolioData[0].title)).toBeInTheDocument();
});
