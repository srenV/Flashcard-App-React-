import React, { createContext, useContext, useEffect, useState } from "react";

/*
  FlashcardsContext: centralized state for flashcards.

  Exposed values:
  - `flashcards` (Array): current list of card objects.
  - `setFlashcards` (Function): replace the entire list (used sparingly).
  - `updateKnownCount(id)` / `resetKnownCount(id)` : helpers to mutate a
     single card's progress while keeping state updates immutable.

  Notes:
  - Consumers should prefer the provided helper functions instead of
    manipulating `flashcards` directly to ensure localStorage stays in sync.
*/
const FlashcardsContext = createContext({
  flashcards: [],
  setFlashcards: () => {},
  updateFlashcards: () => {},
});

export const FlashcardsProvider = ({ children }) => {
  // Lazy initialize state from localStorage.
  // Implementation detail: the function form of `useState` runs once during
  // initial render to synchronously read persisted JSON. This avoids an
  // extra render that would occur if we read storage inside `useEffect`.
  const [flashcards, setFlashcards] = useState(() => {
    try {
      const saved = localStorage.getItem("flashcards_data");
      return saved ? JSON.parse(saved) : [];
    } catch {
      // Defensive: if localStorage contains invalid JSON, fall back to []
      // rather than throwing and breaking the app.
      return [];
    }
  });

  useEffect(() => {
    // Bootstrapping: when the in-memory list is empty, attempt to populate it
    // from `/data.json` (sample dataset shipped with the app). We only write
    // the fetched sample into localStorage if localStorage does not already
    // contain `flashcards_data` (prevents overwriting user progress).
    // Dependency: `flashcards.length` ensures this effect runs only when the
    // list is empty or when its length changes.
    if (flashcards.length === 0) {
      fetch("/data.json")
        .then((res) => res.json())
        .then((data) => {
          const saved = localStorage.getItem("flashcards_data");
          const initialData = data.flashcards || [];
          if (!saved) {
            localStorage.setItem(
              "flashcards_data",
              JSON.stringify(initialData),
            );
            setFlashcards(initialData);
          }
        })
        .catch(() => {
          // Network or parsing errors are non-fatal; the app can operate with []
        });
    }
  }, [flashcards.length]);

  /**
   * updateKnownCount(id)
   * - Functional update to avoid stale state in concurrent renders.
   * - Immutable mapping: create a new array with the updated card object.
   * - Prevent overflow: do not increment when knownCount === 5.
   * - Persist the computed array to localStorage inside a try/catch to
   *   avoid throwing in restricted environments.
   */
  const updateKnownCount = (id) => {
    setFlashcards((prevFlashcards) => {
      const updated = prevFlashcards.map((flashcard) =>
        flashcard.id === id && flashcard.knownCount !== 5
          ? { ...flashcard, knownCount: (flashcard.knownCount || 0) + 1 }
          : flashcard,
      );
      try {
        localStorage.setItem("flashcards_data", JSON.stringify(updated));
      } catch (e) {
        // Persist failure is non-fatal; we still return updated state.
      }
      return updated;
    });
  };

  /**
   * resetKnownCount(id)
   * - Replace the targeted card's `knownCount` with 0.
   * - Persist the new array to localStorage; ignore persistence errors.
   */
  const resetKnownCount = (id) => {
    setFlashcards((prevFlashcards) => {
      const updated = prevFlashcards.map((flashcard) =>
        flashcard.id === id ? { ...flashcard, knownCount: 0 } : flashcard,
      );
      try {
        localStorage.setItem("flashcards_data", JSON.stringify(updated));
      } catch (e) {
        // ignore storage errors
      }
      return updated;
    });
  };

  const resetAllKnownCount = () => {
    setFlashcards((prevFlashcards) => {
      const updated = prevFlashcards.map((flashcard) =>
        flashcard  = { ...flashcard, knownCount: 0 } );
      try {
        localStorage.setItem("flashcards_data", JSON.stringify(updated));
      } catch (e) {
        // ignore storage errors
      }
      return updated;
    });
  };

  const categoryColor = [
    {category: "JavaScript", color: "yellow"},
    {category: "HTML", color: "grey"},
    {category: "CSS", color: "lightblue"},
    {category: "Web Development", color: "aquamarine"},
    {category: "Mathematics", color: "aliceblue"},
    {category: "Literature", color: "bisque"},
    {category: "Science", color: "ghostwhite"},
    {category: "History", color: "lightcoral"},
    {category: "Geography", color: "olivedrab"},
  ]



  // Context provider: expose current state and mutation helpers to consumers.
  // Consumers should treat `flashcards` as read-only and use helpers to mutate
  // individual cards which guarantees localStorage synchronization.
  return (
    <FlashcardsContext.Provider
      value={{ flashcards, setFlashcards, updateKnownCount, resetKnownCount, resetAllKnownCount, categoryColor }}
    >
      {children}
    </FlashcardsContext.Provider>
  );
};

export const useFlashcards = () => useContext(FlashcardsContext);

export default FlashcardsContext;
