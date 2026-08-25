import { ArrowRight } from "lucide-react";
import { useTranslation } from "react-i18next";

const ctaLabels: Record<string, string> = {
  en: "Communication",
  el: "Επικοινωνία",
  ru: "Коммуникация",
  he: "תקשורת",
  zh: "沟通",
  ar: "التواصل",
  uk: "Комунікація",
  de: "Kommunikation",
  fr: "Communication",
  es: "Comunicación",
  ro: "Comunicare",
  pl: "Komunikacja",
  bg: "Комуникация",
};

const directGroupsLabels: Record<string, string> = {
  en: "Direct Groups",
  el: "Άμεσες ομάδες",
  ru: "Прямые группы",
  he: "קבוצות ישירות",
  zh: "直接群组",
  ar: "مجموعات مباشرة",
  uk: "Прямі групи",
  de: "Direkte Gruppen",
  fr: "Groupes directs",
  es: "Grupos directos",
  ro: "Grupuri directe",
  pl: "Grupy bezpośrednie",
  bg: "Директни групи",
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

const communicationLogos = [
  {
    name: "WhatsApp",
    src: "https://cdn.simpleicons.org/whatsapp/FFFFFF",
    bgClass: "bg-[#25D366]",
    shadowClass: "shadow-[0_18px_55px_rgba(37,211,102,0.18)]",
    accentClass: "text-[#168C43]",
  },
  {
    name: "Viber",
    src: "https://cdn.simpleicons.org/viber/FFFFFF",
    bgClass: "bg-[#7360F2]",
    shadowClass: "shadow-[0_18px_55px_rgba(115,96,242,0.18)]",
    accentClass: "text-[#5A46D6]",
  },
];

const Communication = () => {
  const { t, i18n } = useTranslation();
  const currentLanguage = i18n.resolvedLanguage || i18n.language || "en";
  const language = normalizeLanguage(currentLanguage);
  const ctaLabel = t("communication.cta", {
    defaultValue: ctaLabels[language] ?? ctaLabels.en,
  });
  const directGroupsLabel = t("communication.directGroups", {
    defaultValue: directGroupsLabels[language] ?? directGroupsLabels.en,
  });
  const communicationServicesHref = `${getLocalizedPath("/services", currentLanguage)}#communication`;

  return (
    <section
      id="communication"
      className="relative scroll-mt-24 overflow-hidden bg-background py-16 text-foreground sm:py-20 lg:py-28"
    >
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_12%_16%,rgba(212,175,55,0.13)_0%,transparent_32%)]" />
      <div className="absolute inset-0 bg-[linear-gradient(135deg,rgba(255,255,255,0.74)_0%,transparent_42%,rgba(0,0,0,0.02)_100%)]" />
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-black/10 to-transparent" />
      <div className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-black/10 to-transparent" />

      <div className="container-narrow relative z-10">
        <div className="relative overflow-hidden rounded-[2rem] border border-border bg-white/82 p-7 shadow-[0_24px_80px_rgba(0,0,0,0.075)] backdrop-blur-sm sm:p-9 lg:p-12">
          <div className="absolute inset-x-8 top-0 h-px bg-gradient-to-r from-transparent via-accent/65 to-transparent" />
          <div className="absolute -right-24 -top-24 h-56 w-56 rounded-full bg-accent/10 blur-3xl" />
          <div className="absolute -bottom-28 -left-28 h-60 w-60 rounded-full bg-accent/5 blur-3xl" />

          <div className="relative z-10 grid gap-9 lg:grid-cols-[1fr_0.38fr] lg:items-center">
            <div className="max-w-3xl">
              <span className="mb-5 block text-xs font-bold uppercase tracking-[0.28em] text-accent">
                {t("communication.eyebrow")}
              </span>

              <h2 className="text-3xl font-bold leading-tight tracking-[-0.03em] text-foreground text-balance sm:text-4xl lg:text-5xl">
                {t("communication.title")}
              </h2>

              <p className="mt-6 max-w-2xl text-base leading-8 text-muted-foreground sm:text-lg">
                {t("communication.subtitle")}
              </p>

              <div className="mt-8 grid w-full max-w-md grid-cols-2 gap-3 sm:gap-4">
                {communicationLogos.map((logo) => (
                  <div
                    key={logo.name}
                    className={`min-w-0 rounded-2xl border border-black/10 bg-white/95 px-3 py-4 text-center ${logo.shadowClass} sm:flex sm:items-center sm:gap-3 sm:px-4 sm:text-left`}
                  >
                    <div
                      className={`mx-auto flex h-11 w-11 shrink-0 items-center justify-center rounded-full ${logo.bgClass} sm:mx-0 sm:h-12 sm:w-12`}
                    >
                      <img
                        src={logo.src}
                        alt={`${logo.name} logo`}
                        className="h-6 w-6 object-contain"
                        loading="lazy"
                        decoding="async"
                      />
                    </div>

                    <div className="mt-3 min-w-0 sm:mt-0">
                      <div className="truncate text-xs font-bold text-foreground sm:text-sm">{logo.name}</div>
                      <div className={`mt-1 text-[9px] font-bold uppercase leading-snug tracking-[0.16em] ${logo.accentClass} sm:text-[10px] sm:tracking-[0.2em]`}>
                        {directGroupsLabel}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="lg:justify-self-end">
              <a
                href={communicationServicesHref}
                className="group inline-flex w-full items-center justify-center gap-3 rounded-full bg-accent px-7 py-4 text-center text-xs font-bold uppercase tracking-[0.24em] text-[#111111] shadow-[0_18px_60px_rgba(212,175,55,0.22)] transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_24px_80px_rgba(212,175,55,0.30)] focus:outline-none focus:ring-2 focus:ring-accent/45 focus:ring-offset-2 sm:w-auto lg:w-full"
              >
                <span>{ctaLabel}</span>
                <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1 rtl:group-hover:-translate-x-1 rtl:rotate-180" strokeWidth={2} />
              </a>

              <div className="mt-5 h-px w-full bg-gradient-to-r from-accent/45 via-border to-transparent lg:ml-auto" />

              <div className="mt-4 text-[10px] font-bold uppercase tracking-[0.26em] text-accent/85 lg:text-right">
                Neurora Property Management
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Communication;
