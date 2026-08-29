"use client";

import React, { useEffect, useState } from "react";

/** Thin progress bar pinned to the very top of the viewport, tracking scroll depth. */
export default function ScrollProgressBar() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    let frame: number | null = null;

    const updateProgress = () => {
      frame = null;
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      setProgress(docHeight > 0 ? Math.min(100, (scrollTop / docHeight) * 100) : 0);
    };

    const onScroll = () => {
      if (frame === null) frame = requestAnimationFrame(updateProgress);
    };

    updateProgress();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (frame !== null) cancelAnimationFrame(frame);
    };
  }, []);

  return (
    <div className="fixed top-0 left-0 right-0 z-50 h-[3px] bg-transparent pointer-events-none" aria-hidden="true">
      <div
        className="h-full bg-gradient-to-r from-brand-500 to-tealAccent-500 transition-[width] duration-150 ease-out"
        style={{ width: `${progress}%` }}
      />
    </div>
  );
}
