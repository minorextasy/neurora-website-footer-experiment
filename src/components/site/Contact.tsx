import { useEffect, useMemo, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import {
  Mail,
  Phone,
  MapPin,
  Check,
  ArrowRight,
  ArrowLeft,
  ChevronDown,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { countries } from "@/lib/countries";

const years = Array.from({ length: 2026 - 1950 + 1 }, (_, i) => String(2026 - i));
const floors = Array.from({ length: 100 }, (_, i) => String(i + 1));
const unitsCount = Array.from({ length: 500 }, (_, i) => String(i + 1));

const TOTAL_STEPS = 2;
type Step = 1 | 2 | 6;

const getDisplayLanguageCode = (language: string) => {
  const lower = (language || "en").toLowerCase();

  if (lower === "ar-lb" || lower.startsWith("ar")) return "ar-LB";
  if (lower.startsWith("zh")) return "zh-CN";
  if (lower.startsWith("uk")) return "uk";
  if (lower.startsWith("de")) return "de";
  if (lower.startsWith("fr")) return "fr";
  if (lower.startsWith("es")) return "es";
  if (lower.startsWith("ro")) return "ro";
  if (lower.startsWith("el")) return "el";
  if (lower.startsWith("ru")) return "ru";
  if (lower.startsWith("he")) return "he";

  return "en";
};

const Pill = ({
  active,
  onClick,
  children,
}: {
  active: boolean;
  onClick: () => void;
  children: React.ReactNode;
}) => (
  <button
    type="button"
    onClick={onClick}
    className={cn(
      "px-4 py-2 rounded-md border text-sm font-medium transition-base",
      active
        ? "bg-primary text-primary-foreground border-primary"
        : "bg-background border-border hover:border-accent"
    )}
  >
    {children}
  </button>
);

const YesNo = ({
  value,
  onChange,
  yesLabel,
  noLabel,
}: {
  value: string;
  onChange: (v: string) => void;
  yesLabel: string;
  noLabel: string;
}) => (
  <div className="flex gap-2">
    {[
      { val: "Yes", label: yesLabel },
      { val: "No", label: noLabel },
    ].map((o) => (
      <Pill key={o.val} active={value === o.val} onClick={() => onChange(o.val)}>
        {o.label}
      </Pill>
    ))}
  </div>
);

const EuroInput = ({
  value,
  onChange,
  id,
}: {
  value: string;
  onChange: (v: string) => void;
  id: string;
}) => (
  <div className="relative">
    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-foreground font-bold pointer-events-none">
      €
    </span>
    <Input
      id={id}
      inputMode="numeric"
      className="pl-7"
      value={value}
      onChange={(e) => {
        const cleaned = e.target.value.replace(/[^\d.]/g, "");
        onChange(cleaned);
      }}
      placeholder="0"
    />
  </div>
);

type ContactProps = {
  showCoverage?: boolean;
  showSocials?: boolean;
};

const Contact = ({
  showCoverage = true,
  showSocials = false,
}: ContactProps) => {
  const { t, i18n } = useTranslation();
  const { toast } = useToast();
  const [step, setStep] = useState<Step>(1);
  const [submitting, setSubmitting] = useState(false);
  const formCardRef = useRef<HTMLDivElement>(null);
  const hasScrolledOnMount = useRef(false);

  const locations = t("contact.step1.locations", { returnObjects: true }) as string[];
  const unitRanges = t("contact.step1.unitRanges", { returnObjects: true }) as string[];
  const projectTypes = t("contact.step1.projectTypes", { returnObjects: true }) as string[];
  const servicesList = t("contact.step3.services", { returnObjects: true }) as string[];
  const issuesList = t("contact.step4.issues", { returnObjects: true }) as string[];
  const hearAboutList = t("contact.step5.hearAboutOptions", { returnObjects: true }) as string[];

  const [location, setLocation] = useState("");
  const [units, setUnits] = useState("");
  const [projectType, setProjectType] = useState("");

  useEffect(() => {
    if (!hasScrolledOnMount.current) {
      hasScrolledOnMount.current = true;
      return;
    }
    formCardRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  }, [step]);

  const [projectName, setProjectName] = useState("");
  const [yearBuilt, setYearBuilt] = useState("");
  const [numFloors, setNumFloors] = useState("");
  const [numUnits, setNumUnits] = useState("");
  const [hasBank, setHasBank] = useState("");
  const [bankName, setBankName] = useState("");
  const [hasInsurance, setHasInsurance] = useState("");
  const [insuranceName, setInsuranceName] = useState("");
  const [hasElevator, setHasElevator] = useState("");
  const [elevatorCompany, setElevatorCompany] = useState("");
  const [electricity, setElectricity] = useState("");
  const [water, setWater] = useState("");
  const [hasCommittee, setHasCommittee] = useState("");
  const [hasTitleDeeds, setHasTitleDeeds] = useState("");
  const [hasMinutes, setHasMinutes] = useState("");
  const [extraInfo, setExtraInfo] = useState("");
  const [showAdditionalInfo, setShowAdditionalInfo] = useState(false);
  const [step1Attempted, setStep1Attempted] = useState(false);
  const [step2Attempted, setStep2Attempted] = useState(false);
  const [services, setServices] = useState<string[]>([]);
  const [otherService, setOtherService] = useState("");
  const otherSelected = services.includes("__other__");

  const [issues, setIssues] = useState<string[]>([]);
  const [isCommittee, setIsCommittee] = useState("");
  const [isDeveloper, setIsDeveloper] = useState("");

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [countryCode, setCountryCode] = useState("cy");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [city, setCity] = useState("");
  const [area, setArea] = useState("");
  const [streetName, setStreetName] = useState("");
  const [streetNumber, setStreetNumber] = useState("");
  const [postCode, setPostCode] = useState("");
  const [hearAbout, setHearAbout] = useState<string[]>([]);
  const [recommendationName, setRecommendationName] = useState("");

  const contactSchema = useMemo(
    () =>
      z.object({
        firstName: z.string().trim().min(1, t("contact.errors.firstName")).max(100),
        lastName: z.string().trim().min(1, t("contact.errors.lastName")).max(100),
        email: z.string().trim().email(t("contact.errors.email")).max(255),
        phone: z.string().trim().min(3, t("contact.errors.phone")).max(40),
      }),
    [t]
  );

  const selectedCountry = useMemo(
    () => countries.find((c) => c.code === countryCode) ?? countries[0],
    [countryCode]
  );

  const countryDisplayNames = useMemo(() => {
    try {
      return new Intl.DisplayNames([getDisplayLanguageCode(i18n.language)], { type: "region" });
    } catch {
      return null;
    }
  }, [i18n.language]);

  const getCountryName = (country: (typeof countries)[number]) =>
    countryDisplayNames?.of(country.code.toUpperCase()) ?? country.name;

  const mapQuery = useMemo(() => {
    const parts = [streetNumber, streetName, area, city, postCode].filter(Boolean);
    return parts.join(", ");
  }, [streetNumber, streetName, area, city, postCode]);

  const toggleFromList = (
    val: string,
    list: string[],
    setList: (v: string[]) => void
  ) => {
    setList(list.includes(val) ? list.filter((i) => i !== val) : [...list, val]);
  };
const next = () => {
  if (
  step === 1 &&
  (
    !projectName ||
    !location ||
    !units ||
    !projectType ||
    !yearBuilt ||
    !numUnits
  )
) {
  setStep1Attempted(true);

  toast({
    title: t("contact.errors.requiredFields"),
    variant: "destructive"
  });

  return;
}

if (step === 1) {
  setStep1Attempted(false);
}

  setStep((s) => Math.min(TOTAL_STEPS, s + 1) as Step);
  };

  const back = () => setStep((s) => Math.max(1, s - 1) as Step);
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
  e.preventDefault();

  const trimmed = {
    firstName: firstName.trim(),
    lastName: lastName.trim(),
    phone: phone.trim(),
    email: email.trim(),
    city: city.trim(),
    area: area.trim(),
    streetName: streetName.trim(),
    streetNumber: streetNumber.trim(),
    postCode: postCode.trim(),
  };

if (
  !trimmed.firstName ||
  !trimmed.lastName ||
  !trimmed.phone ||
  !trimmed.email ||
  !trimmed.city ||
  !trimmed.area ||
  !trimmed.streetName ||
  !trimmed.streetNumber ||
  !trimmed.postCode
) {
  setStep2Attempted(true);

  toast({
    title: t("contact.errors.requiredFields"),
    variant: "destructive",
  });

  return;
}

setStep2Attempted(false);
  const parsed = contactSchema.safeParse(trimmed);

  if (!parsed.success) {
    toast({
      title: t("contact.errors.review"),
      description: parsed.error.issues[0]?.message,
      variant: "destructive",
    });
    return;
  }

  setSubmitting(true);

  try {
    const payload = {
      language: i18n.language,

      location,
      units,
      propertyType: projectType,

      projectName: projectName.trim(),
      yearBuilt,
      numFloors,
      numUnits,
      hasBank,
      bankName: bankName.trim(),
      hasInsurance,
      insuranceName: insuranceName.trim(),
      hasElevator,
      elevatorCompany: elevatorCompany.trim(),
      electricity,
      water,
      hasCommittee,
      hasTitleDeeds,
      hasMinutes,
      extraInfo: extraInfo.trim(),

      services: otherSelected
        ? [...services.filter((s) => s !== "__other__"), `${t("contact.step3.otherPrefix")}: ${otherService.trim()}`]
        : services,

      issues,
      isCommittee,
      isDeveloper,

      firstName: parsed.data.firstName,
      lastName: parsed.data.lastName,
      countryCode,
      countryDial: selectedCountry.dial,
      phone: parsed.data.phone,
      email: parsed.data.email,
      city: trimmed.city,
      area: trimmed.area,
      streetName: trimmed.streetName,
      streetNumber: trimmed.streetNumber,
      postCode: trimmed.postCode,
      hearAbout,
      recommendationName: recommendationName.trim(),
    };

    const response = await fetch("/api/contact", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      const details = await response.text().catch(() => "");
      throw new Error(details || "Email failed");
    }

    setStep(6);
  } catch (error) {
    console.error("Contact form submission failed", error);
    toast({
      title: t("contact.errors.submissionFailedTitle"),
      description: t("contact.errors.submissionFailedDescription"),
      variant: "destructive",
    });
  } finally {
    setSubmitting(false);
  }
};

  const reset = () => {
    setStep(1);
    setLocation(""); setUnits(""); setProjectType("");
    setProjectName(""); setYearBuilt(""); setNumFloors(""); setNumUnits("");
    setHasBank(""); setBankName(""); setHasInsurance(""); setInsuranceName("");
    setHasElevator(""); setElevatorCompany(""); setElectricity(""); setWater("");
    setHasCommittee(""); setHasTitleDeeds(""); setHasMinutes(""); setExtraInfo("");
    setServices([]); setOtherService("");
    setIssues([]); setIsCommittee(""); setIsDeveloper("");
    setFirstName(""); setLastName(""); setCountryCode("cy"); setPhone(""); setEmail("");
    setCity(""); setArea(""); setStreetName(""); setStreetNumber(""); setPostCode("");
    setHearAbout([]);
    setRecommendationName("");
  };

  const stepLabel = (s: number) => t(`contact.stepLabels.${s}`);
  const yesNoProps = { yesLabel: t("contact.yes"), noLabel: t("contact.no") };
  const requiredFieldClass = "border-red-500 focus-visible:ring-red-500";

  return (
    <section
      id="contact"
      className="relative scroll-mt-24 overflow-hidden bg-background py-20 text-[#111111] sm:py-24 lg:py-32"
    >
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_12%_18%,rgba(212,175,55,0.12)_0%,transparent_34%)]" />
      <div className="absolute inset-0 bg-[linear-gradient(135deg,rgba(255,255,255,0.76)_0%,transparent_44%,rgba(0,0,0,0.025)_100%)]" />
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-black/10 to-transparent" />
      <div className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-black/10 to-transparent" />

      <div className="container-narrow relative z-10">
        <div className="grid lg:grid-cols-5 gap-10 lg:gap-16">
          <div className="lg:col-span-2">
            <span className="text-xs font-bold tracking-[0.25em] uppercase text-accent mb-4 block">
              {t("contact.eyebrow")}
            </span>
            <h2 className="text-4xl font-bold leading-[0.95] tracking-[-0.04em] text-foreground text-balance mb-5 sm:text-5xl lg:text-6xl sm:mb-6">
              {t("contact.title")}
            </h2>
            <p className="text-base sm:text-lg text-muted-foreground leading-relaxed mb-8 sm:mb-10">{t("contact.subtitle")}</p>

            <div className="space-y-5">
              <a
                href="mailto:neuroraproperties@gmail.com"
                aria-label={t("contact.aria.email")}
                className="flex items-start gap-4 group min-h-[44px]"
              >
                <div className="h-11 w-11 rounded-2xl border border-accent/25 bg-accent/10 flex items-center justify-center flex-shrink-0">
                  <Mail className="h-5 w-5 text-accent" />
                </div>
                <div className="min-w-0">
                  <div className="text-xs uppercase tracking-wider text-muted-foreground mb-0.5">
                    {t("contact.emailLabel")}
                  </div>
                  <div className="text-foreground font-bold group-hover:text-accent transition-base break-all">
                    neuroraproperties@gmail.com
                  </div>
                </div>
              </a>
              <a
                href="tel:+35799203600"
                aria-label={t("contact.aria.phone")}
                className="flex items-start gap-4 group min-h-[44px]"
              >
                <div className="h-11 w-11 rounded-2xl border border-accent/25 bg-accent/10 flex items-center justify-center flex-shrink-0">
                  <Phone className="h-5 w-5 text-accent" />
                </div>
                <div>
                  <div className="text-xs uppercase tracking-wider text-muted-foreground mb-0.5">
                    {t("contact.phoneLabel")}
                  </div>
                  <div className="text-foreground font-bold group-hover:text-accent transition-base">
                    +357 99 203 600
                  </div>
                </div>
              </a>
                            {showSocials && (
                <div className="flex items-center gap-3 pt-1">
                  <a
                    href="https://wa.me/35799203600"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={t("contact.aria.whatsapp")}
                    className="flex h-11 w-11 items-center justify-center rounded-2xl border border-accent/25 bg-accent/10 transition-all duration-300 hover:border-accent/45 hover:bg-accent/15"
                  >
                    <img
                      src="https://cdn.simpleicons.org/whatsapp/D4AF37"
                      alt="WhatsApp"
                      className="h-5 w-5 object-contain"
                    />
                  </a>

                  <a
                    href="viber://chat?number=%2B35799203600"
                    aria-label={t("contact.aria.viber")}
                    className="flex h-11 w-11 items-center justify-center rounded-2xl border border-accent/25 bg-accent/10 transition-all duration-300 hover:border-accent/45 hover:bg-accent/15"
                  >
                    <img
                      src="https://cdn.simpleicons.org/viber/D4AF37"
                      alt="Viber"
                      className="h-5 w-5 object-contain"
                    />
                  </a>

                  <a
                    href="https://www.facebook.com/neuroraproperties"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={t("contact.aria.facebook")}
                    className="flex h-11 w-11 items-center justify-center rounded-2xl border border-accent/25 bg-accent/10 transition-all duration-300 hover:border-accent/45 hover:bg-accent/15"
                  >
                    <img
                      src="https://cdn.simpleicons.org/facebook/D4AF37"
                      alt="Facebook"
                      className="h-5 w-5 object-contain"
                    />
                  </a>

                  <a
                    href="https://www.instagram.com/neuroraproperties/"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={t("contact.aria.instagram")}
                    className="flex h-11 w-11 items-center justify-center rounded-2xl border border-accent/25 bg-accent/10 transition-all duration-300 hover:border-accent/45 hover:bg-accent/15"
                  >
                    <img
                      src="https://cdn.simpleicons.org/instagram/D4AF37"
                      alt="Instagram"
                      className="h-5 w-5 object-contain"
                    />
                  </a>
                </div>
              )}

                            {showCoverage && (
                <a
                  href="https://www.google.com/maps/search/?api=1&query=Cyprus"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={t("contact.aria.coverageMap")}
                  className="flex items-start gap-4 group min-h-[44px]"
                >
                  <div className="h-11 w-11 rounded-2xl border border-accent/25 bg-accent/10 flex items-center justify-center flex-shrink-0 transition-base group-hover:border-accent/45 group-hover:bg-accent/15">
                    <MapPin className="h-5 w-5 text-accent" />
                  </div>
                  <div>
                    <div className="text-xs uppercase tracking-wider text-muted-foreground mb-0.5">
                      {t("contact.coverageLabel")}
                    </div>
                    <div className="text-foreground font-bold group-hover:text-accent transition-base">
                      {t("contact.coverageValue")}
                    </div>
                  </div>
                </a>
              )}
            
            </div>
          </div>

          <div ref={formCardRef} className="relative overflow-hidden rounded-[2rem] border border-black/10 bg-white/90 p-5 shadow-[0_24px_80px_rgba(0,0,0,0.10)] backdrop-blur-sm sm:p-8 lg:col-span-3 lg:p-10">
            <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-accent/65 to-transparent" />
            <div className="absolute -right-20 -top-20 h-44 w-44 rounded-full bg-accent/10 blur-3xl" />
            <div className="relative z-10">

            {step <= TOTAL_STEPS && (
              <div className="mb-8">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-xs font-bold tracking-widest uppercase text-muted-foreground">
                    {t("contact.stepOf", { step, total: TOTAL_STEPS })}
                  </span>
                  <span className="text-xs font-bold text-accent">{stepLabel(step)}</span>
                </div>
                <div className="h-1 w-full bg-border rounded-full overflow-hidden">
                  <div
                    className="h-full bg-accent transition-all duration-300"
                    style={{ width: `${(step / TOTAL_STEPS) * 100}%` }}
                  />
                </div>
              </div>
            )}

            {step === 1 && (
  <div className="space-y-8 animate-fade-up">
    <div className="space-y-2">
      <Label htmlFor="projectName" className="font-bold">{t("contact.step2.projectName")}</Label>
      <Input
  id="projectName"
  value={projectName}
  onChange={(e) => setProjectName(e.target.value)}
  maxLength={150}
  className={
    step1Attempted && !projectName
      ? requiredFieldClass
      : ""
  }
/>
    </div>
    <div>
      <Label className="mb-3 block font-bold">{t("contact.step1.location")}</Label>
      <div
  className={cn(
    "flex flex-wrap gap-2 rounded-lg border p-2 transition-base",
    step1Attempted && !location ? "border-red-500" : "border-transparent"
  )}
>
        {locations.map((l) => (
          <Pill key={l} active={location === l} onClick={() => setLocation(l)}>
            {l}
          </Pill>
        ))}
      </div>
    </div>

    <div>
      <Label className="mb-3 block font-bold">{t("contact.step1.units")}</Label>
      <div
  className={cn(
    "flex flex-wrap gap-2 rounded-lg border p-2 transition-base",
    step1Attempted && !units ? "border-red-500" : "border-transparent"
  )}
>
        {unitRanges.map((u) => (
          <Pill key={u} active={units === u} onClick={() => setUnits(u)}>
            {u}
          </Pill>
        ))}
      </div>
    </div>

    <div>
      <Label className="mb-3 block font-bold">{t("contact.step1.projectType")}</Label>
      <div
  className={cn(
    "grid grid-cols-2 sm:grid-cols-3 gap-2 rounded-lg border p-2 transition-base",
    step1Attempted && !projectType ? "border-red-500" : "border-transparent"
  )}
>
        {projectTypes.map((tp) => (
          <button
            key={tp}
            type="button"
            onClick={() => setProjectType(tp)}
            className={cn(
              "px-4 py-3 rounded-md border text-sm font-medium transition-base text-center",
              projectType === tp
                ? "bg-primary text-primary-foreground border-primary"
                : "bg-background border-border hover:border-accent"
            )}
          >
            {tp}
          </button>
        ))}
      </div>
    </div>

    

    <div className="space-y-2">
  <Label className="font-bold">{t("contact.step2.year")}</Label>
  <Select value={yearBuilt} onValueChange={setYearBuilt}>
    <SelectTrigger className={step1Attempted && !yearBuilt ? requiredFieldClass : ""}>
  
      <SelectValue placeholder={t("contact.step2.selectYear")} />
    </SelectTrigger>
    <SelectContent className="max-h-72">
      {years.map((y) => (
        <SelectItem key={y} value={y}>
          {y}
        </SelectItem>
      ))}
    </SelectContent>
  </Select>
</div>

<div className="space-y-2">
  <Label className="font-bold">{t("contact.step2.units")}</Label>
  <Select value={numUnits} onValueChange={setNumUnits}>
    <SelectTrigger className={step1Attempted && !numUnits ? requiredFieldClass : ""}>
      <SelectValue placeholder={t("contact.step2.unitsPlaceholder")} />
    </SelectTrigger>
    <SelectContent className="max-h-72">
      {unitsCount.map((n) => (
        <SelectItem key={n} value={n}>
          {n}
        </SelectItem>
      ))}
    </SelectContent>
  </Select>
</div>
<button
  type="button"
  onClick={() => setShowAdditionalInfo((v) => !v)}
  className="w-full group border-y border-border py-6 text-left transition-base hover:border-accent"
>
  <div className="flex items-center justify-between gap-6">
    <div>
    <div className="text-xs font-bold uppercase tracking-[0.3em] text-accent mb-2">
  {t("contact.step1.optionalInfo.eyebrow")}
</div>

<div className="text-lg font-bold text-foreground">
  {t("contact.step1.optionalInfo.title")}
</div>

<div className="text-sm text-muted-foreground mt-1">
  {t("contact.step1.optionalInfo.subtitle")}
</div>
    </div>

    <ChevronDown
      className={cn(
        "h-5 w-5 text-accent transition-transform duration-300 flex-shrink-0",
        showAdditionalInfo && "rotate-180"
      )}
    />
  </div>
</button>

{showAdditionalInfo && (
  <div className="space-y-8">
<div className="space-y-2">
  <Label className="font-bold">{t("contact.step2.floors")}</Label>
  <Select value={numFloors} onValueChange={setNumFloors}>
    <SelectTrigger>
      <SelectValue placeholder={t("contact.step2.floorsPlaceholder")} />
    </SelectTrigger>
    <SelectContent className="max-h-72">
      {floors.map((n) => (
        <SelectItem key={n} value={n}>
          {n}
        </SelectItem>
      ))}
    </SelectContent>
  </Select>

      
    </div>

    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 items-end">
      <div>
        <Label className="mb-2 block font-bold">{t("contact.step2.hasBank")}</Label>
        <YesNo value={hasBank} onChange={setHasBank} {...yesNoProps} />
      </div>
      <div className="space-y-2">
        <Label className="font-bold">{t("contact.step2.bankName")}</Label>
        <Input
          value={bankName}
          onChange={(e) => setBankName(e.target.value)}
          disabled={hasBank !== "Yes"}
          placeholder={hasBank === "Yes" ? "" : t("contact.step2.selectYesToEnable")}
        />
      </div>
    </div>

    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 items-end">
      <div>
        <Label className="mb-2 block font-bold">{t("contact.step2.hasInsurance")}</Label>
        <YesNo value={hasInsurance} onChange={setHasInsurance} {...yesNoProps} />
      </div>
      <div className="space-y-2">
        <Label className="font-bold">{t("contact.step2.insuranceName")}</Label>
        <Input
          value={insuranceName}
          onChange={(e) => setInsuranceName(e.target.value)}
          disabled={hasInsurance !== "Yes"}
          placeholder={hasInsurance === "Yes" ? "" : t("contact.step2.selectYesToEnable")}
        />
      </div>
    </div>

    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 items-end">
      <div>
        <Label className="mb-2 block font-bold">{t("contact.step2.hasElevator")}</Label>
        <YesNo value={hasElevator} onChange={setHasElevator} {...yesNoProps} />
      </div>
      <div className="space-y-2">
        <Label className="font-bold">{t("contact.step2.elevatorCompany")}</Label>
        <Input
          value={elevatorCompany}
          onChange={(e) => setElevatorCompany(e.target.value)}
          disabled={hasElevator !== "Yes"}
          placeholder={hasElevator === "Yes" ? "" : t("contact.step2.selectYesToEnable")}
        />
      </div>
    </div>

    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
      <div className="space-y-2">
        <Label htmlFor="electricity" className="font-bold">{t("contact.step2.electricity")}</Label>
        <EuroInput id="electricity" value={electricity} onChange={setElectricity} />
      </div>
      <div className="space-y-2">
        <Label htmlFor="water" className="font-bold">{t("contact.step2.water")}</Label>
        <EuroInput id="water" value={water} onChange={setWater} />
      </div>
    </div>

    <div>
      <Label className="mb-2 block font-bold">{t("contact.step2.hasCommittee")}</Label>
      <YesNo value={hasCommittee} onChange={setHasCommittee} {...yesNoProps} />
    </div>

    <div>
      <Label className="mb-2 block font-bold">{t("contact.step2.hasTitleDeeds")}</Label>
      <YesNo value={hasTitleDeeds} onChange={setHasTitleDeeds} {...yesNoProps} />
    </div>

    <div>
      <Label className="mb-2 block font-bold">{t("contact.step2.hasMinutes")}</Label>
      <YesNo value={hasMinutes} onChange={setHasMinutes} {...yesNoProps} />
    </div>

    <div className="space-y-2">
      <div>
                  <Label className="mb-3 block font-bold">{t("contact.step4.isCommittee")}</Label>
                  <YesNo value={isCommittee} onChange={setIsCommittee} {...yesNoProps} />
                </div>
      <div>
                  <Label className="mb-3 block font-bold">{t("contact.step4.isDeveloper")}</Label>
                  <YesNo value={isDeveloper} onChange={setIsDeveloper} {...yesNoProps} />
                </div>



      <Label htmlFor="extra" className="font-bold">{t("contact.step2.extra")}</Label>
      <Textarea
        id="extra"
        value={extraInfo}
        onChange={(e) => setExtraInfo(e.target.value.slice(0, 5000))}
        maxLength={5000}
        rows={5}
      />
      <div className="text-xs text-muted-foreground text-right">{extraInfo.length}/5000</div>
         </div>
    </div>
  )}
</div>
)}

            {step === 2 && (
              <form onSubmit={handleSubmit} className="space-y-5 animate-fade-up">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="firstName" className="font-bold">{t("contact.step5.firstName")}</Label>
                    <Input
                      id="firstName"
                      value={firstName}
                      onChange={(e) => setFirstName(e.target.value)}
                      maxLength={100}
                      className={step2Attempted && !firstName ? requiredFieldClass : ""}
/>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="lastName" className="font-bold">{t("contact.step5.lastName")}</Label>
                    <Input
                      id="lastName"
                      value={lastName}
                      onChange={(e) => setLastName(e.target.value)}
                      maxLength={100}
                      className={step2Attempted && !lastName ? requiredFieldClass : ""}
/>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="phone" className="font-bold">{t("contact.step5.phone")}</Label>
                  <div className="grid grid-cols-[minmax(0,130px)_1fr] sm:grid-cols-[minmax(0,200px)_1fr] gap-2">
                    <Select value={countryCode} onValueChange={setCountryCode}>
                      <SelectTrigger>
                        <SelectValue>
                          <span className="flex items-center gap-2">
                            <img
                              src={`https://flagcdn.com/w20/${selectedCountry.code}.png`}
                              srcSet={`https://flagcdn.com/w40/${selectedCountry.code}.png 2x`}
                              alt=""
                              width={20}
                              height={15}
                              loading="lazy"
                            />
                            <span className="font-medium">{selectedCountry.dial}</span>
                          </span>
                        </SelectValue>
                      </SelectTrigger>
                      <SelectContent className="max-h-72">
                        {countries.map((c) => (
                          <SelectItem key={c.code} value={c.code}>
                            <span className="flex items-center gap-2">
                              <img
                                src={`https://flagcdn.com/w20/${c.code}.png`}
                                srcSet={`https://flagcdn.com/w40/${c.code}.png 2x`}
                                alt=""
                                width={20}
                                height={15}
                                loading="lazy"
                              />
                              <span>{getCountryName(c)}</span>
                              <span className="text-muted-foreground">{c.dial}</span>
                            </span>
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <Input
                      id="phone"
                      type="tel"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      maxLength={40}
                      className={step2Attempted && !phone ? requiredFieldClass : ""}
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email" className="font-bold">{t("contact.step5.email")}</Label>
                  <Input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    maxLength={255}
                    className={step2Attempted && !email ? requiredFieldClass : ""}
                  />
                </div>

                <div className="pt-2">
                  <Label className="font-bold mb-3 block">{t("contact.step5.address")}</Label>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <Input
                        placeholder={t("contact.step5.city")}
                        value={city}
                        onChange={(e) => setCity(e.target.value)}
                        className={step2Attempted && !city ? requiredFieldClass : ""}
                      />
                      <Input
                        placeholder={t("contact.step5.area")}
                        value={area}
                        onChange={(e) => setArea(e.target.value)}
                        className={step2Attempted && !area ? requiredFieldClass : ""}
                      />
                      <Input
                        placeholder={t("contact.step5.streetName")}
                        value={streetName}
                        onChange={(e) => setStreetName(e.target.value)}
                        className={step2Attempted && !streetName ? requiredFieldClass : ""}
                      />
                      <Input
                        placeholder={t("contact.step5.streetNumber")}
                        value={streetNumber}
                        onChange={(e) => setStreetNumber(e.target.value)}
                        className={step2Attempted && !streetNumber ? requiredFieldClass : ""}
                      />
                      <Input
                        placeholder={t("contact.step5.postCode")}
                        value={postCode}
                        onChange={(e) => setPostCode(e.target.value)}
                        className={cn(
                          "sm:col-span-2",
                          step2Attempted && !postCode ? requiredFieldClass : ""
                        )}
                      />
                  </div>

                  <div className="mt-4 rounded-lg overflow-hidden border border-border bg-muted aspect-[16/9]">
                    {mapQuery ? (
                      <iframe
                        title={t("contact.step5.mapTitle")}
                        src={`https://www.google.com/maps?q=${encodeURIComponent(mapQuery)}&output=embed`}
                        className="w-full h-full"
                        loading="lazy"
                        referrerPolicy="no-referrer-when-downgrade"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-sm text-muted-foreground">
                        {t("contact.step5.mapPlaceholder")}
                      </div>
                    )}
                  </div>
                </div>

                <div className="pt-2">
                  <Label className="font-bold mb-3 block">{t("contact.step5.hearAbout")}</Label>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {hearAboutList.map((h) => (
                      <button
                        key={h}
                        type="button"
                        onClick={() => toggleFromList(h, hearAbout, setHearAbout)}
                        className={cn(
                          "flex items-center gap-3 p-3 rounded-md border text-left transition-base",
                          hearAbout.includes(h)
                            ? "border-accent bg-accent-soft"
                            : "border-border hover:border-accent/50"
                        )}
                      >
                        <span
                          className={cn(
                            "h-5 w-5 rounded border-2 flex items-center justify-center flex-shrink-0",
                            hearAbout.includes(h) ? "bg-accent border-accent" : "border-border"
                          )}
                        >
                          {hearAbout.includes(h) && (
                            <Check className="h-3 w-3 text-accent-foreground" strokeWidth={4} />
                          )}
                        </span>
                        <span className="text-sm font-medium text-foreground">{h}</span>
                      </button>
                    ))}
                  </div>

                  {hearAbout.includes(hearAboutList[3] ?? "") && (
                    <div className="mt-3 space-y-2">
                      <Label htmlFor="recommendationName" className="font-bold">
                        {t("contact.step5.recommendationName", {
                          defaultValue: "Name of the person or company that recommended us (optional)",
                        })}
                      </Label>
                      <Input
                        id="recommendationName"
                        value={recommendationName}
                        onChange={(e) => setRecommendationName(e.target.value.slice(0, 150))}
                        maxLength={150}
                      />
                    </div>
                  )}
                </div>

                <Button type="submit" variant="premium" size="lg" className="w-full" disabled={submitting}>
                  {submitting ? t("contact.step5.submitting") : t("contact.step5.submit")}
                </Button>
              </form>
            )}

            {step === 6 && (
              <div className="text-center py-8 animate-fade-up">
                <div className="h-16 w-16 rounded-full bg-accent flex items-center justify-center mx-auto mb-6">
                  <Check className="h-8 w-8 text-accent-foreground" strokeWidth={3} />
                </div>
                <h3 className="text-2xl font-bold text-foreground mb-3">{t("contact.step6.title")}</h3>
                <p className="text-muted-foreground max-w-md mx-auto mb-8">{t("contact.step6.body")}</p>
                <Button variant="outline" onClick={reset}>{t("contact.step6.again")}</Button>
              </div>
            )}

            {step === 1 && (
              <div className="flex items-center justify-between mt-8 pt-6 border-t border-border">
                <Button variant="ghost" onClick={back} disabled={step === 1}>
                  <ArrowLeft className="mr-1 h-4 w-4" /> {t("contact.back")}
                </Button>
                <Button variant="premium" onClick={next}>
                  {t("contact.continue")} <ArrowRight className="ml-1 h-4 w-4" />
                </Button>
              </div>
            )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
