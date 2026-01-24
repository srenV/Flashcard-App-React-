/*
  DeckModal
  - Modal UI to create new decks (currently minimal/placeholder).
  - Mirrors `CardModal` in structure: portal rendering, Escape-to-close,
    and click-to-close outer overlay.
  - NOTE: The Create button is disabled and the implementation is incomplete.
*/
import { CircleX } from "lucide-react";
import React, { useEffect } from "react";
import { createPortal } from "react-dom";
import { useState } from "react";
import { useFlashcards } from "../context/FlashcardsContext";

// ---------------------------------------------------------------- todo -----------------------------------------------------------

export const DeckModal = ({ isOpen, onClose }) => {
  const { createDeck } = useFlashcards();
  const [deckName, setDeckName] = useState("");

  useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === "Escape") {
        onClose();
      }
    };
    window.addEventListener("keydown", handleEsc);

    return () => window.removeEventListener("keydown", handleEsc);
  }, [onClose]);

  if (!isOpen) return null;

  return createPortal(
    <div
      className="fixed top-0 left-0 right-0 bottom-0 bg-gray-800/80 flex items-center justify-center z-30"
      onClick={onClose}
    >
      <div
        className="bg-white p-10 border-2 border-r-3 border-b-4 flex flex-col rounded-3xl relative z-40 shadow-2xl bg-[url('/public/pattern-flashcard-bg.svg')]"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          className="place-self-end absolute top-4 right-4"
          onClick={onClose}
        >
          <CircleX className="scale-150" />
        </button>
        <div className=" flex flex-col gap-5 ">
          <div className="flex flex-col">
            <label htmlFor="name">Deckname</label>
            <input
              className=" p-2 rounded-xl border-2 border-r-3 border-b-4"
              type="text"
              value={deckName}
              name="name"
              id="name"
              onChange={(e) => setDeckName(e.target.value)}
            />
          </div>
          <div className="flex gap-5 items-center justify-center rounded-xl border-2 border-r-3 border-b-4">
            <button
              type="button"
              disabled // <------------------- Entfernen nach korrekter implementierung
              onClick={() => {
                createDeck({
                  deckName,
                });
                onClose;
                setDeckName("");
              }}
            >
              Create
            </button>
          </div>
        </div>
      </div>
    </div>,
    document.body,
  );
};
