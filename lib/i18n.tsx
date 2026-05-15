"use client";

import { createContext, useContext, useEffect } from "react";
import { hu, type Dict } from "./translations/hu";
import { en } from "./translations/en";

export type Lang = "hu" | "en";

export const dictionaries: Record<Lang, Dict> = { hu, en };

type Ctx = { lang: Lang; t: Dict };

const LangCtx = createContext<Ctx>({ lang: "hu", t: hu });

export function LangProvider({
  lang,
  children,
}: {
  lang: Lang;
  children: React.ReactNode;
}) {
  // Sync the <html lang> attribute so screen readers and the browser see the
  // correct language. Root layout ships lang="hu"; EN pages flip it on mount.
  useEffect(() => {
    if (typeof document !== "undefined") {
      document.documentElement.lang = lang;
    }
  }, [lang]);

  return (
    <LangCtx.Provider value={{ lang, t: dictionaries[lang] }}>
      {children}
    </LangCtx.Provider>
  );
}

export function useT(): Dict {
  return useContext(LangCtx).t;
}

export function useLang(): Lang {
  return useContext(LangCtx).lang;
}

/** Build a locale-aware href: HU lives at "/", EN at "/en". */
export function localePath(lang: Lang, path: string): string {
  // For in-page anchors, just return the anchor — they stay on the same page.
  if (path.startsWith("#")) return path;
  if (lang === "hu") return path === "/" ? "/" : path;
  return path === "/" ? "/en" : `/en${path}`;
}
