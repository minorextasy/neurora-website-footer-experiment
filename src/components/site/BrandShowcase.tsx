import logoAsset from "@/assets/neurora-logo.png";
import { useTranslation } from "react-i18next";

const BrandShowcase = () => {
  const { t } = useTranslation();

  return (
    <section className="py-16 lg:py-20 bg-background border-y border-border">
      <div className="container-narrow">
        <div className="flex justify-center">
          <div className="h-20 w-20 lg:h-24 lg:w-24 rounded-lg overflow-hidden bg-primary ring-1 ring-accent/30 shadow-soft flex items-center justify-center">
            <img
              src={logoAsset}
              alt={t("logo.alt")}
              className="h-full w-full object-contain"
              draggable={false}
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default BrandShowcase;
