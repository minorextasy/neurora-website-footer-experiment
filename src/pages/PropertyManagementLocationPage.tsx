import { useEffect, useMemo } from "react";
import { AlertTriangle, ArrowRight, Banknote, Building2, CheckCircle2, ClipboardList, FileText, ListChecks, MapPin, MessageCircle, ShieldCheck, Wrench } from "lucide-react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import Header from "@/components/site/Header";
import Footer from "@/components/site/Footer";
import FloatingContactRail from "@/components/site/FloatingContactRail";

type LocationKey = "cyprus" | "paphos" | "limassol" | "larnaca" | "nicosia" | "ayiaNapa" | "protaras";

type LocationPageData = {
  name: string;
  slug: string;
  metaTitle: string;
  metaDescription: string;
  heroTitle: string;
  subtitle: string;
  introTitle: string;
  introBody: string;
  localTitle: string;
  localBody: string;
  focusPoints: string[];
  issueTitle: string;
  issueIntro: string;
  issues: string[];
  supportTitle: string;
  supportIntro: string;
  supportItems: string[];
  faq: { question: string; answer: string }[];
};

type LocationService = {
  title: string;
  desc: string;
};

const locationLinks: { key: LocationKey; href: string }[] = [
  { key: "cyprus", href: "/property-management-cyprus" },
  { key: "paphos", href: "/property-management-paphos" },
  { key: "limassol", href: "/property-management-limassol" },
  { key: "larnaca", href: "/property-management-larnaca" },
  { key: "nicosia", href: "/property-management-nicosia" },
  { key: "ayiaNapa", href: "/property-management-ayia-napa" },
  { key: "protaras", href: "/property-management-protaras" },
];

const serviceIcons = [
  ClipboardList,
  Banknote,
  MessageCircle,
  Wrench,
  ShieldCheck,
  FileText,
];

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

const normalizeLanguage = (language: string) => {
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

const getLanguageCode = (language: string) => {
  const normalized = normalizeLanguage(language);
  if (normalized === "zh") return "zh-CN";
  if (normalized === "ar-LB") return "ar-LB";
  return normalized;
};

const getLocalizedPath = (path: string, language: string) => {
  const normalized = normalizeLanguage(language);

  if (!PREFIXED_LANGS.includes(normalized as PrefixedLanguage)) {
    return path;
  }

  const prefix = LANGUAGE_PREFIXES[normalized as PrefixedLanguage];
  return path === "/" ? `/${prefix}` : `/${prefix}${path}`;
};

const getLocalizedUrl = (path: string, language: string) =>
  `https://neuroraproperties.com${getLocalizedPath(path, language)}`;

const getJsonLd = (page: LocationPageData, language: string) => ({
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "LocalBusiness",
      name: "Neurora Property Management Ltd",
      url: getLocalizedUrl(`/${page.slug}`, language),
      email: "neuroraproperties@gmail.com",
      telephone: "+35799203600",
      areaServed: page.name,
      description: page.metaDescription,
      inLanguage: getLanguageCode(language),
      image: "https://neuroraproperties.com/neurora-og-image.jpg?v=3",
      sameAs: [
        "https://www.facebook.com/neuroraproperties",
        "https://www.instagram.com/neuroraproperties/",
      ],
      openingHoursSpecification: [
        {
          "@type": "OpeningHoursSpecification",
          dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday"],
          opens: "08:00",
          closes: "17:00",
        },
        {
          "@type": "OpeningHoursSpecification",
          dayOfWeek: "Friday",
          opens: "08:00",
          closes: "13:00",
        },
      ],
    },
    {
      "@type": "FAQPage",
      inLanguage: getLanguageCode(language),
      mainEntity: page.faq.map((item) => ({
        "@type": "Question",
        name: item.question,
        acceptedAnswer: {
          "@type": "Answer",
          text: item.answer,
        },
      })),
    },
  ],
});

const PropertyManagementLocationPage = ({ locationKey }: { locationKey: LocationKey }) => {
  const { t, i18n } = useTranslation();

  const page = useMemo(
    () => t(`locationPages.pages.${locationKey}`, { returnObjects: true }) as LocationPageData,
    [t, i18n.language, locationKey]
  );

  const services = useMemo(
    () => t("locationPages.services", { returnObjects: true }) as LocationService[],
    [t, i18n.language]
  );

  const locationNames = useMemo(
    () => t("locationPages.locations", { returnObjects: true }) as Record<LocationKey, string>,
    [t, i18n.language]
  );

  const locations = locationLinks.map((location) => ({
    ...location,
    name: locationNames[location.key],
  }));

  useEffect(() => {
    document.title = page.metaTitle;

    const setMeta = (name: string, content: string) => {
      let el = document.querySelector(`meta[name="${name}"]`);
      if (!el) {
        el = document.createElement("meta");
        el.setAttribute("name", name);
        document.head.appendChild(el);
      }
      el.setAttribute("content", content);
    };

    setMeta("description", page.metaDescription);

    let canonical = document.querySelector('link[rel="canonical"]');
    if (!canonical) {
      canonical = document.createElement("link");
      canonical.setAttribute("rel", "canonical");
      document.head.appendChild(canonical);
    }
    canonical.setAttribute("href", getLocalizedUrl(`/${page.slug}`, i18n.language));

    const jsonLdId = "location-seo-jsonld";
    const existing = document.getElementById(jsonLdId);
    if (existing) existing.remove();

    const script = document.createElement("script");
    script.id = jsonLdId;
    script.type = "application/ld+json";
    script.text = JSON.stringify(getJsonLd(page, i18n.language));
    document.head.appendChild(script);

    return () => {
      const current = document.getElementById(jsonLdId);
      if (current) current.remove();
    };
  }, [i18n.language, page]);

  return (
    <div className="min-h-screen bg-white text-[#111111]">
      <Header />
      <FloatingContactRail />

      <main>
        <section className="relative overflow-hidden bg-[#05070D] px-5 pb-16 pt-36 text-white sm:pb-20 lg:px-8 lg:pb-28 lg:pt-44">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_16%_18%,rgba(212,175,55,0.20)_0%,transparent_34%)]" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_86%_62%,rgba(255,255,255,0.07)_0%,transparent_36%)]" />
          <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-[#05070D] via-[#05070D]/60 to-transparent" />

          <div className="container-narrow relative z-10">
            <div className="max-w-5xl">
              <span className="mb-5 inline-flex items-center gap-2 rounded-full border border-accent/30 bg-accent/10 px-4 py-2 text-xs font-bold uppercase tracking-[0.22em] text-accent">
                <MapPin className="h-4 w-4" strokeWidth={1.75} />
                {t("locationPages.shared.heroEyebrow")}
              </span>

              <h1 className="text-5xl font-bold leading-[0.95] tracking-[-0.055em] text-white text-balance sm:text-6xl lg:text-7xl">
                {page.heroTitle}
              </h1>

              <p className="mt-7 max-w-3xl text-base leading-8 text-white/68 sm:text-lg">
                {page.subtitle}
              </p>

              <div className="mt-9 flex flex-col gap-4 sm:flex-row">
                <Link
                  to={getLocalizedPath("/contact", i18n.language)}
                  className="inline-flex items-center justify-center gap-3 rounded-full border border-accent/50 bg-accent px-7 py-4 text-center text-xs font-bold uppercase tracking-[0.22em] text-[#111111] shadow-[0_18px_55px_rgba(212,175,55,0.22)] transition-all duration-300 hover:-translate-y-0.5 hover:bg-accent/90 focus:outline-none focus:ring-2 focus:ring-accent/45"
                >
                  {t("locationPages.shared.primaryCta")}
                  <ArrowRight className="h-4 w-4" strokeWidth={2} />
                </Link>

                <Link
                  to={getLocalizedPath("/services", i18n.language)}
                  className="inline-flex items-center justify-center rounded-full border border-white/12 bg-white/[0.055] px-7 py-4 text-center text-xs font-bold uppercase tracking-[0.22em] text-white transition-all duration-300 hover:-translate-y-0.5 hover:border-accent/45 hover:text-accent focus:outline-none focus:ring-2 focus:ring-accent/35"
                >
                  {t("locationPages.shared.secondaryCta")}
                </Link>
              </div>
            </div>
          </div>
        </section>

        <section className="relative overflow-hidden bg-white px-5 py-16 text-[#111111] sm:py-20 lg:px-8 lg:py-28">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_12%_18%,rgba(212,175,55,0.12)_0%,transparent_34%)]" />
          <div className="container-narrow relative z-10">
            <div className="grid gap-10 lg:grid-cols-[0.85fr_1fr] lg:items-start">
              <div>
                <span className="mb-4 block text-xs font-bold uppercase tracking-[0.28em] text-accent">
                  {page.heroTitle}
                </span>

                <h2 className="text-3xl font-bold leading-tight tracking-[-0.035em] text-[#111111] text-balance sm:text-4xl lg:text-5xl">
                  {page.introTitle}
                </h2>

                <p className="mt-6 text-base leading-8 text-[#111111]/66">
                  {page.introBody}
                </p>
              </div>

              <div className="relative overflow-hidden rounded-[2rem] border border-black/10 bg-white p-7 shadow-[0_24px_80px_rgba(0,0,0,0.09)] sm:p-9">
                <div className="absolute inset-x-7 top-0 h-px bg-gradient-to-r from-transparent via-accent/70 to-transparent" />
                <Building2 className="mb-6 h-9 w-9 text-accent" strokeWidth={1.75} />

                <h3 className="text-2xl font-bold leading-tight text-[#111111]">
                  {page.localTitle}
                </h3>

                <p className="mt-5 text-base leading-8 text-[#111111]/64">
                  {page.localBody}
                </p>

                <div className="mt-7 space-y-4">
                  {page.focusPoints.map((point) => (
                    <div key={point} className="flex gap-3 text-sm leading-7 text-[#111111]/70">
                      <CheckCircle2 className="mt-1 h-5 w-5 shrink-0 text-accent" strokeWidth={1.75} />
                      <span>{point}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="relative overflow-hidden bg-[#F8F5EE] px-5 py-16 text-[#111111] sm:py-20 lg:px-8 lg:py-28">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_14%_18%,rgba(212,175,55,0.14)_0%,transparent_32%)]" />
          <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-black/10 to-transparent" />

          <div className="container-narrow relative z-10">
            <div className="max-w-3xl">
              <span className="mb-4 block text-xs font-bold uppercase tracking-[0.28em] text-accent">
                {t("locationPages.shared.localContextEyebrow")}
              </span>

              <h2 className="text-3xl font-bold leading-tight tracking-[-0.035em] text-[#111111] text-balance sm:text-4xl lg:text-5xl">
                {page.issueTitle}
              </h2>

              <p className="mt-5 text-base leading-8 text-[#111111]/64">
                {page.issueIntro}
              </p>
            </div>

            <div className="mt-10 grid gap-6 lg:grid-cols-2">
              <article className="relative overflow-hidden rounded-[2rem] border border-black/10 bg-[#05070D] p-7 text-white shadow-[0_24px_85px_rgba(0,0,0,0.16)] sm:p-8">
                <div className="absolute inset-x-7 top-0 h-px bg-gradient-to-r from-transparent via-accent/70 to-transparent" />
                <div className="mb-6 flex h-12 w-12 items-center justify-center rounded-2xl border border-accent/25 bg-accent/10">
                  <AlertTriangle className="h-5 w-5 text-accent" strokeWidth={1.75} />
                </div>

                <h3 className="text-2xl font-bold leading-tight text-white">
                  {t("locationPages.shared.issuesCardTitle")}
                </h3>

                <div className="mt-6 space-y-4">
                  {page.issues.map((issue) => (
                    <div key={issue} className="flex gap-3 text-sm leading-7 text-white/64">
                      <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-accent" />
                      <span>{issue}</span>
                    </div>
                  ))}
                </div>
              </article>

              <article className="relative overflow-hidden rounded-[2rem] border border-black/10 bg-white p-7 shadow-[0_24px_85px_rgba(0,0,0,0.09)] sm:p-8">
                <div className="absolute inset-x-7 top-0 h-px bg-gradient-to-r from-transparent via-accent/70 to-transparent" />
                <div className="mb-6 flex h-12 w-12 items-center justify-center rounded-2xl border border-accent/25 bg-accent/10">
                  <ListChecks className="h-5 w-5 text-accent" strokeWidth={1.75} />
                </div>

                <h3 className="text-2xl font-bold leading-tight text-[#111111]">
                  {page.supportTitle}
                </h3>

                <p className="mt-5 text-sm leading-7 text-[#111111]/62">
                  {page.supportIntro}
                </p>

                <div className="mt-6 space-y-4">
                  {page.supportItems.map((item) => (
                    <div key={item} className="flex gap-3 text-sm leading-7 text-[#111111]/70">
                      <CheckCircle2 className="mt-1 h-5 w-5 shrink-0 text-accent" strokeWidth={1.75} />
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              </article>
            </div>
          </div>
        </section>

        <section className="relative overflow-hidden bg-[#05070D] px-5 py-16 text-white sm:py-20 lg:px-8 lg:py-28">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_14%_18%,rgba(212,175,55,0.14)_0%,transparent_34%)]" />
          <div className="container-narrow relative z-10">
            <div className="max-w-3xl">
              <span className="mb-4 block text-xs font-bold uppercase tracking-[0.28em] text-accent">
                {t("locationPages.shared.servicesEyebrow")}
              </span>

              <h2 className="text-3xl font-bold leading-tight tracking-[-0.035em] text-white text-balance sm:text-4xl lg:text-5xl">
                {t("locationPages.shared.servicesTitle")}
              </h2>

              <p className="mt-5 text-base leading-8 text-white/64">
                {t("locationPages.shared.servicesBody")}
              </p>
            </div>

            <div className="mt-10 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
              {services.map((service, index) => {
                const Icon = serviceIcons[index] ?? ClipboardList;

                return (
                  <article
                    key={service.title}
                    className="relative overflow-hidden rounded-[1.75rem] border border-white/10 bg-white/[0.045] p-6 shadow-[0_18px_70px_rgba(0,0,0,0.20)] backdrop-blur-md"
                  >
                    <div className="absolute inset-x-6 top-0 h-px bg-gradient-to-r from-transparent via-accent/60 to-transparent" />

                    <div className="mb-6 flex items-center justify-between">
                      <div className="flex h-11 w-11 items-center justify-center rounded-2xl border border-accent/25 bg-accent/10">
                        <Icon className="h-5 w-5 text-accent" strokeWidth={1.75} />
                      </div>

                      <span className="text-[11px] font-bold uppercase tracking-[0.24em] text-accent/75">
                        0{index + 1}
                      </span>
                    </div>

                    <h3 className="text-lg font-bold leading-tight text-white">
                      {service.title}
                    </h3>

                    <p className="mt-4 text-sm leading-7 text-white/58">
                      {service.desc}
                    </p>
                  </article>
                );
              })}
            </div>
          </div>
        </section>

        <section className="relative overflow-hidden bg-white px-5 py-16 text-[#111111] sm:py-20 lg:px-8 lg:py-28">
          <div className="container-narrow">
            <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
              <div>
                <span className="mb-4 block text-xs font-bold uppercase tracking-[0.28em] text-accent">
                  {t("locationPages.shared.coverageEyebrow")}
                </span>

                <h2 className="text-3xl font-bold leading-tight tracking-[-0.035em] text-[#111111] text-balance sm:text-4xl lg:text-5xl">
                  {t("locationPages.shared.coverageTitle")}
                </h2>

                <p className="mt-5 text-base leading-8 text-[#111111]/64">
                  {t("locationPages.shared.coverageBody")}
                </p>
              </div>

              <div className="grid gap-3 sm:grid-cols-2">
                {locations.map((location) => (
                  <Link
                    key={location.href}
                    to={getLocalizedPath(location.href, i18n.language)}
                    className={`group rounded-2xl border p-5 transition-all duration-300 hover:-translate-y-0.5 ${
                      location.key === locationKey
                        ? "border-accent/55 bg-accent/10"
                        : "border-black/10 bg-white hover:border-accent/40 hover:shadow-[0_18px_55px_rgba(0,0,0,0.08)]"
                    }`}
                  >
                    <div className="flex items-center justify-between gap-4">
                      <span className="font-bold text-[#111111]">{location.name}</span>
                      <ArrowRight className="h-4 w-4 text-accent transition-transform duration-300 group-hover:translate-x-1" strokeWidth={2} />
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="relative overflow-hidden bg-[#05070D] px-5 py-16 text-white sm:py-20 lg:px-8 lg:py-28">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_18%,rgba(212,175,55,0.13)_0%,transparent_34%)]" />
          <div className="container-narrow relative z-10">
            <div className="max-w-3xl">
              <span className="mb-4 block text-xs font-bold uppercase tracking-[0.28em] text-accent">
                {t("locationPages.shared.questionsEyebrow")}
              </span>

              <h2 className="text-3xl font-bold leading-tight tracking-[-0.035em] text-white text-balance sm:text-4xl lg:text-5xl">
                {t("locationPages.shared.questionsTitle", { location: page.name })}
              </h2>
            </div>

            <div className="mt-10 grid gap-5 lg:grid-cols-2">
              {page.faq.map((item) => (
                <article key={item.question} className="rounded-[1.75rem] border border-white/10 bg-white/[0.045] p-6 shadow-[0_18px_70px_rgba(0,0,0,0.20)]">
                  <h3 className="text-lg font-bold leading-tight text-white">
                    {item.question}
                  </h3>

                  <p className="mt-4 text-sm leading-7 text-white/60">
                    {item.answer}
                  </p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="relative overflow-hidden bg-white px-5 py-16 text-[#111111] sm:py-20 lg:px-8 lg:py-28">
          <div className="container-narrow">
            <div className="relative overflow-hidden rounded-[2.5rem] border border-black/10 bg-white p-7 shadow-[0_30px_110px_rgba(0,0,0,0.10)] sm:p-10 lg:p-12">
              <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-accent/70 to-transparent" />
              <div className="absolute -right-20 -top-20 h-48 w-48 rounded-full bg-accent/10 blur-3xl" />

              <div className="relative z-10 grid gap-8 lg:grid-cols-[1fr_auto] lg:items-center">
                <div>
                  <h2 className="text-3xl font-bold leading-tight tracking-[-0.035em] text-[#111111] sm:text-4xl lg:text-5xl">
                    {t("locationPages.shared.ctaTitle", { location: page.name })}
                  </h2>

                  <p className="mt-5 max-w-2xl text-base leading-8 text-[#111111]/64">
                    {t("locationPages.shared.ctaBody")}
                  </p>
                </div>

                <Link
                  to={getLocalizedPath("/contact", i18n.language)}
                  className="inline-flex items-center justify-center gap-3 rounded-full border border-accent/50 bg-accent px-7 py-4 text-center text-xs font-bold uppercase tracking-[0.22em] text-[#111111] shadow-[0_18px_55px_rgba(212,175,55,0.20)] transition-all duration-300 hover:-translate-y-0.5 hover:bg-accent/90 focus:outline-none focus:ring-2 focus:ring-accent/45"
                >
                  {t("locationPages.shared.primaryCta")}
                  <ArrowRight className="h-4 w-4" strokeWidth={2} />
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default PropertyManagementLocationPage;
