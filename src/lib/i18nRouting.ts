export const PREFIXED_LANGS = ["el", "ru", "he", "zh", "ar-LB", "uk", "de", "fr", "es", "ro", "pl", "bg"] as const;
export type PrefixedLanguage = (typeof PREFIXED_LANGS)[number];

export const LANGUAGE_PREFIXES: Record<PrefixedLanguage, string> = {
  el: "el",
  ru: "ru",
  he: "he",
  zh: "zh",
  "ar-LB": "ar-lb",
  uk: "uk",
  de: "de",
  fr: "fr",
  es: "es",
  ro: "ro",
  pl: "pl",
  bg: "bg",
};

export const normalizeLanguage = (language: string) => {
  const lower = (language || "en").toLowerCase();

  if (lower === "ar-lb" || lower.startsWith("ar")) return "ar-LB";
  if (lower.startsWith("uk")) return "uk";
  if (lower.startsWith("de")) return "de";
  if (lower.startsWith("fr")) return "fr";
  if (lower.startsWith("es")) return "es";
  if (lower.startsWith("ro")) return "ro";
  if (lower.startsWith("pl")) return "pl";
  if (lower.startsWith("bg")) return "bg";
  if (lower.startsWith("zh")) return "zh";
  if (lower.startsWith("el")) return "el";
  if (lower.startsWith("ru")) return "ru";
  if (lower.startsWith("he")) return "he";

  return "en";
};

export const getLocalizedPath = (path: string, language: string) => {
  const normalized = normalizeLanguage(language);

  if (!PREFIXED_LANGS.includes(normalized as PrefixedLanguage)) {
    return path;
  }

  const prefix = LANGUAGE_PREFIXES[normalized as PrefixedLanguage];
  return path === "/" ? `/${prefix}` : `/${prefix}${path}`;
};
