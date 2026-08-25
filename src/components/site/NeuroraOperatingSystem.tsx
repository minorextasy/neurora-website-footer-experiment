import { useEffect, useState } from "react";
import {
  CalendarClock,
  Eye,
  FileCheck2,
  FileText,
  History,
  Landmark,
  ListChecks,
  Repeat,
  Scale,
  ShieldCheck,
  Vote,
  X,
  type LucideIcon,
} from "lucide-react";
import { useTranslation } from "react-i18next";

type TabKey = "financial" | "automation" | "legal";

type Item = {
  title: string;
  desc: string;
  detail: string;
};

type Pillar = {
  title: string;
  desc: string;
};

type ModalState = {
  source: "automation" | "legal";
  index: number;
} | null;

const financialIcons: LucideIcon[] = [Landmark, ShieldCheck, Eye, FileCheck2];
const automationIcons: LucideIcon[] = [Repeat, CalendarClock, ListChecks, History];
const legalIcons: LucideIcon[] = [Scale, Vote, FileText];

const NeuroraOperatingSystem = () => {
  const { t } = useTranslation();
  const [activeTab, setActiveTab] = useState<TabKey>("financial");
  const [modal, setModal] = useState<ModalState>(null);

  const financialPillarsResult = t("financial.pillars", { returnObjects: true });
  const financialPillars = Array.isArray(financialPillarsResult)
    ? (financialPillarsResult as Pillar[])
    : [];

  const automationItemsResult = t("automation.items", { returnObjects: true });
  const automationItems = Array.isArray(automationItemsResult)
    ? (automationItemsResult as Item[])
    : [];

  const legalItemsResult = t("legal.items", { returnObjects: true });
  const legalItems = Array.isArray(legalItemsResult)
    ? (legalItemsResult as Item[])
    : [];

  const tabs: {
    key: TabKey;
    label: string;
    title: string;
    desc: string;
    Icon: LucideIcon;
  }[] = [
    {
      key: "financial",
      label: t("financial.eyebrow"),
      title: t("financial.title"),
      desc: t("financial.subtitle"),
      Icon: Landmark,
    },
    {
      key: "automation",
      label: t("automation.eyebrow"),
      title: t("automation.title"),
      desc: t("automation.subtitle"),
      Icon: Repeat,
    },
    {
      key: "legal",
      label: t("legal.eyebrow"),
      title: t("legal.title"),
      desc: t("legal.subtitle"),
      Icon: Scale,
    },
  ];

  const active = tabs.find((tab) => tab.key === activeTab) ?? tabs[0];
  const ActiveIcon = active.Icon;

  const modalItems = modal?.source === "automation" ? automationItems : legalItems;
  const modalIcons = modal?.source === "automation" ? automationIcons : legalIcons;
  const open = modal ? modalItems[modal.index] : null;
  const OpenIcon = modal ? modalIcons[modal.index] ?? Repeat : null;

  useEffect(() => {
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setModal(null);
      }
    };

    window.addEventListener("keydown", handleEscape);

    return () => {
      window.removeEventListener("keydown", handleEscape);
    };
  }, []);

  const renderClickableCards = (
    source: "automation" | "legal",
    items: Item[],
    icons: LucideIcon[],
  ) => (
    <div
      className={`mt-8 grid gap-5 sm:grid-cols-2 ${
        source === "legal" ? "lg:grid-cols-3" : "lg:grid-cols-4"
      } [perspective:1200px]`}
    >
      {items.map((item, index) => {
        const Icon = icons[index] ?? Repeat;

        return (
          <button
            type="button"
            key={item.title}
            onClick={() => setModal({ source, index })}
            className="group relative cursor-pointer overflow-hidden rounded-[1.75rem] border border-white/10 bg-white/[0.045] p-7 text-left shadow-[0_18px_70px_rgba(0,0,0,0.20)] backdrop-blur-md transition-all duration-500 [transform-style:preserve-3d] hover:-translate-y-2 hover:border-accent/45 hover:bg-white/[0.065] hover:shadow-[0_30px_100px_rgba(0,0,0,0.32)] focus:outline-none focus:ring-2 focus:ring-accent/35"
          >
            <div className="absolute inset-x-7 top-0 h-px bg-gradient-to-r from-transparent via-accent/60 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
            <div className="absolute -right-16 -top-16 h-40 w-40 rounded-full bg-accent/10 blur-3xl opacity-0 transition-opacity duration-500 group-hover:opacity-100" />

            <div className="relative z-10 mb-8 flex items-center justify-between transition-transform duration-500 group-hover:[transform:translateZ(18px)]">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl border border-accent/25 bg-accent/10 transition-all duration-500 group-hover:border-accent/45 group-hover:bg-accent/15">
                <Icon className="h-5 w-5 text-accent" strokeWidth={1.75} />
              </div>

              <span className="text-[11px] font-bold uppercase tracking-[0.24em] text-accent/75">
                0{index + 1}
              </span>
            </div>

            <h3 className="relative z-10 text-xl font-bold leading-tight text-white transition-transform duration-500 group-hover:[transform:translateZ(14px)]">
              {item.title}
            </h3>

            <p className="relative z-10 mt-4 text-sm leading-7 text-white/58 transition-transform duration-500 group-hover:[transform:translateZ(8px)]">
              {item.desc}
            </p>
          </button>
        );
      })}
    </div>
  );

  return (
    <section
      id="neurora-operating-system"
      className="relative scroll-mt-24 overflow-hidden bg-[#05070D] py-20 text-white sm:py-24 lg:py-32"
    >
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_16%_18%,rgba(212,175,55,0.14)_0%,transparent_34%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_86%_64%,rgba(255,255,255,0.06)_0%,transparent_36%)]" />
      <div className="absolute inset-0 bg-[linear-gradient(135deg,rgba(255,255,255,0.035)_0%,transparent_42%,rgba(212,175,55,0.045)_100%)]" />
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/15 to-transparent" />
      <div className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-accent/35 to-transparent" />

      <div className="container-narrow relative z-10">
        <div className="grid gap-8 lg:grid-cols-[1fr_0.68fr] lg:items-end">
          <div className="max-w-4xl">
            <span className="mb-5 block text-xs font-bold uppercase tracking-[0.28em] text-accent">
              {t("operatingSystem.eyebrow")}
            </span>

            <h2 className="text-5xl font-bold leading-[0.95] tracking-[-0.055em] text-white text-balance sm:text-6xl lg:text-7xl">
              {t("operatingSystem.titleLine1")}
              <br />
              {t("operatingSystem.titleLine2")}
            </h2>
          </div>

          <p className="text-base leading-8 text-white/64 sm:text-lg">
            {t("operatingSystem.subtitle")}
          </p>
        </div>

        <div className="mt-12 grid gap-3 rounded-[2rem] border border-white/10 bg-white/[0.045] p-3 shadow-[0_18px_70px_rgba(0,0,0,0.20)] backdrop-blur-md sm:grid-cols-3">
          {tabs.map((tab) => {
            const Icon = tab.Icon;
            const isActive = activeTab === tab.key;

            return (
              <button
                type="button"
                key={tab.key}
                onClick={() => setActiveTab(tab.key)}
                className={`group flex items-center gap-3 rounded-[1.35rem] border p-4 text-left transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-accent/35 ${
                  isActive
                    ? "border-accent/45 bg-accent/12 shadow-[0_14px_45px_rgba(212,175,55,0.12)]"
                    : "border-white/8 bg-white/[0.035] hover:border-accent/30 hover:bg-white/[0.06]"
                }`}
                aria-pressed={isActive}
              >
                <span
                  className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl border transition-all duration-300 ${
                    isActive
                      ? "border-accent/40 bg-accent/15"
                      : "border-white/10 bg-white/[0.045] group-hover:border-accent/30"
                  }`}
                >
                  <Icon className="h-4 w-4 text-accent" strokeWidth={1.75} />
                </span>

                <span>
                  <span className="block text-[11px] font-bold uppercase tracking-[0.2em] text-accent">
                    {tab.label}
                  </span>
                  <span className="mt-1 block text-sm font-semibold leading-tight text-white/82">
                    {tab.title}
                  </span>
                </span>
              </button>
            );
          })}
        </div>

        <div className="mt-10">
          <div className="max-w-4xl">
            <div className="mb-4 flex items-center gap-3">
              <ActiveIcon className="h-5 w-5 text-accent" strokeWidth={1.75} />

              <span className="text-xs font-bold uppercase tracking-[0.24em] text-accent">
                {active.label}
              </span>
            </div>

            <h3 className="text-3xl font-bold leading-tight tracking-[-0.03em] text-white sm:text-4xl">
              {active.title}
            </h3>

            <p className="mt-4 max-w-3xl text-base leading-8 text-white/62">
              {active.desc}
            </p>
          </div>

          {activeTab === "financial" && (
            <div className="relative mt-8 overflow-hidden rounded-[2.5rem] border border-white/10 bg-white/[0.045] text-white shadow-[0_30px_110px_rgba(0,0,0,0.32)] backdrop-blur-md">
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_18%_20%,rgba(212,175,55,0.14)_0%,transparent_34%)]" />
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_82%_72%,rgba(255,255,255,0.055)_0%,transparent_36%)]" />
              <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-accent/65 to-transparent" />

              <div className="relative z-10 grid gap-0 lg:grid-cols-[0.95fr_1.05fr]">
                <div className="relative overflow-hidden border-b border-white/10 p-7 sm:p-9 lg:border-b-0 lg:border-r lg:p-12">
                  <div className="absolute -right-16 -top-16 h-44 w-44 rounded-full bg-accent/10 blur-3xl" />

                  <div className="relative z-10 min-w-0 break-words">
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
                  {financialPillars.map((pillar, index) => {
                    const Icon = financialIcons[index] ?? Landmark;

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

                        <h4 className="relative z-10 text-lg font-bold leading-tight text-white">
                          {pillar.title}
                        </h4>

                        <p className="relative z-10 mt-4 text-sm leading-7 text-white/58">
                          {pillar.desc}
                        </p>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          )}

          {activeTab === "automation" &&
            renderClickableCards("automation", automationItems, automationIcons)}

          {activeTab === "legal" &&
            renderClickableCards("legal", legalItems, legalIcons)}
        </div>
      </div>

      {open && OpenIcon && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/70 px-5 backdrop-blur-md"
          onClick={() => setModal(null)}
        >
          <div
            className="relative max-h-[86vh] w-full max-w-2xl overflow-y-auto overflow-x-hidden overscroll-contain rounded-3xl border border-white/10 bg-[#080B12]/95 p-6 text-white shadow-[0_30px_120px_rgba(0,0,0,0.55)] sm:p-8"
            onClick={(event) => event.stopPropagation()}
          >
            <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-accent/60 to-transparent" />
            <div className="absolute -right-20 -top-20 h-48 w-48 rounded-full bg-accent/10 blur-3xl" />

            <button
              type="button"
              onClick={() => setModal(null)}
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

export default NeuroraOperatingSystem;