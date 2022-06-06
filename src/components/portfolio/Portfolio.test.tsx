import { render, screen } from "@testing-library/react";
import React from "react";
import { CardProps } from "./Card";
import Portfolio from "./Portfolio";

describe("Portfolio", () => {
  const mockPortfolioData: CardProps[] = [
    {
      filter: ["Unity", "Android", "iOS", "Other"],
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

  it("renders Portfolio and mock data", () => {
    render(<Portfolio title={title} portfolioData={mockPortfolioData} />);

    const portfolioTitle = screen.getByText(title);
    expect(portfolioTitle).toBeInTheDocument();

    expect(screen.getByText(mockPortfolioData[0].title)).toBeInTheDocument();
  });

  it("does not render excluded filters", () => {
    const excludeFilters = ["Other"];

    render(
      <Portfolio
        title={title}
        portfolioData={mockPortfolioData}
        excludeFilters={excludeFilters}
      />
    );

    const otherFilter = screen.queryByText(excludeFilters[0]);

    expect(otherFilter).not.toBeInTheDocument();
  });
});
