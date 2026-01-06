import React from "react";
import { Link } from "react-router-dom";

export default function Logo({
  to = "/user/landing",
  size = "md",
  showText = true,
}) {
  return (
    <Link to={to} className="flex items-center gap-2">
      {showText && (
        <span className="font-bold text-2xl sm:text-xl">Learnify</span>
      )}
    </Link>
  );
}
