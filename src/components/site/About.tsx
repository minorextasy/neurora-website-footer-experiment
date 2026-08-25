import { useEffect, useState } from "react";
import { Check, X } from "lucide-react";
import { useTranslation } from "react-i18next";

type Item = {
  title: string;
  desc: string;
  detail: string;
};

const cardVisuals = [
  {
    wash: "bg-[radial-gradient(circle_at_top_right,rgba(245,215,110,0.18)_0%,transparent_46%)]",
    orb: "bg-[#F5D76E]/18",
    line: "via-[#F5D76E]/65",
    icon: "border-[#F5D76E]/35 bg-[#F5D76E]/12 group-hover:border-[#F5D76E]/60 group-hover:bg-[#F5D76E]/18",
    iconColor: "text-[#B88718]",
    number: "text-[#B88718]/80",
  },
  {
    wash: "bg-[radial-gradient(circle_at_top_right,rgba(245,215,110,0.18)_0%,transparent_46%)]",
    orb: "bg-[#F5D76E]/18",
    line: "via-[#F5D76E]/65",
    icon: "border-[#F5D76E]/35 bg-[#F5D76E]/12 group-hover:border-[#F5D76E]/60 group-hover:bg-[#F5D76E]/18",
    iconColor: "text-[#B88718]",
    number: "text-[#B88718]/80",
  },
  {
    wash: "bg-[radial-gradient(circle_at_top_right,rgba(245,215,110,0.18)_0%,transparent_46%)]",
    orb: "bg-[#F5D76E]/18",
    line: "via-[#F5D76E]/65",
    icon: "border-[#F5D76E]/35 bg-[#F5D76E]/12 group-hover:border-[#F5D76E]/60 group-hover:bg-[#F5D76E]/18",
    iconColor: "text-[#B88718]",
    number: "text-[#B88718]/80",
  },
];

const About = () => {
  const { t } = useTranslation();
  const items = t("about.items", { returnObjects: true }) as Item[];
  const [open, setOpen] = useState<Item | null>(null);

  useEffect(() => {
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setOpen(null);
      }
    };

    window.addEventListener("keydown", handleEscape);

    return () => {
      window.removeEventListener("keydown", handleEscape);
    };
  }, []);

  return (
    <section id="about" className="relative overflow-hidden bg-background py-16 sm:py-20 lg:py-32">
      <style>{`
        @keyframes neurora-card-float {
          0%, 100% { transform: translate3d(0, 0, 0); }
          50% { transform: translate3d(0, -8px, 0); }
        }

        @keyframes neurora-gold-scan {
          0% { transform: translateX(-130%); opacity: 0; }
          18% { opacity: 0.95; }
          52% { opacity: 0.95; }
          100% { transform: translateX(130%); opacity: 0; }
        }

        @keyframes neurora-card-orb {
          0%, 100% { transform: translate3d(0, 0, 0) scale(1); opacity: 0.62; }
          50% { transform: translate3d(-10px, 14px, 0) scale(1.14); opacity: 0.95; }
        }

        .neurora-property-scrollbar {
          scrollbar-width: none;
          -ms-overflow-style: none;
        }

        .neurora-property-scrollbar::-webkit-scrollbar {
          display: none;
        }

        @media (min-width: 768px) {
          .neurora-property-card-wrap {
            animation: neurora-card-float 7.5s ease-in-out infinite;
          }

          .neurora-property-card-wrap:nth-child(2) {
            animation-delay: 0.65s;
          }

          .neurora-property-card-wrap:nth-child(3) {
            animation-delay: 1.3s;
          }

          .neurora-gold-scan {
            animation: neurora-gold-scan 4.8s ease-in-out infinite;
          }

          .neurora-card-orb {
            animation: neurora-card-orb 6.2s ease-in-out infinite;
          }

          .neurora-property-card-wrap:nth-child(2) .neurora-gold-scan,
          .neurora-property-card-wrap:nth-child(2) .neurora-card-orb {
            animation-delay: 0.7s;
          }

          .neurora-property-card-wrap:nth-child(3) .neurora-gold-scan,
          .neurora-property-card-wrap:nth-child(3) .neurora-card-orb {
            animation-delay: 1.4s;
          }
        }

        @media (prefers-reduced-motion: reduce) {
          .neurora-property-card-wrap,
          .neurora-gold-scan,
          .neurora-card-orb {
            animation: none !important;
          }
        }
      `}</style>

      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(212,175,55,0.08)_0%,transparent_35%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_12%_68%,rgba(212,175,55,0.05)_0%,transparent_32%)]" />
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-border to-transparent" />

      <div className="container-narrow relative z-10">
        <div className="mb-14 max-w-3xl">
          <span className="mb-4 block text-xs font-bold uppercase tracking-[0.25em] text-accent">
            {t("about.eyebrow")}
          </span>

          <h2 className="mb-6 text-balance text-3xl font-bold leading-tight text-foreground sm:text-4xl lg:text-5xl">
            {t("about.title")}
          </h2>

          <p className="text-lg leading-relaxed text-muted-foreground">
            {t("about.subtitle")}
          </p>
        </div>

        <div className="neurora-property-scrollbar -mx-5 flex snap-x snap-mandatory gap-4 overflow-x-auto px-5 pb-6 md:mx-0 md:grid md:grid-cols-3 md:gap-5 md:overflow-visible md:px-0 md:pb-0 [perspective:1200px]">
          {items.map((item, index) => {
            const visual = cardVisuals[index % cardVisuals.length];

            return (
              <div
                key={item.title}
                className="neurora-property-card-wrap h-full w-[82vw] max-w-[345px] flex-none snap-center rounded-[1.75rem] md:w-auto md:max-w-none"
              >
                <button
                  type="button"
                  onClick={() => setOpen(item)}
                  aria-label={item.title}
                  className="group relative h-full min-h-[230px] w-full cursor-pointer overflow-hidden rounded-[1.75rem] border border-accent/20 bg-card/95 p-7 text-left shadow-[0_18px_55px_rgba(0,0,0,0.08)] transition-all duration-500 [transform-style:preserve-3d] focus:outline-none focus:ring-2 focus:ring-accent/40 sm:p-8 md:min-h-[290px] md:duration-700 md:hover:border-accent/45 md:hover:shadow-[0_34px_110px_rgba(0,0,0,0.16)] md:hover:[transform:translateY(-10px)_rotateX(4deg)_rotateY(-3deg)]"
                >
                  <span className={`pointer-events-none absolute inset-0 ${visual.wash} opacity-80 transition-opacity duration-700 group-hover:opacity-100`} />
                  <span className="pointer-events-none absolute inset-0 bg-[linear-gradient(135deg,rgba(255,255,255,0.78)_0%,transparent_44%,rgba(212,175,55,0.055)_100%)]" />
                  <span className={`pointer-events-none absolute inset-x-6 top-0 h-px bg-gradient-to-r from-transparent ${visual.line} to-transparent opacity-90 transition-opacity duration-700 group-hover:opacity-100`} />
                  <span className="neurora-gold-scan pointer-events-none absolute left-0 top-0 hidden h-px w-full bg-gradient-to-r from-transparent via-accent/80 to-transparent md:block" />
                  <span className={`neurora-card-orb pointer-events-none absolute -right-16 -top-16 h-44 w-44 rounded-full ${visual.orb} opacity-70 blur-3xl transition-all duration-700 md:group-hover:scale-125`} />
                  <span className="pointer-events-none absolute -bottom-20 left-8 h-40 w-40 rounded-full bg-accent/[0.055] opacity-70 blur-3xl transition-opacity duration-700 md:group-hover:opacity-100" />

                  <div className="relative z-10 mb-7 flex items-start justify-between transition-transform duration-500 md:group-hover:[transform:translateZ(22px)]">
                    <div className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl border shadow-[0_10px_30px_rgba(212,175,55,0.10)] transition-all duration-500 ${visual.icon}`}>
                      <Check className={`h-5 w-5 ${visual.iconColor}`} strokeWidth={2.5} />
                    </div>

                    <span className={`rounded-full border border-current/20 bg-white/40 px-3 py-1 text-[11px] font-bold uppercase tracking-[0.24em] backdrop-blur-sm transition-transform duration-500 md:group-hover:[transform:translateZ(26px)] ${visual.number}`}>
                      0{index + 1}
                    </span>
                  </div>

                  <h3 className="relative z-10 text-xl font-bold leading-snug text-foreground transition-transform duration-500 md:group-hover:[transform:translateZ(18px)]">
                    {item.title}
                  </h3>

                  <p className="relative z-10 mt-4 text-sm leading-7 text-muted-foreground transition-transform duration-500 md:group-hover:[transform:translateZ(12px)]">
                    {item.desc}
                  </p>

                  <span className="pointer-events-none absolute bottom-0 left-0 h-1 w-full bg-gradient-to-r from-accent/70 via-accent/30 to-transparent opacity-80 transition-opacity duration-700 group-hover:opacity-100" />
                </button>
              </div>
            );
          })}
        </div>

        <div className="mt-1 flex justify-center gap-2 md:hidden" aria-hidden="true">
          {items.map((item, index) => (
            <span
              key={`${item.title}-dot`}
              className={`h-1.5 rounded-full bg-accent/60 ${index === 0 ? "w-7" : "w-1.5"}`}
            />
          ))}
        </div>
      </div>

      {open && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/45 px-5 backdrop-blur-md"
          onClick={() => setOpen(null)}
        >
          <div
            className="relative max-h-[calc(100vh-2rem)] w-full max-w-2xl overflow-y-auto overflow-x-hidden rounded-3xl border border-border bg-white p-6 text-foreground shadow-[0_30px_120px_rgba(0,0,0,0.22)] sm:p-8"
            onClick={(event) => event.stopPropagation()}
          >
            <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-accent/70 to-transparent" />
            <div className="absolute -right-20 -top-20 h-48 w-48 rounded-full bg-accent/10 blur-3xl" />

            <button
              type="button"
              onClick={() => setOpen(null)}
              className="absolute right-4 top-4 z-20 grid h-10 w-10 place-items-center rounded-full border border-border bg-background p-0 text-muted-foreground transition-all duration-300 hover:border-accent/50 hover:text-foreground"
              aria-label={t("common.close")}
            >
              <X className="pointer-events-none h-4 w-4" />
            </button>

            <div className="relative z-10 min-w-0 break-words">
              <div className="mb-6 flex h-12 w-12 items-center justify-center rounded-2xl border border-accent/30 bg-accent/10">
                <Check className="h-5 w-5 text-accent" strokeWidth={2.5} />
              </div>

              <h3 className="max-w-[85%] text-2xl font-semibold leading-tight text-foreground sm:text-3xl">
                {open.title}
              </h3>

              <p className="mt-3 text-sm font-medium text-muted-foreground">
                {open.desc}
              </p>

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

export default About;
