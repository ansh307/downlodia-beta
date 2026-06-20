"use client";

import { useEffect } from "react";
import confetti from "canvas-confetti";

export default function Confetti() {
  useEffect(() => {
    // Single optimized burst
    confetti({
      particleCount: 120,
      spread: 80,
      startVelocity: 40,
      decay: 0.9,
      scalar: 1,
      origin: { y: 0.6 },
      colors: ["#4f46e5", "#6366f1", "#818cf8"], // indigo theme
    });
  }, []);

  return null;
}
