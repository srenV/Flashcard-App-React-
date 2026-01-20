import React from "react";

// Header contains the app logo and the top toggle between Study mode and All Cards
export const Header = ({ learnMode, setLearnMode }) => {
  return (
    <div className="w-full mx-auto flex items-center justify-between">
      <div>
        {/* Responsive logo: large image for desktop, small otherwise */}
        <picture>
          <source media="(min-width: 1024px)" srcSet="/logo-large.svg" />
          <img src="/logo-small.svg" alt="App-Logo" />
        </picture>
      </div>

      {/* Toggle button flips the `learnMode` boolean in the parent */}
      <button
        className=" grid grid-cols-2 border-2 p-3 gap-6 relative rounded-full border-b-4 cursor-pointer w-fit"
        onClick={() => setLearnMode(!learnMode)}
      >
        <div
          className={`absolute bg-amber-400 w-1/2 h-9/10 border-2 rounded-full duration-300 z-2 top-0.75 ${learnMode ? "translate-x-2/100" : "translate-x-98/100"}`}
        ></div>
        <div className="z-10 w-1/2 font-bold">Studymode</div>
        <div className="z-10 w-1/2 translate-x-2 font-bold place-items-center">
          <span className="text-nowrap">All Cards</span>
        </div>
      </button>
    </div>
  );
};
