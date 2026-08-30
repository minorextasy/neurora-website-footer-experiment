import { Mail, MessageCircle, Phone, X } from "lucide-react";
import { useState } from "react";
import { useTranslation } from "react-i18next";

const FloatingContactRail = () => {
  const { t } = useTranslation();
  const [desktopOpen, setDesktopOpen] = useState(true);
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <>
      {/* Mobile contact widget: closed chat head, opens vertically upward */}
      <div className="fixed bottom-[106px] right-4 z-[70] sm:hidden">
        {!mobileOpen ? (
          <button
            type="button"
            onClick={() => setMobileOpen(true)}
            aria-label={t("floatingContact.aria.open")}
            className="flex h-16 w-16 items-center justify-center rounded-full border border-white/20 bg-black/30 text-white shadow-[0_14px_42px_rgba(0,0,0,0.28)] backdrop-blur-xl transition-all duration-300 hover:border-accent/50 hover:bg-accent hover:text-accent-foreground active:scale-95"
          >
            <MessageCircle className="h-6 w-6" strokeWidth={1.9} />
          </button>
        ) : (
          <div className="flex flex-col items-center gap-1.5 rounded-full border border-white/20 bg-black/25 p-1.5 shadow-[0_14px_46px_rgba(0,0,0,0.30)] backdrop-blur-xl">
            <a
              href="https://www.instagram.com/neuroraproperties/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label={t("floatingContact.aria.instagram")}
              className="group flex h-10 w-10 items-center justify-center rounded-full border border-black/10 bg-white transition-all duration-300 hover:border-accent/50 hover:bg-accent active:scale-95"
            >
              <img
                src="https://upload.wikimedia.org/wikipedia/commons/a/a5/Instagram_icon.png"
                alt=""
                className="h-4 w-4 rounded-[4px] transition-transform duration-300 group-hover:scale-110"
              />
            </a>

            <a
              href="https://www.facebook.com/neuroraproperties"
              target="_blank"
              rel="noopener noreferrer"
              aria-label={t("floatingContact.aria.facebook")}
              className="group flex h-10 w-10 items-center justify-center rounded-full border border-black/10 bg-white transition-all duration-300 hover:border-accent/50 hover:bg-accent active:scale-95"
            >
              <img
                src="https://upload.wikimedia.org/wikipedia/commons/5/51/Facebook_f_logo_%282019%29.svg"
                alt=""
                className="h-4 w-4 transition-transform duration-300 group-hover:scale-110"
              />
            </a>

            <div className="h-px w-6 bg-white/15" />

            <a
              href="viber://chat?number=%2B35799203600"
              aria-label={t("floatingContact.aria.viber")}
              className="group flex h-10 w-10 items-center justify-center rounded-full border border-black/10 bg-[#7360F2] transition-all duration-300 hover:border-accent/50 hover:scale-105 active:scale-95"
            >
              <img
                src="https://cdn.simpleicons.org/viber/FFFFFF"
                alt=""
                className="h-5 w-5 object-contain"
              />
            </a>

            <a
              href="https://wa.me/35799203600"
              target="_blank"
              rel="noopener noreferrer"
              aria-label={t("floatingContact.aria.whatsapp")}
              className="group flex h-10 w-10 items-center justify-center rounded-full border border-black/10 bg-[#25D366] transition-all duration-300 hover:border-accent/50 hover:scale-105 active:scale-95"
            >
              <img
                src="https://cdn.simpleicons.org/whatsapp/FFFFFF"
                alt=""
                className="h-5 w-5 object-contain"
              />
            </a>

            <div className="h-px w-6 bg-white/15" />

            <a
              href="mailto:neuroraproperties@gmail.com"
              aria-label={t("floatingContact.aria.email")}
              className="group flex h-10 w-10 items-center justify-center rounded-full border border-black/10 bg-white text-[#111111] transition-all duration-300 hover:border-accent/50 hover:bg-accent hover:text-accent-foreground active:scale-95"
            >
              <Mail className="h-4 w-4" strokeWidth={1.9} />
            </a>

            <a
              href="tel:+35799203600"
              aria-label={t("floatingContact.aria.call")}
              className="group flex h-10 w-10 items-center justify-center rounded-full border border-black/10 bg-white text-[#111111] transition-all duration-300 hover:border-accent/50 hover:bg-accent hover:text-accent-foreground active:scale-95"
            >
              <Phone className="h-4 w-4" strokeWidth={1.9} />
            </a>

            <div className="h-px w-6 bg-white/15" />

            <button
              type="button"
              onClick={() => setMobileOpen(false)}
              aria-label={t("floatingContact.aria.close")}
              className="flex h-10 w-10 items-center justify-center rounded-full border border-black/10 bg-white text-[#111111]/65 transition-all duration-300 hover:border-accent/45 hover:text-[#111111] active:scale-95"
            >
              <X className="h-4 w-4" strokeWidth={2} />
            </button>
          </div>
        )}
      </div>

      {/* Desktop contact rail: unchanged */}
      {!desktopOpen ? (
        <button
          type="button"
          onClick={() => setDesktopOpen(true)}
          aria-label={t("floatingContact.aria.open")}
          className="fixed left-3 top-[48%] z-[70] hidden h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full border border-black/10 bg-white/90 text-[#111111] shadow-[0_10px_30px_rgba(0,0,0,0.16)] backdrop-blur-xl transition-all duration-300 hover:border-accent/45 hover:bg-accent hover:text-accent-foreground sm:flex lg:left-4 lg:top-1/2 lg:h-11 lg:w-11"
        >
          <MessageCircle className="h-3 w-3 lg:h-4 lg:w-4" strokeWidth={1.9} />
        </button>
      ) : (
        <div className="fixed left-3 top-[48%] z-[70] hidden -translate-y-1/2 sm:block lg:left-4 lg:top-1/2">
          <div className="flex flex-col items-center gap-1.5 rounded-full border border-white/20 bg-black/25 p-1.5 shadow-[0_12px_36px_rgba(0,0,0,0.22)] backdrop-blur-xl lg:gap-2 lg:p-2">
            <button
              type="button"
              onClick={() => setDesktopOpen(false)}
              aria-label={t("floatingContact.aria.close")}
              className="flex h-7 w-7 items-center justify-center rounded-full border border-black/10 bg-white text-[#111111]/60 transition-all duration-300 hover:border-accent/45 hover:text-[#111111] lg:h-8 lg:w-8"
            >
              <X className="h-3 w-3 lg:h-3.5 lg:w-3.5" strokeWidth={2} />
            </button>

            <div className="h-px w-5 bg-black/10 lg:w-6" />

            <a
              href="tel:+35799203600"
              aria-label={t("floatingContact.aria.call")}
              className="group flex h-9 w-9 items-center justify-center rounded-full border border-black/10 bg-white text-[#111111] transition-all duration-300 hover:border-accent/50 hover:bg-accent hover:text-accent-foreground lg:h-11 lg:w-11"
            >
              <Phone className="h-3 w-3 lg:h-4 lg:w-4" strokeWidth={1.9} />
            </a>

            <a
              href="mailto:neuroraproperties@gmail.com"
              aria-label={t("floatingContact.aria.email")}
              className="group flex h-9 w-9 items-center justify-center rounded-full border border-black/10 bg-white text-[#111111] transition-all duration-300 hover:border-accent/50 hover:bg-accent hover:text-accent-foreground lg:h-11 lg:w-11"
            >
              <Mail className="h-3 w-3 lg:h-4 lg:w-4" strokeWidth={1.9} />
            </a>

            <a
              href="https://wa.me/35799203600"
              target="_blank"
              rel="noopener noreferrer"
              aria-label={t("floatingContact.aria.whatsapp")}
              className="group flex h-9 w-9 items-center justify-center rounded-full border border-black/10 bg-[#25D366] transition-all duration-300 hover:border-accent/50 hover:scale-105 lg:h-11 lg:w-11"
            >
              <img
                src="https://cdn.simpleicons.org/whatsapp/FFFFFF"
                alt=""
                className="h-4 w-4 object-contain lg:h-5 lg:w-5"
              />
            </a>

            <a
              href="viber://chat?number=%2B35799203600"
              aria-label={t("floatingContact.aria.viber")}
              className="group flex h-9 w-9 items-center justify-center rounded-full border border-black/10 bg-[#7360F2] transition-all duration-300 hover:border-accent/50 hover:scale-105 lg:h-11 lg:w-11"
            >
              <img
                src="https://cdn.simpleicons.org/viber/FFFFFF"
                alt=""
                className="h-4 w-4 object-contain lg:h-5 lg:w-5"
              />
            </a>

            <div className="my-0.5 h-px w-5 bg-black/10 lg:my-1 lg:w-6" />

            <a
              href="https://www.facebook.com/neuroraproperties"
              target="_blank"
              rel="noopener noreferrer"
              aria-label={t("floatingContact.aria.facebook")}
              className="group flex h-9 w-9 items-center justify-center rounded-full border border-black/10 bg-white transition-all duration-300 hover:border-accent/50 hover:bg-accent lg:h-11 lg:w-11"
            >
              <img
                src="https://upload.wikimedia.org/wikipedia/commons/5/51/Facebook_f_logo_%282019%29.svg"
                alt=""
                className="h-3 w-3 transition-transform duration-300 group-hover:scale-110 lg:h-4 lg:w-4"
              />
            </a>

            <a
              href="https://www.instagram.com/neuroraproperties/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label={t("floatingContact.aria.instagram")}
              className="group flex h-9 w-9 items-center justify-center rounded-full border border-black/10 bg-white transition-all duration-300 hover:border-accent/50 hover:bg-accent lg:h-11 lg:w-11"
            >
              <img
                src="https://upload.wikimedia.org/wikipedia/commons/a/a5/Instagram_icon.png"
                alt=""
                className="h-3 w-3 rounded-[4px] transition-transform duration-300 group-hover:scale-110 lg:h-4 lg:w-4"
              />
            </a>
          </div>
        </div>
      )}
    </>
  );
};

export default FloatingContactRail;
