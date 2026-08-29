import { useState, type ReactNode } from "react";
import { ChevronDown, Clock, Mail, MapPin, Phone } from "lucide-react";
import { useTranslation } from "react-i18next";
import Logo from "./Logo";

const PREFIXED_LANGS = ["el","ru","he","zh","ar-LB","uk","de","fr","es","ro","pl","bg"] as const;
type PrefixedLanguage = (typeof PREFIXED_LANGS)[number];

const LANGUAGE_PREFIXES: Record<PrefixedLanguage, string> = {
  el:"el", ru:"ru", he:"he", zh:"zh", "ar-LB":"ar-lb", uk:"uk",
  de:"de", fr:"fr", es:"es", ro:"ro", pl:"pl", bg:"bg",
};

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
  if (!PREFIXED_LANGS.includes(normalized as PrefixedLanguage)) return path;
  const prefix = LANGUAGE_PREFIXES[normalized as PrefixedLanguage];
  return path === "/" ? `/${prefix}` : `/${prefix}${path}`;
};

type AccordionSectionProps = {
  title: string;
  open: boolean;
  onToggle: () => void;
  children: ReactNode;
};

const AccordionSection = ({ title, open, onToggle, children }: AccordionSectionProps) => (
  <div className="border-b border-primary-foreground/10">
    <button
      type="button"
      onClick={onToggle}
      aria-expanded={open}
      className="group flex w-full items-center justify-between py-5 text-left"
    >
      <span className="text-sm font-semibold uppercase tracking-[0.16em] text-primary-foreground transition-colors duration-300 group-hover:text-accent">
        {title}
      </span>
      <span
        className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-primary-foreground/20 text-primary-foreground/70 transition-all duration-300 group-hover:border-accent/50 group-hover:text-accent ${open ? "rotate-180 border-accent/50 text-accent" : ""}`}
      >
        <ChevronDown className="h-4 w-4" strokeWidth={1.75} />
      </span>
    </button>

    <div className={`grid transition-[grid-template-rows,opacity] duration-300 ease-out ${open ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"}`}>
      <div className="overflow-hidden">
        <div className="pb-6 pt-1">{children}</div>
      </div>
    </div>
  </div>
);

const Footer = () => {
  const { t, i18n } = useTranslation();
  const [openSections, setOpenSections] = useState<Record<string, boolean>>({});

  const toggleSection = (section: string) => {
    setOpenSections((current) => ({ ...current, [section]: !current[section] }));
  };

  const localize = (path: string) => getLocalizedPath(path, i18n.language);

  const companyLinks = [
    { href: localize("/about"), label: t("footer.groups.company.items.about") },
    { href: localize("/services"), label: t("footer.groups.company.items.handle") },
    { href: localize("/neurora-operating-system"), label: t("footer.groups.company.items.process") },
    { href: localize("/contact"), label: t("footer.groups.company.items.contact") },
  ];

  const operationsLinks = [
    { href: `${localize("/")}#communication`, label: t("footer.groups.operations.items.communication") },
    { href: `${localize("/neurora-operating-system")}#financial-control`, label: t("footer.groups.operations.items.financial") },
    { href: `${localize("/neurora-operating-system")}#automation`, label: t("footer.groups.operations.items.automation") },
    { href: `${localize("/neurora-operating-system")}#legal-protection`, label: t("footer.groups.operations.items.legal") },
  ];

  const legalLinks = [
    { href: localize("/privacy-policy"), label: t("footer.groups.company.items.privacyPolicy") },
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
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(212,175,55,0.08)_0%,transparent_42%)]" />

      <div className="container-narrow relative z-10 py-10 lg:py-14">
        <div className="flex flex-col gap-6 border-b border-primary-foreground/10 pb-8 md:flex-row md:items-end md:justify-between">
          <Logo size={92} surface="dark" />

          <a
            href={localize("/contact")}
            className="inline-flex w-fit items-center rounded-full border border-accent/40 bg-accent/10 px-5 py-2.5 text-xs font-bold uppercase tracking-[0.18em] text-accent transition-all duration-300 hover:bg-accent/20"
          >
            {t("header.cta")}
          </a>
        </div>

        <div className="mt-2">
          <AccordionSection
            title={t("footer.groups.company.title")}
            open={!!openSections.company}
            onToggle={() => toggleSection("company")}
          >
            <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
              {companyLinks.map((link) => (
                <a key={link.href} href={link.href} className="text-sm text-primary-foreground/65 transition-colors duration-300 hover:text-accent">
                  {link.label}
                </a>
              ))}
            </div>
          </AccordionSection>

          <AccordionSection
            title={t("footer.groups.operations.title")}
            open={!!openSections.operations}
            onToggle={() => toggleSection("operations")}
          >
            <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
              {operationsLinks.map((link) => (
                <a key={`${link.href}-${link.label}`} href={link.href} className="text-sm text-primary-foreground/65 transition-colors duration-300 hover:text-accent">
                  {link.label}
                </a>
              ))}
            </div>
          </AccordionSection>

          <AccordionSection
            title={t("footer.groups.company.items.privacyPolicy")}
            open={!!openSections.legal}
            onToggle={() => toggleSection("legal")}
          >
            <div className="grid gap-3 sm:grid-cols-2">
              {legalLinks.map((link) => (
                <a key={link.href} href={link.href} className="text-sm text-primary-foreground/65 transition-colors duration-300 hover:text-accent">
                  {link.label}
                </a>
              ))}
            </div>
          </AccordionSection>

          <AccordionSection
            title={t("footer.groups.company.items.contact")}
            open={!!openSections.information}
            onToggle={() => toggleSection("information")}
          >
            <div className="grid gap-10 lg:grid-cols-3">
              <div>
                <div className="mb-5 flex items-center gap-3">
                  <Clock className="h-4 w-4 text-accent" strokeWidth={1.75} />
                  <h4 className="text-xs font-bold uppercase tracking-[0.25em] text-accent">
                    {t("footer.hours.title")}
                  </h4>
                </div>
                <ul className="space-y-1.5">
                  {rows.map((row) => (
                    <li key={row.day} className="grid grid-cols-[90px_1fr] gap-4 text-[13px] leading-relaxed">
                      <span className="font-semibold text-primary-foreground">{row.day}</span>
                      <span className="text-primary-foreground/60">{row.hours}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <div className="mb-5 flex items-center gap-3">
                  <MapPin className="h-4 w-4 text-accent" strokeWidth={1.75} />
                  <h4 className="text-xs font-bold uppercase tracking-[0.25em] text-accent">
                    {t("contact.coverageLabel")}
                  </h4>
                </div>
                <p className="text-sm leading-7 text-primary-foreground/60">
                  {t("contact.coverageValue")}
                </p>
                <div className="mt-5 overflow-hidden rounded-2xl border border-primary-foreground/10 bg-white/[0.035]">
                  <img
                    src="/coverage-map-footer.png?v=1"
                    alt={t("footer.coverageMapAlt")}
                    className="h-auto w-full object-cover"
                    loading="lazy"
                  />
                </div>
              </div>

              <div>
                <div className="mb-5 flex items-center gap-3">
                  <Mail className="h-4 w-4 text-accent" strokeWidth={1.75} />
                  <h4 className="text-xs font-bold uppercase tracking-[0.25em] text-accent">
                    {t("footer.groups.company.items.contact")}
                  </h4>
                </div>
                <div className="flex flex-col gap-4">
                  <a href="mailto:neuroraproperties@gmail.com" className="flex items-center gap-3 text-sm text-primary-foreground/65 transition-colors duration-300 hover:text-accent">
                    <Mail className="h-4 w-4 shrink-0 text-accent" strokeWidth={1.75} />
                    <span className="break-all">neuroraproperties@gmail.com</span>
                  </a>
                  <a href="tel:+35799203600" className="flex items-center gap-3 text-sm text-primary-foreground/65 transition-colors duration-300 hover:text-accent">
                    <Phone className="h-4 w-4 shrink-0 text-accent" strokeWidth={1.75} />
                    <span>+357 99 203 600</span>
                  </a>
                  <a href={localize("/contact")} className="mt-2 inline-flex w-fit text-sm font-semibold text-accent transition-opacity duration-300 hover:opacity-70">
                    {t("header.cta")}
                  </a>
                </div>
              </div>
            </div>
          </AccordionSection>
        </div>

        <div className="mt-9 border-t border-primary-foreground/10 pt-5">
          <div className="flex flex-col gap-5 md:flex-row md:items-center md:justify-between">
            <p className="text-sm text-primary-foreground/50">
              {t("footer.rights", { year: new Date().getFullYear() })}
            </p>

            <div className="flex items-center gap-2">
              <a href="https://wa.me/35799203600" target="_blank" rel="noopener noreferrer" aria-label={t("footer.aria.whatsapp")} className="flex h-8 w-8 items-center justify-center rounded-full border border-[#F5D76E]/40 bg-[#F5D76E]/10 transition-all duration-300 hover:bg-[#F5D76E]/20">
                <img src="https://cdn.simpleicons.org/whatsapp/F5D76E" alt="WhatsApp" className="h-4 w-4 object-contain" />
              </a>
              <a href="viber://chat?number=%2B35799203600" aria-label={t("footer.aria.viber")} className="flex h-8 w-8 items-center justify-center rounded-full border border-[#F5D76E]/40 bg-[#F5D76E]/10 transition-all duration-300 hover:bg-[#F5D76E]/20">
                <img src="https://cdn.simpleicons.org/viber/F5D76E" alt="Viber" className="h-4 w-4 object-contain" />
              </a>
              <a href="https://www.facebook.com/neuroraproperties" target="_blank" rel="noopener noreferrer" aria-label={t("footer.aria.facebook")} className="flex h-8 w-8 items-center justify-center rounded-full border border-[#F5D76E]/40 bg-[#F5D76E]/10 transition-all duration-300 hover:bg-[#F5D76E]/20">
                <img src="https://cdn.simpleicons.org/facebook/F5D76E" alt="Facebook" className="h-4 w-4 object-contain" />
              </a>
              <a href="https://www.instagram.com/neuroraproperties/" target="_blank" rel="noopener noreferrer" aria-label={t("footer.aria.instagram")} className="flex h-8 w-8 items-center justify-center rounded-full border border-[#F5D76E]/40 bg-[#F5D76E]/10 transition-all duration-300 hover:bg-[#F5D76E]/20">
                <img src="https://cdn.simpleicons.org/instagram/F5D76E" alt="Instagram" className="h-4 w-4 object-contain" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
