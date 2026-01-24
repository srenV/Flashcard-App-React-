/*
  Toast
  - Small presentational notification component used to show short
    feedback messages (e.g. "Card created" / "Card deleted").
  - Designed to be mounted/unmounted by a parent wrapped in
    `AnimatePresence` so that the component's `exit` animation can run.
  - Uses `motion` for enter/exit transitions.
*/
import { MessageSquareWarning } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import React from "react";

export const Toast = ({ children }) => {
  return (
    <motion.div
      role="status"
      aria-live="polite"
      aria-atomic="true"
      className="overflow-hidden absolute top-1 left-0 right-0 scale-80 w-svw h-2/10 md:top-auto md:left-auto md:scale-100 md:bottom-8 md:right-10 z-100 md:w-1/10 md:h-1/10 border-2 border-b-4 border-r-3 rounded-2xl bg-white flex items-center justify-center md:animate-bounce"
      initial={{ opacity: 0, scale: 0.6 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.6 }}
      transition={{ duration: 0.5 }}
    >
      <MessageSquareWarning className="absolute scale-500 text-gray-600/20 right-12" />
      <h2 className="text-3xl font-bold">{children}</h2>
    </motion.div>
  );
};
