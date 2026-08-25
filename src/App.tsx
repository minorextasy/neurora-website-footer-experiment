import { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Navigate, Route, Routes, useLocation } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import Index from "./pages/Index.tsx";
import ServicesPage from "./pages/ServicesPage.tsx";
import AboutPage from "./pages/AboutPage.tsx";
import ContactPage from "./pages/ContactPage.tsx";
import HowItWorksPage from "./pages/HowItWorksPage.tsx";
import PrivacyPolicyPage from "./pages/PrivacyPolicyPage.tsx";
import PropertyManagementLocationPage from "./pages/PropertyManagementLocationPage.tsx";
import NotFound from "./pages/NotFound.tsx";
import CookieConsent from "./components/site/CookieConsent.tsx";

const queryClient = new QueryClient();

const SEO_LANGS = ["en", "el", "ru", "he", "zh", "ar-LB", "uk", "de", "fr", "es", "ro", "pl", "bg"] as const;
type SeoLanguage = (typeof SEO_LANGS)[number];

const PREFIXED_LANGS = ["el", "ru", "he", "zh", "ar-LB", "uk", "de", "fr", "es", "ro", "pl", "bg"] as const;
const LANGUAGE_PREFIXES: Record<SeoLanguage, string> = {
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

const PREFIX_TO_LANGUAGE: Record<string, SeoLanguage> = {
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

const routeDefinitions = [
  { path: "/", element: <Index /> },
  { path: "/about", element: <AboutPage /> },
  { path: "/services", element: <ServicesPage /> },
  { path: "/neurora-operating-system", element: <HowItWorksPage /> },
  { path: "/how-it-works", element: <HowItWorksPage /> },
  { path: "/property-management-cyprus", element: <PropertyManagementLocationPage locationKey="cyprus" /> },
  { path: "/property-management-paphos", element: <PropertyManagementLocationPage locationKey="paphos" /> },
  { path: "/property-management-limassol", element: <PropertyManagementLocationPage locationKey="limassol" /> },
  { path: "/property-management-larnaca", element: <PropertyManagementLocationPage locationKey="larnaca" /> },
  { path: "/property-management-nicosia", element: <PropertyManagementLocationPage locationKey="nicosia" /> },
  { path: "/property-management-ayia-napa", element: <PropertyManagementLocationPage locationKey="ayiaNapa" /> },
  { path: "/property-management-protaras", element: <PropertyManagementLocationPage locationKey="protaras" /> },
  { path: "/contact", element: <ContactPage /> },
  { path: "/privacy-policy", element: <PrivacyPolicyPage /> },
];

const seoCanonicalPaths = new Set(
  routeDefinitions
    .map((route) => route.path)
    .filter((path) => path !== "/how-it-works")
);

const routePath = (prefix: string, path: string) => {
  const normalizedPath = path === "/" ? "" : path;
  return `${prefix}${normalizedPath}` || "/";
};

const normalizeLanguage = (language: string): SeoLanguage => {
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

const getLanguageCode = (language: string) => {
  const normalized = normalizeLanguage(language);
  if (normalized === "zh") return "zh-CN";
  if (normalized === "ar-LB") return "ar-LB";
  return normalized;
};

const getLanguagePrefix = (language: string) => LANGUAGE_PREFIXES[normalizeLanguage(language)];

const getPathLanguage = (pathname: string) => {
  const firstSegment = pathname.split("/").filter(Boolean)[0]?.toLowerCase();
  return firstSegment ? PREFIX_TO_LANGUAGE[firstSegment] ?? null : null;
};

const stripLanguagePrefix = (pathname: string) => {
  const firstSegment = pathname.split("/").filter(Boolean)[0]?.toLowerCase();

  if (!firstSegment || !PREFIX_TO_LANGUAGE[firstSegment]) {
    return pathname || "/";
  }

  const withoutPrefix = pathname.replace(new RegExp(`^/${firstSegment}(?=/|$)`, "i"), "");
  return withoutPrefix || "/";
};

const getLocalizedPath = (path: string, language: string) => {
  const prefix = getLanguagePrefix(language);

  if (!prefix) {
    return path;
  }

  return path === "/" ? `/${prefix}` : `/${prefix}${path}`;
};

const HtmlLang = () => {
  const { i18n } = useTranslation();

  useEffect(() => {
    const language = normalizeLanguage(i18n.language || "en");
    document.documentElement.lang = getLanguageCode(language);
    document.documentElement.dir = language === "he" || language === "ar-LB" ? "rtl" : "ltr";
  }, [i18n.language]);

  return null;
};

const LanguageFromPath = () => {
  const { pathname } = useLocation();
  const { i18n } = useTranslation();

  useEffect(() => {
    const languageFromPath = getPathLanguage(pathname);

    if (!languageFromPath) {
      return;
    }

    const currentLanguage = normalizeLanguage(i18n.language || "en");

    if (languageFromPath !== currentLanguage) {
      i18n.changeLanguage(languageFromPath);
    }
  }, [i18n, pathname]);

  return null;
};

const SeoAlternates = () => {
  const { pathname } = useLocation();
  const { i18n } = useTranslation();

  useEffect(() => {
    const cleanPath = stripLanguagePrefix(pathname);
    const canonicalPath =
      cleanPath === "/how-it-works" ? "/neurora-operating-system" : cleanPath;

    if (!seoCanonicalPaths.has(canonicalPath)) {
      return;
    }

    const origin = window.location.origin;
    const pathLanguage = getPathLanguage(pathname);
    const currentLanguage = normalizeLanguage(i18n.language || "en");
    const canonicalLanguage = pathLanguage || (SEO_LANGS.includes(currentLanguage) ? currentLanguage : "en");
    const canonicalHref = `${origin}${getLocalizedPath(canonicalPath, canonicalLanguage)}`;

    window.setTimeout(() => {
      let canonical = document.querySelector('link[rel="canonical"]');

      if (!canonical) {
        canonical = document.createElement("link");
        canonical.setAttribute("rel", "canonical");
        document.head.appendChild(canonical);
      }

      canonical.setAttribute("href", canonicalHref);

      document
        .querySelectorAll('link[data-neurora-hreflang="true"]')
        .forEach((link) => link.remove());

      SEO_LANGS.forEach((language) => {
        const alternate = document.createElement("link");
        alternate.setAttribute("rel", "alternate");
        alternate.setAttribute("hreflang", getLanguageCode(language));
        alternate.setAttribute("href", `${origin}${getLocalizedPath(canonicalPath, language)}`);
        alternate.setAttribute("data-neurora-hreflang", "true");
        document.head.appendChild(alternate);
      });

      const xDefault = document.createElement("link");
      xDefault.setAttribute("rel", "alternate");
      xDefault.setAttribute("hreflang", "x-default");
      xDefault.setAttribute("href", `${origin}${canonicalPath}`);
      xDefault.setAttribute("data-neurora-hreflang", "true");
      document.head.appendChild(xDefault);
    }, 0);
  }, [i18n.language, pathname]);

  return null;
};

const ScrollToTop = () => {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    const scroll = () => {
      if (hash) {
        const target = document.getElementById(hash.slice(1));

        if (target) {
          target.scrollIntoView({
            behavior: "smooth",
            block: "start",
          });
          return;
        }
      }

      window.scrollTo({
        top: 0,
        left: 0,
        behavior: "auto",
      });
    };

    window.requestAnimationFrame(scroll);
  }, [pathname, hash]);

  return null;
};

const EnglishPrefixRedirect = () => {
  const { pathname, search, hash } = useLocation();
  const destination = pathname.replace(/^\/en(?=\/|$)/, "") || "/";

  return <Navigate to={`${destination}${search}${hash}`} replace />;
};

const AppRoutes = () => (
  <Routes>
    {routeDefinitions.map((route) => (
      <Route key={route.path} path={route.path} element={route.element} />
    ))}

    {PREFIXED_LANGS.flatMap((language) =>
      routeDefinitions.map((route) => (
        <Route
          key={`${language}${route.path}`}
          path={routePath(`/${getLanguagePrefix(language)}`, route.path)}
          element={route.element}
        />
      ))
    )}

    <Route path="/en" element={<EnglishPrefixRedirect />} />
    <Route path="/en/*" element={<EnglishPrefixRedirect />} />

    {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
    <Route path="*" element={<NotFound />} />
  </Routes>
);

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <HtmlLang />
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <LanguageFromPath />
        <SeoAlternates />
        <ScrollToTop />
        <AppRoutes />
        <CookieConsent />
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
