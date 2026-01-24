/*
  AllCards
  - Lists all flashcards with an optional category filter.
  - Supports deleting cards (by id) and shows toasts for feedback.
  - Uses `AnimatePresence` to animate toast mount/unmount.
*/
import React, { useMemo, useState, useEffect } from "react";
import { useFlashcards } from "../context/FlashcardsContext";
import { AnimatePresence, motion } from "motion/react";
import { Trash2Icon } from "lucide-react";
import { Toast } from "../components/Toast";

// AllCards lists all flashcards (optionally filtered by category)
export const AllCards = () => {
  const {
    flashcards,
    categoryColor,
    currentDeck,
    deleteCard,
    setToastMessage,
    toastMessage,
    setToggleToast,
    toggleToast,
  } = useFlashcards();
  const [cardCategory, setCardCategory] = useState("All Categorys");

  // Filter cards by selected category. Memoize for performance.
  const filtered = useMemo(() => {
    return cardCategory === "All Categorys"
      ? flashcards || []
      : (flashcards || []).filter((filter) => filter.category === cardCategory);
  }, [flashcards, cardCategory]);

  return (
    <AnimatePresence>
      <motion.div
        className=" min-w-full min-h-full flex flex-col gap-5 "
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1.0 }}
        transition={{ duration: 0.4 }}
        exit={{ opacity: 0, scale: 0.8 }}
      >
        <AnimatePresence>
          {toggleToast && <Toast key="toast">{toastMessage}</Toast>}
        </AnimatePresence>
        <div className="flex gap-5 justify-between items-center">
          {/* Category selector */}
          <label htmlFor="selectAllCard" className="sr-only">
            Filter by category
          </label>
          <select
            name="selectAllCard"
            id="selectAllCard"
            className="bg-white border rounded-full p-2 font-semibold"
            value={cardCategory}
            onChange={(e) => {
              setCardCategory(e.target.value);
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
          <span className="mr-5 text-xl font-bold">{currentDeck} Deck</span>
        </div>

        {/* Grid of cards */}
        <div
          role="list"
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5"
        >
          {filtered.map((card, index) => (
            <div
              role="listitem"
              aria-label={`Card ${card?.id ?? index} ${card?.category ?? ""}`}
              key={card.id ?? index}
              className=" relative flex flex-col w-full h-60 border-2 border-r-4 border-b-4 rounded-2xl bg-[#ffff]"
            >
              {/* header shows id and category with a random background */}
              <div
                className={`flex  relative items-start p-4  rounded-t-xl`}
                style={{
                  backgroundColor: categoryColor.find(
                    (filter) => filter.category === card?.category,
                  )?.color,
                }}
              >
                <span className="font-bold text-2xl absolute top-0 left-2">
                  {card.id}
                </span>
                <span className="absolute right-2 top-1 font-bold">
                  {card.category}
                </span>
              </div>
              <hr />
              <div className="flex flex-col  place-self-center my-auto w-full gap-2 p-2">
                <div className="flex relative flex-col">
                  <label className="text-sm underline font-semibold ">
                    Question:
                  </label>
                  <span>{card.question}</span>
                </div>
                <div className="h-1 bg-black w-full"></div>
                <div className="flex relative flex-col">
                  <label className="text-sm underline font-semibold">
                    Answer:
                  </label>
                  <span>{card.answer}</span>
                </div>
                <button
                  aria-label="Delete card"
                  className="absolute flex  bg-red-700 p-2 rounded-tl-2xl rounded-br-xl items-center justify-center bottom-0 right-0"
                  onClick={() => {
                    deleteCard(card.id);
                    setToggleToast(true);
                    setToastMessage("Card deleted");
                  }}
                >
                  <Trash2Icon />
                </button>
              </div>
            </div>
          ))}
        </div>
      </motion.div>
    </AnimatePresence>
  );
};
