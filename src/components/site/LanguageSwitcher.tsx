import { useTranslation } from "react-i18next";
import { useLocation, useNavigate } from "react-router-dom";
import { ChevronDown } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils";

type Lang = "en" | "el" | "ru" | "he" | "zh" | "ar-LB" | "uk" | "de" | "fr" | "es" | "ro" | "pl" | "bg";

type Props = {
  surface?: "dark" | "light";
  className?: string;
};

const languages: Lang[] = ["en", "el", "ru", "he", "zh", "ar-LB", "uk", "de", "fr", "es", "ro", "pl", "bg"];
const prefixedLanguages: Lang[] = ["el", "ru", "he", "zh", "ar-LB", "uk", "de", "fr", "es", "ro", "pl", "bg"];

const languagePrefixes: Record<Lang, string> = {
  en: "",
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

const prefixToLanguage: Record<string, Lang> = {
  el: "el",
  ru: "ru",
  he: "he",
  zh: "zh",
  "ar-lb": "ar-LB",
  uk: "uk",
  de: "de",
  fr: "fr",
  es: "es",
  ro: "ro",
  pl: "pl",
  bg: "bg",
};

const flagCode: Record<Lang, string> = {
  en: "gb",
  el: "gr",
  ru: "ru",
  he: "il",
  zh: "cn",
  "ar-LB": "lb",
  uk: "ua",
  de: "de",
  fr: "fr",
  es: "es",
  ro: "ro",
  pl: "pl",
  bg: "bg",
};

const labels: Record<Lang, string> = {
  en: "English",
  el: "Ελληνικά",
  ru: "Русский",
  he: "עברית",
  zh: "中文",
  "ar-LB": "العربية",
  uk: "Українська",
  de: "Deutsch",
  fr: "Français",
  es: "Español",
  ro: "Română",
  pl: "Polski",
  bg: "Български",
};

const flagSrc = (code: string) => `https://flagcdn.com/w40/${code}.png`;
const flagSrcSet = (code: string) =>
  `https://flagcdn.com/w80/${code}.png 2x`;

const normalizeLanguage = (language: string): Lang => {
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

const stripLanguagePrefix = (pathname: string) => {
  const cleanPath = pathname || "/";
  const parts = cleanPath.split("/").filter(Boolean);
  const first = parts[0]?.toLowerCase();

  if (first && prefixToLanguage[first]) {
    const remaining = parts.slice(1).join("/");
    return remaining ? `/${remaining}` : "/";
  }

  return cleanPath;
};

const getLocalizedPath = (pathname: string, language: Lang) => {
  const basePath = stripLanguagePrefix(pathname);

  if (!prefixedLanguages.includes(language)) {
    return basePath;
  }

  const prefix = languagePrefixes[language];
  return basePath === "/" ? `/${prefix}` : `/${prefix}${basePath}`;
};

const LanguageSwitcher = ({ surface = "light", className }: Props) => {
  const { i18n, t } = useTranslation();
  const location = useLocation();
  const navigate = useNavigate();
  const current: Lang = normalizeLanguage(i18n.language || "en");

  const change = (lng: Lang) => {
    if (lng === current) return;

    const nextPath = `${getLocalizedPath(location.pathname, lng)}${location.search}${location.hash}`;

    void i18n.changeLanguage(lng);
    navigate(nextPath);
  };

  const triggerChevron = surface === "dark" ? "text-white/80" : "text-foreground/70";

  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        aria-label={t("header.language")}
        className={cn(
          "inline-flex items-center gap-1.5 rounded-full p-1 transition-base hover:opacity-80 focus:outline-none focus-visible:ring-2 focus-visible:ring-accent",
          className
        )}
      >
        <img
          src={flagSrc(flagCode[current])}
          srcSet={flagSrcSet(flagCode[current])}
          alt={labels[current]}
          className="w-7 h-5 rounded-sm object-cover"
          loading="lazy"
          width={28}
          height={20}
        />
        <ChevronDown className={cn("h-3.5 w-3.5", triggerChevron)} />
      </DropdownMenuTrigger>
      <DropdownMenuContent
        align="end"
        className="min-w-[8rem] bg-white/90 backdrop-blur-md border-white/40"
      >
        {languages.map((lng) => (
          <DropdownMenuItem
            key={lng}
            onClick={() => change(lng)}
            className={cn(
              "flex items-center gap-2 cursor-pointer",
              current === lng && "bg-accent/10 font-semibold"
            )}
          >
            <img
              src={flagSrc(flagCode[lng])}
              srcSet={flagSrcSet(flagCode[lng])}
              alt={labels[lng]}
              className="w-6 h-4 rounded-sm object-cover"
              loading="lazy"
              width={24}
              height={16}
            />
            <span className="text-sm">{labels[lng]}</span>
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default LanguageSwitcher;
