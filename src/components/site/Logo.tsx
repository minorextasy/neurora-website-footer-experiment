import logoAsset from "@/assets/neurora-logo.png";
import { cn } from "@/lib/utils";
import { useTranslation } from "react-i18next";

type Props = {
  className?: string;
  /** Size in px (height of logo image). */
  size?: number;
  /** Surface the logo sits on. Light surfaces get a navy plate so the gold stays legible. */
  surface?: "dark" | "light";
  showWordmark?: boolean;
};

/**
 * Neurora brand mark.
 * Transparent gold mark; on light surfaces we frame it in a deep navy plate
 * to preserve the gold and keep the brand presentation consistent.
 */
const Logo = ({ className, size = 40, surface = "light", showWordmark = false }: Props) => {
  const { t } = useTranslation();
  const onDark = surface === "dark";
  return (
    <div className={cn("flex items-center gap-3", className)}>
      <div
        className={cn(
          "relative overflow-hidden flex items-center justify-center rounded-md",
          onDark ? "bg-transparent" : "bg-primary ring-1 ring-accent/30 shadow-soft"
        )}
        style={{ height: size, width: size }}
      >
        <img
          src={logoAsset}
          alt={t("logo.alt")}
          width={size}
          height={size}
          className="h-full w-full object-contain"
          draggable={false}
        />
      </div>
      {showWordmark && (
        <span
          className={cn(
            "font-display tracking-tight leading-none",
            onDark ? "text-white" : "text-foreground"
          )}
          style={{ fontSize: size * 0.42 }}
        >
          Neurora
        </span>
      )}
    </div>
  );
};

export default Logo;
