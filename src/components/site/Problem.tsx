import { useEffect, useRef, useState } from "react";
import { Wallet, LineChart, Wrench, MessageSquareOff, FileQuestion, UserCheck, X } from "lucide-react";
import { useTranslation } from "react-i18next";

const icons = [Wallet, LineChart, Wrench, MessageSquareOff, FileQuestion, UserCheck];

type Item = {
  title: string;
  detail: string;
};

const Problem = () => {
  const { t, i18n } = useTranslation();
  const items = t("problem.items", { returnObjects: true }) as Item[];
  const [openIdx, setOpenIdx] = useState<number | null>(null);
  const [activeMobileIdx, setActiveMobileIdx] = useState(0);
  const mobileScrollRef = useRef<HTMLDivElement | null>(null);

  const open = openIdx !== null ? items[openIdx] : null;
  const OpenIcon = openIdx !== null ? icons[openIdx] ?? Wallet : null;

  useEffect(() => {
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setOpenIdx(null);
      }
    };

    window.addEventListener("keydown", handleEscape);

    return () => {
      window.removeEventListener("keydown", handleEscape);
    };
  }, []);

  const handleMobileScroll = () => {
    const container = mobileScrollRef.current;

    if (!container) {
      return;
    }

    const mobileCards = Array.from(
      container.querySelectorAll<HTMLElement>("[data-problem-card]"),
    );

    if (!mobileCards.length) {
      return;
    }

    const containerRect = container.getBoundingClientRect();
    const containerCenter = containerRect.left + containerRect.width / 2;

    const closest = mobileCards.reduce(
      (best, card, index) => {
        const rect = card.getBoundingClientRect();
        const cardCenter = rect.left + rect.width / 2;
        const distance = Math.abs(cardCenter - containerCenter);

        return distance < best.distance ? { index, distance } : best;
      },
      { index: 0, distance: Number.POSITIVE_INFINITY },
    );

    setActiveMobileIdx(closest.index);
  };

  const scrollToMobileCard = (index: number) => {
    const container = mobileScrollRef.current;

    if (!container) {
      return;
    }

    const mobileCards = Array.from(
      container.querySelectorAll<HTMLElement>("[data-problem-card]"),
    );
    const target = mobileCards[index];

    if (!target) {
      return;
    }

    const left =
      target.offsetLeft -
      container.offsetLeft -
      (container.clientWidth - target.clientWidth) / 2;

    container.scrollTo({ left, behavior: "smooth" });
    setActiveMobileIdx(index);
  };


  return (
    <section id="problem" className="relative overflow-hidden bg-gradient-soft py-16 sm:py-20 lg:py-32">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(220,38,38,0.07)_0%,transparent_35%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_right,rgba(212,175,55,0.08)_0%,transparent_38%)]" />

      <div className="container-narrow relative z-10">
        <div className="max-w-3xl mb-14">
          <span className="text-xs font-bold tracking-[0.25em] uppercase text-accent mb-4 block">
            {t("problem.eyebrow")}
          </span>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground leading-tight text-balance mb-6">
            {t("problem.titleLead")}{" "}
            <span className="text-destructive">{t("problem.titleAccent")}</span>
          </h2>
        </div>

        <div className="sm:hidden">
          <div
            ref={mobileScrollRef}
            onScroll={handleMobileScroll}
            className="-mx-5 flex snap-x snap-mandatory gap-4 overflow-x-auto px-5 pb-2 scroll-smooth [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
            dir="ltr"
          >
            {items.map((item, index) => {
              const Icon = icons[index] ?? Wallet;

              return (
                <button
                  type="button"
                  key={item.title}
                  data-problem-card
                  onClick={() => setOpenIdx(index)}
                  className="relative min-h-[178px] w-[82vw] shrink-0 snap-center cursor-pointer overflow-hidden rounded-[1.75rem] border border-border bg-card p-6 text-left shadow-[0_18px_52px_rgba(0,0,0,0.08)] transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-accent/40"
                  style={{ textAlign: i18n.dir() === "rtl" ? "right" : "left" }}
                >
                  <span className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(212,175,55,0.14)_0%,transparent_45%)]" />
                  <span className="pointer-events-none absolute inset-x-5 top-0 h-px bg-gradient-to-r from-transparent via-accent/45 to-transparent" />

                  <div className="relative z-10 flex items-start justify-between gap-4" dir={i18n.dir()}>
                    <div className="flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-xl border border-accent/25 bg-accent/10">
                      <Icon className="h-5 w-5 text-accent" strokeWidth={1.75} />
                    </div>

                    <span className="text-xs font-bold tracking-[0.22em] text-accent/70" dir="ltr">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                  </div>

                  <h3 className="relative z-10 mt-6 text-xl font-bold leading-snug text-foreground">
                    {item.title}
                  </h3>
                </button>
              );
            })}
          </div>

          <div className="mt-5 flex items-center justify-center gap-2" dir="ltr">
            {items.map((item, index) => (
              <button
                key={item.title}
                type="button"
                onClick={() => scrollToMobileCard(index)}
                className={`h-2.5 w-2.5 rounded-full border transition-all duration-300 ${
                  activeMobileIdx === index
                    ? "border-accent bg-accent shadow-[0_0_16px_rgba(212,175,55,0.45)]"
                    : "border-foreground/25 bg-transparent"
                }`}
                aria-label={`Show problem ${index + 1}`}
              />
            ))}
          </div>
        </div>

        <div className="hidden gap-4 sm:grid sm:grid-cols-2 lg:grid-cols-3 [perspective:1200px]">
          {items.map((item, index) => {
            const Icon = icons[index] ?? Wallet;

            return (
              <button
                type="button"
                key={item.title}
                onClick={() => setOpenIdx(index)}
                className="group relative cursor-pointer overflow-hidden rounded-2xl border border-border bg-card p-6 text-left shadow-sm transition-all duration-500 [transform-style:preserve-3d] hover:border-accent/45 hover:shadow-[0_28px_90px_rgba(0,0,0,0.12)] hover:[transform:translateY(-8px)_rotateX(3deg)_rotateY(-2deg)] focus:outline-none focus:ring-2 focus:ring-accent/40"
              >
                <span className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(212,175,55,0.14)_0%,transparent_42%)] opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
                <span className="pointer-events-none absolute inset-x-5 top-0 h-px bg-gradient-to-r from-transparent via-accent/45 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />

                <div className="relative z-10 flex items-start gap-4">
                  <div className="flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-xl border border-accent/25 bg-accent/10 transition-all duration-300 group-hover:border-accent/45 group-hover:bg-accent/15 group-hover:[transform:translateZ(22px)]">
                    <Icon className="h-5 w-5 text-accent" strokeWidth={1.75} />
                  </div>

                  <span className="pt-2 text-sm font-semibold leading-relaxed text-foreground/90 transition-transform duration-300 group-hover:[transform:translateZ(16px)] sm:text-base">
                    {item.title}
                  </span>
                </div>
              </button>
            );
          })}
        </div>

        <p className="mt-12 text-center text-2xl font-bold text-foreground lg:text-3xl">
          {t("problem.footerLead")}{" "}
          <span className="text-destructive">{t("problem.footerAccent")}</span>
        </p>
      </div>

      {open && OpenIcon && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/45 px-5 backdrop-blur-md"
          onClick={() => setOpenIdx(null)}
        >
          <div
            className="relative w-full max-w-2xl overflow-hidden rounded-3xl border border-border bg-white p-6 text-foreground shadow-[0_30px_120px_rgba(0,0,0,0.22)] sm:p-8"
            onClick={(event) => event.stopPropagation()}
          >
            <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-accent/70 to-transparent" />
            <div className="absolute -right-20 -top-20 h-48 w-48 rounded-full bg-accent/10 blur-3xl" />

            <button
              type="button"
              onClick={() => setOpenIdx(null)}
              className="absolute right-4 top-4 z-20 grid h-10 w-10 place-items-center rounded-full border border-border bg-background p-0 text-muted-foreground transition-all duration-300 hover:border-accent/50 hover:text-foreground"
              aria-label={t("common.close")}
            >
              <X className="pointer-events-none h-4 w-4" />
            </button>

            <div className="relative z-10">
              <div className="mb-6 flex h-12 w-12 items-center justify-center rounded-2xl border border-accent/30 bg-accent/10">
                <OpenIcon className="h-5 w-5 text-accent" strokeWidth={1.75} />
              </div>

              <h3 className="max-w-[85%] text-2xl font-semibold leading-tight text-foreground sm:text-3xl">
                {open.title}
              </h3>

              <div className="mt-6 h-px w-full bg-gradient-to-r from-accent/55 via-border to-transparent" />

              <p className="mt-6 text-base leading-8 text-muted-foreground">
                {open.detail}
              </p>

              <div className="mt-7 h-px w-full bg-gradient-to-r from-accent/45 via-border to-transparent" />

              <div className="mt-5 text-xs uppercase tracking-[0.24em] text-accent">
                Neurora Property Management
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default Problem;