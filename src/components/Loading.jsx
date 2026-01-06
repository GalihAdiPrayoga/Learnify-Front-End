import React from "react";
import { motion } from "framer-motion";

export default function Loading() {
  const spinnerVariants = {
    animate: {
      rotate: 360,
      transition: {
        duration: 1,
        repeat: Infinity,
        ease: "linear",
      },
    },
  };

  const dotVariants = {
    animate: (i) => ({
      y: [0, -10, 0],
      transition: {
        duration: 1.4,
        repeat: Infinity,
        delay: i * 0.15,
      },
    }),
  };

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="flex flex-col items-center gap-6">
        {/* Spinner */}
        <motion.div
          className="w-16 h-16 border-4 border-zinc-700 border-t-zinc-400 rounded-full"
          variants={spinnerVariants}
          animate="animate"
        />

        {/* Loading Text dengan animasi dots */}
        <div className="flex items-center gap-1">
          <span className="text-gray-400 text-lg">Loading</span>
          {[0, 1, 2].map((i) => (
            <motion.span
              key={i}
              className="text-zinc-400 text-lg"
              custom={i}
              variants={dotVariants}
              animate="animate"
            >
              .
            </motion.span>
          ))}
        </div>
      </div>
    </div>
  );
}
