import {
  Eye,
  FileCheck2,
  Landmark,
  ShieldCheck,
  type LucideIcon,
} from "lucide-react";
import { useTranslation } from "react-i18next";

const icons: LucideIcon[] = [Landmark, ShieldCheck, Eye, FileCheck2];

const Financial = () => {
  const { t } = useTranslation();

  const pillarsResult = t("financial.pillars", { returnObjects: true });
  const pillars = Array.isArray(pillarsResult)
    ? (pillarsResult as { title: string; desc: string }[])
    : [];

  return (
    <section
      id="financial"
      className="relative scroll-mt-24 overflow-hidden bg-background py-20 text-[#111111] sm:py-24 lg:py-32"
    >
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_12%_20%,rgba(212,175,55,0.12)_0%,transparent_34%)]" />
      <div className="absolute inset-0 bg-[linear-gradient(135deg,rgba(255,255,255,0.74)_0%,transparent_44%,rgba(0,0,0,0.025)_100%)]" />
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-black/10 to-transparent" />
      <div className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-black/10 to-transparent" />

      <div className="container-narrow relative z-10">
        <div className="grid gap-8 lg:grid-cols-[1fr_0.68fr] lg:items-end">
          <div className="max-w-4xl">
            <span className="mb-5 block text-xs font-bold uppercase tracking-[0.28em] text-accent">
              {t("financial.eyebrow")}
            </span>

            <h2 className="text-4xl font-bold leading-[0.95] tracking-[-0.04em] text-[#111111] text-balance sm:text-5xl lg:text-7xl">
              {t("financial.title")}
            </h2>
          </div>

          <p className="text-base leading-8 text-[#111111]/62 sm:text-lg">
            {t("financial.subtitle")}
          </p>
        </div>

        <div className="relative mt-14 overflow-hidden rounded-[2.5rem] border border-black/10 bg-[#05070D] text-white shadow-[0_36px_120px_rgba(0,0,0,0.28)]">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_18%_20%,rgba(212,175,55,0.14)_0%,transparent_34%)]" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_82%_72%,rgba(255,255,255,0.055)_0%,transparent_36%)]" />
          <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-accent/65 to-transparent" />

          <div className="relative z-10 grid gap-0 lg:grid-cols-[0.95fr_1.05fr]">
            <div className="relative overflow-hidden border-b border-white/10 p-7 sm:p-9 lg:border-b-0 lg:border-r lg:p-12">
              <div className="absolute -right-16 -top-16 h-44 w-44 rounded-full bg-accent/10 blur-3xl" />

              <div className="relative z-10">
                <div className="mb-7 text-[11px] font-bold uppercase tracking-[0.28em] text-accent">
                  {t("financial.accountHolder")}
                </div>

                <div className="text-4xl font-bold leading-[0.95] tracking-[-0.04em] text-white sm:text-5xl lg:text-6xl">
                  {t("financial.accountHolderName")}
                </div>

                <div className="mt-8 h-px w-44 bg-gradient-to-r from-accent via-accent/40 to-transparent" />

                <p className="mt-8 max-w-xl text-base leading-8 text-white/68">
                  {t("financial.accountBody")}
                </p>

                <div className="mt-10 flex flex-wrap items-center gap-3 text-sm">
                  <span className="rounded-full border border-accent/30 bg-accent/10 px-4 py-2 font-medium text-accent">
                    {t("financial.tag1")}
                  </span>
                  <span className="rounded-full border border-white/12 bg-white/[0.055] px-4 py-2 font-medium text-white/78">
                    {t("financial.tag2")}
                  </span>
                </div>
              </div>
            </div>

            <div className="grid gap-px bg-white/10 p-px sm:grid-cols-2">
              {pillars.map((pillar, index) => {
                const Icon = icons[index] ?? Landmark;

                return (
                  <div
                    key={pillar.title}
                    className="relative overflow-hidden bg-[#080B12] p-7 sm:p-8"
                  >
                    <div className="absolute inset-x-7 top-0 h-px bg-gradient-to-r from-transparent via-accent/45 to-transparent" />
                    <div className="absolute -right-16 -top-16 h-36 w-36 rounded-full bg-accent/8 blur-3xl" />

                    <div className="relative z-10 mb-8 flex items-center justify-between">
                      <div className="flex h-12 w-12 items-center justify-center rounded-2xl border border-accent/25 bg-accent/10">
                        <Icon className="h-5 w-5 text-accent" strokeWidth={1.75} />
                      </div>

                      <span className="text-[11px] font-bold uppercase tracking-[0.24em] text-accent/75">
                        0{index + 1}
                      </span>
                    </div>

                    <h3 className="relative z-10 text-lg font-bold leading-tight text-white">
                      {pillar.title}
                    </h3>

                    <p className="relative z-10 mt-4 text-sm leading-7 text-white/58">
                      {pillar.desc}
                    </p>
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

export default Financial;
