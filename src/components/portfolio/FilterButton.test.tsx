import { render, screen } from "@testing-library/react";
import React from "react";
import { CardProps } from "./Card";
import { CardTagList } from "../../data/CardTagList";
import FilterButtons from "./FilterButton";

describe("FilterButton", () => {
  it("always renders all filter button", () => {
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
      <FilterButtons
        filters={["unity", "ue4"]}
        selectedFilter={""}
        handleFilteringData={() => {
          /** */
        }}
        portfolioData={mockPortfolioData}
      />
    );

    const allButton = screen.getByRole("button", { name: "All" });

    expect(allButton).toBeInTheDocument();
  });
});
