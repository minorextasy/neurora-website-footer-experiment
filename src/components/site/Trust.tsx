import { useEffect, useState } from "react";
import { ScaleIcon, Landmark, CalendarCheck2, MessageSquareText, X } from "lucide-react";
import { useTranslation } from "react-i18next";

const icons = [ScaleIcon, Landmark, CalendarCheck2, MessageSquareText];

const Trust = () => {
  const { t } = useTranslation();
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const items = t("trust.items", { returnObjects: true }) as {
    title: string;
    desc: string;
  }[];

  const modalDetailsResult = t("trust.modalDetails", {
  returnObjects: true,
});

  const modalDetails = Array.isArray(modalDetailsResult)
    ? (modalDetailsResult as string[])
    : [];

  const activeItem = activeIndex !== null ? items[activeIndex] : null;
  const activeDetail =
    activeIndex !== null ? modalDetails[activeIndex] || activeItem?.desc : "";

  const ActiveIcon = activeIndex !== null ? icons[activeIndex] : null;

  useEffect(() => {
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setActiveIndex(null);
      }
    };

    window.addEventListener("keydown", handleEscape);

    return () => {
      window.removeEventListener("keydown", handleEscape);
    };
  }, []);

  return (
    <section className="relative overflow-hidden border-y border-white/10 bg-[#05070D] py-10 text-white sm:py-12 lg:py-14">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(212,175,55,0.08)_0%,rgba(5,7,13,0)_55%)]" />
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-accent/40 to-transparent" />
      <div className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-white/15 to-transparent" />

      <div className="container-narrow relative z-10">
        <div className="grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-4">
          {items.map((item, index) => {
            const Icon = icons[index];

            return (
              <button
                key={item.title}
                type="button"
                onClick={() => setActiveIndex(index)}
                className="group cursor-pointer rounded-2xl border border-white/10 bg-white/[0.035] p-4 text-left backdrop-blur-md transition-all duration-300 hover:-translate-y-1 hover:border-accent/35 hover:bg-white/[0.055] focus:outline-none focus:ring-2 focus:ring-accent/40 sm:p-5"
              >
                <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-xl border border-accent/25 bg-accent/10 shadow-[0_0_30px_rgba(212,175,55,0.08)] transition-all duration-300 group-hover:border-accent/45 group-hover:bg-accent/15">
                  <Icon className="h-5 w-5 text-accent" strokeWidth={1.75} />
                </div>

                <div className="text-sm font-semibold leading-snug text-white sm:text-base">
                  {item.title}
                </div>

                <div className="mt-2 text-xs leading-relaxed text-white/55 sm:text-sm">
                  {item.desc}
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {activeItem && ActiveIcon && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/70 px-5 backdrop-blur-md"
          onClick={() => setActiveIndex(null)}
        >
          <div
            className="relative w-full max-w-2xl overflow-hidden rounded-3xl border border-white/10 bg-[#080B12]/95 p-6 text-white shadow-[0_30px_120px_rgba(0,0,0,0.55)] sm:p-8"
            onClick={(event) => event.stopPropagation()}
          >
            <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-accent/60 to-transparent" />
            <div className="absolute -right-20 -top-20 h-48 w-48 rounded-full bg-accent/10 blur-3xl" />

            <button
              type="button"
              onClick={() => setActiveIndex(null)}
              className="absolute right-4 top-4 z-20 grid h-10 w-10 place-items-center rounded-full border border-white/10 bg-white/5 p-0 text-white/70 transition-all duration-300 hover:border-accent/40 hover:text-white"
              aria-label={t("common.close")}
            >
              <X className="pointer-events-none h-4 w-4" />
            </button>

            <div className="relative z-10">
              <div className="mb-6 flex h-12 w-12 items-center justify-center rounded-2xl border border-accent/30 bg-accent/10">
                <ActiveIcon className="h-5 w-5 text-accent" strokeWidth={1.75} />
              </div>

              <h3 className="max-w-[85%] text-2xl font-semibold leading-tight text-white sm:text-3xl">
                {activeItem.title}
              </h3>

              <p className="mt-3 text-sm font-medium text-white/55">
                {activeItem.desc}
              </p>

              <div className="mt-6 h-px w-full bg-gradient-to-r from-accent/50 via-white/10 to-transparent" />

              <p className="mt-6 text-base leading-8 text-white/72">
                {activeDetail}
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

export default Trust;