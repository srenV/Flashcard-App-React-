import React from "react";
import { StatisticCard } from "../components/StatisticCard";
import { useFlashcards } from "../context/FlashcardsContext";

// RightSection shows study statistics derived from the flashcards array.
export const RightSection = () => {
  // read-only access to flashcards from context
  const { flashcards, resetAllKnownCount } = useFlashcards();
  return (
    <div className="bg-[#ffff] rounded-3xl w-full lg:w-[40%] p-8 flex flex-col items-center border-2 border-r-4 gap-4 border-b-4">
      <div className="flex gap-5 md:gap-10 border-2 border-r-4 border-b-4 rounded-full p-2 items-center">
        <span className="text-2xl md:text-3xl text-nowrap font-semibold">
          Study Statistics
        </span>
        <button
          className="p-2 border-2 border-r-4 border-b-4 rounded-full"
          onClick={resetAllKnownCount}
        >
          <span className="text-nowrap">Reset All</span>
        </button>
      </div>

      {/* Summary cards: compute counts from the flashcards array */}
      <StatisticCard
        heading={"Total Cards"}
        value={flashcards?.length}
        color={"bg-[#93acec]"}
        icon={"total.svg"}
      />

      <StatisticCard
        heading={"Mastered"}
        // mastered when knownCount equals 5
        value={flashcards.filter((filter) => filter.knownCount === 5).length}
        color={"bg-[#47daca]"}
        icon={"mastered.svg"}
      />

      <StatisticCard
        heading={"In Progress"}
        // in progress: knownCount less than 5
        value={flashcards.filter((filter) => filter.knownCount < 5).length}
        color={"bg-[#f173a3]"}
        icon={"in-progress.svg"}
      />

      <StatisticCard
        heading={"Not Started"}
        // not started: knownCount equals 0
        value={flashcards.filter((filter) => filter.knownCount === 0).length}
        color={"bg-[#fd8ae5]"}
        icon={"not-started.svg"}
      />
    </div>
  );
};
