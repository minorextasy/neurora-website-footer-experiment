import { PDFDocument, StandardFonts, rgb } from "pdf-lib";
import fontkit from "@pdf-lib/fontkit";
type Env = {
  RESEND_API_KEY: string;
  CONTACT_EMAIL: string;
};

const LOGO_URL = "https://neuroraproperties.com/neurora-logo.png";

const escapeHtml = (value: unknown) =>
  String(value ?? "")
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");

const hasValue = (value: unknown) => {
  if (Array.isArray(value)) return value.some((item) => hasValue(item));
  if (value === null || value === undefined) return false;
  return String(value).trim().length > 0;
};

const cleanValue = (value: unknown, fallback = "") =>
  hasValue(value) ? String(value).trim() : fallback;

const formatValue = (value: unknown) => escapeHtml(cleanValue(value));

const PDF_TEXT_REPLACEMENTS: Record<string, string> = {
  "€": "EUR",
  "£": "GBP",
  "—": "-",
  "–": "-",
  "−": "-",
  "“": '"',
  "”": '"',
  "„": '"',
  "’": "'",
  "‘": "'",
  "‚": "'",
  "…": "...",
  "•": "-",
  "✓": "-",
  "№": "No.",
  "²": "2",
  "³": "3",
};

const toPdfText = (value: unknown, fallback = "") => {
  const text = cleanValue(value, fallback);

  if (!text) return fallback;

  return text
    .split("")
    .map((character) => {
      if (PDF_TEXT_REPLACEMENTS[character]) return PDF_TEXT_REPLACEMENTS[character];

      if (character === "\n" || character === "\r" || character === "\t") return " ";

      return character;
    })
    .join("")
    .replace(/\s+/g, " ")
    .trim();
};


const row = (label: string, value: unknown) => {
  if (!hasValue(value)) return "";

  return `
<tr>
  <td style="padding:12px 0;color:#777;font-size:13px;width:38%;border-bottom:1px solid #eee;">${escapeHtml(label)}</td>
  <td style="padding:12px 0;color:#111;font-size:14px;font-weight:700;border-bottom:1px solid #eee;word-break:break-word;overflow-wrap:anywhere;">${formatValue(value)}</td>
</tr>
`;
};

const section = (title: string, rows: string) => {
  if (!rows.trim()) return "";

  return `
<div style="margin-top:30px;">
  <h2 style="font-size:13px;letter-spacing:2.4px;text-transform:uppercase;color:#b88932;margin:0 0 12px;font-weight:800;">
    ${escapeHtml(title)}
  </h2>
  <table width="100%" cellspacing="0" cellpadding="0" style="border-collapse:collapse;">
    ${rows}
  </table>
</div>
`;
};

const listItems = (items: string[]) =>
  items
    .filter((item) => hasValue(item))
    .map(
      (item) => `
        <div style="padding:9px 0;font-size:14px;color:#111;font-weight:600;">
          <span style="color:#b88932;font-weight:900;">✓</span>
          ${escapeHtml(item)}
        </div>`
    )
    .join("");
const createPdfAttachment = async (data: any) => {
  const pdfDoc = await PDFDocument.create();

  let logoImage: any = null;

  try {
    const logoResponse = await fetch(LOGO_URL);

    if (logoResponse.ok) {
      const logoBytes = await logoResponse.arrayBuffer();
      logoImage = await pdfDoc.embedPng(logoBytes);
    }
  } catch {
    logoImage = null;
  }

  pdfDoc.registerFontkit(fontkit);

  const fontResponse = await fetch("https://neuroraproperties.com/NotoSans-Regular.ttf");
  const boldFontResponse = await fetch("https://neuroraproperties.com/NotoSans-Bold.ttf");

  if (!fontResponse.ok || !boldFontResponse.ok) {
    throw new Error("Unable to load the Unicode PDF fonts.");
  }

  const font = await pdfDoc.embedFont(await fontResponse.arrayBuffer());
  const boldFont = await pdfDoc.embedFont(await boldFontResponse.arrayBuffer());

  const pageSize: [number, number] = [595, 842];
  const margin = 50;
  const bottomMargin = 60;
  const contentWidth = pageSize[0] - margin * 2;

  let page = pdfDoc.addPage(pageSize);
  let y = page.getHeight() - 60;

  const safe = (value: unknown) => toPdfText(value);

  const addPage = () => {
    page = pdfDoc.addPage(pageSize);
    y = page.getHeight() - 60;
  };

  const ensureSpace = (space = 40) => {
    if (y - space < bottomMargin) {
      addPage();
    }
  };

  const drawHeader = () => {
    page.drawRectangle({
      x: 0,
      y: page.getHeight() - 130,
      width: page.getWidth(),
      height: 130,
      color: rgb(0, 0, 0),
    });
const headerTextX = logoImage ? 160 : 50;

if (logoImage) {
  const logoDims = logoImage.scale(0.095);

  page.drawImage(logoImage, {
    x: 50,
    y: page.getHeight() - 110,
    width: logoDims.width,
    height: logoDims.height,
  });
}

    page.drawText("NEURORA PROPERTY MANAGEMENT LTD", {
      x: headerTextX,
      y: page.getHeight() - 55,
      size: 10,
      font: boldFont,
      color: rgb(0.72, 0.54, 0.25),
    });

    page.drawText("New Property Enquiry", {
      x: headerTextX,
      y: page.getHeight() - 88,
      size: 24,
      font: boldFont,
      color: rgb(1, 1, 1),
    });

    page.drawText("Generated from the Neurora website contact form", {
      x: headerTextX,
      y: page.getHeight() - 112,
      size: 10,
      font,
      color: rgb(0.8, 0.8, 0.8),
    });

    y = page.getHeight() - 165;
  };

  const splitText = (text: string, maxChars = 78) => {
    const words = safe(text).split(" ");
    const lines: string[] = [];
    let current = "";

    for (const word of words) {
      const next = current ? `${current} ${word}` : word;
      if (next.length > maxChars) {
        if (current) lines.push(current);
        current = word;
      } else {
        current = next;
      }
    }

    if (current) lines.push(current);
    return lines;
  };

  const drawSection = (title: string) => {
    ensureSpace(60);

    y -= 12;

    page.drawText(toPdfText(title.toUpperCase()), {
      x: margin,
      y,
      size: 11,
      font: boldFont,
      color: rgb(0.72, 0.54, 0.25),
    });

    y -= 16;

    page.drawLine({
      start: { x: margin, y },
      end: { x: page.getWidth() - margin, y },
      thickness: 0.5,
      color: rgb(0.86, 0.86, 0.86),
    });

    y -= 18;
  };

  const drawRow = (label: string, value: unknown) => {
    if (!hasValue(value)) return;

    const valueLines = splitText(safe(value), 48);
    const rowHeight = Math.max(20, valueLines.length * 14 + 4);

    ensureSpace(rowHeight);

    page.drawText(toPdfText(label), {
      x: margin,
      y,
      size: 9,
      font,
      color: rgb(0.42, 0.42, 0.42),
    });

    valueLines.forEach((line, index) => {
      page.drawText(line, {
        x: 220,
        y: y - index * 14,
        size: 10,
        font: boldFont,
        color: rgb(0.05, 0.05, 0.05),
        maxWidth: 320,
      });
    });

    y -= rowHeight;
  };

  const drawWrappedText = (text: unknown) => {
    if (!hasValue(text)) return;

    const lines = splitText(safe(text), 90);

    for (const line of lines) {
      ensureSpace(18);

      page.drawText(line, {
        x: margin,
        y,
        size: 10,
        font: boldFont,
        color: rgb(0.05, 0.05, 0.05),
        maxWidth: contentWidth,
      });

      y -= 16;
    }

    y -= 4;
  };

  const drawFieldSection = (title: string, rows: Array<[string, unknown]>) => {
    const filledRows = rows.filter(([, value]) => hasValue(value));
    if (!filledRows.length) return;

    drawSection(title);
    filledRows.forEach(([label, value]) => drawRow(label, value));
  };

  const drawTextSection = (title: string, text: unknown) => {
    if (!hasValue(text)) return;

    drawSection(title);
    drawWrappedText(text);
  };

  drawHeader();

  const submittedAt = new Date().toLocaleString("en-GB", {
    timeZone: "Asia/Nicosia",
    dateStyle: "medium",
    timeStyle: "short",
  });

  const services = Array.isArray(data.services)
    ? data.services.filter((item: unknown) => hasValue(item)).join(", ")
    : "";
  const issues = Array.isArray(data.issues)
    ? data.issues.filter((item: unknown) => hasValue(item)).join(", ")
    : "";
  const hearAbout = Array.isArray(data.hearAbout)
    ? data.hearAbout.filter((item: unknown) => hasValue(item)).join(", ")
    : "";
  const recommendationName = cleanValue(data.recommendationName);
  const fullName = `${data.firstName || ""} ${data.lastName || ""}`.trim();

  const addressCoreParts = [
    data.streetNumber,
    data.streetName,
    data.area,
    data.city,
    data.postCode,
  ].filter((item) => hasValue(item));
  const addressParts = addressCoreParts.length ? [...addressCoreParts, "Cyprus"] : [];

  drawSection("Submission Summary");
drawRow("Reference Number", data.leadId || "Not Assigned");

y -= 10;

const panelX = 50;
const panelY = y - 112;
const panelWidth = page.getWidth() - 100;
const panelHeight = 102;
const columnWidth = panelWidth / 3;

page.drawRectangle({
  x: panelX,
  y: panelY,
  width: panelWidth,
  height: panelHeight,
  borderColor: rgb(0.72, 0.54, 0.25),
  borderWidth: 0.8,
});

page.drawLine({
  start: { x: panelX + columnWidth, y: panelY + 18 },
  end: { x: panelX + columnWidth, y: panelY + panelHeight - 18 },
  thickness: 0.5,
  color: rgb(0.72, 0.54, 0.25),
});

page.drawLine({
  start: { x: panelX + columnWidth * 2, y: panelY + 18 },
  end: { x: panelX + columnWidth * 2, y: panelY + panelHeight - 18 },
  thickness: 0.5,
  color: rgb(0.72, 0.54, 0.25),
});

const drawPanelItem = (label: string, value: string, x: number, valueSize = 14) => {
  page.drawText(toPdfText(label.toUpperCase()), {
    x,
    y: panelY + 62,
    size: 9,
    font: boldFont,
    color: rgb(0.72, 0.54, 0.25),
  });

  page.drawText(toPdfText(value), {
    x,
    y: panelY + 36,
    size: valueSize,
    font: boldFont,
    color: rgb(0.05, 0.05, 0.05),
    maxWidth: columnWidth - 28,
  });
};

drawPanelItem("Property", cleanValue(data.projectName, cleanValue(data.propertyType, "Property enquiry")), panelX + 18, 15);
drawPanelItem("Location", cleanValue(data.city || data.location, "Cyprus"), panelX + columnWidth + 18, 14);
drawPanelItem("Submitted", `${submittedAt} Cyprus Time`, panelX + columnWidth * 2 + 18, 10);

y = panelY - 30;
  drawFieldSection("Contact Details", [
    ["Name", fullName],
    ["Email", data.email],
    ["Phone", `${data.countryDial || ""} ${data.phone || ""}`],
    ["How they heard about us", hearAbout],
    ["Recommended by", recommendationName],
  ]);

  drawFieldSection("Property Overview", [
    ["Property Type", data.propertyType],
    ["Location", data.location],
    ["Unit Range", data.units],
    ["Property Name", data.projectName],
    ["Year of Construction", data.yearBuilt],
    ["Number of Floors", data.numFloors],
    ["Number of Units", data.numUnits],
  ]);

  drawFieldSection("Property Status", [
    ["Bank Account", data.hasBank],
    ["Bank Name", data.bankName],
    ["Insurance", data.hasInsurance],
    ["Insurance Company", data.insuranceName],
    ["Elevator", data.hasElevator],
    ["Service Company", data.elevatorCompany],
    ["Estimated Electricity Costs", hasValue(data.electricity) ? `€${data.electricity}` : ""],
    ["Estimated Water Costs", hasValue(data.water) ? `€${data.water}` : ""],
    ["Management Committee", data.hasCommittee],
    ["Title Deeds", data.hasTitleDeeds],
    ["General Assembly Minutes", data.hasMinutes],
  ]);

  drawTextSection("Services Requested", services);
  drawTextSection("Current Issues", issues);

  drawFieldSection("Property Address", [
    ["Address", addressParts.join(", ")],
    ["City", data.city],
    ["Area", data.area],
    ["Street Name", data.streetName],
    ["Street Number", data.streetNumber],
    ["Post Code", data.postCode],
  ]);

  drawTextSection("Additional Information", data.extraInfo);
const pages = pdfDoc.getPages();

pages.forEach((page, index) => {
  page.drawText(`Page ${index + 1} of ${pages.length}`, {
    x: page.getWidth() - 100,
    y: 20,
    size: 9,
    font,
    color: rgb(0.45, 0.45, 0.45),
  });
});
  const pdfBytes = await pdfDoc.save();
  const binary = Array.from(pdfBytes as Uint8Array)
    .map((byte) => String.fromCharCode(byte))
    .join("");

  return btoa(binary);
};

export async function onRequestPost(context: any) {
  const env = context.env as Env;

  try {
    const data = await context.request.json();

    if (!env.RESEND_API_KEY || !env.CONTACT_EMAIL) {
      return new Response(JSON.stringify({ error: "Email service is not configured" }), {
        status: 500,
        headers: { "Content-Type": "application/json" },
      });
    }

    const replyToEmail = cleanValue(data.email).replace(/\s+/g, "");

    const services = Array.isArray(data.services)
      ? data.services.filter((item: unknown) => hasValue(item))
      : [];
    const issues = Array.isArray(data.issues)
      ? data.issues.filter((item: unknown) => hasValue(item))
      : [];
    const hearAbout = Array.isArray(data.hearAbout)
      ? data.hearAbout.filter((item: unknown) => hasValue(item)).join(", ")
      : "";
    const recommendationName = cleanValue(data.recommendationName);

    const fullName = `${data.firstName || ""} ${data.lastName || ""}`.trim();
    const submittedAt = new Date().toLocaleString("en-GB", {
      timeZone: "Asia/Nicosia",
      dateStyle: "medium",
      timeStyle: "short",
    });

    const addressCoreParts = [
      data.streetNumber,
      data.streetName,
      data.area,
      data.city,
      data.postCode,
    ].filter((item) => hasValue(item));
    const addressParts = addressCoreParts.length ? [...addressCoreParts, "Cyprus"] : [];

    const fullAddress = addressParts.join(", ");
    const mapsUrl = fullAddress
      ? `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(fullAddress)}`
      : "";

    const now = new Date();

const cyprusParts = new Intl.DateTimeFormat("en-GB", {
  timeZone: "Asia/Nicosia",
  day: "2-digit",
  month: "2-digit",
  year: "numeric",
  hour: "2-digit",
  minute: "2-digit",
  second: "2-digit",
  hour12: false,
}).formatToParts(now);

const getPart = (type: string) =>
  cyprusParts.find((part) => part.type === type)?.value || "00";

const leadId = `NPM-${getPart("day")}${getPart("month")}${getPart("year")}-${getPart("hour")}${getPart("minute")}${getPart("second")}`;


const subject = `${leadId} - New Enquiry - ${data.projectName || "Property"} - ${data.city || "Cyprus"}`;
    const html = `
<div style="margin:0;padding:0;background:#ffffff;font-family:Arial,sans-serif;">
  <div style="width:100%;max-width:640px;margin:0 auto;padding:16px 10px;box-sizing:border-box;">
    <div style="background:#000;border-radius:22px 22px 0 0;padding:30px 18px;text-align:center;">
      <img src="${LOGO_URL}" alt="Neurora Property Management Ltd" style="max-width:150px;height:auto;margin:0 auto 18px;display:block;" />
      <div style="height:1px;background:#b88932;width:72px;margin:0 auto 18px;"></div>
      <div style="font-size:12px;letter-spacing:3px;text-transform:uppercase;color:#b88932;font-weight:800;">
        Neurora Property Management Ltd
      </div>
      <h1 style="margin:12px 0 0;font-size:30px;line-height:1.2;color:#fff;">
        New Property Enquiry
      </h1>
      <p style="margin:12px 0 0;color:#cfcfcf;font-size:14px;">
        Submitted through the Neurora website.
      </p>
    </div>

    <div style="background:#fff;border-radius:0 0 22px 22px;padding:26px 18px;border:1px solid #eee;box-sizing:border-box;">
      <div style="background:#ffffff;border:1px solid #b88932;border-radius:16px;padding:18px 20px;margin-bottom:28px;">
        <div style="font-size:12px;text-transform:uppercase;letter-spacing:2px;color:#b88932;font-weight:800;margin-bottom:8px;">
          Submission Summary
        </div>

        <div style="font-size:13px;color:#555;margin-bottom:8px;">
          Reference Number
        </div>
        <div style="font-size:18px;color:#111;font-weight:800;margin-bottom:22px;word-break:break-word;overflow-wrap:anywhere;">
          ${leadId}
        </div>

        <table width="100%" cellspacing="0" cellpadding="0" style="border-collapse:collapse;border-top:1px solid #b88932;border-bottom:1px solid #b88932;table-layout:fixed;">
          <tr>
            <td style="padding:14px 0;border-bottom:1px solid #eadfca;vertical-align:top;width:34%;font-size:11px;text-transform:uppercase;letter-spacing:1.8px;color:#b88932;font-weight:800;line-height:1.4;">
              Property
            </td>
            <td style="padding:14px 0 14px 14px;border-bottom:1px solid #eadfca;vertical-align:top;font-size:18px;color:#111;font-weight:800;line-height:1.35;word-break:break-word;overflow-wrap:anywhere;">
              ${formatValue(data.projectName || data.propertyType || "Property enquiry")}
            </td>
          </tr>

          <tr>
            <td style="padding:14px 0;border-bottom:1px solid #eadfca;vertical-align:top;width:34%;font-size:11px;text-transform:uppercase;letter-spacing:1.8px;color:#b88932;font-weight:800;line-height:1.4;">
              Location
            </td>
            <td style="padding:14px 0 14px 14px;border-bottom:1px solid #eadfca;vertical-align:top;font-size:18px;color:#111;font-weight:800;line-height:1.35;word-break:break-word;overflow-wrap:anywhere;">
              ${formatValue(data.city || data.location || "Cyprus")}
            </td>
          </tr>

          <tr>
            <td style="padding:14px 0;vertical-align:top;width:34%;font-size:11px;text-transform:uppercase;letter-spacing:1.8px;color:#b88932;font-weight:800;line-height:1.4;">
              Submitted
            </td>
            <td style="padding:14px 0 14px 14px;vertical-align:top;font-size:14px;color:#111;font-weight:800;line-height:1.45;word-break:break-word;overflow-wrap:anywhere;">
              ${escapeHtml(submittedAt)} Cyprus Time
            </td>
          </tr>
        </table>
      </div>

      ${section("Contact Details", [
        row("Name", fullName),
        row("Email", data.email),
        row("Phone", `${data.countryDial || ""} ${data.phone || ""}`),
        row("How did they hear about us?", hearAbout),
        row("Recommended by", recommendationName),
        row("Website language", data.language),
      ].join(""))}

      ${section("Property Overview", [
        row("Property Type", data.propertyType),
        
        row("Unit Range", data.units),
        row("Property Name", data.projectName),
        row("Year of Construction", data.yearBuilt),
        row("Number of Floors", data.numFloors),
        row("Number of Units", data.numUnits),
      ].join(""))}

      ${section("Property Status", [
        row("Bank Account", data.hasBank),
        row("Bank Name", data.bankName),
        row("Insurance", data.hasInsurance),
        row("Insurance Company", data.insuranceName),
        row("Elevator", data.hasElevator),
        row("Service Company", data.elevatorCompany),
        row("Electricity Costs Estimated", hasValue(data.electricity) ? `€${data.electricity}` : ""),
        row("Water Costs Estimated", hasValue(data.water) ? `€${data.water}` : ""),
        row("Management Committee", data.hasCommittee),
        row("Title Deeds", data.hasTitleDeeds),
        row("General Assembly Minutes", data.hasMinutes),
      ].join(""))}

      ${services.length ? `
        <div style="margin-top:30px;">
          <h2 style="font-size:13px;letter-spacing:2.4px;text-transform:uppercase;color:#b88932;margin:0 0 12px;font-weight:800;">
            Services Requested
          </h2>
          ${listItems(services)}
        </div>
      ` : ""}

      ${issues.length ? `
        <div style="margin-top:30px;">
          <h2 style="font-size:13px;letter-spacing:2.4px;text-transform:uppercase;color:#b88932;margin:0 0 12px;font-weight:800;">
            Current Issues
          </h2>
          ${listItems(issues)}
        </div>
      ` : ""}

      ${section("Property Address", [
        row("Address", fullAddress),
        row("City", data.city),
        row("Area", data.area),
        row("Street Name", data.streetName),
        row("Street Number", data.streetNumber),
        row("Post Code", data.postCode),
        mapsUrl
  ? `
    <tr>
      <td></td>
      <td style="padding-top:14px;">
        <a
          href="${mapsUrl}"
          target="_blank"
          style="
            color:#2563EB;
            font-weight:700;
            text-decoration:none;
            font-size:14px;
          "
        >
          Open Property Location in Google Maps →
        </a>
      </td>
    </tr>
  `
  : "",
      ].join(""))}

   

      ${section("Additional Information", row("Notes", data.extraInfo))}

      <p style="margin-top:34px;padding-top:18px;border-top:1px solid #eee;color:#999;font-size:12px;">
        This email was generated automatically from the Neurora website contact form.
      </p>
    </div>
  </div>
</div>
`;

    const emailPayload: Record<string, unknown> = {
      from: "Neurora Property Management <contact@neuroraproperties.com>",
      to: [env.CONTACT_EMAIL],
      reply_to: replyToEmail,
      subject,
      html,
    };

    try {
      const pdfAttachment = await createPdfAttachment({
        ...data,
        leadId,
      });

      emailPayload.attachments = [
        {
          filename: `Neurora-Enquiry-${(data.projectName || "Property")
            .replace(/[^a-z0-9]/gi, "-")
            .replace(/-+/g, "-")
            .replace(/^-|-$/g, "")
            .toLowerCase() || "property"}.pdf`,
          content: pdfAttachment,
        },
      ];
    } catch (pdfError) {
      console.error("Contact form PDF attachment failed. Sending email without attachment.", pdfError);
    }

const response = await fetch("https://api.resend.com/emails", {
  method: "POST",
  headers: {
    Authorization: `Bearer ${env.RESEND_API_KEY}`,
    "Content-Type": "application/json",
  },
  body: JSON.stringify(emailPayload),
});

    if (!response.ok) {
      const error = await response.text();
      return new Response(JSON.stringify({ error }), {
        status: 500,
        headers: { "Content-Type": "application/json" },
      });
    }
    return new Response(JSON.stringify({ success: true }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("Contact form request failed", error);
    return new Response(JSON.stringify({ error: "Invalid request" }), {
      status: 400,
      headers: { "Content-Type": "application/json" },
    });
  }
}