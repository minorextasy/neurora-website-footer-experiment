import { useEffect, useState } from "react";
import { CheckCircle2, ChevronDown } from "lucide-react";
import { useTranslation } from "react-i18next";

type SolutionCard = {
  title: string;
  text: string;
  detail: string;
};

const Solution = () => {
  const { t } = useTranslation();
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const cards: SolutionCard[] = [
    {
      title: t("financial.eyebrow"),
      text: t("financial.title"),
      detail: t("financial.subtitle"),
    },
    {
      title: t("communication.eyebrow"),
      text: t("communication.title"),
      detail: t("communication.subtitle"),
    },
    {
      title: t("automation.eyebrow"),
      text: t("automation.title"),
      detail: t("automation.subtitle"),
    },
    {
      title: t("legal.eyebrow"),
      text: t("legal.title"),
      detail: t("legal.subtitle"),
    },
  ];

  useEffect(() => {
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setOpenIndex(null);
      }
    };

    window.addEventListener("keydown", handleEscape);

    return () => {
      window.removeEventListener("keydown", handleEscape);
    };
  }, []);

  return (
    <section
      id="solution"
      className="relative scroll-mt-24 overflow-hidden bg-[#05070D] py-16 text-white sm:py-20 lg:py-32"
    >
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_12%_18%,rgba(212,175,55,0.14)_0%,transparent_34%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_86%_72%,rgba(212,175,55,0.10)_0%,transparent_34%)]" />
      <div className="absolute inset-0 bg-[linear-gradient(135deg,rgba(255,255,255,0.035)_0%,transparent_42%,rgba(212,175,55,0.045)_100%)]" />
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-accent/35 to-transparent" />
      <div className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />

      <div className="container-narrow relative z-10">
        <div className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:items-start lg:gap-12">
          <div className="lg:sticky lg:top-28">
            <span className="mb-5 block text-xs font-bold uppercase tracking-[0.28em] text-accent">
              {t("solution.eyebrow")}
            </span>

            <h2 className="max-w-4xl text-3xl font-bold leading-[1.02] tracking-[-0.035em] text-white text-balance sm:text-5xl lg:text-6xl">
              {t("solution.title")}
            </h2>

            <div className="mt-8 overflow-hidden rounded-[1.75rem] border border-white/10 bg-white/[0.045] p-6 shadow-[0_22px_80px_rgba(0,0,0,0.30)] backdrop-blur-md sm:p-7">
              <div className="mb-5 flex items-center gap-3">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl border border-accent/30 bg-accent/10">
                  <CheckCircle2 className="h-5 w-5 text-accent" strokeWidth={1.75} />
                </div>

                <div className="text-[10px] font-bold uppercase tracking-[0.28em] text-accent">
                  {t("solution.bridgeLabel", { defaultValue: "Neurora Structure" })}
                </div>
              </div>

              <p className="text-sm leading-7 text-white/70 sm:text-base sm:leading-8">
                {t("solution.body")}
              </p>

              <div className="mt-6 h-px w-full bg-gradient-to-r from-accent/60 via-white/10 to-transparent" />

              <p className="mt-5 text-sm font-semibold leading-7 text-accent/90">
                {t("solution.footer")}
              </p>
            </div>
          </div>

          <div className="rounded-[2rem] border border-white/10 bg-black/25 p-3 shadow-[0_28px_100px_rgba(0,0,0,0.28)] backdrop-blur-md sm:p-4 lg:p-5">
            <div className="space-y-3">
              {cards.map((card, index) => {
                const isOpen = openIndex === index;

                return (
                  <div
                    key={card.title}
                    className={`relative overflow-hidden rounded-[1.5rem] border transition-all duration-300 ${
                      isOpen
                        ? "border-accent/45 bg-accent/[0.085] shadow-[0_18px_70px_rgba(212,175,55,0.12)]"
                        : "border-white/10 bg-white/[0.035] hover:border-accent/30 hover:bg-white/[0.055]"
                    }`}
                  >
                    <div
                      className={`pointer-events-none absolute inset-x-6 top-0 h-px bg-gradient-to-r from-transparent via-accent/60 to-transparent transition-opacity duration-300 ${
                        isOpen ? "opacity-100" : "opacity-0"
                      }`}
                    />

                    <button
                      type="button"
                      onClick={() => setOpenIndex(isOpen ? null : index)}
                      className="relative z-10 flex w-full items-start justify-between gap-4 p-5 text-left sm:p-6"
                      aria-expanded={isOpen}
                    >
                      <div className="min-w-0">
                        <div className="mb-3 flex items-center gap-3">
                          <span
                            className={`text-[11px] font-bold uppercase tracking-[0.24em] ${
                              isOpen ? "text-accent" : "text-accent/75"
                            }`}
                          >
                            0{index + 1}
                          </span>

                          <span
                            className={`h-px w-10 bg-gradient-to-r from-accent/70 to-transparent transition-opacity duration-300 ${
                              isOpen ? "opacity-100" : "opacity-55"
                            }`}
                          />
                        </div>

                        <h3 className="text-base font-bold leading-tight text-white sm:text-xl">
                          {card.title}
                        </h3>

                        <p className="mt-2 text-sm leading-6 text-white/58 sm:mt-3 sm:leading-7">
                          {card.text}
                        </p>
                      </div>

                      <span
                        className={`mt-1 flex h-9 w-9 shrink-0 items-center justify-center rounded-full border transition-all duration-300 ${
                          isOpen
                            ? "rotate-180 border-accent/45 bg-accent/15 text-accent"
                            : "border-white/10 bg-white/[0.035] text-white/55"
                        }`}
                      >
                        <ChevronDown className="h-4 w-4" strokeWidth={1.75} />
                      </span>
                    </button>

                    {isOpen && (
                      <div className="relative z-10 px-5 pb-5 sm:px-6 sm:pb-6">
                        <div className="mb-5 h-px w-full bg-gradient-to-r from-accent/50 via-white/10 to-transparent" />

                        <p className="text-sm leading-7 text-white/72 sm:text-base sm:leading-8">
                          {card.detail}
                        </p>

                        <div className="mt-5 text-[10px] font-bold uppercase tracking-[0.24em] text-accent/70">
                          Neurora Property Management
                        </div>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Solution;
