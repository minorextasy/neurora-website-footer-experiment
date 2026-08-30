import { useTranslation } from "react-i18next";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import Logo from "./Logo";
import { getLocalizedPath } from "@/lib/i18nRouting";

const Hero = () => {
  const { t, i18n } = useTranslation();
  const localize = (path: string) => getLocalizedPath(path, i18n.language);

  const serviceLinks = [
    { key: "financial", href: "/neurora-operating-system#financial-control" },
    { key: "legal", href: "/neurora-operating-system#legal-protection" },
    { key: "cleaning", href: "#post-construction-cleaning" },
  ];

  const renderServicePill = (item: { key: string; href: string }, className: string) => {
    const content = t(`hero3d.tags.${item.key}`);

    if (item.href.startsWith("/")) {
      return (
        <Link key={item.key} to={localize(item.href)} className={className}>
          {content}
        </Link>
      );
    }

    return (
      <a key={item.key} href={item.href} className={className}>
        {content}
      </a>
    );
  };


  return (
    <section id="top" className="relative min-h-[100svh] overflow-hidden bg-[#05070D]">
      <div className="absolute inset-0 z-[1]">
        <video
          className="h-full w-full object-cover opacity-55 scale-105 saturate-[0.9] contrast-[1.08]"
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          src="/hero-video.mp4"
        />

        <div className="absolute inset-0 bg-[#05070D]/35" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(212,175,55,0.14)_0%,rgba(5,7,13,0.25)_35%,rgba(5,7,13,0.95)_80%)]" />
        <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-[#05070D] via-[#05070D]/60 to-transparent" />
      </div>

      <div className="absolute inset-0 z-[2] opacity-20">
        <div className="h-full w-full bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:80px_80px]" />
      </div>

      <div className="absolute left-1/2 top-1/2 z-[4] h-[420px] w-[420px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-accent/10 bg-accent/5 blur-3xl sm:h-[520px] sm:w-[520px]" />
      <div className="absolute left-1/2 top-[54%] z-[4] h-[180px] w-[420px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-white/10 bg-white/[0.03] blur-2xl sm:h-[260px] sm:w-[760px]" />

      <div className="relative z-10 min-h-[100svh] flex flex-col items-center justify-center text-center px-5 py-20 sm:px-6">
        <div className="block sm:hidden">
          <Logo size={145} surface="dark" />
        </div>

        <div className="hidden sm:block">
          <Logo size={200} surface="dark" />
        </div>

        <h1 className="mt-3 text-[2.55rem] sm:text-7xl lg:text-8xl font-bold uppercase leading-[0.92] sm:leading-[0.9]">
          <div className="text-white">
            {t("hero3d.titleLine1")}
          </div>

          <div className="text-white">
            {t("hero3d.titleLine2")}
          </div>

          <div className="text-accent text-[1.12em] sm:text-[1.15em]">
            {t("hero3d.titleLine3")}
          </div>
        </h1>

        <p className="mt-6 max-w-[330px] text-[15px] leading-7 text-white/70 sm:mt-8 sm:max-w-2xl sm:text-lg">
          {t("hero3d.subtitle")}
        </p>

        <div className="mt-7 flex w-full max-w-[340px] flex-row items-center justify-center gap-2 sm:mt-8 sm:max-w-none sm:gap-3">
          <Button
            asChild
            size="lg"
            className="h-12 flex-1 rounded-full bg-accent px-3 text-[13px] font-semibold text-black shadow-[0_0_40px_rgba(212,175,55,0.25)] hover:bg-accent/90 sm:h-auto sm:flex-none sm:px-8 sm:text-base"
          >
            <Link to={localize("/contact")}>
              {t("hero3d.primaryCta")}
            </Link>
          </Button>

          <Button
            asChild
            size="lg"
            variant="outline"
            className="h-12 flex-1 rounded-full border-white/25 bg-white/5 px-3 text-[13px] text-white backdrop-blur-md hover:bg-white/10 hover:text-white sm:h-auto sm:flex-none sm:px-8 sm:text-base"
          >
            <Link to={localize("/services")}>
              {t("hero3d.secondaryCta")}
            </Link>
          </Button>
        </div>

        <div className="mt-5 grid w-full max-w-[340px] grid-cols-2 gap-2 sm:hidden">
          {serviceLinks.map((item) =>
            renderServicePill(
              item,
              `flex h-10 items-center justify-center rounded-full border border-white/15 bg-white/5 px-3 text-center text-[9px] uppercase tracking-[0.16em] text-white/65 backdrop-blur-md transition-all duration-300 hover:border-accent/50 hover:bg-accent/10 hover:text-white ${
                item.key === "cleaning" ? "col-span-2" : ""
              }`,
            )
          )}
        </div>

        <div className="mt-6 hidden flex-wrap justify-center gap-2.5 sm:flex">
          {serviceLinks.map((item) =>
            renderServicePill(
              item,
              "rounded-full border border-white/15 bg-white/5 px-4 py-2 text-[11px] uppercase tracking-[0.22em] text-white/65 backdrop-blur-md transition-all duration-300 hover:border-accent/50 hover:bg-accent/10 hover:text-white",
            )
          )}
        </div>

        <div className="absolute bottom-5 left-1/2 flex -translate-x-1/2 flex-col items-center gap-2 text-[9px] uppercase tracking-[0.32em] text-white/45 sm:text-[10px] md:bottom-2">
          <span className="animate-pulse">
            {t("hero3d.scroll")}
          </span>

          <span className="relative h-8 w-px overflow-hidden bg-white/10">
            <span className="absolute left-0 top-0 h-full w-px animate-pulse bg-gradient-to-b from-accent/80 via-accent/30 to-transparent" />
          </span>
        </div>
      </div>
    </section>
  );
};

export default Hero;
