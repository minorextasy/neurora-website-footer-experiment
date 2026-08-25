import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { getLocalizedPath } from "@/lib/i18nRouting";

const NotFound = () => {
  const location = useLocation();
  const { t, i18n } = useTranslation();
  const homePath = getLocalizedPath("/", i18n.language);

  useEffect(() => {
    console.error("404 Error: User attempted to access non-existent route:", location.pathname);
  }, [location.pathname]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-muted">
      <div className="text-center">
        <h1 className="mb-4 text-4xl font-bold">{t("notFound.title")}</h1>
        <p className="mb-4 text-xl text-muted-foreground">{t("notFound.body")}</p>
        <a href={homePath} className="text-primary underline hover:text-primary/90">
          {t("notFound.home")}
        </a>
      </div>
    </div>
  );
};

export default NotFound;
