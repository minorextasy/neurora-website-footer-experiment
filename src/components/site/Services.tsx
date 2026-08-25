import { ArrowRight } from "lucide-react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";

const ctaLabels: Record<string, string> = {
  en: "Explore Our Services",
  el: "Εξερευνήστε τις Υπηρεσίες μας",
  ru: "Изучить наши услуги",
  he: "גלו את השירותים שלנו",
  zh: "探索我们的服务",
  ar: "استكشف خدماتنا",
  uk: "Переглянути наші послуги",
  de: "Unsere Leistungen ansehen",
  fr: "Découvrir nos services",
  es: "Explorar nuestros servicios",
  ro: "Explorează serviciile noastre",
  pl: "Poznaj nasze usługi",
  bg: "Разгледайте услугите ни",
};

const ctaNotes: Record<string, string> = {
  en: "See the full service breakdown",
  el: "Δείτε την πλήρη ανάλυση των υπηρεσιών",
  ru: "Посмотрите полный список услуг",
  he: "צפו בפירוט השירותים המלא",
  zh: "查看完整服务内容",
  ar: "اطّلعوا على تفاصيل الخدمات كاملة",
  uk: "Перегляньте повний перелік послуг",
  de: "Die vollständige Leistungsübersicht ansehen",
  fr: "Voir le détail complet des services",
  es: "Ver el desglose completo de servicios",
  ro: "Vezi lista completă a serviciilor",
  pl: "Zobacz pełny zakres usług",
  bg: "Вижте пълния списък с услуги",
};

const languagePrefixes: Record<string, string> = {
  el: "el",
  ru: "ru",
  he: "he",
  zh: "zh",
  ar: "ar-lb",
  "ar-lb": "ar-lb",
  uk: "uk",
  de: "de",
  fr: "fr",
  es: "es",
  ro: "ro",
  pl: "pl",
  bg: "bg",
};

const normalizeLanguage = (language: string) => {
  const normalized = (language || "en").toLowerCase();

  if (normalized === "ar-lb" || normalized.startsWith("ar-")) {
    return "ar";
  }

  return normalized.split("-")[0] || "en";
};

const getLocalizedPath = (path: string, language: string) => {
  const normalizedLanguage = normalizeLanguage(language);
  const prefix = languagePrefixes[normalizedLanguage];
  const cleanPath = path === "/" ? "" : path.startsWith("/") ? path : `/${path}`;

  return prefix ? `/${prefix}${cleanPath}` : cleanPath || "/";
};

const Services = () => {
  const { t, i18n } = useTranslation();
  const language = normalizeLanguage(i18n.resolvedLanguage || i18n.language || "en");
  const servicesPath = getLocalizedPath("/services", i18n.resolvedLanguage || i18n.language || "en");
  const ctaLabel = t("services.cta", {
    defaultValue: ctaLabels[language] ?? ctaLabels.en,
  });
  const ctaNote = t("services.ctaNote", {
    defaultValue: ctaNotes[language] ?? ctaNotes.en,
  });

  return (
    <section
      id="handle"
      className="relative scroll-mt-24 overflow-hidden bg-background py-16 text-[#111111] sm:py-20 lg:py-28"
    >
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_12%_20%,rgba(212,175,55,0.14)_0%,transparent_34%)]" />
      <div className="absolute inset-0 bg-[linear-gradient(135deg,rgba(255,255,255,0.78)_0%,transparent_46%,rgba(0,0,0,0.025)_100%)]" />
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-black/10 to-transparent" />
      <div className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-black/10 to-transparent" />

      <div className="container-narrow relative z-10">
        <div className="relative overflow-hidden rounded-[2rem] border border-black/10 bg-white/90 p-6 shadow-[0_22px_80px_rgba(0,0,0,0.08)] backdrop-blur-sm sm:p-8 lg:p-12">
          <div className="absolute inset-x-8 top-0 h-px bg-gradient-to-r from-transparent via-accent/70 to-transparent" />
          <div className="absolute -right-24 -top-24 h-52 w-52 rounded-full bg-accent/10 blur-3xl" />
          <div className="absolute -bottom-28 -left-28 h-56 w-56 rounded-full bg-accent/5 blur-3xl" />

          <div className="relative z-10 grid gap-8 lg:grid-cols-[1fr_0.42fr] lg:items-center">
            <div className="max-w-3xl">
              <span className="mb-5 block text-xs font-bold uppercase tracking-[0.28em] text-accent">
                {t("services.eyebrow")}
              </span>

              <h2 className="max-w-3xl text-3xl font-bold leading-[1.08] tracking-[-0.025em] text-[#111111] text-balance sm:text-4xl lg:text-5xl">
                {t("services.title")}
              </h2>

              <p className="mt-6 max-w-2xl text-base font-medium leading-8 text-[#111111]/68 sm:text-lg">
                {t("services.subtitle")}
              </p>
            </div>

            <div className="flex flex-col items-stretch gap-4 lg:items-end">
              <Link
                to={servicesPath}
                className="group inline-flex w-full items-center justify-center gap-3 rounded-full border border-accent/70 bg-accent px-6 py-4 text-center text-sm font-bold uppercase tracking-[0.18em] text-[#111111] shadow-[0_18px_48px_rgba(212,175,55,0.24)] transition-all duration-300 hover:-translate-y-0.5 hover:bg-accent/90 hover:shadow-[0_24px_62px_rgba(212,175,55,0.30)] focus:outline-none focus:ring-2 focus:ring-accent/45 sm:w-auto lg:w-full"
                aria-label={ctaLabel}
              >
                <span>{ctaLabel}</span>
                <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1 rtl:group-hover:-translate-x-1 rtl:rotate-180" />
              </Link>

              <p className="text-center text-xs font-semibold uppercase tracking-[0.2em] text-[#111111]/42 lg:text-right">
                {ctaNote}
              </p>
            </div>
          </div>

          <div className="relative z-10 mt-9 h-px w-full bg-gradient-to-r from-accent/45 via-black/10 to-transparent" />

          <div className="relative z-10 mt-5 text-xs font-bold uppercase tracking-[0.24em] text-accent">
            Neurora Property Management
          </div>
        </div>
      </div>
    </section>
  );
};

export default Services;
