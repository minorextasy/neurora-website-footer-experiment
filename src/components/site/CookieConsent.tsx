import { useEffect, useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { KeyRound, X } from "lucide-react";
import { cn } from "@/lib/utils";

const GA_ID = "G-QLLL8TWL31";
const STORAGE_KEY = "neurora_cookie_consent_v2";

type CookiePreferences = {
  necessary: true;
  analytics: boolean;
  marketing: boolean;
};

declare global {
  interface Window {
    dataLayer?: unknown[];
    gtag?: (...args: unknown[]) => void;
    __neuroraAnalyticsLoaded?: boolean;
  }
}

const defaultPreferences: CookiePreferences = {
  necessary: true,
  analytics: false,
  marketing: false,
};

const getStoredPreferences = (): CookiePreferences | null => {
  try {
    const stored = window.localStorage.getItem(STORAGE_KEY);

    if (!stored) {
      return null;
    }

    const parsed = JSON.parse(stored) as Partial<CookiePreferences>;

    return {
      necessary: true,
      analytics: Boolean(parsed.analytics),
      marketing: Boolean(parsed.marketing),
    };
  } catch {
    return null;
  }
};

const saveStoredPreferences = (preferences: CookiePreferences) => {
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(preferences));
};

const deleteAnalyticsCookies = () => {
  if (typeof document === "undefined") return;

  const hostname = window.location.hostname;
  const domainParts = hostname.split(".");
  const rootDomain = domainParts.length > 2 ? domainParts.slice(-2).join(".") : hostname;

  document.cookie
    .split(";")
    .map((cookie) => cookie.trim().split("=")[0])
    .filter((name) => name.startsWith("_ga") || name === "_gid" || name === "_gat")
    .forEach((name) => {
      document.cookie = `${name}=; Max-Age=0; path=/`;
      document.cookie = `${name}=; Max-Age=0; path=/; domain=${hostname}`;
      document.cookie = `${name}=; Max-Age=0; path=/; domain=.${hostname}`;
      document.cookie = `${name}=; Max-Age=0; path=/; domain=.${rootDomain}`;
    });
};

const disableGoogleAnalytics = () => {
  (window as unknown as Record<string, unknown>)[`ga-disable-${GA_ID}`] = true;
  deleteAnalyticsCookies();
};

const loadGoogleAnalytics = () => {
  if (typeof document === "undefined") return;

  (window as unknown as Record<string, unknown>)[`ga-disable-${GA_ID}`] = false;

  if (!window.gtag) {
    window.dataLayer = window.dataLayer || [];
    window.gtag = (...args: unknown[]) => {
      window.dataLayer?.push(args);
    };
  }

  if (window.__neuroraAnalyticsLoaded) {
    return;
  }

  window.__neuroraAnalyticsLoaded = true;

  const script = document.createElement("script");
  script.id = "neurora-google-analytics";
  script.async = true;
  script.src = `https://www.googletagmanager.com/gtag/js?id=${GA_ID}`;
  document.head.appendChild(script);

  window.gtag("js", new Date());
  window.gtag("config", GA_ID, {
    anonymize_ip: true,
  });
};

const applyCookiePreferences = (preferences: CookiePreferences) => {
  // Analytics is the only optional technology currently active.
  // Marketing remains a future-proof consent category, but no marketing
  // technology is loaded by the website at present.
  if (preferences.analytics) {
    loadGoogleAnalytics();
  } else {
    disableGoogleAnalytics();
  }
};

const normalizeLanguage = (language: string) => {
  const lower = (language || "en").toLowerCase();

  if (lower === "ar-lb" || lower.startsWith("ar")) return "ar-lb";
  if (lower.startsWith("uk")) return "uk";
  if (lower.startsWith("de")) return "de";
  if (lower.startsWith("fr")) return "fr";
  if (lower.startsWith("es")) return "es";
  if (lower.startsWith("ro")) return "ro";
  if (lower.startsWith("zh")) return "zh";
  if (lower.startsWith("el")) return "el";
  if (lower.startsWith("ru")) return "ru";
  if (lower.startsWith("he")) return "he";

  return "en";
};

const getPrivacyPath = (language: string) => {
  const normalized = normalizeLanguage(language);

  if (normalized === "en") {
    return "/privacy-policy";
  }

  return `/${normalized}/privacy-policy`;
};

const PreferenceSwitch = ({
  checked,
  disabled,
  label,
  description,
  onToggle,
}: {
  checked: boolean;
  disabled?: boolean;
  label: string;
  description: string;
  onToggle?: () => void;
}) => (
  <div className="rounded-xl border border-border/70 bg-white p-3 sm:rounded-2xl sm:p-4">
    <div className="flex items-start justify-between gap-3 sm:gap-4">
      <div>
        <h3 className="text-sm font-bold text-foreground">{label}</h3>
        <p className="mt-1 text-xs leading-5 text-muted-foreground sm:text-sm sm:leading-6">{description}</p>
      </div>
      <button
        type="button"
        role="switch"
        aria-checked={checked}
        disabled={disabled}
        onClick={onToggle}
        className={cn(
          "relative mt-0.5 h-6 w-11 shrink-0 rounded-full border transition-base focus:outline-none focus-visible:ring-2 focus-visible:ring-accent sm:h-7 sm:w-12",
          checked ? "border-accent bg-accent" : "border-border bg-muted",
          disabled && "cursor-not-allowed opacity-70"
        )}
      >
        <span
          className="absolute top-1/2 h-[1.125rem] w-[1.125rem] -translate-y-1/2 rounded-full bg-white shadow-sm transition-transform sm:h-5 sm:w-5"
          style={{
            left: checked ? "calc(100% - 1.5rem)" : "0.25rem",
          }}
        />
      </button>
    </div>
  </div>
);

const CookieConsent = () => {
  const { t, i18n } = useTranslation();
  const [preferences, setPreferences] = useState<CookiePreferences>(defaultPreferences);
  const [showBanner, setShowBanner] = useState(false);
  const [manageOpen, setManageOpen] = useState(false);

  const privacyPath = useMemo(() => getPrivacyPath(i18n.language), [i18n.language]);

  useEffect(() => {
    const stored = getStoredPreferences();

    if (stored) {
      setPreferences(stored);
      setShowBanner(false);
      applyCookiePreferences(stored);
    } else {
      disableGoogleAnalytics();
      setManageOpen(true);
    }

    const openPreferences = () => {
      const latest = getStoredPreferences();
      setPreferences(latest ?? defaultPreferences);
      setManageOpen(true);
      setShowBanner(false);
    };

    window.addEventListener("neurora:open-cookie-preferences", openPreferences);

    return () => {
      window.removeEventListener("neurora:open-cookie-preferences", openPreferences);
    };
  }, []);

  const commitPreferences = (nextPreferences: CookiePreferences) => {
    setPreferences(nextPreferences);
    saveStoredPreferences(nextPreferences);
    applyCookiePreferences(nextPreferences);
    setShowBanner(false);
    setManageOpen(false);
  };

  const acceptAll = () =>
    commitPreferences({
      necessary: true,
      analytics: true,
      marketing: true,
    });

  const rejectAll = () =>
    commitPreferences({
      necessary: true,
      analytics: false,
      marketing: false,
    });

  const saveCustom = () => commitPreferences(preferences);

  const toggleAnalytics = () =>
    setPreferences((current) => ({
      ...current,
      analytics: !current.analytics,
    }));

  const toggleMarketing = () =>
    setPreferences((current) => ({
      ...current,
      marketing: !current.marketing,
    }));

  const openPreferences = () => {
    const latest = getStoredPreferences();
    setPreferences(latest ?? defaultPreferences);
    setManageOpen(true);
    setShowBanner(false);
  };


  return (
    <>
      {showBanner && (
        <div className="fixed inset-x-0 bottom-0 z-[100] px-3 pb-[calc(0.75rem+env(safe-area-inset-bottom))] sm:px-6 sm:pb-6">
          <div className="mx-auto w-full max-w-[38rem] overflow-hidden rounded-[1.15rem] border border-accent/25 bg-[#05070D] p-3.5 text-white shadow-[0_22px_90px_rgba(0,0,0,0.58)] sm:rounded-[1.5rem] sm:p-5 lg:max-w-5xl lg:p-6">
            <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between lg:gap-5">
              <div className="max-w-3xl">
                <p className="hidden text-[0.68rem] font-bold uppercase tracking-[0.24em] text-accent sm:block">
                  {t("cookieConsent.banner.eyebrow")}
                </p>
                <h2 className="text-[0.98rem] font-bold tracking-[-0.02em] text-white sm:mt-2 sm:text-lg">
                  {t("cookieConsent.banner.title")}
                </h2>
                <p className="mt-1 text-[0.78rem] leading-5 text-white/86 sm:mt-2 sm:text-sm sm:leading-6">
                  {t("cookieConsent.banner.body")}{" "}
                  <a href={privacyPath} className="font-bold text-accent hover:underline">
                    {t("cookieConsent.banner.privacyLink")}
                  </a>
                </p>
              </div>

              <div className="grid grid-cols-3 gap-2 sm:flex sm:flex-row sm:items-center lg:shrink-0">
                <button
                  type="button"
                  onClick={rejectAll}
                  className="h-8 rounded-full border border-white/28 px-2 text-[0.58rem] font-bold uppercase tracking-[0.06em] text-white transition-base hover:border-white/55 sm:h-auto sm:px-5 sm:py-2.5 sm:text-xs sm:tracking-[0.16em]"
                >
                  {t("cookieConsent.buttons.rejectAll")}
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setManageOpen(true);
                    setShowBanner(false);
                  }}
                  className="h-8 rounded-full border border-accent/60 px-2 text-[0.58rem] font-bold uppercase tracking-[0.06em] text-accent transition-base hover:border-accent hover:bg-accent/10 sm:h-auto sm:px-5 sm:py-2.5 sm:text-xs sm:tracking-[0.16em]"
                >
                  {t("cookieConsent.buttons.manage")}
                </button>
                <button
                  type="button"
                  onClick={acceptAll}
                  className="h-8 rounded-full bg-accent px-2 text-[0.58rem] font-bold uppercase tracking-[0.06em] text-accent-foreground shadow-[0_8px_26px_rgba(212,175,55,0.22)] transition-base hover:opacity-90 sm:h-auto sm:px-5 sm:py-2.5 sm:text-xs sm:tracking-[0.16em]"
                >
                  {t("cookieConsent.buttons.acceptAll")}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Persistent privacy-preferences button */}
      {!showBanner && !manageOpen && (
        <button
          type="button"
          onClick={openPreferences}
          aria-label={t("cookieConsent.buttons.openPreferences")}
          title={t("cookieConsent.buttons.openPreferences")}
          className="fixed bottom-[2px] left-4 z-[20] flex h-10 w-10 items-center justify-center md:bottom-4 rounded-full border border-accent/50 bg-white text-accent shadow-[0_8px_30px_rgba(0,0,0,0.2)] transition-all duration-300 hover:scale-105 hover:bg-accent hover:text-accent-foreground focus:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 sm:bottom-5 sm:left-5"
        >
          <KeyRound className="h-[18px] w-[18px]" strokeWidth={2} />
        </button>
      )}

      {manageOpen && (
        <div className="fixed inset-0 z-[110] flex items-end justify-center bg-black/70 px-3 py-3 backdrop-blur-sm sm:items-center sm:px-4 sm:py-6">
          <div
            role="dialog"
            aria-modal="true"
            aria-labelledby="neurora-cookie-preferences-title"
            className="flex max-h-[calc(100vh-2rem)] w-full max-w-xl flex-col overflow-hidden rounded-[1.35rem] border border-border bg-white shadow-[0_24px_100px_rgba(0,0,0,0.28)] sm:max-h-[calc(100vh-3rem)] sm:rounded-[1.8rem]"
          >
            <div className="flex items-start justify-between gap-3 border-b border-border/70 p-4 sm:gap-4 sm:p-6">
              <div>
                <p className="text-[0.62rem] font-bold uppercase tracking-[0.2em] text-accent sm:text-[0.68rem] sm:tracking-[0.24em]">
                  {t("cookieConsent.banner.eyebrow")}
                </p>
                <p className="mt-3 text-sm leading-6 text-muted-foreground sm:text-base sm:leading-7">
                  {t("cookieConsent.banner.privacyBody")}{" "}
                  <a
                    href={privacyPath}
                    className="font-bold text-accent hover:underline"
                  >
                    {t("cookieConsent.banner.privacyLink")}
                  </a>
                </p>

                <div className="my-6 h-px bg-border/70" />

                <h2 id="neurora-cookie-preferences-title" className="text-xl font-bold tracking-[-0.04em] text-foreground sm:text-2xl">
                  {t("cookieConsent.preferences.title")}
                </h2>
                <p className="mt-3 text-sm leading-6 text-muted-foreground sm:text-base sm:leading-7">
                  {t("cookieConsent.preferences.body")}
                </p>

                <div className="my-6 h-px bg-border/70" />

                <h3 className="text-base font-bold tracking-[-0.02em] text-foreground sm:text-lg">
                  {t("cookieConsent.preferences.consentTitle")}
                </h3>
                <p className="mt-2 text-sm leading-6 text-muted-foreground sm:text-base sm:leading-7">
                  {t("cookieConsent.preferences.consentBody")}
                </p>
              </div>
              <button
                type="button"
                onClick={() => setManageOpen(false)}
                className="rounded-full border border-border p-2 text-muted-foreground transition-base hover:bg-muted hover:text-foreground"
                aria-label={t("cookieConsent.buttons.close")}
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            <div className="min-h-0 flex-1 space-y-2 overflow-y-auto p-4 sm:space-y-3 sm:p-6">
              <PreferenceSwitch
                checked
                disabled
                label={t("cookieConsent.preferences.necessary.title")}
                description={t("cookieConsent.preferences.necessary.body")}
              />
              <PreferenceSwitch
                checked={preferences.analytics}
                label={t("cookieConsent.preferences.analytics.title")}
                description={t("cookieConsent.preferences.analytics.body")}
                onToggle={toggleAnalytics}
              />
              <PreferenceSwitch
                checked={preferences.marketing}
                label={t("cookieConsent.preferences.marketing.title")}
                description={t("cookieConsent.preferences.marketing.body")}
                onToggle={toggleMarketing}
              />
            </div>

            <div className="grid grid-cols-3 gap-2 border-t border-border/70 bg-muted/30 p-4 sm:flex sm:justify-end sm:p-6">
              <button
                type="button"
                onClick={rejectAll}
                className="rounded-full border border-border bg-white px-2 py-2 text-[0.62rem] font-bold uppercase tracking-[0.08em] text-foreground transition-base hover:border-accent hover:text-accent sm:px-5 sm:py-2.5 sm:text-xs sm:tracking-[0.16em]"
              >
                {t("cookieConsent.buttons.rejectAll")}
              </button>
              <button
                type="button"
                onClick={saveCustom}
                className="rounded-full border border-accent bg-white px-2 py-2 text-[0.62rem] font-bold uppercase tracking-[0.08em] text-accent transition-base hover:bg-accent/10 sm:px-5 sm:py-2.5 sm:text-xs sm:tracking-[0.16em]"
              >
                {t("cookieConsent.buttons.save")}
              </button>
              <button
                type="button"
                onClick={acceptAll}
                className="rounded-full bg-foreground px-2 py-2 text-[0.62rem] font-bold uppercase tracking-[0.08em] text-background transition-base hover:bg-accent hover:text-accent-foreground sm:px-5 sm:py-2.5 sm:text-xs sm:tracking-[0.16em]"
              >
                {t("cookieConsent.buttons.acceptAll")}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default CookieConsent;
