import Logo from "./Logo";
import { Briefcase, Building2, Clock, Globe2, Mail, Phone } from "lucide-react";
import { useTranslation } from "react-i18next";

const PREFIXED_LANGS = ["el", "ru", "he", "zh", "ar-LB", "uk", "de", "fr", "es", "ro"] as const;
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
};

const normalizeLanguage = (language: string) => {
  const lower = (language || "en").toLowerCase();

  if (lower === "ar-lb" || lower.startsWith("ar")) return "ar-LB";
  if (lower.startsWith("uk")) return "uk";
  if (lower.startsWith("de")) return "de";
  if (lower.startsWith("fr")) return "fr";
  if (lower.startsWith("es")) return "es";
  if (lower.startsWith("ro")) return "ro";
  if (lower.startsWith("zh")) return "zh";
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

const Footer = () => {
  const { t, i18n } = useTranslation();
  const localize = (path: string) => getLocalizedPath(path, i18n.language);

  const companyItems = [
    { href: localize("/about"), label: t("footer.groups.company.items.about") },
    { href: localize("/services"), label: t("footer.groups.company.items.handle") },
    { href: localize("/neurora-operating-system"), label: t("footer.groups.company.items.process") },
    { href: localize("/contact"), label: t("footer.groups.company.items.contact") },
    { href: localize("/privacy-policy"), label: t("footer.groups.company.items.privacyPolicy") },
  ];

  const operationsItems = [
    { href: `${localize("/")}#communication`, label: t("footer.groups.operations.items.communication") },
    { href: `${localize("/neurora-operating-system")}#financial-control`, label: t("footer.groups.operations.items.financial") },
    { href: `${localize("/neurora-operating-system")}#automation`, label: t("footer.groups.operations.items.automation") },
    { href: `${localize("/neurora-operating-system")}#legal-protection`, label: t("footer.groups.operations.items.legal") },
  ];

  const coveragePins = [
    {
      href: localize("/property-management-paphos"),
      label: t("footer.groups.coverage.items.paphos"),
      left: "5.5%",
      top: "67%",
    },
    {
      href: localize("/property-management-limassol"),
      label: t("footer.groups.coverage.items.limassol"),
      left: "32%",
      top: "73%",
    },
    {
      href: localize("/property-management-larnaca"),
      label: t("footer.groups.coverage.items.larnaca"),
      left: "67%",
      top: "62%",
    },
    {
      href: localize("/property-management-nicosia"),
      label: t("footer.groups.coverage.items.nicosia"),
      left: "61%",
      top: "41%",
    },
    {
      href: localize("/property-management-ayia-napa"),
      label: t("footer.groups.coverage.items.ayiaNapa"),
      left: "85%",
      top: "58%",
    },
    {
      href: localize("/property-management-protaras"),
      label: t("footer.groups.coverage.items.protaras"),
      left: "91%",
      top: "48%",
    },
  ];

  const rows = [
    { day: t("footer.hours.monday"), hours: t("footer.hours.weekdaysHours") },
    { day: t("footer.hours.tuesday"), hours: t("footer.hours.weekdaysHours") },
    { day: t("footer.hours.wednesday"), hours: t("footer.hours.weekdaysHours") },
    { day: t("footer.hours.thursday"), hours: t("footer.hours.weekdaysHours") },
    { day: t("footer.hours.friday"), hours: t("footer.hours.fridayHours") },
    { day: t("footer.hours.saturday"), hours: t("footer.hours.closed") },
    { day: t("footer.hours.sunday"), hours: t("footer.hours.closed") },
  ];

  return (
    <footer className="relative overflow-hidden bg-primary text-primary-foreground">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(212,175,55,0.06)_0%,transparent_34%)]" />

      <div className="container-narrow relative z-10 py-8 lg:py-8">
        <div className="mb-7 flex justify-center lg:mb-8">
          <Logo size={86} surface="dark" />
        </div>

        <div className="grid grid-cols-2 gap-x-8 gap-y-8 lg:grid-cols-[1.18fr_0.78fr_0.82fr_1.12fr] lg:items-start lg:gap-x-9">
          <div className="order-1 lg:order-2 lg:border-l lg:border-primary-foreground/10 lg:pl-8">
            <div className="mb-4 flex items-center gap-3">
              <Building2 className="h-4 w-4 text-accent" strokeWidth={1.75} />
              <h4 className="text-xs font-bold uppercase tracking-[0.25em] text-accent">
                {t("footer.groups.company.title")}
              </h4>
            </div>

            <ul className="space-y-2.5">
              {companyItems.map((it) => (
                <li key={it.label}>
                  <a
                    href={it.href}
                    className="text-sm text-primary-foreground/75 transition-base hover:text-accent"
                  >
                    {it.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div className="order-2 lg:order-3 lg:border-l lg:border-primary-foreground/10 lg:pl-8">
            <div className="mb-4 flex items-center gap-3">
              <Briefcase className="h-4 w-4 text-accent" strokeWidth={1.75} />
              <h4 className="text-xs font-bold uppercase tracking-[0.25em] text-accent">
                {t("footer.groups.operations.title")}
              </h4>
            </div>

            <ul className="space-y-2.5">
              {operationsItems.map((it) => (
                <li key={it.label}>
                  <a
                    href={it.href}
                    className="text-sm text-primary-foreground/75 transition-base hover:text-accent"
                  >
                    {it.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div className="order-3 col-span-2 lg:order-4 lg:col-span-1 lg:border-l lg:border-primary-foreground/10 lg:pl-8">
            <div className="mb-2 flex items-center gap-3 lg:translate-x-10">
              <Globe2 className="h-4 w-4 text-accent" strokeWidth={1.75} />
              <h4 className="text-xs font-bold uppercase tracking-[0.25em] text-accent">
                {t("contact.coverageLabel")}
              </h4>
            </div>

            <a
              href={localize("/property-management-cyprus")}
              className="inline-flex text-sm font-semibold text-primary-foreground/80 transition-base hover:text-accent lg:translate-x-10"
            >
              {t("contact.coverageValue")}
            </a>

            <div className="relative mt-4 aspect-[2/1] w-full max-w-[330px] overflow-hidden rounded-2xl border border-white/10 bg-white/[0.035] shadow-[0_12px_42px_rgba(0,0,0,0.22)] lg:max-w-[300px]">
              <img
                src="/coverage-map-footer.png?v=1"
                alt={t("footer.coverageMapAlt")}
                className="h-full w-full object-cover"
                loading="lazy"
              />

              {coveragePins.map((pin) => (
                <a
                  key={pin.label}
                  href={pin.href}
                  title={pin.label}
                  aria-label={t("footer.coveragePinAria", { location: pin.label })}
                  style={{ left: pin.left, top: pin.top }}
                  className="group absolute z-10 flex h-9 w-9 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full outline-none transition-all duration-300 hover:bg-accent/10 focus-visible:bg-accent/10 focus-visible:ring-2 focus-visible:ring-accent/70"
                >
                  <span className="sr-only">{t("footer.coveragePinAria", { location: pin.label })}</span>
                  <span className="h-2.5 w-2.5 rounded-full border border-accent/80 bg-accent/80 opacity-0 shadow-[0_0_18px_rgba(212,175,55,0.85)] transition-opacity duration-300 group-hover:opacity-100 group-focus-visible:opacity-100" />
                </a>
              ))}
            </div>
          </div>

          <div className="order-4 col-span-2 lg:order-1 lg:col-span-1">
            <div className="mb-4 flex items-center gap-3">
              <Clock className="h-4 w-4 text-accent" strokeWidth={1.75} />
              <h4 className="text-xs font-bold uppercase tracking-[0.25em] text-accent">
                {t("footer.hours.title")}
              </h4>
            </div>

            <ul className="max-w-md space-y-1.5 lg:min-w-[330px]">
              {rows.map((row) => (
                <li
                  key={row.day}
                  className="grid grid-cols-[90px_1fr] gap-4 text-[13px] leading-relaxed"
                >
                  <span className="font-semibold text-primary-foreground">
                    {row.day}
                  </span>

                  <span className="whitespace-nowrap text-primary-foreground/70">
                    {row.hours}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-8 border-t border-primary-foreground/10 pt-5 lg:mt-9">
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <p className="text-sm text-primary-foreground/60">
              {t("footer.rights", { year: new Date().getFullYear() })}
            </p>
                        <div className="relative z-30 flex items-center gap-2">
              <a
                href="https://wa.me/35799203600"
                target="_blank"
                rel="noopener noreferrer"
                aria-label={t("footer.aria.whatsapp")}
                className="flex h-8 w-8 items-center justify-center rounded-full border border-[#F5D76E]/45 bg-[#F5D76E]/10 transition-all duration-300 hover:bg-[#F5D76E]/20"
              >
                <img
                  src="https://cdn.simpleicons.org/whatsapp/F5D76E"
                  alt="WhatsApp"
                  className="h-4 w-4 object-contain"
                />
              </a>

              <a
                href="viber://chat?number=%2B35799203600"
                aria-label={t("footer.aria.viber")}
                className="flex h-8 w-8 items-center justify-center rounded-full border border-[#F5D76E]/45 bg-[#F5D76E]/10 transition-all duration-300 hover:bg-[#F5D76E]/20"
              >
                <img
                  src="https://cdn.simpleicons.org/viber/F5D76E"
                  alt="Viber"
                  className="h-4 w-4 object-contain"
                />
              </a>

              <a
                href="https://www.facebook.com/neuroraproperties"
                target="_blank"
                rel="noopener noreferrer"
                aria-label={t("footer.aria.facebook")}
                className="flex h-8 w-8 items-center justify-center rounded-full border border-[#F5D76E]/45 bg-[#F5D76E]/10 transition-all duration-300 hover:bg-[#F5D76E]/20"
              >
                <img
                  src="https://cdn.simpleicons.org/facebook/F5D76E"
                  alt="Facebook"
                  className="h-4 w-4 object-contain"
                />
              </a>

              <a
                href="https://www.instagram.com/neuroraproperties/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label={t("footer.aria.instagram")}
                className="flex h-8 w-8 items-center justify-center rounded-full border border-[#F5D76E]/45 bg-[#F5D76E]/10 transition-all duration-300 hover:bg-[#F5D76E]/20"
              >
                <img
                  src="https://cdn.simpleicons.org/instagram/F5D76E"
                  alt="Instagram"
                  className="h-4 w-4 object-contain"
                />
              </a>
            </div>
            <div className="flex flex-wrap gap-x-8 gap-y-2 text-sm text-primary-foreground/60">
              <a
                href="mailto:neuroraproperties@gmail.com"
                aria-label={t("footer.aria.email")}
                className="inline-flex min-h-[44px] items-center gap-3 break-all py-1 transition-base hover:text-accent"
              >
                <Mail className="h-4 w-4 text-accent" strokeWidth={1.75} />
                neuroraproperties@gmail.com
              </a>
              <a
                href="tel:+35799203600"
                aria-label={t("footer.aria.phone")}
                className="inline-flex min-h-[44px] items-center gap-3 py-1 transition-base hover:text-accent"
              >
                <Phone className="h-4 w-4 text-accent" strokeWidth={1.75} />
                +357 99 203 600
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
