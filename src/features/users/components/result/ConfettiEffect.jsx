import { useEffect } from "react";
import confetti from "canvas-confetti";

export default function ConfettiEffect({ show = false }) {
  useEffect(() => {
    if (!show) return;
    const t = setTimeout(() => {
      confetti({
        particleCount: 160,
        spread: 70,
        origin: { y: 0.6 },
      });
    }, 150);
    return () => clearTimeout(t);
  }, [show]);

  return null;
}
