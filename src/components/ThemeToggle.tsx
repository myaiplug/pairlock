"use client";

import { useEffect, useState } from "react";

export default function ThemeToggle() {
  const [dark, setDark] = useState(true);

  useEffect(() => {
    const stored = localStorage.getItem("pairlock-theme");
    const next = stored ? stored === "dark" : true;
    setDark(next);
    document.documentElement.classList.toggle("dark", next);
    document.documentElement.classList.toggle("light", !next);
  }, []);

  function toggle() {
    const next = !dark;
    setDark(next);
    document.documentElement.classList.toggle("dark", next);
    document.documentElement.classList.toggle("light", !next);
    localStorage.setItem("pairlock-theme", next ? "dark" : "light");
  }

  return (
    <button type="button" onClick={toggle} className="hud-btn" aria-label="Toggle theme">
      {dark ? "\uD83C\uDF19" : "\uD83C\uDF1E"}
    </button>
  );
}
