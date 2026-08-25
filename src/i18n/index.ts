import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";
import en from "./locales/en.json";
import el from "./locales/el.json";
import ru from "./locales/ru.json";
import he from "./locales/he.json";
import zh from "./locales/zh.json";
import arLB from "./locales/ar-LB.json";
import uk from "./locales/uk.json";
import de from "./locales/de.json";
import fr from "./locales/fr.json";
import es from "./locales/es.json";
import ro from "./locales/ro.json";
import pl from "./locales/pl.json";
import bg from "./locales/bg.json";

export const RTL_LANGS = ["he", "ar", "ar-LB", "ar-lb", "fa", "ur"];

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources: {
      en: { translation: en },
      el: { translation: el },
      ru: { translation: ru },
      he: { translation: he },
      zh: { translation: zh },
      "ar-LB": { translation: arLB },
      "ar-lb": { translation: arLB },
      uk: { translation: uk },
      de: { translation: de },
      fr: { translation: fr },
      es: { translation: es },
      ro: { translation: ro },
      pl: { translation: pl },
      bg: { translation: bg },
    },
    fallbackLng: "en",
    supportedLngs: ["en", "el", "ru", "he", "zh", "ar-LB", "ar-lb", "uk", "de", "fr", "es", "ro", "pl", "bg"],
    interpolation: { escapeValue: false },
    detection: {
      order: ["path", "localStorage", "htmlTag"],
      lookupFromPathIndex: 0,
      lookupLocalStorage: "neurora_lang",
      caches: ["localStorage"],
      checkWhitelist: true,
    },
    react: { useSuspense: false },
  });

const getHtmlLanguage = (lng: string) => {
  const lower = (lng || "en").toLowerCase();
  if (lower === "ar-lb" || lower.startsWith("ar")) return "ar-LB";
  if (lower.startsWith("zh")) return "zh-CN";
  return lower.split("-")[0];
};

const applyDir = (lng: string) => {
  const htmlLanguage = getHtmlLanguage(lng);
  const dir = htmlLanguage === "he" || htmlLanguage === "ar-LB" ? "rtl" : "ltr";

  if (typeof document !== "undefined") {
    document.documentElement.setAttribute("dir", dir);
    document.documentElement.setAttribute("lang", htmlLanguage);
  }
};

applyDir(i18n.language);
i18n.on("languageChanged", applyDir);

export default i18n;
