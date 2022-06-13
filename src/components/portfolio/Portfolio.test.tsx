import { render, screen } from "@testing-library/react";
import React from "react";
import { CardTagList } from "../../data/CardTagList";
import { CardProps } from "./Card";
import { CardTagProps } from "./CardTag";
import Portfolio from "./Portfolio";

describe("Portfolio", () => {
  const other: CardTagProps = {
    title: "Foobarbaz",
    colorScheme: "linkedin",
  };

  const mockPortfolioData: CardProps[] = [
    {
      filters: [CardTagList.UNITY, CardTagList.ANDROID, CardTagList.IOS, other],
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

  it("does not render buttons for excluded filters", () => {
    const excludeFilters = [other.title];

    render(
      <Portfolio
        title={title}
        portfolioData={mockPortfolioData}
        excludeFilters={excludeFilters}
      />
    );

    const otherFilter = screen.queryByRole("button", { name: other.title });

    expect(otherFilter).not.toBeInTheDocument();
  });

  it("always renders Tags on Cards even when excluded", () => {
    const excludeFilters = [other.title];

    render(
      <Portfolio
        title={title}
        portfolioData={mockPortfolioData}
        excludeFilters={excludeFilters}
      />
    );

    const otherFilter = screen.getByLabelText(other.title);

    expect(otherFilter).toBeInTheDocument();
  });
});
