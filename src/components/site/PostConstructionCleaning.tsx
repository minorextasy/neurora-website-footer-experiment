import { useEffect, useState } from "react";
import { Building2, CheckCircle2, Wrench, X, type LucideIcon } from "lucide-react";
import { useTranslation } from "react-i18next";

type Card = {
  key: string;
  title: string;
  desc: string;
  detail: string;
};

const iconByKey: Record<string, LucideIcon> = {
  debris: Wrench,
  common: Building2,
  handover: CheckCircle2,
};

const PostConstructionCleaning = () => {
  const { t } = useTranslation();
  const [openCard, setOpenCard] = useState<Card | null>(null);

  const cardsResult = t("postConstruction.cards", {
    returnObjects: true,
  });

  const cards = Array.isArray(cardsResult) ? (cardsResult as Card[]) : [];
  const OpenIcon = openCard ? iconByKey[openCard.key] ?? Building2 : null;

  useEffect(() => {
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setOpenCard(null);
      }
    };

    window.addEventListener("keydown", handleEscape);

    return () => {
      window.removeEventListener("keydown", handleEscape);
    };
  }, []);

  return (
    <section
      id="post-construction-cleaning"
      className="relative overflow-hidden bg-[#05070D] py-16 text-white sm:py-20 lg:py-32"
    >
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(212,175,55,0.12)_0%,transparent_38%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_right,rgba(255,255,255,0.045)_0%,transparent_35%)]" />
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-accent/45 to-transparent" />
      <div className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-white/15 to-transparent" />

      <div className="container-narrow relative z-10">
        <div className="grid gap-10 lg:grid-cols-[1fr_0.95fr] lg:items-center lg:gap-12">
          <div>
            <span className="mb-4 block text-xs font-bold uppercase tracking-[0.25em] text-accent">
              {t("postConstruction.eyebrow")}
            </span>

            <h2 className="max-w-3xl text-3xl font-bold leading-tight text-white text-balance sm:text-4xl lg:text-5xl">
              {t("postConstruction.title")}
            </h2>

            <p className="mt-6 max-w-2xl text-base leading-8 text-white/68 sm:text-lg">
              {t("postConstruction.subtitle")}
            </p>
          </div>

          <div className="relative">
            <div className="absolute -inset-5 rounded-[2rem] bg-accent/10 blur-2xl sm:-inset-6 sm:blur-3xl" />

            <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-white/[0.045] p-4 shadow-[0_20px_80px_rgba(0,0,0,0.28)] sm:p-6 lg:backdrop-blur-md">
              <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-accent/60 to-transparent" />
              <div className="pointer-events-none absolute -right-16 -top-16 h-36 w-36 rounded-full bg-accent/10 blur-3xl" />

              <div className="grid gap-3 sm:grid-cols-2 sm:gap-4">
                <div className="relative overflow-hidden rounded-2xl border border-white/10 bg-black/30 p-4 sm:p-5">
                  <div className="mb-4 flex items-center justify-between gap-4">
                    <div className="h-1.5 w-16 rounded-full bg-white/20" />
                    <span className="text-[10px] font-bold uppercase tracking-[0.24em] text-white/35">
                      01
                    </span>
                  </div>
                  <h3 className="text-xs font-semibold uppercase tracking-[0.22em] text-white/50 sm:text-sm">
                    {t("postConstruction.visual.beforeTitle")}
                  </h3>
                  <p className="mt-3 text-sm leading-7 text-white/62 sm:mt-4">
                    {t("postConstruction.visual.beforeText")}
                  </p>
                </div>

                <div className="relative overflow-hidden rounded-2xl border border-accent/35 bg-accent/10 p-4 shadow-[0_0_45px_rgba(212,175,55,0.10)] sm:p-5">
                  <div className="pointer-events-none absolute inset-y-0 -left-20 w-20 rotate-12 bg-gradient-to-r from-transparent via-white/12 to-transparent motion-safe:animate-pulse" />

                  <div className="mb-4 flex items-center justify-between gap-4">
                    <div className="h-1.5 w-16 rounded-full bg-accent" />
                    <span className="text-[10px] font-bold uppercase tracking-[0.24em] text-accent/80">
                      02
                    </span>
                  </div>
                  <h3 className="text-xs font-semibold uppercase tracking-[0.22em] text-accent sm:text-sm">
                    {t("postConstruction.visual.afterTitle")}
                  </h3>
                  <p className="mt-3 text-sm leading-7 text-white/75 sm:mt-4">
                    {t("postConstruction.visual.afterText")}
                  </p>
                </div>
              </div>

              <div className="mt-5 h-px w-full bg-gradient-to-r from-transparent via-white/15 to-transparent" />

              <div className="mt-5 text-xs uppercase tracking-[0.24em] text-accent/80">
                Neurora Property Management
              </div>
            </div>
          </div>
        </div>

        <div className="mt-10 md:hidden">
          <div className="flex snap-x snap-mandatory gap-4 overflow-x-auto pb-3 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
            {cards.map((card, index) => {
              const Icon = iconByKey[card.key] ?? Building2;

              return (
                <button
                  key={card.key}
                  type="button"
                  onClick={() => setOpenCard(card)}
                  className="relative min-w-[82%] snap-center overflow-hidden rounded-2xl border border-accent/18 bg-white/[0.055] p-5 text-left shadow-[0_16px_55px_rgba(0,0,0,0.26)] transition-colors duration-300 active:border-accent/45 focus:outline-none focus:ring-2 focus:ring-accent/35"
                >
                  <span className="pointer-events-none absolute inset-x-5 top-0 h-px bg-gradient-to-r from-transparent via-accent/45 to-transparent" />
                  <span className="pointer-events-none absolute -right-14 -top-14 h-32 w-32 rounded-full bg-accent/10 blur-2xl" />

                  <div className="relative z-10 mb-5 flex items-center justify-between gap-4">
                    <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-accent/25 bg-accent/10">
                      <Icon className="h-5 w-5 text-accent" strokeWidth={1.75} />
                    </div>

                    <span className="text-[11px] font-bold uppercase tracking-[0.24em] text-accent/75">
                      0{index + 1}
                    </span>
                  </div>

                  <h3 className="relative z-10 text-lg font-bold leading-snug text-white">
                    {card.title}
                  </h3>

                  <p className="relative z-10 mt-3 text-sm leading-7 text-white/62">
                    {card.desc}
                  </p>
                </button>
              );
            })}
          </div>

          <div className="mt-3 flex items-center justify-center gap-2" aria-hidden="true">
            {cards.map((card, index) => (
              <span
                key={`${card.key}-dot`}
                className={index === 0 ? "h-1.5 w-6 rounded-full bg-accent/80" : "h-1.5 w-1.5 rounded-full bg-white/25"}
              />
            ))}
          </div>
        </div>

        <div className="mt-12 hidden gap-4 md:grid md:grid-cols-3 [perspective:1200px]">
          {cards.map((card) => {
            const Icon = iconByKey[card.key] ?? Building2;

            return (
              <button
                key={card.key}
                type="button"
                onClick={() => setOpenCard(card)}
                className="group relative cursor-pointer overflow-hidden rounded-2xl border border-white/10 bg-white/[0.04] p-6 text-left backdrop-blur-md transition-all duration-500 [transform-style:preserve-3d] hover:border-accent/45 hover:bg-white/[0.065] hover:shadow-[0_28px_90px_rgba(0,0,0,0.28)] hover:[transform:translateY(-8px)_rotateX(3deg)_rotateY(-2deg)] focus:outline-none focus:ring-2 focus:ring-accent/40"
              >
                <span className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(212,175,55,0.16)_0%,transparent_42%)] opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
                <span className="pointer-events-none absolute inset-x-5 top-0 h-px bg-gradient-to-r from-transparent via-accent/45 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />

                <div className="relative z-10 mb-5 flex h-11 w-11 items-center justify-center rounded-xl border border-accent/25 bg-accent/10 transition-all duration-300 group-hover:border-accent/45 group-hover:bg-accent/15 group-hover:[transform:translateZ(22px)]">
                  <Icon className="h-5 w-5 text-accent" strokeWidth={1.75} />
                </div>

                <h3 className="relative z-10 text-lg font-bold leading-snug text-white transition-transform duration-300 group-hover:[transform:translateZ(18px)]">
                  {card.title}
                </h3>

                <p className="relative z-10 mt-3 text-sm leading-relaxed text-white/60 transition-transform duration-300 group-hover:[transform:translateZ(12px)]">
                  {card.desc}
                </p>
              </button>
            );
          })}
        </div>
      </div>

      {openCard && OpenIcon && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/70 px-5 backdrop-blur-md"
          onClick={() => setOpenCard(null)}
        >
          <div
            className="relative max-h-[86vh] w-full max-w-2xl overflow-x-hidden overflow-y-auto rounded-3xl border border-white/10 bg-[#080B12]/95 p-6 text-white shadow-[0_30px_120px_rgba(0,0,0,0.55)] sm:p-8"
            onClick={(event) => event.stopPropagation()}
          >
            <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-accent/60 to-transparent" />
            <div className="absolute -right-20 -top-20 h-48 w-48 rounded-full bg-accent/10 blur-3xl" />

            <button
              type="button"
              onClick={() => setOpenCard(null)}
              className="absolute right-4 top-4 z-20 grid h-10 w-10 place-items-center rounded-full border border-white/10 bg-white/5 p-0 text-white/70 transition-all duration-300 hover:border-accent/40 hover:text-white"
              aria-label={t("common.close")}
            >
              <X className="pointer-events-none h-4 w-4" />
            </button>

            <div className="relative z-10 min-w-0 break-words">
              <div className="mb-6 flex justify-start" dir="ltr">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl border border-accent/30 bg-accent/10">
                  <OpenIcon className="h-5 w-5 text-accent" strokeWidth={1.75} />
                </div>
              </div>

              <h3 className="max-w-[85%] text-2xl font-semibold leading-tight text-white sm:text-3xl">
                {openCard.title}
              </h3>

              <p className="mt-3 text-sm font-medium text-white/55">
                {openCard.desc}
              </p>

              <div className="mt-6 h-px w-full bg-gradient-to-r from-accent/50 via-white/10 to-transparent" />

              <p className="mt-6 text-base leading-8 text-white/72">
                {openCard.detail}
              </p>

              <div className="mt-7 h-px w-full bg-gradient-to-r from-accent/40 via-white/10 to-transparent" />

              <div className="mt-5 text-xs uppercase tracking-[0.24em] text-accent/75">
                Neurora Property Management
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default PostConstructionCleaning;
