"use client";

import React, { useEffect, useState } from "react";
import { ArrowUp } from "lucide-react";

/** Floating scroll-to-top button that fades in once the user has scrolled past the hero. */
export default function BackToTop() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 800);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <button
      type="button"
      onClick={scrollToTop}
      aria-label="Back to top"
      className={`fixed bottom-6 right-6 z-40 w-11 h-11 rounded-full bg-brand-500 hover:bg-brand-600 active:bg-brand-700 text-white shadow-lg flex items-center justify-center transition-all duration-300 ease-out focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500 focus-visible:ring-offset-2 ${
        visible ? "opacity-100 translate-y-0 pointer-events-auto" : "opacity-0 translate-y-4 pointer-events-none"
      }`}
    >
      <ArrowUp className="w-5 h-5" />
    </button>
  );
}
