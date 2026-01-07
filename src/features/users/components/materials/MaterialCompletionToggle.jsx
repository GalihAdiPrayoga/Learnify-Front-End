import React from "react";
import { motion } from "framer-motion";
import { Bookmark } from "lucide-react";

const MaterialCompletionToggle = ({ isCompleted, isToggling, onToggle }) => {
  return (
    <div className="max-w-5xl mx-auto px-6 mt-6">
      <motion.button
        onClick={onToggle}
        whileTap={{ scale: 0.98 }}
        aria-pressed={isCompleted}
        disabled={isToggling}
        className={`w-full py-3 px-4 rounded-full flex items-center justify-center gap-3 font-semibold text-white shadow-sm ${
          isCompleted
            ? "bg-linear-to-r from-emerald-400 to-green-600 hover:from-emerald-500 hover:to-green-700"
            : "bg-linear-to-r from-sky-500 to-indigo-600 hover:from-sky-600 hover:to-indigo-700"
        }`}
      >
        <span
          className={`inline-flex items-center justify-center w-9 h-9 rounded-full bg-white/20 ${
            isCompleted ? "ring-1 ring-white/30" : "ring-0"
          }`}
        >
          {isToggling ? (
            <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
          ) : (
            <Bookmark
              className={`w-5 h-5 ${
                isCompleted ? "text-white" : "text-white/90"
              }`}
            />
          )}
        </span>
        <span className="text-sm">
          {isCompleted ? "Batal Selesai" : "Tandai Materi Selesai"}
        </span>
      </motion.button>
    </div>
  );
};

export default MaterialCompletionToggle;
