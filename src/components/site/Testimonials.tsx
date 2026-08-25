import { Quote } from "lucide-react";
import { useTranslation } from "react-i18next";

type Testimonial = {
  quote: string;
  name: string;
  role: string;
};

const Testimonials = () => {
  const { t } = useTranslation();
  const testimonialsResult = t("testimonials.items", { returnObjects: true });
  const testimonials = Array.isArray(testimonialsResult)
    ? (testimonialsResult as Testimonial[])
    : [];

  return (
    <section className="py-24 lg:py-32 bg-secondary/40">
      <div className="container-narrow">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-xs font-bold tracking-[0.25em] uppercase text-accent mb-4 block">
            {t("testimonials.eyebrow")}
          </span>
          <h2 className="font-display text-4xl lg:text-5xl text-foreground leading-tight text-balance">
            {t("testimonials.title")}
          </h2>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {testimonials.map((item) => (
            <figure
              key={item.name}
              className="bg-card border border-border rounded-xl p-8 flex flex-col shadow-card hover:shadow-elegant transition-smooth"
            >
              <Quote className="h-8 w-8 text-accent mb-6" />
              <blockquote className="text-foreground/90 leading-relaxed mb-8 flex-1">
                “{item.quote}”
              </blockquote>
              <figcaption className="border-t border-border pt-5">
                <div className="font-display text-lg text-foreground">
                  {item.name}
                </div>
                <div className="text-xs tracking-wider uppercase text-muted-foreground mt-1">
                  {item.role}
                </div>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
