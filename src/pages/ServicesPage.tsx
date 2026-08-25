import { useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { MapPin, X } from "lucide-react";
import FloatingContactRail from "@/components/site/FloatingContactRail";
import Header from "@/components/site/Header";
import Footer from "@/components/site/Footer";
import { getLocalizedPath } from "@/lib/i18nRouting";

type CategoryKey =
  | "management-administration"
  | "common-expenses"
  | "cleaning"
  | "maintenance-repairs"
  | "amenities-shared-facilities"
  | "communication"
  | "financial"
  | "legal";

type ServiceCategory = {
  key: CategoryKey;
  titleKey: string;
  image: string;
};

type ServiceItem = {
  title: string;
  summary: string;
  detail: string;
};

const serviceCategories: ServiceCategory[] = [
  {
    key: "management-administration",
    titleKey: "servicesPage.categories.managementAdministration",
    image: "/service-categories/management-administration.png",
  },
  {
    key: "common-expenses",
    titleKey: "servicesPage.categories.commonExpenses",
    image: "/service-categories/common-expenses.png",
  },
  {
    key: "cleaning",
    titleKey: "servicesPage.categories.cleaning",
    image: "/service-categories/cleaning.png",
  },
  {
    key: "maintenance-repairs",
    titleKey: "servicesPage.categories.maintenanceRepairs",
    image: "/service-categories/maintenance-repairs.png",
  },
  {
    key: "amenities-shared-facilities",
    titleKey: "servicesPage.categories.amenitiesSharedFacilities",
    image: "/service-categories/amenities-shared-facilities.png",
  },
  {
    key: "communication",
    titleKey: "servicesPage.categories.communication",
    image: "/service-categories/communication.png",
  },
  {
    key: "financial",
    titleKey: "servicesPage.categories.financial",
    image: "/service-categories/financial.png",
  },
  {
    key: "legal",
    titleKey: "servicesPage.categories.legal",
    image: "/service-categories/legal.png",
  },
];

const coverageLinks = [
  { href: "/property-management-paphos", labelKey: "footer.groups.coverage.items.paphos" },
  { href: "/property-management-limassol", labelKey: "footer.groups.coverage.items.limassol" },
  { href: "/property-management-larnaca", labelKey: "footer.groups.coverage.items.larnaca" },
  { href: "/property-management-nicosia", labelKey: "footer.groups.coverage.items.nicosia" },
  { href: "/property-management-ayia-napa", labelKey: "footer.groups.coverage.items.ayiaNapa" },
  { href: "/property-management-protaras", labelKey: "footer.groups.coverage.items.protaras" },
];

const ServicesPage = () => {
  const { t, i18n } = useTranslation();
  const localize = (path: string) => getLocalizedPath(path, i18n.language);
  const [activeCategory, setActiveCategory] =
  useState<CategoryKey>("management-administration");
const [activeService, setActiveService] = useState<ServiceItem | null>(null);
const servicePanelRef = useRef<HTMLDivElement | null>(null);

const handleCategoryChange = (categoryKey: CategoryKey) => {
  setActiveCategory(categoryKey);

  if (window.matchMedia("(max-width: 767px)").matches) {
    window.setTimeout(() => {
      servicePanelRef.current?.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }, 100);
  }
};
  const currentCategory = serviceCategories.find(
    (category) => category.key === activeCategory
  );

  const translatedServices = t(`servicesPage.serviceItems.${activeCategory}`, {
  returnObjects: true,
});

const currentServices = Array.isArray(translatedServices)
  ? (translatedServices as ServiceItem[])
  : [];

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "auto" });

    document.title = t("servicesPage.metaTitle");

    const setMeta = (name: string, content: string) => {
      let el = document.querySelector(`meta[name="${name}"]`);
      if (!el) {
        el = document.createElement("meta");
        el.setAttribute("name", name);
        document.head.appendChild(el);
      }
      el.setAttribute("content", content);
    };

    setMeta("description", t("servicesPage.metaDescription"));

    let canonical = document.querySelector('link[rel="canonical"]');
    if (!canonical) {
      canonical = document.createElement("link");
      canonical.setAttribute("rel", "canonical");
      document.head.appendChild(canonical);
    }
    canonical.setAttribute("href", window.location.origin + "/services");
  }, [t, i18n.language]);

  useEffect(() => {
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setActiveService(null);
      }
    };

    window.addEventListener("keydown", handleEscape);

    return () => {
      window.removeEventListener("keydown", handleEscape);
    };
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <FloatingContactRail />

      <main>
        <section className="relative overflow-hidden bg-[#05070D] pb-12 pt-20 text-white sm:pb-14 sm:pt-20 lg:pb-16 lg:pt-20">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_18%_22%,rgba(212,175,55,0.16)_0%,transparent_34%)]" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_86%_68%,rgba(255,255,255,0.06)_0%,transparent_36%)]" />
          <div className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-accent/35 to-transparent" />

          <div className="container-narrow relative z-10">
            <div className="max-w-5xl">
              <div className="mb-8 h-px w-full bg-gradient-to-r from-transparent via-accent/40 to-transparent" />

              <h1 className="text-3xl font-bold leading-tight tracking-[-0.035em] text-white text-balance sm:text-4xl lg:text-5xl">
                <span className="text-accent">
                  {t("servicesPage.hero.titleLead")}
                </span>{" "}
                {t("servicesPage.hero.titleRest")}
              </h1>

              <p className="mt-8 max-w-3xl text-base leading-8 text-white/68 sm:text-lg">
                {t("servicesPage.hero.subtitleBefore")}{" "}
                <span className="font-semibold text-accent">
                  {t("servicesPage.hero.brand")}
                </span>{" "}
                {t("servicesPage.hero.subtitleAfter")}
              </p>

              <div className="mt-10">
                <a
                  href="#services-catalogue"
                  className="inline-flex items-center justify-center rounded-full bg-accent px-6 py-3 text-sm font-bold text-primary transition-all duration-300 hover:bg-accent/90"
                >
                  {t("servicesPage.hero.cta")}
                </a>
              </div>
            </div>
          </div>
        </section>

        <section
          id="services-catalogue"
          className="relative overflow-hidden bg-white py-16 text-[#111111] sm:py-20 lg:py-24"
        >
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_12%_12%,rgba(212,175,55,0.08)_0%,transparent_30%)]" />
          <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-black/10 to-transparent" />

          <div className="container-narrow relative z-10">
            <div className="max-w-4xl">
              <span className="mb-4 block text-xs font-bold uppercase tracking-[0.28em] text-accent">
                {t("servicesPage.catalogue.eyebrow")}
              </span>

              <h2 className="text-3xl font-bold leading-tight tracking-[-0.035em] text-[#111111] sm:text-4xl lg:text-5xl">
                {t("servicesPage.catalogue.title")}
              </h2>
            </div>

            <div className="mt-10 grid grid-cols-2 gap-3 sm:gap-5 lg:grid-cols-4">
              {serviceCategories.map((category) => {
                const isActive = activeCategory === category.key;

                return (
                  <button
                    type="button"
                    key={category.key}
                    onClick={() => handleCategoryChange(category.key)}
                    aria-pressed={isActive}
                    className={`group relative min-h-[154px] sm:min-h-[230px] overflow-hidden rounded-[2rem] border bg-[#05070D] p-0 text-left shadow-[0_24px_85px_rgba(0,0,0,0.16)] transition-all duration-500 [transform-style:preserve-3d] hover:-translate-y-2 hover:shadow-[0_34px_110px_rgba(0,0,0,0.25)] focus:outline-none focus:ring-2 focus:ring-accent/35 ${
                      isActive
                        ? "border-accent/60"
                        : "border-black/10 hover:border-accent/45"
                    }`}
                  >
                    <div
                      className="absolute inset-0 scale-105 bg-cover bg-center opacity-85 transition-all duration-700 group-hover:scale-110 group-hover:opacity-100"
                      style={{
                        backgroundImage: `url(${category.image})`,
                      }}
                    />

                    <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(5,7,13,0.08)_0%,rgba(5,7,13,0.34)_45%,rgba(5,7,13,0.90)_100%)]" />
                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_18%_18%,rgba(212,175,55,0.18)_0%,transparent_34%)]" />
                    <div className="absolute inset-x-6 top-0 h-px bg-gradient-to-r from-transparent via-accent/70 to-transparent" />
                    <div className="absolute -right-14 -top-14 h-40 w-40 rounded-full bg-accent/10 blur-3xl opacity-70 transition-opacity duration-500 group-hover:opacity-100" />

                    <div className="relative z-10 flex min-h-[154px] flex-col justify-end p-4 sm:min-h-[230px] sm:p-6">
                      <h3 className="max-w-[92%] text-base font-bold leading-tight tracking-[-0.02em] text-accent transition-transform duration-500 group-hover:[transform:translateZ(14px)] sm:text-2xl">
                        {t(category.titleKey)}
                      </h3>
                    </div>
                  </button>
                );
              })}
            </div>

            <div
                    ref={servicePanelRef}
                    className="mt-8 scroll-mt-24 overflow-hidden rounded-[1.7rem] border border-black/10 bg-[#05070D] p-5 text-white shadow-[0_26px_100px_rgba(0,0,0,0.18)] sm:mt-14 sm:rounded-[2.2rem] sm:p-7 lg:p-8"
                  >
              <div className="relative">
                <div className="absolute -right-20 -top-24 h-56 w-56 rounded-full bg-accent/10 blur-3xl" />
                <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-accent/50 to-transparent" />

                <div className="relative z-10">
                  <span className="mb-4 block text-xs font-bold uppercase tracking-[0.28em] text-accent/80">
                    {t("servicesPage.catalogue.brandLine")}
                  </span>

                  <h3 className="text-2xl font-bold leading-tight tracking-[-0.03em] text-white sm:text-3xl lg:text-4xl">
                    {currentCategory ? t(currentCategory.titleKey) : ""}
                  </h3>

                  <p className="mt-4 max-w-3xl text-sm leading-7 text-white/60 sm:text-base">
                    <p className="mt-4 max-w-3xl text-sm leading-7 text-white/60 sm:text-base">
                      {t("servicesPage.catalogue.serviceIntro")}
                    </p>
                  </p>

                  <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                    {currentServices.map((service) => (
                      <button
                        key={service.title}
                        type="button"
                        onClick={() => setActiveService(service)}
                        className="group rounded-3xl border border-white/10 bg-white/[0.035] p-5 text-left transition-all duration-300 [transform-style:preserve-3d] hover:-translate-y-1 hover:border-accent/40 hover:bg-white/[0.055] hover:shadow-[0_20px_70px_rgba(212,175,55,0.12)] focus:outline-none focus:ring-2 focus:ring-accent/35"
                      >
                        <div className="mb-5 h-px w-16 bg-gradient-to-r from-accent/80 to-transparent transition-all duration-300 group-hover:w-24" />

                        <h4 className="text-lg font-bold leading-snug text-white transition-transform duration-300 group-hover:[transform:translateZ(10px)]">
                          {service.title}
                        </h4>

                        <p className="mt-3 text-sm leading-7 text-white/58">
                          {service.summary}
                        </p>
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="relative overflow-hidden bg-[#05070D] px-5 py-16 text-white sm:py-20 lg:px-8 lg:py-24">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_18%_20%,rgba(212,175,55,0.14)_0%,transparent_34%)]" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_86%_68%,rgba(255,255,255,0.06)_0%,transparent_36%)]" />
          <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-accent/35 to-transparent" />

          <div className="container-narrow relative z-10">
            <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
              <div>
                <span className="mb-4 block text-xs font-bold uppercase tracking-[0.28em] text-accent">
                  {t("servicesPage.coverage.eyebrow")}
                </span>

                <h2 className="text-3xl font-bold leading-tight tracking-[-0.035em] text-white text-balance sm:text-4xl lg:text-5xl">
                  <span className="text-accent">
                    {t("servicesPage.coverage.titleLead")}
                  </span>{" "}
                  {t("servicesPage.coverage.titleRest")}
                </h2>

                <p className="mt-6 max-w-2xl text-base leading-8 text-white/66">
                  {t("servicesPage.coverage.body")}
                </p>

                <div className="mt-8 h-px w-44 bg-gradient-to-r from-accent via-accent/40 to-transparent" />

                <div className="mt-7 rounded-[2rem] border border-white/10 bg-white/[0.045] p-6 shadow-[0_18px_70px_rgba(0,0,0,0.20)] backdrop-blur-md">
                  <div className="text-xs font-bold uppercase tracking-[0.24em] text-accent">
                    {t("servicesPage.coverage.panelTitle")}
                  </div>

                  <p className="mt-4 text-sm leading-7 text-white/62">
                    {t("servicesPage.coverage.panelBody")}
                  </p>
                </div>
              </div>

              <div className="rounded-[2.2rem] border border-white/10 bg-white/[0.04] p-6 shadow-[0_24px_90px_rgba(0,0,0,0.22)] backdrop-blur-md sm:p-7 lg:p-8">
                <div className="mb-5 flex items-center gap-3">
                  <span className="flex h-10 w-10 items-center justify-center rounded-2xl border border-accent/25 bg-accent/10">
                    <MapPin className="h-5 w-5 text-accent" strokeWidth={1.75} />
                  </span>

                  <div className="text-xs font-bold uppercase tracking-[0.24em] text-accent">
                    {t("servicesPage.coverage.cityIntro")}
                  </div>
                </div>

                <div className="grid gap-3 sm:grid-cols-2">
                  {coverageLinks.map((area) => (
                    <a
                      key={area.href}
                      href={localize(area.href)}
                      className="group flex min-h-[56px] items-center justify-between rounded-2xl border border-white/10 bg-white/[0.035] px-4 py-3 text-sm font-semibold text-white/78 transition-all duration-300 hover:-translate-y-0.5 hover:border-accent/45 hover:bg-accent/10 hover:text-white focus:outline-none focus:ring-2 focus:ring-accent/35"
                    >
                      <span>{t(area.labelKey)}</span>
                      <span className="h-px w-8 bg-gradient-to-r from-accent/65 to-transparent opacity-65 transition-all duration-300 group-hover:w-12 group-hover:opacity-100" />
                    </a>
                  ))}
                </div>

                <a
                  href={localize("/contact")}
                  className="mt-7 inline-flex w-full items-center justify-center rounded-full border border-accent/50 bg-accent px-6 py-3 text-center text-sm font-bold text-primary shadow-[0_18px_55px_rgba(212,175,55,0.18)] transition-all duration-300 hover:bg-accent/90"
                >
                  {t("servicesPage.coverage.cta")}
                </a>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />

      {activeService && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/70 px-5 backdrop-blur-md"
          onClick={() => setActiveService(null)}
        >
          <div
            className="relative max-h-[86vh] w-full max-w-2xl overflow-y-auto overflow-x-hidden overscroll-contain rounded-3xl border border-white/10 bg-[#080B12]/95 p-6 text-white shadow-[0_30px_120px_rgba(0,0,0,0.55)] sm:p-8"
            onClick={(event) => event.stopPropagation()}
          >
            <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-accent/60 to-transparent" />
            <div className="absolute -right-20 -top-20 h-48 w-48 rounded-full bg-accent/10 blur-3xl" />

            <button
              type="button"
              onClick={() => setActiveService(null)}
              className="absolute right-4 top-4 z-20 grid h-10 w-10 place-items-center rounded-full border border-white/10 bg-white/5 p-0 text-white/70 transition-all duration-300 hover:border-accent/40 hover:text-white"
              aria-label={t("common.close")}
            >
              <X className="pointer-events-none h-4 w-4" />
            </button>

            <div className="relative z-10 min-w-0 break-words">
              <div className="mb-6 h-px w-20 bg-gradient-to-r from-accent/80 to-transparent" />

              <h3 className="max-w-[85%] text-2xl font-semibold leading-tight text-white sm:text-3xl">
                {activeService.title}
              </h3>

              <p className="mt-3 text-sm font-medium text-white/55">
                {activeService.summary}
              </p>

              <div className="mt-6 h-px w-full bg-gradient-to-r from-accent/50 via-white/10 to-transparent" />

              <p className="mt-6 text-base leading-8 text-white/72">
                {activeService.detail}
              </p>

              <div className="mt-7 h-px w-full bg-gradient-to-r from-accent/40 via-white/10 to-transparent" />

              <div className="mt-5 text-xs uppercase tracking-[0.24em] text-accent/75">
                {t("servicesPage.catalogue.modalBrandLine")}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ServicesPage;