import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { getLocalizedPath } from "@/lib/i18nRouting";

type Step = {
  n: string;
  title: string;
  desc: string;
  detail: string;
};


const HowItWorks = () => {
  const { t, i18n } = useTranslation();
  const localize = (path: string) => getLocalizedPath(path, i18n.language);

  const stepsResult = t("process.steps", { returnObjects: true });
  const steps = Array.isArray(stepsResult) ? (stepsResult as Step[]).slice(0, 3) : [];
  const ctaLabel = t("process.homeCta", {
    defaultValue: t("operatingSystem.eyebrow", { defaultValue: "Neurora Operating System" }),
  });

  return (
    <section
      id="process"
      className="relative scroll-mt-24 overflow-hidden bg-[#05070D] py-14 text-white sm:py-16 lg:py-24"
    >
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_15%_18%,rgba(212,175,55,0.13)_0%,transparent_34%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_82%_58%,rgba(255,255,255,0.055)_0%,transparent_36%)]" />
      <div className="absolute inset-0 bg-[linear-gradient(135deg,rgba(255,255,255,0.03)_0%,transparent_40%,rgba(212,175,55,0.04)_100%)]" />
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/15 to-transparent" />
      <div className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-accent/35 to-transparent" />

      <div className="container-narrow relative z-10">
        <div className="grid gap-8 lg:grid-cols-[0.85fr_1fr] lg:items-center">
          <div className="max-w-2xl">
            <span className="mb-4 block text-xs font-bold uppercase tracking-[0.28em] text-accent">
              {t("process.eyebrow")}
            </span>

            <h2 className="text-3xl font-bold leading-[1.03] tracking-[-0.035em] text-white text-balance sm:text-4xl lg:text-5xl">
              {t("process.title")}
            </h2>

            <p className="mt-5 max-w-xl text-base leading-8 text-white/66">
              {t("process.subtitle")}
            </p>

            <Link
              to={localize("/neurora-operating-system")}
              className="mt-7 hidden items-center justify-center gap-3 rounded-full border border-accent/50 bg-accent px-7 py-4 text-center text-xs font-bold uppercase tracking-[0.22em] text-[#111111] shadow-[0_18px_55px_rgba(212,175,55,0.20)] transition-all duration-300 hover:-translate-y-0.5 hover:bg-accent/90 hover:shadow-[0_24px_70px_rgba(212,175,55,0.26)] focus:outline-none focus:ring-2 focus:ring-accent/45 sm:inline-flex"
            >
              {ctaLabel}
              <ArrowRight className="h-4 w-4" strokeWidth={2} />
            </Link>
          </div>

          <div className="relative overflow-hidden rounded-[2rem] border border-white/10 bg-white/[0.045] p-5 shadow-[0_28px_90px_rgba(0,0,0,0.28)] backdrop-blur-xl sm:p-6 lg:p-7">
            <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-accent/65 to-transparent" />
            <div className="absolute -right-20 -top-20 h-44 w-44 rounded-full bg-accent/10 blur-3xl" />

            <ol className="relative z-10 space-y-5">
              {steps.map((step, index) => (
                <li key={step.n} className="relative grid grid-cols-[3.25rem_1fr] gap-4">
                  <div className="relative flex justify-center">
                    {index < steps.length - 1 && (
                      <span className="absolute top-12 h-[calc(100%+1.25rem)] w-px bg-gradient-to-b from-accent/45 via-white/12 to-transparent" />
                    )}

                    <span className="relative z-10 flex h-11 w-11 items-center justify-center rounded-2xl border border-accent/35 bg-accent/10 text-xs font-bold tracking-[0.18em] text-accent shadow-[0_0_35px_rgba(212,175,55,0.10)]">
                      {step.n}
                    </span>
                  </div>

                  <div className="min-w-0 pb-1">
                    <h3 className="text-base font-bold leading-tight text-white sm:text-lg">
                      {step.title}
                    </h3>

                    <p className="mt-2 text-sm leading-7 text-white/58">
                      {step.desc}
                    </p>
                  </div>
                </li>
              ))}
            </ol>

            <div className="relative z-10 mt-6 overflow-hidden rounded-2xl border border-accent/25 bg-accent/10 p-5">
              <div className="absolute inset-x-5 top-0 h-px bg-gradient-to-r from-transparent via-accent/60 to-transparent" />

              <div className="text-[10px] font-bold uppercase tracking-[0.28em] text-accent/85">
                {t("process.fromHere")}
              </div>

              <p className="mt-3 text-lg font-bold leading-snug text-white">
                {t("process.fromHereTitle")}
              </p>
            </div>
          </div>

          <Link
            to={localize("/neurora-operating-system")}
            className="flex w-full items-center justify-center gap-3 rounded-full border border-accent/50 bg-accent px-7 py-4 text-center text-xs font-bold uppercase tracking-[0.22em] text-[#111111] shadow-[0_18px_55px_rgba(212,175,55,0.20)] transition-all duration-300 active:scale-[0.98] focus:outline-none focus:ring-2 focus:ring-accent/45 sm:hidden"
          >
            {ctaLabel}
            <ArrowRight className="h-4 w-4" strokeWidth={2} />
          </Link>
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
