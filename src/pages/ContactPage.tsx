import { useEffect } from "react";
import { useTranslation } from "react-i18next";
import FloatingContactRail from "@/components/site/FloatingContactRail";
import Header from "@/components/site/Header";
import Contact from "@/components/site/Contact";
import Footer from "@/components/site/Footer";

const ContactPage = () => {
  const { t, i18n } = useTranslation();

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "auto" });

    document.title = `${t("contact.title")} | Neurora Property Management`;

    const setMeta = (name: string, content: string) => {
      let el = document.querySelector(`meta[name="${name}"]`);
      if (!el) {
        el = document.createElement("meta");
        el.setAttribute("name", name);
        document.head.appendChild(el);
      }
      el.setAttribute("content", content);
    };

    setMeta("description", t("contact.subtitle"));

    let canonical = document.querySelector('link[rel="canonical"]');
    if (!canonical) {
      canonical = document.createElement("link");
      canonical.setAttribute("rel", "canonical");
      document.head.appendChild(canonical);
    }

    canonical.setAttribute("href", window.location.origin + "/contact");
  }, [t, i18n.language]);

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
                {t("contact.eyebrow")}
              </span>

              <h1 className="text-3xl font-bold leading-tight tracking-[-0.035em] text-white text-balance sm:text-4xl lg:text-6xl">
                {t("contact.title")}
              </h1>

              <p className="mt-8 max-w-3xl text-base leading-8 text-white/68 sm:text-lg">
                {t("contact.subtitle")}
              </p>

              <div className="mt-10">
                <a
                  href="#contact"
                  className="inline-flex items-center justify-center rounded-full bg-accent px-6 py-3 text-sm font-bold text-primary transition-all duration-300 hover:bg-accent/90"
                >
                  {t("header.cta")}
                </a>
              </div>
            </div>
          </div>
        </section>

        <Contact showCoverage={false} showSocials />
      </main>

      <Footer />
    </div>
  );
};

export default ContactPage;