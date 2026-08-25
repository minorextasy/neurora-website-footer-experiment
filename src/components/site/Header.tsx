import { useEffect, useMemo, useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { Menu, X } from "lucide-react";
import { useTranslation } from "react-i18next";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import LanguageSwitcher from "./LanguageSwitcher";
import Logo from "./Logo";

const PREFIXED_LANGS = ["el", "ru", "he", "zh", "ar-LB", "uk", "de", "fr", "es", "ro", "pl", "bg"] as const;
type PrefixedLanguage = (typeof PREFIXED_LANGS)[number];

const LANGUAGE_PREFIXES: Record<PrefixedLanguage, string> = {
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

const navLinks = [
  {
    key: "home",
    to: "/",
  },
  {
    key: "about",
    to: "/about",
  },
  {
    key: "services",
    to: "/services",
  },
  {
    key: "howItWorks",
    to: "/neurora-operating-system",
  },
  {
    key: "contact",
    to: "/contact",
  },
] as const;

const normalizeLanguage = (language: string) => {
  const lower = (language || "en").toLowerCase();

  if (lower === "ar-lb" || lower.startsWith("ar")) return "ar-LB";
  if (lower.startsWith("zh")) return "zh";
  if (lower.startsWith("uk")) return "uk";
  if (lower.startsWith("de")) return "de";
  if (lower.startsWith("fr")) return "fr";
  if (lower.startsWith("es")) return "es";
  if (lower.startsWith("ro")) return "ro";
  if (lower.startsWith("pl")) return "pl";
  if (lower.startsWith("bg")) return "bg";
  if (lower.startsWith("el")) return "el";
  if (lower.startsWith("ru")) return "ru";
  if (lower.startsWith("he")) return "he";

  return "en";
};

const getLocalizedPath = (path: string, language: string) => {
  const normalized = normalizeLanguage(language);

  if (!PREFIXED_LANGS.includes(normalized as PrefixedLanguage)) {
    return path;
  }

  const prefix = LANGUAGE_PREFIXES[normalized as PrefixedLanguage];
  return path === "/" ? `/${prefix}` : `/${prefix}${path}`;
};

const Header = () => {
  const { t, i18n } = useTranslation();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  const localizedNavLinks = useMemo(
    () =>
      navLinks.map((link) => ({
        ...link,
        localizedTo: getLocalizedPath(link.to, i18n.language),
      })),
    [i18n.language]
  );

  const localizedHome = getLocalizedPath("/", i18n.language);
  const localizedContact = getLocalizedPath("/contact", i18n.language);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Auto-close burger menu on scroll
  useEffect(() => {
    if (!open) return;
    const onScroll = () => setOpen(false);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [open]);

  return (
    <header
      className={cn(
        "fixed top-0 inset-x-0 z-50 transition-smooth",
        scrolled
          ? "bg-background/50 backdrop-blur-md border-b border-border/40 shadow-soft"
          : "bg-transparent"
      )}
    >
      <div className="container-narrow h-20 relative">
        {/* Desktop header: three independent zones so the centered logo can never be overlapped */}
        <div className="hidden lg:grid h-full grid-cols-[minmax(0,1fr)_auto_minmax(0,1fr)] items-center">
          {/* Desktop navigation */}
          <nav className="min-w-0 flex items-center gap-5">
            {localizedNavLinks.map((link) => (
              <NavLink
                key={link.key}
                to={link.localizedTo}
                end={link.to === "/"}
                className={({ isActive }) =>
                  cn(
                    "whitespace-nowrap text-[13px] font-medium transition-base hover:text-accent",
                    isActive
                      ? "text-accent"
                      : scrolled
                      ? "text-foreground/80"
                      : "text-white/85"
                  )
                }
              >
                {t(`header.links.${link.key}`)}
              </NavLink>
            ))}
          </nav>

          {/* Centered clickable logo */}
          <Link
            to={localizedHome}
            aria-label={t("header.links.home")}
            className="z-20 flex items-center justify-center px-6"
          >
            <Logo
              size={58}
              surface="dark"
              className="transition-transform duration-300 hover:scale-105"
            />
          </Link>

          {/* Desktop language selector and CTA */}
          <div className="min-w-0 flex items-center justify-end gap-3">
            <LanguageSwitcher surface={scrolled ? "light" : "dark"} />
            <Button asChild variant="hero" size="sm">
              <Link to={localizedContact}>{t("header.cta")}</Link>
            </Button>
          </div>
        </div>

        {/* Mobile/tablet header: logo remains mathematically centered between the two sides */}
        <div className="lg:hidden h-full flex items-center justify-between">
          {/* Mobile menu button */}
          <button
            className={cn(
              "p-2 relative z-30",
              scrolled ? "text-foreground" : "text-white"
            )}
            onClick={() => setOpen((v) => !v)}
            aria-label={t("header.menu")}
          >
            {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>

          {/* Centered clickable logo */}
          <Link
            to={localizedHome}
            aria-label={t("header.links.home")}
            className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-20"
          >
            <Logo
              size={58}
              surface="dark"
              className="transition-transform duration-300 hover:scale-105"
            />
          </Link>

          {/* Mobile language selector */}
          <div className="absolute right-4 top-1/2 -translate-y-1/2 z-20">
            <LanguageSwitcher surface={scrolled ? "light" : "dark"} />
          </div>
        </div>
      </div>

      {open && (
        <div className="lg:hidden bg-background/95 backdrop-blur-md border-t border-border animate-fade-up">
          <div className="container-narrow py-6 flex flex-col gap-4">
            {localizedNavLinks.map((link) => (
              <NavLink
                key={link.key}
                to={link.localizedTo}
                end={link.to === "/"}
                onClick={() => setOpen(false)}
                className={({ isActive }) =>
                  cn(
                    "font-medium transition-base hover:text-accent",
                    isActive ? "text-accent" : "text-foreground/80"
                  )
                }
              >
                {t(`header.links.${link.key}`)}
              </NavLink>
            ))}

            <div className="flex items-center justify-between pt-2">
              <LanguageSwitcher surface="light" />
              <Button asChild variant="hero" size="sm">
                <Link to={localizedContact} onClick={() => setOpen(false)}>
                  {t("header.cta")}
                </Link>
              </Button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;