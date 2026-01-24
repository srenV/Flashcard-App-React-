/*
  CardModal
  - Modal dialog for creating a new flashcard.
  - Renders into a portal (document.body) so it overlays the app.
  - Handles Escape to close and stops click propagation so clicks inside
    the form don't close the modal.
  - Form submission should use `onSubmit` and call `e.preventDefault()` to
    avoid a full page reload. Required fields should be validated (e.g. with
    HTML `required`). On success it calls `createCard` from context and
    triggers a toast via `setToggleToast` / `setToastMessage`.
*/
import { CircleX } from "lucide-react";
import React, { useEffect } from "react";
import { createPortal } from "react-dom";
import { useState } from "react";
import { useFlashcards } from "../context/FlashcardsContext";

export const CardModal = ({ isOpen, onClose }) => {
  const [cardCategory, setCardCategory] = useState("All Categorys");
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");
  const { createCard, setToggleToast, setToastMessage } = useFlashcards();

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
      <form
        role="dialog"
        aria-modal="true"
        aria-labelledby="create-card-title"
        className="bg-white p-10 border-2 border-r-3 border-b-4 flex flex-col rounded-3xl relative z-40 shadow-2xl bg-[url('/public/pattern-flashcard-bg.svg')]"
        onClick={(e) => e.stopPropagation()}
        onSubmit={(e) => {
          // Prevent default navigation first so browser validation and JS
          // validation can run without triggering a reload.
          e.preventDefault();
          if (!question.trim() || !answer.trim() || !cardCategory) return;
          createCard({
            category: cardCategory,
            question: question,
            answer: answer,
          });
          onClose();
          setQuestion("");
          setAnswer("");
          setToggleToast(true);
          setToastMessage("Card created");
          setCardCategory("All Categorys");
        }}
      >
        <button
          aria-label="Close dialog"
          className="place-self-end absolute top-4 right-4"
          onClick={onClose}
          type="button"
        >
          <CircleX className="scale-150" />
        </button>
        <span id="create-card-title" className="text-xl font-bold">
          Create a new Card
        </span>
        <div className=" flex flex-col gap-5">
          <label htmlFor="selectAllCard" className="sr-only">
            Filter by category
          </label>
          <select
            name="selectAllCard"
            id="selectAllCard"
            required
            className="bg-white mt-5 w-fit p-2 font-semibold rounded-xl border-2 border-r-3 border-b-4"
            value={cardCategory}
            onChange={(e) => {
              setCardCategory(e.target.value);
            }}
          >
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
          <div className="flex flex-col">
            <label htmlFor="front">Frontside / Question</label>
            <input
              className=" p-2 rounded-xl border-2 border-r-3 border-b-4"
              type="text"
              value={question}
              name="front"
              id="front"
              required
              onChange={(e) => setQuestion(e.target.value)}
            />
          </div>
          <div className="flex flex-col">
            <label htmlFor="back">Backside / Answer</label>
            <input
              className=" p-2 rounded-xl border-2 border-r-3 border-b-4"
              value={answer}
              type="text"
              name="back"
              id="back"
              required
              onChange={(e) => setAnswer(e.target.value)}
            />
          </div>
          <div className="flex gap-5 items-center justify-center">
            <button
              type="submit"
              className="p-2 rounded-xl border-2 border-r-3 border-b-4"
            >
              Create
            </button>
            <button
              type="reset"
              className="p-2 rounded-xl border-2 border-r-3 border-b-4"
              onClick={() => {
                setQuestion("");
                setAnswer("");
                setCardCategory("All Categorys");
              }}
            >
              Reset
            </button>
          </div>
        </div>
      </form>
    </div>,
    document.body,
  );
};
