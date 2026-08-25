import { useEffect, useState } from "react";
import { FileText, Scale, Vote, X, type LucideIcon } from "lucide-react";
import { useTranslation } from "react-i18next";

type Item = {
  title: string;
  desc: string;
  detail: string;
};

const icons: LucideIcon[] = [Scale, Vote, FileText];

const Legal = () => {
  const { t } = useTranslation();
  const [openIdx, setOpenIdx] = useState<number | null>(null);

  const itemsResult = t("legal.items", { returnObjects: true });
  const items = Array.isArray(itemsResult) ? (itemsResult as Item[]) : [];
  const open = openIdx !== null ? items[openIdx] : null;
  const OpenIcon = openIdx !== null ? icons[openIdx] ?? Scale : null;

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
      id="legal"
      className="relative scroll-mt-24 overflow-hidden bg-[#05070D] py-20 text-white sm:py-24 lg:py-32"
    >
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_18%_20%,rgba(212,175,55,0.13)_0%,transparent_34%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_86%_52%,rgba(255,255,255,0.06)_0%,transparent_36%)]" />
      <div className="absolute inset-0 bg-[linear-gradient(135deg,rgba(255,255,255,0.035)_0%,transparent_40%,rgba(212,175,55,0.045)_100%)]" />
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/15 to-transparent" />
      <div className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-accent/35 to-transparent" />

      <div className="container-narrow relative z-10">
        <div className="grid gap-12 lg:grid-cols-[0.85fr_1.15fr] lg:items-start">
          <div className="relative">
            <span className="mb-5 block text-xs font-bold uppercase tracking-[0.28em] text-accent">
              {t("legal.eyebrow")}
            </span>

            <h2 className="text-4xl font-bold leading-[0.95] tracking-[-0.04em] text-white text-balance sm:text-5xl lg:text-7xl">
              {t("legal.title")}
            </h2>

            <div className="mt-8 h-px w-44 bg-gradient-to-r from-accent via-accent/40 to-transparent" />

            <p className="mt-8 max-w-xl text-base leading-8 text-white/68 sm:text-lg">
              {t("legal.subtitle")}
            </p>
          </div>

          <div className="grid gap-5 [perspective:1200px]">
            {items.map((item, index) => {
              const Icon = icons[index] ?? Scale;

              return (
                <button
                  type="button"
                  key={item.title}
                  onClick={() => setOpenIdx(index)}
                  className="group relative cursor-pointer overflow-hidden rounded-[1.75rem] border border-white/10 bg-white/[0.045] p-7 text-left shadow-[0_18px_70px_rgba(0,0,0,0.20)] backdrop-blur-md transition-all duration-500 [transform-style:preserve-3d] hover:-translate-y-2 hover:border-accent/45 hover:bg-white/[0.065] hover:shadow-[0_30px_100px_rgba(0,0,0,0.32)] focus:outline-none focus:ring-2 focus:ring-accent/35"
                >
                  <div className="absolute inset-x-7 top-0 h-px bg-gradient-to-r from-transparent via-accent/60 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
                  <div className="absolute -right-16 -top-16 h-40 w-40 rounded-full bg-accent/10 blur-3xl opacity-0 transition-opacity duration-500 group-hover:opacity-100" />

                  <div className="relative z-10 flex gap-5 transition-transform duration-500 group-hover:[transform:translateZ(18px)]">
                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl border border-accent/25 bg-accent/10 transition-all duration-500 group-hover:border-accent/45 group-hover:bg-accent/15">
                      <Icon className="h-5 w-5 text-accent" strokeWidth={1.75} />
                    </div>

                    <div className="min-w-0 flex-1">
                      <div className="mb-4 flex items-center gap-4">
                        <span className="text-[11px] font-bold uppercase tracking-[0.24em] text-accent/75">
                          0{index + 1}
                        </span>
                        <span className="h-px flex-1 bg-gradient-to-r from-accent/45 to-transparent" />
                      </div>

                      <h3 className="text-xl font-bold leading-tight text-white">
                        {item.title}
                      </h3>

                      <p className="mt-4 text-sm leading-7 text-white/58">
                        {item.desc}
                      </p>
                    </div>
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {open && OpenIcon && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/70 px-5 backdrop-blur-md"
          onClick={() => setOpenIdx(null)}
        >
          <div
            className="relative w-full max-w-2xl overflow-hidden rounded-3xl border border-white/10 bg-[#080B12]/95 p-6 text-white shadow-[0_30px_120px_rgba(0,0,0,0.55)] sm:p-8"
            onClick={(event) => event.stopPropagation()}
          >
            <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-accent/60 to-transparent" />
            <div className="absolute -right-20 -top-20 h-48 w-48 rounded-full bg-accent/10 blur-3xl" />

            <button
              type="button"
              onClick={() => setOpenIdx(null)}
              className="absolute right-4 top-4 z-20 grid h-10 w-10 place-items-center rounded-full border border-white/10 bg-white/5 p-0 text-white/70 transition-all duration-300 hover:border-accent/40 hover:text-white"
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

              <h3 className="max-w-[85%] text-2xl font-semibold leading-tight text-white sm:text-3xl">
                {open.title}
              </h3>

              <p className="mt-3 text-sm font-medium text-white/55">
                {open.desc}
              </p>

              <div className="mt-6 h-px w-full bg-gradient-to-r from-accent/50 via-white/10 to-transparent" />

              <p className="mt-6 text-base leading-8 text-white/72">
                {open.detail}
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

export default Legal;
