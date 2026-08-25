import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { useTranslation } from "react-i18next";

const FinalCTA = () => {
  const { t } = useTranslation();

  return (
    <section className="relative overflow-hidden bg-background py-16 sm:py-20 lg:py-28">
      <div className="container-narrow relative z-10">
        <div className="relative overflow-hidden rounded-[2.5rem] border border-white/10 bg-[#05070D] px-6 py-16 text-center text-white shadow-[0_36px_120px_rgba(0,0,0,0.28)] sm:px-10 sm:py-20 lg:px-16 lg:py-24">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(212,175,55,0.18)_0%,transparent_42%)]" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_85%_85%,rgba(255,255,255,0.07)_0%,transparent_36%)]" />
          <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-accent/65 to-transparent" />
          <div className="absolute inset-x-10 bottom-0 h-px bg-gradient-to-r from-transparent via-white/15 to-transparent" />

          <div className="relative z-10 mx-auto max-w-4xl">
            <div className="mx-auto mb-8 h-px w-40 bg-gradient-to-r from-transparent via-accent to-transparent" />

            <h2 className="text-4xl font-bold leading-[0.95] tracking-[-0.04em] text-white text-balance sm:text-5xl lg:text-7xl">
              {t("finalCta.titleLead")} {" "}
              <span className="text-accent">{t("finalCta.titleAccent")}</span>
            </h2>

            <div className="mt-10 flex justify-center">
              <Button asChild variant="hero" size="xl" className="shadow-[0_18px_60px_rgba(212,175,55,0.18)]">
                <a href="#contact">
                  {t("finalCta.cta")} <ArrowRight className="ml-1 h-4 w-4" />
                </a>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FinalCTA;
