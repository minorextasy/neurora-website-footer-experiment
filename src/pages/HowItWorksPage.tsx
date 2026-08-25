import { useEffect } from "react";
import { ArrowRight, CalendarClock, CheckCircle2, Eye, FileCheck2, FileText, History, Landmark, ListChecks, Repeat, Scale, ShieldCheck, Vote, type LucideIcon } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import { useTranslation } from "react-i18next";
import FloatingContactRail from "@/components/site/FloatingContactRail";
import Header from "@/components/site/Header";
import Footer from "@/components/site/Footer";
import { getLocalizedPath } from "@/lib/i18nRouting";

type Step = {
  n: string;
  title: string;
  desc: string;
  detail: string;
};

type DetailItem = {
  title: string;
  desc: string;
  detail?: string;
};

type Pillar = {
  title: string;
  desc: string;
};

const financialIcons: LucideIcon[] = [Landmark, ShieldCheck, Eye, FileCheck2];
const takeoverIcons: LucideIcon[] = [CheckCircle2, CalendarClock, ListChecks, History];
const automationIcons: LucideIcon[] = [Repeat, CalendarClock, ListChecks, History];
const legalIcons: LucideIcon[] = [Scale, Vote, FileText];

const asArray = <T,>(value: unknown): T[] => (Array.isArray(value) ? (value as T[]) : []);

const HowItWorksPage = () => {
  const { t, i18n } = useTranslation();
  const localize = (path: string) => getLocalizedPath(path, i18n.language);
  const location = useLocation();

  const steps = asArray<Step>(t("process.steps", { returnObjects: true }));
  const afterTakeoverItems = asArray<DetailItem>(
    t("howItWorksPage.afterTakeover.items", { returnObjects: true })
  );
  const financialPillars = asArray<Pillar>(t("financial.pillars", { returnObjects: true }));
  const automationItems = asArray<DetailItem>(t("automation.items", { returnObjects: true }));
  const legalItems = asArray<DetailItem>(t("legal.items", { returnObjects: true }));

  useEffect(() => {
    document.title = t("howItWorksPage.metaTitle");

    const setMeta = (name: string, content: string) => {
      let el = document.querySelector(`meta[name="${name}"]`);
      if (!el) {
        el = document.createElement("meta");
        el.setAttribute("name", name);
        document.head.appendChild(el);
      }
      el.setAttribute("content", content);
    };

    setMeta("description", t("howItWorksPage.metaDescription"));

    let canonical = document.querySelector('link[rel="canonical"]');
    if (!canonical) {
      canonical = document.createElement("link");
      canonical.setAttribute("rel", "canonical");
      document.head.appendChild(canonical);
    }

    canonical.setAttribute("href", `${window.location.origin}/neurora-operating-system`);
  }, [t, i18n.language]);

  useEffect(() => {
    if (!location.hash) return;

    const targetId = decodeURIComponent(location.hash.replace("#", ""));

    const scrollToTarget = () => {
      const target = document.getElementById(targetId);

      if (target) {
        target.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    };

    const timeout = window.setTimeout(scrollToTarget, 120);

    return () => window.clearTimeout(timeout);
  }, [location.hash]);

  return (
    <div className="min-h-screen bg-[#05070D] text-white">
      <Header />
      <FloatingContactRail />

      <main>
        <section className="relative overflow-hidden px-5 pb-16 pt-36 sm:pb-20 lg:px-8 lg:pb-28 lg:pt-44">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_14%_18%,rgba(212,175,55,0.18)_0%,transparent_34%)]" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_86%_62%,rgba(255,255,255,0.07)_0%,transparent_36%)]" />
          <div className="absolute inset-0 bg-[linear-gradient(135deg,rgba(255,255,255,0.035)_0%,transparent_42%,rgba(212,175,55,0.045)_100%)]" />

          <div className="container-narrow relative z-10">
            <div className="max-w-5xl">
              <span className="mb-5 block text-xs font-bold uppercase tracking-[0.28em] text-accent">
                {t("operatingSystem.eyebrow")}
              </span>

              <h1 className="text-5xl font-bold leading-[0.95] tracking-[-0.055em] text-white text-balance sm:text-6xl lg:text-7xl">
                {t("operatingSystem.titleLine1")}
                <br />
                {t("operatingSystem.titleLine2")}
              </h1>

              <p className="mt-7 max-w-3xl text-base leading-8 text-white/68 sm:text-lg">
                {t("howItWorksPage.hero.subtitle")}
              </p>

              <div className="mt-9 flex flex-col gap-4 sm:flex-row">
                <Link
                  to={localize("/contact")}
                  className="inline-flex items-center justify-center gap-3 rounded-full border border-accent/50 bg-accent px-7 py-4 text-center text-xs font-bold uppercase tracking-[0.22em] text-[#111111] shadow-[0_18px_55px_rgba(212,175,55,0.22)] transition-all duration-300 hover:-translate-y-0.5 hover:bg-accent/90 focus:outline-none focus:ring-2 focus:ring-accent/45"
                >
                  {t("howItWorksPage.hero.ctaPrimary")}
                  <ArrowRight className="h-4 w-4" strokeWidth={2} />
                </Link>

                <Link
                  to={localize("/services")}
                  className="inline-flex items-center justify-center rounded-full border border-white/12 bg-white/[0.055] px-7 py-4 text-center text-xs font-bold uppercase tracking-[0.22em] text-white transition-all duration-300 hover:-translate-y-0.5 hover:border-accent/45 hover:text-accent focus:outline-none focus:ring-2 focus:ring-accent/35"
                >
                  {t("howItWorksPage.hero.ctaSecondary")}
                </Link>
              </div>
            </div>
          </div>
        </section>

        <section id="process" className="relative overflow-hidden bg-white px-5 py-16 text-[#111111] sm:py-20 lg:px-8 lg:py-28">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_12%_18%,rgba(212,175,55,0.12)_0%,transparent_34%)]" />

          <div className="container-narrow relative z-10">
            <div className="grid gap-10 lg:grid-cols-[0.85fr_1fr] lg:items-start">
              <div className="max-w-2xl">
                <span className="mb-4 block text-xs font-bold uppercase tracking-[0.28em] text-accent">
                  {t("howItWorksPage.intro.eyebrow")}
                </span>

                <h2 className="text-3xl font-bold leading-tight tracking-[-0.035em] text-[#111111] text-balance sm:text-4xl lg:text-5xl">
                  {t("howItWorksPage.intro.title")}
                </h2>

                <p className="mt-6 text-base leading-8 text-[#111111]/66">
                  {t("howItWorksPage.intro.body")}
                </p>

                <div className="mt-8 overflow-hidden rounded-[2rem] border border-black/10 bg-white/85 p-6 shadow-[0_18px_60px_rgba(0,0,0,0.075)]">
                  <div className="text-xs font-bold uppercase tracking-[0.24em] text-accent">
                    {t("howItWorksPage.intro.panelTitle")}
                  </div>

                  <p className="mt-4 text-sm leading-7 text-[#111111]/62">
                    {t("howItWorksPage.intro.panelBody")}
                  </p>
                </div>
              </div>

              <ol className="relative space-y-5">
                {steps.map((step, index) => (
                  <li key={step.n} className="relative grid grid-cols-[3.25rem_1fr] gap-4">
                    <div className="relative flex justify-center">
                      {index < steps.length - 1 && (
                        <span className="absolute top-12 h-[calc(100%+1.25rem)] w-px bg-gradient-to-b from-accent/45 via-black/10 to-transparent" />
                      )}

                      <span className="relative z-10 flex h-11 w-11 items-center justify-center rounded-2xl border border-accent/35 bg-accent/10 text-xs font-bold tracking-[0.18em] text-accent shadow-[0_0_35px_rgba(212,175,55,0.10)]">
                        {step.n}
                      </span>
                    </div>

                    <div className="min-w-0 rounded-2xl border border-black/10 bg-white p-5 shadow-[0_14px_44px_rgba(0,0,0,0.06)]">
                      <h3 className="text-base font-bold leading-tight text-[#111111] sm:text-lg">
                        {step.title}
                      </h3>

                      <p className="mt-2 text-sm leading-7 text-[#111111]/58">
                        {step.desc}
                      </p>

                      <p className="mt-4 text-sm leading-7 text-[#111111]/70">
                        {step.detail}
                      </p>
                    </div>
                  </li>
                ))}
              </ol>
            </div>
          </div>
        </section>

        <section id="operational-takeover" className="relative overflow-hidden bg-[#05070D] px-5 py-16 text-white sm:py-20 lg:px-8 lg:py-28">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_16%_18%,rgba(212,175,55,0.13)_0%,transparent_34%)]" />

          <div className="container-narrow relative z-10">
            <div className="max-w-3xl">
              <span className="mb-4 block text-xs font-bold uppercase tracking-[0.28em] text-accent">
                {t("howItWorksPage.afterTakeover.eyebrow")}
              </span>

              <h2 className="text-3xl font-bold leading-tight tracking-[-0.035em] text-white text-balance sm:text-4xl lg:text-5xl">
                {t("howItWorksPage.afterTakeover.title")}
              </h2>

              <p className="mt-5 text-base leading-8 text-white/64">
                {t("howItWorksPage.afterTakeover.subtitle")}
              </p>
            </div>

            <div className="mt-10 grid gap-5 md:grid-cols-2 lg:grid-cols-4">
              {afterTakeoverItems.map((item, index) => {
                const Icon = takeoverIcons[index] ?? CheckCircle2;

                return (
                  <article
                    key={item.title}
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
                      {item.title}
                    </h3>

                    <p className="mt-4 text-sm leading-7 text-white/58">
                      {item.desc}
                    </p>
                  </article>
                );
              })}
            </div>
          </div>
        </section>

        <section id="financial" className="relative overflow-hidden bg-[#05070D] px-5 pb-16 text-white sm:pb-20 lg:px-8 lg:pb-28">
          <span id="financial-control" className="absolute -top-28" aria-hidden="true" />
          <div className="container-narrow">
            <div className="relative overflow-hidden rounded-[2.5rem] border border-white/10 bg-white/[0.045] text-white shadow-[0_30px_110px_rgba(0,0,0,0.32)] backdrop-blur-md">
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_18%_20%,rgba(212,175,55,0.14)_0%,transparent_34%)]" />
              <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-accent/65 to-transparent" />

              <div className="relative z-10 grid gap-0 lg:grid-cols-[0.95fr_1.05fr]">
                <div className="relative overflow-hidden border-b border-white/10 p-7 sm:p-9 lg:border-b-0 lg:border-r lg:p-12">
                  <div className="mb-5 text-xs font-bold uppercase tracking-[0.28em] text-accent">
                    {t("financial.eyebrow")}
                  </div>

                  <h2 className="text-3xl font-bold leading-tight tracking-[-0.035em] text-white sm:text-4xl lg:text-5xl">
                    {t("financial.title")}
                  </h2>

                  <p className="mt-6 max-w-xl text-base leading-8 text-white/68">
                    {t("financial.subtitle")}
                  </p>

                  <div className="mt-8 h-px w-44 bg-gradient-to-r from-accent via-accent/40 to-transparent" />

                  <div className="mt-7 text-[11px] font-bold uppercase tracking-[0.28em] text-accent">
                    {t("financial.accountHolder")}
                  </div>

                  <div className="mt-3 text-3xl font-bold leading-[0.95] tracking-[-0.04em] text-white sm:text-4xl">
                    {t("financial.accountHolderName")}
                  </div>

                  <p className="mt-6 max-w-xl text-base leading-8 text-white/68">
                    {t("financial.accountBody")}
                  </p>

                  <div className="mt-8 flex flex-wrap items-center gap-3 text-sm">
                    <span className="rounded-full border border-accent/30 bg-accent/10 px-4 py-2 font-medium text-accent">
                      {t("financial.tag1")}
                    </span>
                    <span className="rounded-full border border-white/12 bg-white/[0.055] px-4 py-2 font-medium text-white/78">
                      {t("financial.tag2")}
                    </span>
                  </div>
                </div>

                <div className="grid gap-px bg-white/10 p-px sm:grid-cols-2">
                  {financialPillars.map((pillar, index) => {
                    const Icon = financialIcons[index] ?? Landmark;

                    return (
                      <article key={pillar.title} className="relative overflow-hidden bg-[#080B12] p-7 sm:p-8">
                        <div className="absolute inset-x-7 top-0 h-px bg-gradient-to-r from-transparent via-accent/45 to-transparent" />

                        <div className="mb-7 flex items-center justify-between">
                          <div className="flex h-11 w-11 items-center justify-center rounded-2xl border border-accent/25 bg-accent/10">
                            <Icon className="h-5 w-5 text-accent" strokeWidth={1.75} />
                          </div>

                          <span className="text-[11px] font-bold uppercase tracking-[0.24em] text-accent/75">
                            0{index + 1}
                          </span>
                        </div>

                        <h3 className="text-lg font-bold leading-tight text-white">
                          {pillar.title}
                        </h3>

                        <p className="mt-4 text-sm leading-7 text-white/58">
                          {pillar.desc}
                        </p>
                      </article>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        </section>

        <OperatingSection
          id="automation"
          eyebrow={t("automation.eyebrow")}
          title={t("automation.title")}
          subtitle={t("automation.subtitle")}
          items={automationItems}
          icons={automationIcons}
        />

        <OperatingSection
          id="legal"
          anchorId="legal-protection"
          eyebrow={t("legal.eyebrow")}
          title={t("legal.title")}
          subtitle={t("legal.subtitle")}
          items={legalItems}
          icons={legalIcons}
        />

        <section className="relative overflow-hidden bg-white px-5 py-16 text-[#111111] sm:py-20 lg:px-8 lg:py-28">
          <div className="container-narrow">
            <div className="relative overflow-hidden rounded-[2.5rem] border border-black/10 bg-white p-7 shadow-[0_30px_110px_rgba(0,0,0,0.10)] sm:p-10 lg:p-12">
              <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-accent/70 to-transparent" />
              <div className="absolute -right-20 -top-20 h-48 w-48 rounded-full bg-accent/10 blur-3xl" />

              <div className="relative z-10 grid gap-8 lg:grid-cols-[1fr_auto] lg:items-center">
                <div>
                  <h2 className="text-3xl font-bold leading-tight tracking-[-0.035em] text-[#111111] sm:text-4xl lg:text-5xl">
                    {t("howItWorksPage.cta.title")}
                  </h2>

                  <p className="mt-5 max-w-2xl text-base leading-8 text-[#111111]/64">
                    {t("howItWorksPage.cta.body")}
                  </p>
                </div>

                <Link
                  to={localize("/contact")}
                  className="inline-flex items-center justify-center gap-3 rounded-full border border-accent/50 bg-accent px-7 py-4 text-center text-xs font-bold uppercase tracking-[0.22em] text-[#111111] shadow-[0_18px_55px_rgba(212,175,55,0.20)] transition-all duration-300 hover:-translate-y-0.5 hover:bg-accent/90 focus:outline-none focus:ring-2 focus:ring-accent/45"
                >
                  {t("howItWorksPage.cta.button")}
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

const OperatingSection = ({
  id,
  anchorId,
  eyebrow,
  title,
  subtitle,
  items,
  icons,
}: {
  id: string;
  anchorId?: string;
  eyebrow: string;
  title: string;
  subtitle: string;
  items: DetailItem[];
  icons: LucideIcon[];
}) => (
  <section id={id} className="relative overflow-hidden bg-[#05070D] px-5 py-16 text-white sm:py-20 lg:px-8 lg:py-28">
    {anchorId && <span id={anchorId} className="absolute -top-28" aria-hidden="true" />}
    <div className="absolute inset-0 bg-[radial-gradient(circle_at_15%_18%,rgba(212,175,55,0.11)_0%,transparent_34%)]" />
    <div className="container-narrow relative z-10">
      <div className="max-w-3xl">
        <span className="mb-4 block text-xs font-bold uppercase tracking-[0.28em] text-accent">
          {eyebrow}
        </span>

        <h2 className="text-3xl font-bold leading-tight tracking-[-0.035em] text-white text-balance sm:text-4xl lg:text-5xl">
          {title}
        </h2>

        <p className="mt-5 text-base leading-8 text-white/64">
          {subtitle}
        </p>
      </div>

      <div className={`mt-10 grid gap-5 md:grid-cols-2 ${items.length === 3 ? "lg:grid-cols-3" : "lg:grid-cols-4"}`}>
        {items.map((item, index) => {
          const Icon = icons[index] ?? CheckCircle2;

          return (
            <article
              key={item.title}
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
                {item.title}
              </h3>

              <p className="mt-4 text-sm leading-7 text-white/58">
                {item.desc}
              </p>

              {item.detail && (
                <p className="mt-5 border-t border-white/10 pt-5 text-sm leading-7 text-white/68">
                  {item.detail}
                </p>
              )}
            </article>
          );
        })}
      </div>
    </div>
  </section>
);

export default HowItWorksPage;
