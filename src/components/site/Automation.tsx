import { useEffect, useState } from "react";
import {
  CalendarClock,
  History,
  ListChecks,
  Repeat,
  X,
  type LucideIcon,
} from "lucide-react";
import { useTranslation } from "react-i18next";

const icons: LucideIcon[] = [Repeat, CalendarClock, ListChecks, History];

type Item = {
  title: string;
  desc: string;
  detail: string;
};

const Automation = () => {
  const { t } = useTranslation();
  const [openIdx, setOpenIdx] = useState<number | null>(null);

  const itemsResult = t("automation.items", { returnObjects: true });
  const items = Array.isArray(itemsResult) ? (itemsResult as Item[]) : [];
  const open = openIdx !== null ? items[openIdx] : null;
  const OpenIcon = openIdx !== null ? icons[openIdx] ?? Repeat : null;

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

  return (
    <section
      id="automation"
      className="relative scroll-mt-24 overflow-hidden bg-background py-20 text-[#111111] sm:py-24 lg:py-32"
    >
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_12%_18%,rgba(212,175,55,0.12)_0%,transparent_34%)]" />
      <div className="absolute inset-0 bg-[linear-gradient(135deg,rgba(255,255,255,0.76)_0%,transparent_44%,rgba(0,0,0,0.025)_100%)]" />
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-black/10 to-transparent" />
      <div className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-black/10 to-transparent" />

      <div className="container-narrow relative z-10">
        <div className="grid gap-8 lg:grid-cols-[1fr_0.62fr] lg:items-end">
          <div className="max-w-4xl">
            <span className="mb-5 block text-xs font-bold uppercase tracking-[0.28em] text-accent">
              {t("automation.eyebrow")}
            </span>

            <h2 className="text-4xl font-bold leading-[0.95] tracking-[-0.04em] text-[#111111] text-balance sm:text-5xl lg:text-7xl">
              {t("automation.title")}
            </h2>
          </div>

          <div className="relative overflow-hidden rounded-[2rem] border border-black/10 bg-white/75 p-6 shadow-[0_18px_60px_rgba(0,0,0,0.075)] backdrop-blur-sm sm:p-7">
            <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-accent/60 to-transparent" />
            <div className="absolute -right-16 -top-16 h-36 w-36 rounded-full bg-accent/10 blur-3xl" />

            <p className="relative z-10 text-base leading-8 text-[#111111]/68">
              {t("automation.subtitle")}
            </p>
          </div>
        </div>

        <div className="mt-14 grid gap-5 sm:grid-cols-2 [perspective:1200px]">
          {items.map((item, index) => {
            const Icon = icons[index] ?? Repeat;

            return (
              <button
                type="button"
                key={item.title}
                onClick={() => setOpenIdx(index)}
                className="group relative cursor-pointer overflow-hidden rounded-[1.75rem] border border-black/10 bg-white/85 p-7 text-left shadow-[0_18px_60px_rgba(0,0,0,0.075)] backdrop-blur-sm transition-all duration-500 [transform-style:preserve-3d] hover:-translate-y-2 hover:border-accent/45 hover:shadow-[0_30px_95px_rgba(0,0,0,0.13)] focus:outline-none focus:ring-2 focus:ring-accent/35"
              >
                <div className="absolute inset-x-7 top-0 h-px bg-gradient-to-r from-transparent via-accent/60 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
                <div className="absolute -right-16 -top-16 h-40 w-40 rounded-full bg-accent/10 blur-3xl opacity-0 transition-opacity duration-500 group-hover:opacity-100" />

                <div className="relative z-10 mb-8 flex items-center justify-between transition-transform duration-500 group-hover:[transform:translateZ(20px)]">
                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl border border-accent/25 bg-accent/10 transition-all duration-500 group-hover:border-accent/45 group-hover:bg-accent/15">
                    <Icon className="h-5 w-5 text-accent" strokeWidth={1.75} />
                  </div>

                  <span className="text-[11px] font-bold uppercase tracking-[0.26em] text-accent">
                    0{index + 1}
                  </span>
                </div>

                <h3 className="relative z-10 text-xl font-bold leading-tight text-[#111111] transition-transform duration-500 group-hover:[transform:translateZ(16px)]">
                  {item.title}
                </h3>

                <p className="relative z-10 mt-5 text-sm leading-7 text-[#111111]/58 transition-transform duration-500 group-hover:[transform:translateZ(10px)]">
                  {item.desc}
                </p>
              </button>
            );
          })}
        </div>
      </div>

      {open && OpenIcon && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/45 px-5 backdrop-blur-md"
          onClick={() => setOpenIdx(null)}
        >
          <div
            className="relative w-full max-w-2xl overflow-hidden rounded-3xl border border-black/10 bg-white/95 p-6 text-[#111111] shadow-[0_30px_120px_rgba(0,0,0,0.30)] sm:p-8"
            onClick={(event) => event.stopPropagation()}
          >
            <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-accent/70 to-transparent" />
            <div className="absolute -right-20 -top-20 h-48 w-48 rounded-full bg-accent/15 blur-3xl" />

            <button
              type="button"
              onClick={() => setOpenIdx(null)}
              className="absolute right-4 top-4 z-20 grid h-10 w-10 place-items-center rounded-full border border-black/10 bg-white/70 p-0 text-[#111111]/60 transition-all duration-300 hover:border-accent/45 hover:text-[#111111]"
              aria-label={t("common.close")}
            >
              <X className="pointer-events-none h-4 w-4" />
            </button>

            <div className="relative z-10">
              <div className="mb-6 flex justify-start" dir="ltr">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl border border-accent/30 bg-accent/10">
                  <OpenIcon className="h-5 w-5 text-accent" strokeWidth={1.75} />
                </div>
              </div>

              <h3 className="max-w-[85%] text-2xl font-semibold leading-tight text-[#111111] sm:text-3xl">
                {open.title}
              </h3>

              <p className="mt-3 text-sm font-medium text-[#111111]/55">
                {open.desc}
              </p>

              <div className="mt-6 h-px w-full bg-gradient-to-r from-accent/50 via-black/10 to-transparent" />

              <p className="mt-6 text-base leading-8 text-[#111111]/72">
                {open.detail}
              </p>

              <div className="mt-7 h-px w-full bg-gradient-to-r from-accent/40 via-black/10 to-transparent" />

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

export default Automation;
