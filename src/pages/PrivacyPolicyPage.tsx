import { useEffect } from "react";
import { useTranslation } from "react-i18next";
import FloatingContactRail from "@/components/site/FloatingContactRail";
import Header from "@/components/site/Header";
import Footer from "@/components/site/Footer";

type PrivacyPolicySection = {
  title: string;
  body: string[];
};

const CONTACT_EMAIL = "neuroraproperties@gmail.com";

const PrivacyPolicyPage = () => {
  const { t, i18n } = useTranslation();

  const sectionsResult = t("privacyPolicy.sections", { returnObjects: true });
  const sections = Array.isArray(sectionsResult)
    ? (sectionsResult as PrivacyPolicySection[])
    : [];

  const openCookiePreferences = () => {
    window.dispatchEvent(new Event("neurora:open-cookie-preferences"));
  };

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "auto" });

    document.title = t("privacyPolicy.metaTitle");

    const setMeta = (name: string, content: string) => {
      let el = document.querySelector(`meta[name="${name}"]`);
      if (!el) {
        el = document.createElement("meta");
        el.setAttribute("name", name);
        document.head.appendChild(el);
      }
      el.setAttribute("content", content);
    };

    setMeta("description", t("privacyPolicy.metaDescription"));

    let canonical = document.querySelector('link[rel="canonical"]');
    if (!canonical) {
      canonical = document.createElement("link");
      canonical.setAttribute("rel", "canonical");
      document.head.appendChild(canonical);
    }
    canonical.setAttribute("href", window.location.origin + "/privacy-policy");
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
            <div className="max-w-4xl">
              <div className="mb-8 h-px w-full bg-gradient-to-r from-transparent via-accent/40 to-transparent" />
              <p className="mb-4 text-xs font-bold uppercase tracking-[0.28em] text-accent">
                {t("privacyPolicy.hero.eyebrow")}
              </p>
              <h1 className="text-4xl font-bold leading-tight tracking-[-0.04em] text-white sm:text-5xl lg:text-6xl">
                {t("privacyPolicy.hero.title")}
              </h1>
              <p className="mt-6 max-w-3xl text-base leading-8 text-white/72 sm:text-lg">
                {t("privacyPolicy.hero.subtitle")}
              </p>
              <p className="mt-5 text-sm font-semibold text-accent">
                {t("privacyPolicy.hero.effectiveDate")}
              </p>
            </div>
          </div>
        </section>

        <section className="bg-gradient-soft py-14 sm:py-16 lg:py-20">
          <div className="container-narrow">
            <div className="mx-auto max-w-4xl rounded-[2rem] border border-border/70 bg-white p-6 shadow-card sm:p-8 lg:p-10">
              <div className="mb-8 rounded-3xl border border-accent/20 bg-accent/10 p-5">
                <p className="text-sm leading-7 text-foreground/75">
                  {t("privacyPolicy.controller.label")} {" "}
                  <strong className="text-foreground">
                    {t("privacyPolicy.controller.company")}
                  </strong>
                  , {t("privacyPolicy.controller.emailLabel")} {" "}
                  <a href={`mailto:${CONTACT_EMAIL}`} className="font-bold text-accent hover:underline">
                    {CONTACT_EMAIL}
                  </a>
                </p>
              </div>

              <div className="space-y-9">
                {sections.map((section) => (
                  <article key={section.title} className="border-b border-border/70 pb-8 last:border-b-0 last:pb-0">
                    <h2 className="text-xl font-bold tracking-[-0.02em] text-foreground sm:text-2xl">
                      {section.title}
                    </h2>
                    <div className="mt-4 space-y-4 text-sm leading-7 text-muted-foreground sm:text-base sm:leading-8">
                      {section.body.map((paragraph) => (
                        <p key={paragraph}>{paragraph}</p>
                      ))}
                    </div>
                  </article>
                ))}
              </div>

              <div className="mt-10 rounded-3xl border border-accent/25 bg-accent/10 p-5">
                <h2 className="text-lg font-bold tracking-[-0.02em] text-foreground">
                  {t("privacyPolicy.cookiePreferences.title")}
                </h2>
                <p className="mt-3 text-sm leading-7 text-muted-foreground">
                  {t("privacyPolicy.cookiePreferences.body")}
                </p>
                <button
                  type="button"
                  onClick={openCookiePreferences}
                  className="mt-4 inline-flex items-center justify-center rounded-full bg-foreground px-5 py-2.5 text-xs font-bold uppercase tracking-[0.18em] text-background transition-base hover:bg-accent hover:text-accent-foreground focus:outline-none focus-visible:ring-2 focus-visible:ring-accent"
                >
                  {t("privacyPolicy.cookiePreferences.button")}
                </button>
              </div>

              <div className="mt-10 rounded-3xl border border-border bg-muted/40 p-5 text-sm leading-7 text-muted-foreground">
                <p>
                  {t("privacyPolicy.finalContact.prefix")} {" "}
                  <a href={`mailto:${CONTACT_EMAIL}`} className="font-bold text-accent hover:underline">
                    {CONTACT_EMAIL}
                  </a>
                  {t("privacyPolicy.finalContact.suffix")}
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default PrivacyPolicyPage;
