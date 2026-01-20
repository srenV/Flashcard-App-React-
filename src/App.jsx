import {  useState } from "react";
import "./App.css";
import { Header } from "./layout/Header";
import { LeftSection } from "./sections/LeftSection";
import { RightSection } from "./sections/RightSection";
import { FlashcardsProvider } from "./context/FlashcardsContext";
import { AllCards } from "./sections/AllCards";
import { Footer } from "./layout/Footer";


// Root application component. Wraps the app in `FlashcardsProvider` so child
// components can access and modify the flashcards state via context.
function App() {
  // `learnMode` toggles between study view and the all-cards listing
  const [learnMode, setLearnMode] = useState(true);


  return (
    <FlashcardsProvider>
      <div className="bg-[#f7f3f0] min-w-screen min-h-screen mx-auto justify-between flex flex-col gap-5 pt-5 p-5 ">
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
          <Footer/>
      </div>

      {/* Simple footer links */}
    </FlashcardsProvider>
  );
}

export default App;
