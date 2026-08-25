import { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { ArrowRight, Globe2 } from "lucide-react";
import { Link } from "react-router-dom";
import FloatingContactRail from "@/components/site/FloatingContactRail";
import Header from "@/components/site/Header";
import Hero from "@/components/site/Hero";
import Trust from "@/components/site/Trust";
import About from "@/components/site/About";
import PostConstructionCleaning from "@/components/site/PostConstructionCleaning";
import Problem from "@/components/site/Problem";
import Solution from "@/components/site/Solution";
import Services from "@/components/site/Services";
import HowItWorks from "@/components/site/HowItWorks";
import Communication from "@/components/site/Communication";
import FinalCTA from "@/components/site/FinalCTA";
import Contact from "@/components/site/Contact";
import Footer from "@/components/site/Footer";

type SupportedLanguage = "en" | "el" | "ru" | "he" | "zh" | "ar-LB" | "uk" | "de" | "fr" | "es" | "ro" | "pl" | "bg";

type CoverageLocationKey =
  | "paphos"
  | "limassol"
  | "larnaca"
  | "nicosia"
  | "ayiaNapa"
  | "protaras";

const supportedLanguages: SupportedLanguage[] = ["en", "el", "ru", "he", "zh", "ar-LB", "uk", "de", "fr", "es", "ro", "pl", "bg"];

const countryCoverage = { path: "/property-management-cyprus" };

const coverageLocations: { key: CoverageLocationKey; path: string }[] = [
  { key: "paphos", path: "/property-management-paphos" },
  { key: "limassol", path: "/property-management-limassol" },
  { key: "larnaca", path: "/property-management-larnaca" },
  { key: "nicosia", path: "/property-management-nicosia" },
  { key: "ayiaNapa", path: "/property-management-ayia-napa" },
  { key: "protaras", path: "/property-management-protaras" },
];

const languagePrefixes: Record<SupportedLanguage, string> = {
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

const getHreflang = (language: SupportedLanguage) => {
  if (language === "zh") return "zh-CN";
  if (language === "ar-LB") return "ar-LB";
  return language;
};

const normalizeLanguage = (language: string): SupportedLanguage => {
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

const getLocalizedPath = (path: string, language: SupportedLanguage) => {
  const cleanPath = path === "/" ? "" : path.startsWith("/") ? path : `/${path}`;
  const prefix = languagePrefixes[language];
  return prefix ? `/${prefix}${cleanPath}` : cleanPath || "/";
};

const HomeCoverage = () => {
  const { t, i18n } = useTranslation();
  const currentLanguage = normalizeLanguage(i18n.language || "en");

  return (
    <section
      id="cyprus-wide-coverage"
      className="relative overflow-hidden border-y border-black/5 bg-white px-5 py-7 text-[#111111] sm:py-8 lg:px-8"
    >
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_18%_0%,rgba(212,175,55,0.08)_0%,transparent_32%)]" />

      <div className="container-narrow relative z-10">
        <div className="flex flex-col gap-4 rounded-[1.5rem] border border-black/8 bg-white/80 px-5 py-5 shadow-[0_18px_55px_rgba(0,0,0,0.06)] backdrop-blur-sm lg:flex-row lg:items-center lg:justify-between lg:px-6">
          <div className="flex items-start gap-3">
            <div className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-accent/25 bg-accent/10">
              <Globe2 className="h-4 w-4 text-accent" strokeWidth={1.75} />
            </div>

            <div>
              <p className="text-[11px] font-bold uppercase tracking-[0.24em] text-accent">
                {t("homeCoverage.eyebrow")}
              </p>

              <p className="mt-2 max-w-3xl text-sm leading-7 text-[#111111]/68">
                {t("homeCoverage.text")}
              </p>
            </div>
          </div>

          <div className="flex flex-col gap-2 lg:max-w-[560px] lg:items-end">
            <Link
              to={getLocalizedPath(countryCoverage.path, currentLanguage)}
              aria-label={t("homeCoverage.country.aria")}
              className="inline-flex w-fit items-center gap-1.5 rounded-full border border-accent/30 bg-accent/10 px-3.5 py-1.5 text-[11px] font-bold uppercase tracking-[0.16em] text-accent transition-all duration-300 hover:-translate-y-0.5 hover:border-accent/55 hover:bg-accent/15 focus:outline-none focus:ring-2 focus:ring-accent/35"
            >
              {t("homeCoverage.country.label")}
              <ArrowRight className="h-3 w-3" strokeWidth={2} />
            </Link>

            <div className="flex flex-wrap gap-2 lg:justify-end">
              {coverageLocations.map((location) => (
                <Link
                  key={location.key}
                  to={getLocalizedPath(location.path, currentLanguage)}
                  aria-label={t(`homeCoverage.locations.${location.key}.aria`)}
                  className="inline-flex items-center gap-1.5 rounded-full border border-black/10 bg-white px-3 py-1.5 text-[11px] font-bold text-[#111111]/70 transition-all duration-300 hover:-translate-y-0.5 hover:border-accent/45 hover:text-accent focus:outline-none focus:ring-2 focus:ring-accent/35"
                >
                  {t(`homeCoverage.locations.${location.key}.label`)}
                  <ArrowRight className="h-3 w-3" strokeWidth={2} />
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

const Index = () => {
  const { t, i18n } = useTranslation();

  useEffect(() => {
    const currentLanguage = normalizeLanguage(i18n.language || "en");
    const currentPath = getLocalizedPath("/", currentLanguage);
    const currentUrl = `${window.location.origin}${currentPath}`;

    document.title = t("seo.title");

    const setMeta = (name: string, content: string) => {
      let el = document.querySelector(`meta[name="${name}"]`);
      if (!el) {
        el = document.createElement("meta");
        el.setAttribute("name", name);
        document.head.appendChild(el);
      }
      el.setAttribute("content", content);
    };

    setMeta("description", t("seo.description"));

    let canonical = document.querySelector('link[rel="canonical"]');
    if (!canonical) {
      canonical = document.createElement("link");
      canonical.setAttribute("rel", "canonical");
      document.head.appendChild(canonical);
    }
    canonical.setAttribute("href", currentUrl);

    document
      .querySelectorAll('link[data-neurora-home-alternate="true"]')
      .forEach((node) => node.remove());

    const addAlternate = (hreflang: string, href: string) => {
      const alternate = document.createElement("link");
      alternate.setAttribute("rel", "alternate");
      alternate.setAttribute("hreflang", hreflang);
      alternate.setAttribute("href", href);
      alternate.setAttribute("data-neurora-home-alternate", "true");
      document.head.appendChild(alternate);
    };

    supportedLanguages.forEach((language) => {
      addAlternate(
        getHreflang(language),
        `${window.location.origin}${getLocalizedPath("/", language)}`
      );
    });
    addAlternate("x-default", `${window.location.origin}/`);

    const ldId = "ld-json-org";
    let ld = document.getElementById(ldId);
    if (!ld) {
      ld = document.createElement("script");
      ld.id = ldId;
      (ld as HTMLScriptElement).type = "application/ld+json";
      document.head.appendChild(ld);
    }
    ld.textContent = JSON.stringify({
      "@context": "https://schema.org",
      "@type": "ProfessionalService",
      name: "Neurora Property Management Ltd",
      description: t("seo.ldDescription"),
      areaServed: "Cyprus",
      url: currentUrl,
      email: "neuroraproperties@gmail.com",
      telephone: "+357 99 203 600",
    });
  }, [t, i18n.language]);

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <FloatingContactRail />
      <main>
        <Hero />
        <Trust />
        <About />
        <PostConstructionCleaning />
        <Problem />
        <Solution />
        <div id="services-section">
          <Services />
        </div>
        <HomeCoverage />
        <HowItWorks />
        <Communication />
        <div className="bg-background h-16 lg:h-24" aria-hidden="true" />
        <FinalCTA />
        <Contact />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
