/*
  Header
  - Top bar containing the app logo and controls to create cards/decks and
    toggle between 'Study' and 'Cards' modes.
  - Responsible for opening modals and triggering toasts via context helpers.
*/
import React from "react";
import { useState } from "react";
import { CardModal } from "../components/CardModal";
import { DeckModal } from "../components/DeckModal";
import { FilePlus, FolderPlusIcon } from "lucide-react";
import { Toast } from "../components/Toast";
import { useFlashcards } from "../context/FlashcardsContext";
import { AnimatePresence, motion } from "motion/react";

// Header contains the app logo and the top toggle between Study mode and All Cards
export const Header = ({ learnMode, setLearnMode }) => {
  const { setToastMessage, toastMessage, toggleToast } = useFlashcards();
  const [isCardModalOpen, setIsCardModalOpen] = useState(false);
  const [isDeckModalOpen, setIsDeckModalOpen] = useState(false);

  return (
    <div className={`w-full mx-auto flex items-center justify-between `}>
      <AnimatePresence>
        {toggleToast && <Toast key="toast">{toastMessage}</Toast>}
      </AnimatePresence>
      <CardModal
        isOpen={isCardModalOpen}
        onClose={() => setIsCardModalOpen(false)}
      ></CardModal>
      <DeckModal
        isOpen={isDeckModalOpen}
        onClose={() => setIsDeckModalOpen(false)}
      ></DeckModal>

      <div>
        {/* Responsive logo: large image for desktop, small otherwise */}
        <picture>
          <source media="(min-width: 1024px)" srcSet="/logo-large.svg" />
          <img src="/logo-small.svg" alt="App-Logo" />
        </picture>
      </div>

      {/* Toggle button flips the `learnMode` boolean in the parent */}
      <div className="flex gap-1 md:gap-5">
        {/* <button
          className="flex font-semibold items-center gap-2 text-xl p-2 border-2 border-r-4 border-b-4 rounded-2xl"
          onClick={() => setIsDeckModalOpen(true)}
        >
          <FolderPlusIcon /><span className="hidden md:block">Create Deck</span>
        </button> */}
        <button
          aria-haspopup="dialog"
          aria-expanded={isCardModalOpen}
          aria-label="Open create card dialog"
          className="flex font-semibold items-center text-xl gap-2 p-2 border-2 border-r-4 border-b-4 rounded-2xl"
          onClick={() => setIsCardModalOpen(true)}
        >
          <FilePlus /> <span className="hidden md:block">Create Card</span>
        </button>
        <button
          aria-pressed={learnMode}
          aria-label="Toggle study mode"
          className=" flex border-2 p-3 gap-6 relative rounded-full justify-around border-b-4 cursor-pointer w-fit"
          onClick={() => {
            setLearnMode(!learnMode);
            setToastMessage("Card created!");
          }}
        >
          <div
            className={` absolute bg-amber-400 w-1/2 h-9/10 border-2 rounded-full duration-300 z-2 top-0.75 left-0 ${learnMode ? "translate-x-5/100" : "translate-x-95/100"}`}
          ></div>
          <div className="z-10 w-1/2 font-bold ">Study</div>
          <div className="z-10 w-1/2 font-bold">
            <span className="text-nowrap">Cards</span>
          </div>
        </button>
      </div>
    </div>
  );
};
