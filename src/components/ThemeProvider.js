"use client";

import { useState, useEffect, createContext, useContext } from "react";

const ThemeCtx = createContext({ theme: "navy-gold", setTheme: () => {}, toggle: () => {} });

export function useTheme() {
  return useContext(ThemeCtx);
}

/**
 * Sets data-theme on <html>. Order of precedence:
 *  1. Visitor's saved choice (localStorage) — item 15 "let me select"
 *  2. Admin default from the Excel (passed as defaultTheme)
 */
export default function ThemeProvider({ defaultTheme = "navy-gold", children }) {
  const [theme, setThemeState] = useState(defaultTheme);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    let initial = defaultTheme;
    try {
      const saved = localStorage.getItem("bima-theme");
      if (saved === "white" || saved === "navy-gold") initial = saved;
    } catch {}
    setThemeState(initial);
    document.documentElement.setAttribute("data-theme", initial);
    setReady(true);
  }, [defaultTheme]);

  function setTheme(t) {
    setThemeState(t);
    document.documentElement.setAttribute("data-theme", t);
    try { localStorage.setItem("bima-theme", t); } catch {}
  }

  function toggle() {
    setTheme(theme === "white" ? "navy-gold" : "white");
  }

  return (
    <ThemeCtx.Provider value={{ theme, setTheme, toggle, ready }}>
      {children}
    </ThemeCtx.Provider>
  );
}
