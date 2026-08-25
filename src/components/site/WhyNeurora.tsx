import { ShieldCheck, Clock, FileCheck, Network, Sparkles } from "lucide-react";
import { useTranslation } from "react-i18next";

const icons = [ShieldCheck, Clock, FileCheck, Network, Sparkles];

type Reason = {
  title: string;
  desc: string;
};

const WhyNeurora = () => {
  const { t } = useTranslation();
  const reasonsResult = t("whyNeurora.items", { returnObjects: true });
  const reasons = Array.isArray(reasonsResult) ? (reasonsResult as Reason[]) : [];

  return (
    <section id="why" className="py-24 lg:py-32 bg-gradient-soft">
      <div className="container-narrow">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-xs font-bold tracking-[0.25em] uppercase text-accent mb-4 block">
            {t("whyNeurora.eyebrow")}
          </span>
          <h2 className="font-display text-4xl lg:text-5xl text-foreground leading-tight text-balance mb-6">
            {t("whyNeurora.title")}
          </h2>
          <p className="text-lg text-muted-foreground leading-relaxed">
            {t("whyNeurora.subtitle")}
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-6">
          {reasons.map((reason, index) => {
            const Icon = icons[index] ?? ShieldCheck;

            return (
              <div
                key={reason.title}
                className="bg-card border border-border rounded-xl p-7 text-center hover:shadow-soft hover:border-accent/40 transition-smooth"
              >
                <div className="h-14 w-14 mx-auto rounded-full bg-accent-soft flex items-center justify-center mb-5">
                  <Icon className="h-6 w-6 text-accent" />
                </div>
                <h3 className="font-display text-lg text-foreground mb-2">
                  {reason.title}
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {reason.desc}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default WhyNeurora;
