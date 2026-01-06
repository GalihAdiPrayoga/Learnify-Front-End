import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";

export const Sheet = ({ children, open, onOpenChange }) => {
  return (
    <AnimatePresence>
      {open && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => onOpenChange(false)}
            className="fixed inset-0 bg-black/50 z-50"
          />

          {/* Sheet Container */}
          <div className="fixed inset-0 z-50 pointer-events-none">
            {children}
          </div>
        </>
      )}
    </AnimatePresence>
  );
};

export const SheetContent = ({ children, side = "right", className = "" }) => {
  const sideVariants = {
    right: {
      initial: { x: "100%" },
      animate: { x: 0 },
      exit: { x: "100%" },
      className: "right-0 top-0 h-full",
    },
    left: {
      initial: { x: "-100%" },
      animate: { x: 0 },
      exit: { x: "-100%" },
      className: "left-0 top-0 h-full",
    },
    top: {
      initial: { y: "-100%" },
      animate: { y: 0 },
      exit: { y: "-100%" },
      className: "top-0 left-0 w-full",
    },
    bottom: {
      initial: { y: "100%" },
      animate: { y: 0 },
      exit: { y: "100%" },
      className: "bottom-0 left-0 w-full",
    },
  };

  const variant = sideVariants[side];

  return (
    <motion.div
      initial={variant.initial}
      animate={variant.animate}
      exit={variant.exit}
      transition={{ type: "spring", damping: 30, stiffness: 300 }}
      className={`fixed ${variant.className} bg-white shadow-xl pointer-events-auto ${className}`}
    >
      {children}
    </motion.div>
  );
};

export const SheetHeader = ({ children, className = "" }) => {
  return (
    <div
      className={`flex flex-col space-y-2 text-center sm:text-left ${className}`}
    >
      {children}
    </div>
  );
};

export const SheetTitle = ({ children, className = "" }) => {
  return (
    <h2 className={`text-lg font-semibold text-gray-900 ${className}`}>
      {children}
    </h2>
  );
};

export const SheetDescription = ({ children, className = "" }) => {
  return <p className={`text-sm text-gray-500 ${className}`}>{children}</p>;
};

export const SheetClose = ({ onClick, className = "" }) => {
  return (
    <button
      onClick={onClick}
      className={`absolute right-4 top-4 rounded-sm opacity-70 ring-offset-white transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-offset-2 disabled:pointer-events-none ${className}`}
    >
      <X className="h-4 w-4" />
      <span className="sr-only">Close</span>
    </button>
  );
};

export const SheetFooter = ({ children, className = "" }) => {
  return (
    <div
      className={`flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-2 ${className}`}
    >
      {children}
    </div>
  );
};
