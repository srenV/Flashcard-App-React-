import React, { useState, useMemo } from "react";
import { useFlashcards } from "../context/FlashcardsContext";

// LeftSection displays the focused flashcard, controls to navigate
// between cards, and actions to mark/reset progress.
export const LeftSection = () => {
  // Pull flashcards and action helpers from context
  const { flashcards, updateKnownCount, resetKnownCount, categoryColor } = useFlashcards();

  // Local UI state:
  // `click` toggles whether the card shows the question (true) or answer (false)
  const [click, setClick] = useState(true);
  // index of the currently focused card within the filtered list
  const [cardIndex, setCardIndex] = useState(0);
  // currently selected category for filtering cards
  const [cardCategory, setCardCategory] = useState("All Categorys");
  // whether to hide mastered cards
  const [mastered, setMastered] = useState(false);

  // Compute the filtered list of cards based on selected category and
  // the `mastered` toggle. useMemo avoids recomputing unless dependencies change.
  const filtered = useMemo(() => {
    const base =
      cardCategory === "All Categorys"
        ? flashcards || []
        : (flashcards || []).filter(
            (filter) => filter.category === cardCategory,
          );

    // If `mastered` is true we exclude cards that have knownCount >= 5
    return mastered
      ? base.filter((filter) => (filter.knownCount ?? 0) < 5)
      : base;
  }, [flashcards, cardCategory, mastered]);

  // The currently focused card (may be undefined if filtered is empty)
  const card = filtered?.[cardIndex];

  return (
    <div className="w-full bg-[#ffff] rounded-3xl text-sm md:text-md mx-auto border-2 border-r-4 border-b-4">
      <div className="flex p-5 justify-between items-center">
        <div className="flex gap-5">
          {/* Category selector - resets index to 0 when changed */}
          <select
            name="select"
            id="select"
            className="bg-white border-2 rounded-2xl text-sm md:text-md md:w-fit w-30 p-2 font-semibold"
            value={cardCategory}
            onChange={(e) => {
              setCardCategory(e.target.value);
              // reset to the first card in the newly-selected category
              setCardIndex(0);
            }}
          >
            <option value="All Categorys">All Categorys</option>
            <option value="JavaScript">JavaScript</option>
            <option value="HTML">HTML</option>
            <option value="CSS">CSS</option>
            <option value="Web Development">Web Development</option>
            <option value="Mathematics">Mathematics</option>
            <option value="Literature">Literature</option>
            <option value="Science">Science</option>
            <option value="History">History</option>
            <option value="Geography">Geography</option>
          </select>

          {/* Toggle to hide mastered cards */}
          <div className="self-center">
            <input
              type="checkbox"
              name="hideMastered"
              id="hideMastered"
              className="scale-125"
              checked={mastered}
              onChange={(e) => setMastered(e.target.checked)}
            />
            <label htmlFor="hideMastered" className="ml-2 font-semibold">
              Hide Mastered
            </label>
          </div>
        </div>

        {/* Shuffle picks a random index within the filtered list */}
        <button
          className="flex items-center gap-2 p-2 border-2 border-r-4 border-b-4 rounded-2xl cursor-pointer"
          type="button"
          onClick={() =>
            setCardIndex(Math.floor(Math.random() * (filtered?.length ?? 1)))
          }
        >
          <img src="/icon-shuffle.svg" alt="shuffle icon" />
          <span className="font-semibold sm:invisible md:visible">Shuffle</span>
        </button>
      </div>

      <hr />

      <div>
        {/* Card in focus: clickable area that toggles question/answer */}
        <div className="bg-[#ffff] w-full h-150 md:h-full relative p-5 md:p-10 flex flex-col gap-5">
          <div
            style={{
              backgroundColor: categoryColor.find(
                (filter) => filter.category === card?.category
              )?.color,
            }}
            className={`bg-[url('/public/pattern-flashcard-bg.svg')] w-full h-150 relative rounded-3xl border-2 border-b-6 border-r-6 cursor-pointer flex flex-col items-center gap-5 justify-center p-6`}
            onClick={() => card && setClick(!click)}
          >
            {/* Category badge */}
            <span className="absolute top-5 bg-[#ffff] p-1 px-3 border-2 border-r-4 border-b-4 rounded-full font-semibold">
              {card?.category ?? ""}
            </span>

            {/* Show question or answer based on `click` state; fallback message if no card */}
            <h1 className="text-4xl font-semibold text-center">
              {card
                ? click
                  ? card.question
                  : card.answer
                : "No cards available for this category."}
            </h1>

            {card ? (
              <p className="text-xl font-semibold">Click to reveal answer</p>
            ) : null}

            <div className="absolute top-10 right-20 rotate-45">
              <img
                src="/pattern-star-blue.svg"
                alt="decorative star pattern"
              />
            </div>
            <div className="absolute bottom-15 left-30 rotate-45">
              <img
                src="/pattern-star-yellow.svg"
                alt="decorative star pattern"
              />
            </div>
          </div>

          {/* Actions: mark as known or reset progress */}
          <div className="flex justify-center gap-5">
            <button
              className={`p-3 border rounded-2xl text-sm md:text-xl text-nowrap flex items-center justify-center gap-3 font-semibold cursor-pointer border-b-4 border-r-3  bg-[#f6cb44] `}
              onClick={() => {
                // increment known count for this card via context helper
                if (card?.id) updateKnownCount(card.id);
              }}
            >
              <img src="/icon-circle-check.svg" alt=" check icon" /> I Know This
            </button>

            <button
              className="p-3 border rounded-2xl text-sm md:text-xl flex items-center justify-center gap-3 font-semibold cursor-pointer border-b-4 border-r-3 bg-[#ffff]"
              onClick={() => {
                // reset progress for this card via context helper
                if (card?.id) resetKnownCount(card.id);
              }}
            >
              <img src="/icon-reset.svg" alt="reset icon" /> Reset Cardprogress
            </button>
          </div>
        </div>
      </div>

      <hr />

      {/* Navigation: previous / next and current index display */}
      <nav className="flex justify-between items-center p-5">
        <button
          className="flex cursor-pointer border-2 border-r-4 border-b-4 p-3 items-center justify-center rounded-full font-bold gap-2"
          onClick={() => cardIndex > 0 && setCardIndex(cardIndex - 1)}
        >
          <img src="/icon-chevron-left.svg" alt="previous" />
          Previous
        </button>

        <span className="font-bold text-gray-400">
          Card <span>{cardIndex + 1}</span> of <span>{filtered.length}</span>
        </span>

        <button
          className="flex cursor-pointer border-2 border-r-4 border-b-4 p-3 items-center justify-center rounded-full font-bold gap-2"
          onClick={() => {
            if (cardIndex < (filtered?.length ?? 0) - 1)
              setCardIndex(cardIndex + 1);
          }}
        >
          Next
          <img src="/icon-chevron-right.svg" alt="next" />
        </button>
      </nav>
    </div>
  );
};
