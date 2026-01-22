import React, { useMemo, useState } from "react";
import { useFlashcards } from "../context/FlashcardsContext";
import { Trash2Icon } from "lucide-react";


// AllCards lists all flashcards (optionally filtered by category)
export const AllCards = () => {
  const { flashcards, categoryColor, currentDeck, deleteCard } = useFlashcards();
  const [cardCategory, setCardCategory ] = useState("All Categorys");

  // Filter cards by selected category. Memoize for performance.
  const filtered = useMemo(() => {
    return cardCategory === "All Categorys"
      ? flashcards || []
      : (flashcards || []).filter((filter) => filter.category === cardCategory);
  }, [flashcards, cardCategory]);

  return (
    <div className=" min-w-full min-h-full flex flex-col gap-5 ">
      <div className="flex gap-5 justify-between items-center">
        {/* Category selector */}
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
        <span className="mr-5 text-xl font-bold">{currentDeck}{" "}Deck</span>
      </div>
      

      {/* Grid of cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
        {filtered.map((card, index) => (
          <div
            key={card.id ?? index}
            className=" relative flex flex-col w-full h-60 border-2 border-r-4 border-b-4 rounded-2xl bg-[#ffff]"
          >
            {/* header shows id and category with a random background */}
            <div
              className={`flex justify-between relative items-start p-4  rounded-t-xl`}
              style={{
              backgroundColor: categoryColor.find(
                (filter) => filter.category === card?.category
              )?.color,
            }}
            >
              
              <span className="font-bold text-lg">{card.id}</span>
              <span>{card.category}</span>
            </div>
            <hr />
            <div className="flex flex-col place-self-center my-auto  gap-1 p-4">
              <span>{card.question}</span>
              <span>{card.answer}</span>
              <button aria-label="Delete card" className="absolute flex  bg-red-700 p-2 rounded-tl-2xl rounded-br-xl items-center justify-center bottom-0 right-0" onClick={() => {deleteCard(index)}}><Trash2Icon/></button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
