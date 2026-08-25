import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { X } from "lucide-react";
import { useTranslation } from "react-i18next";
import FloatingContactRail from "@/components/site/FloatingContactRail";
import Header from "@/components/site/Header";
import Footer from "@/components/site/Footer";
import { getLocalizedPath } from "@/lib/i18nRouting";

type AboutItem = {
  title: string;
  desc: string;
  detail: string;
};

type TrustItem = {
  title: string;
  desc: string;
};

type ModalContent = {
  title: string;
  desc: string;
  detail: string;
};

const AboutPage = () => {
  const { t, i18n } = useTranslation();
  const [activeCard, setActiveCard] = useState<ModalContent | null>(null);
  const localize = (path: string) => getLocalizedPath(path, i18n.language);

  const aboutItemsRaw = t("about.items", { returnObjects: true });
  const trustItemsRaw = t("trust.items", { returnObjects: true });
  const trustDetailsRaw = t("trust.modalDetails", { returnObjects: true });

  const aboutItems = Array.isArray(aboutItemsRaw)
    ? (aboutItemsRaw as AboutItem[])
    : [];

  const trustItems = Array.isArray(trustItemsRaw)
    ? (trustItemsRaw as TrustItem[])
    : [];

  const trustDetails = Array.isArray(trustDetailsRaw)
    ? (trustDetailsRaw as string[])
    : [];

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "auto" });

    document.title = t("aboutPage.metaTitle");

    const setMeta = (name: string, content: string) => {
      let el = document.querySelector(`meta[name="${name}"]`);
      if (!el) {
        el = document.createElement("meta");
        el.setAttribute("name", name);
        document.head.appendChild(el);
      }
      el.setAttribute("content", content);
    };

    setMeta("description", t("aboutPage.metaDescription"));

    let canonical = document.querySelector('link[rel="canonical"]');
    if (!canonical) {
      canonical = document.createElement("link");
      canonical.setAttribute("rel", "canonical");
      document.head.appendChild(canonical);
    }
    canonical.setAttribute("href", window.location.origin + "/about");
  }, [t, i18n.language]);

  useEffect(() => {
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setActiveCard(null);
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
        <section className="relative overflow-hidden bg-[#05070D] pb-14 pt-24 text-white sm:pb-16 sm:pt-28 lg:pb-20 lg:pt-32">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_18%_22%,rgba(212,175,55,0.16)_0%,transparent_34%)]" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_86%_68%,rgba(255,255,255,0.06)_0%,transparent_36%)]" />
          <div className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-accent/35 to-transparent" />

          <div className="container-narrow relative z-10">
            <div className="max-w-5xl">
              <div className="mb-8 h-px w-full bg-gradient-to-r from-transparent via-accent/40 to-transparent" />

              <span className="mb-5 block text-xs font-bold uppercase tracking-[0.28em] text-accent">
                {t("aboutPage.hero.eyebrow")}
              </span>

              <h1 className="text-3xl font-bold leading-tight tracking-[-0.035em] text-white text-balance sm:text-4xl lg:text-6xl">
                {t("aboutPage.hero.titleLead")}{" "}
                <span className="text-accent">
                  {t("aboutPage.hero.titleAccent")}
                </span>
              </h1>

              <p className="mt-8 max-w-3xl text-base leading-8 text-white/68 sm:text-lg">
                {t("aboutPage.hero.subtitle")}
              </p>

              <div className="mt-10 flex flex-col gap-3 sm:flex-row">
                <a
                    href={localize("/contact")}
                  className="inline-flex items-center justify-center rounded-full bg-accent px-6 py-3 text-sm font-bold text-primary transition-all duration-300 hover:bg-accent/90"
                >
                  {t("aboutPage.hero.ctaPrimary")}
                </a>

                <Link
                  to={localize("/services")}
                  className="inline-flex items-center justify-center rounded-full border border-white/15 bg-white/5 px-6 py-3 text-sm font-bold text-white transition-all duration-300 hover:border-accent/40 hover:bg-white/10"
                >
                  {t("aboutPage.hero.ctaSecondary")}
                </Link>
              </div>
            </div>
          </div>
        </section>

        <section className="relative overflow-hidden bg-white py-16 text-[#111111] sm:py-20 lg:py-24">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_12%_12%,rgba(212,175,55,0.08)_0%,transparent_30%)]" />
          <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-black/10 to-transparent" />

          <div className="container-narrow relative z-10">
            <div className="grid gap-10 lg:grid-cols-[0.85fr_1.15fr] lg:items-start">
              <div>
                <span className="mb-4 block text-xs font-bold uppercase tracking-[0.28em] text-accent">
                  {t("aboutPage.intro.eyebrow")}
                </span>

                <h2 className="text-3xl font-bold leading-tight tracking-[-0.035em] text-[#111111] sm:text-4xl lg:text-5xl">
                  {t("aboutPage.intro.title")}
                </h2>

                <p className="mt-6 text-base leading-8 text-black/65 sm:text-lg">
                  {t("aboutPage.intro.body")}
                </p>
              </div>

              <div className="rounded-[2rem] border border-black/10 bg-[#05070D] p-6 text-white shadow-[0_26px_100px_rgba(0,0,0,0.18)] sm:p-8">
                <div className="mb-6 h-px w-20 bg-gradient-to-r from-accent/80 to-transparent" />

                <h3 className="text-2xl font-bold leading-tight text-white sm:text-3xl">
                  {t("aboutPage.method.title")}
                </h3>

                <p className="mt-5 text-sm leading-7 text-white/65 sm:text-base">
                  {t("aboutPage.method.body")}
                </p>

                <div className="mt-7 grid gap-3 sm:grid-cols-3">
                  {[
                    t("aboutPage.method.points.structure"),
                    t("aboutPage.method.points.transparency"),
                    t("aboutPage.method.points.control"),
                  ].map((point) => (
                    <div
                      key={point}
                      className="rounded-2xl border border-white/10 bg-white/[0.035] px-4 py-4 text-sm font-semibold text-accent"
                    >
                      {point}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="relative overflow-hidden bg-[#F8F6F0] py-16 text-[#111111] sm:py-20 lg:py-24">
          <div className="container-narrow relative z-10">
            <div className="max-w-4xl">
              <span className="mb-4 block text-xs font-bold uppercase tracking-[0.28em] text-accent">
                {t("aboutPage.properties.eyebrow")}
              </span>

              <h2 className="text-3xl font-bold leading-tight tracking-[-0.035em] text-[#111111] sm:text-4xl lg:text-5xl">
                {t("aboutPage.properties.title")}
              </h2>

              <p className="mt-5 max-w-3xl text-base leading-8 text-black/62">
                {t("aboutPage.properties.subtitle")}
              </p>
            </div>

            <div className="mt-10 grid gap-5 md:grid-cols-3">
              {aboutItems.map((item) => (
                <button
                  key={item.title}
                  type="button"
                  onClick={() => setActiveCard(item)}
                  className="group rounded-[2rem] border border-black/10 bg-white p-6 text-left shadow-[0_18px_70px_rgba(0,0,0,0.08)] transition-all duration-300 [transform-style:preserve-3d] hover:-translate-y-1 hover:border-accent/45 hover:shadow-[0_26px_90px_rgba(212,175,55,0.16)] focus:outline-none focus:ring-2 focus:ring-accent/35"
                >
                  <div className="mb-5 h-px w-16 bg-gradient-to-r from-accent/80 to-transparent transition-all duration-300 group-hover:w-24" />

                  <h3 className="text-xl font-bold leading-snug text-[#111111] transition-transform duration-300 group-hover:[transform:translateZ(10px)]">
                    {item.title}
                  </h3>

                  <p className="mt-4 text-sm leading-7 text-black/60">
                    {item.desc}
                  </p>
                </button>
              ))}
            </div>
          </div>
        </section>

        <section className="relative overflow-hidden bg-[#05070D] py-16 text-white sm:py-20 lg:py-24">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_20%,rgba(212,175,55,0.12)_0%,transparent_32%)]" />
          <div className="container-narrow relative z-10">
            <div className="max-w-4xl">
              <span className="mb-4 block text-xs font-bold uppercase tracking-[0.28em] text-accent">
                {t("aboutPage.standard.eyebrow")}
              </span>

              <h2 className="text-3xl font-bold leading-tight tracking-[-0.035em] text-white sm:text-4xl lg:text-5xl">
                {t("aboutPage.standard.title")}
              </h2>

              <p className="mt-5 max-w-3xl text-base leading-8 text-white/62">
                {t("aboutPage.standard.subtitle")}
              </p>
            </div>

            <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
              {trustItems.map((item, index) => (
                <button
                  key={item.title}
                  type="button"
                  onClick={() =>
                    setActiveCard({
                      title: item.title,
                      desc: item.desc,
                      detail: trustDetails[index] || item.desc,
                    })
                  }
                  className="group rounded-[2rem] border border-white/10 bg-white/[0.035] p-6 text-left transition-all duration-300 [transform-style:preserve-3d] hover:-translate-y-1 hover:border-accent/45 hover:bg-white/[0.055] hover:shadow-[0_24px_80px_rgba(212,175,55,0.12)] focus:outline-none focus:ring-2 focus:ring-accent/35"
                >
                  <div className="mb-5 h-px w-16 bg-gradient-to-r from-accent/80 to-transparent transition-all duration-300 group-hover:w-24" />

                  <h3 className="text-lg font-bold leading-snug text-white transition-transform duration-300 group-hover:[transform:translateZ(10px)]">
                    {item.title}
                  </h3>

                  <p className="mt-4 text-sm leading-7 text-white/58">
                    {item.desc}
                  </p>
                </button>
              ))}
            </div>
          </div>
        </section>

        <section className="bg-white py-16 text-[#111111] sm:py-20">
          <div className="container-narrow">
            <div className="overflow-hidden rounded-[2.2rem] border border-black/10 bg-[#05070D] p-7 text-white shadow-[0_26px_100px_rgba(0,0,0,0.18)] sm:p-10 lg:p-12">
              <div className="mb-6 h-px w-24 bg-gradient-to-r from-accent/80 to-transparent" />

              <div className="grid gap-8 lg:grid-cols-[1fr_auto] lg:items-center">
                <div>
                  <h2 className="text-3xl font-bold leading-tight tracking-[-0.035em] text-white sm:text-4xl">
                    {t("aboutPage.cta.title")}
                  </h2>

                  <p className="mt-5 max-w-2xl text-base leading-8 text-white/65">
                    {t("aboutPage.cta.body")}
                  </p>
                </div>

                <a
                  href={localize("/contact")}
                  className="inline-flex items-center justify-center rounded-full bg-accent px-6 py-3 text-sm font-bold text-primary transition-all duration-300 hover:bg-accent/90"
                >
                  {t("aboutPage.cta.button")}
                </a>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />

      {activeCard && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/70 px-5 backdrop-blur-md"
          onClick={() => setActiveCard(null)}
        >
          <div
            className="relative max-h-[86vh] w-full max-w-2xl overflow-y-auto overflow-x-hidden overscroll-contain rounded-3xl border border-white/10 bg-[#080B12]/95 p-6 text-white shadow-[0_30px_120px_rgba(0,0,0,0.55)] sm:p-8"
            onClick={(event) => event.stopPropagation()}
          >
            <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-accent/60 to-transparent" />
            <div className="absolute -right-20 -top-20 h-48 w-48 rounded-full bg-accent/10 blur-3xl" />

            <button
              type="button"
              onClick={() => setActiveCard(null)}
              className="absolute right-4 top-4 z-20 grid h-10 w-10 place-items-center rounded-full border border-white/10 bg-white/5 p-0 text-white/70 transition-all duration-300 hover:border-accent/40 hover:text-white"
              aria-label={t("common.close")}
            >
              <X className="pointer-events-none h-4 w-4" />
            </button>

            <div className="relative z-10 min-w-0 break-words">
              <div className="mb-6 h-px w-20 bg-gradient-to-r from-accent/80 to-transparent" />

              <h3 className="max-w-[85%] text-2xl font-semibold leading-tight text-white sm:text-3xl">
                {activeCard.title}
              </h3>

              <p className="mt-3 text-sm font-medium text-white/55">
                {activeCard.desc}
              </p>

              <div className="mt-6 h-px w-full bg-gradient-to-r from-accent/50 via-white/10 to-transparent" />

              <p className="mt-6 text-base leading-8 text-white/72">
                {activeCard.detail}
              </p>

              <div className="mt-7 h-px w-full bg-gradient-to-r from-accent/40 via-white/10 to-transparent" />

              <div className="mt-5 text-xs uppercase tracking-[0.24em] text-accent/75">
                NEURORA PROPERTY MANAGEMENT
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AboutPage;