import { useEffect, useState } from "react";
import "./App.css";
import { Header } from "./layout/Header";
import { LeftSection } from "./sections/LeftSection";
import { RightSection } from "./sections/RightSection";
import { FlashcardsProvider } from "./context/FlashcardsContext";
import { AllCards } from "./sections/AllCards";


// Root application component. Wraps the app in `FlashcardsProvider` so child
// components can access and modify the flashcards state via context.
function App() {
  // `learnMode` toggles between study view and the all-cards listing
  const [learnMode, setLearnMode] = useState(true);
  const [mode, setMode] = useState();


  return (
    <FlashcardsProvider>
      <div className="bg-[#f7f3f0] min-w-screen mx-auto flex flex-col gap-5 pt-5 p-5 2xl:px-50">
          <div className="flex flex-col gap-5">
            <Header learnMode={learnMode} setLearnMode={setLearnMode} />

            {/* Main area: switch between learning layout and all-cards view */}
            {learnMode ? (
              <main className="w-full flex flex-col gap-10 lg:flex-row">
                <LeftSection />
                <RightSection />
              </main>
            ) : (
              <main className="w-full flex flex-col gap-10 lg:flex-row">
                <AllCards />
              </main>
            )}
          </div>

        <footer className="flex justify-between p-2 px-5 border-2 border-r-4 border-b-4 rounded-full font-semibold">
          <div className="flex gap-5">
            <a href="https://github.com/srenV">GitHub</a>
            <a href="https://www.linkedin.com/in/soren-timo-voigt/">LinkedIn</a>
          </div>
          <div>
            <span>
              Challenge from{" "}
              <a
                href="https://www.frontendmentor.io/challenges/flashcard-app"
                className="text-blue-400"
              >
                {" "}
                FrontendMentor
              </a>
            </span>
          </div>
          <div className="flex gap-5">
            <a href="https://srenv.vercel.app/impressum" target="_blank">
              Impressum
            </a>
            <a href="https://srenv.vercel.app/legal" target="_blank">
              Privacy Policy
            </a>
          </div>
        </footer>
      </div>

      {/* Simple footer links */}
    </FlashcardsProvider>
  );
}

export default App;
