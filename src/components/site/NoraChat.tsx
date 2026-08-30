import { FormEvent, useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { Send, X, Sparkles, Loader2 } from "lucide-react";
import noraAvatar from "@/assets/Nora.png";

type Message = {
  role: "user" | "assistant";
  content: string;
};

const NORA_LANGUAGE_CONTENT: Record<string, { greeting: string; bubble: string; thinking: string; placeholder: string }> = {
  en: {
    greeting: "Hello, I'm Nora, the Neurora AI Assistant. How can I help you today?",
    bubble: "Hi! I'm Nora 👋 Can I help you with anything today?",
    thinking: "Nora is thinking...",
    placeholder: "Ask Nora anything...",
  },
  el: {
    greeting: "Γεια σας, είμαι η Nora, η ψηφιακή βοηθός της Neurora. Πώς μπορώ να σας βοηθήσω σήμερα;",
    bubble: "Γεια σας! Είμαι η Nora 👋 Μπορώ να σας βοηθήσω με κάτι;",
    thinking: "Η Nora σκέφτεται...",
    placeholder: "Ρωτήστε τη Nora οτιδήποτε...",
  },
  ru: {
    greeting: "Здравствуйте, я Nora, виртуальный ассистент Neurora. Чем я могу помочь вам сегодня?",
    bubble: "Здравствуйте! Я Nora 👋 Могу ли я чем-нибудь вам помочь?",
    thinking: "Nora думает...",
    placeholder: "Спросите Nora о чём угодно...",
  },
  he: {
    greeting: "שלום, אני Nora, העוזרת הדיגיטלית של Neurora. איך אוכל לעזור לכם היום?",
    bubble: "שלום! אני Nora 👋 האם אוכל לעזור לכם במשהו?",
    thinking: "Nora חושבת...",
    placeholder: "שאלו את Nora כל דבר...",
  },
  zh: {
    greeting: "您好，我是 Nora，Neurora 的数字助理。今天我可以为您提供什么帮助？",
    bubble: "您好！我是 Nora 👋 有什么可以帮您的吗？",
    thinking: "Nora 正在思考...",
    placeholder: "向 Nora 提问...",
  },
  "ar-LB": {
    greeting: "مرحباً، أنا Nora، المساعدة الرقمية لدى Neurora. كيف يمكنني مساعدتك اليوم؟",
    bubble: "مرحباً! أنا Nora 👋 فيّي ساعدك بشي اليوم؟",
    thinking: "Nora عم تفكّر...",
    placeholder: "اسأل Nora عن أي شيء...",
  },
  uk: {
    greeting: "Вітаю, я Nora, цифрова асистентка Neurora. Чим я можу допомогти вам сьогодні?",
    bubble: "Вітаю! Я Nora 👋 Чи можу я вам чимось допомогти?",
    thinking: "Nora думає...",
    placeholder: "Запитайте Nora про що завгодно...",
  },
  de: {
    greeting: "Hallo, ich bin Nora, die digitale Assistentin von Neurora. Wie kann ich Ihnen heute helfen?",
    bubble: "Hallo! Ich bin Nora 👋 Kann ich Ihnen heute behilflich sein?",
    thinking: "Nora denkt nach...",
    placeholder: "Fragen Sie Nora alles...",
  },
  fr: {
    greeting: "Bonjour, je suis Nora, l’assistante numérique de Neurora. Comment puis-je vous aider aujourd’hui ?",
    bubble: "Bonjour ! Je suis Nora 👋 Puis-je vous aider ?",
    thinking: "Nora réfléchit...",
    placeholder: "Posez une question à Nora...",
  },
  es: {
    greeting: "Hola, soy Nora, la asistente digital de Neurora. ¿Cómo puedo ayudarte hoy?",
    bubble: "¡Hola! Soy Nora 👋 ¿Puedo ayudarte en algo hoy?",
    thinking: "Nora está pensando...",
    placeholder: "Pregúntale cualquier cosa a Nora...",
  },
  ro: {
    greeting: "Bună ziua, sunt Nora, asistenta digitală a Neurora. Cum vă pot ajuta astăzi?",
    bubble: "Bună! Sunt Nora 👋 Vă pot ajuta cu ceva astăzi?",
    thinking: "Nora se gândește...",
    placeholder: "Întrebați-o pe Nora orice...",
  },
  pl: {
    greeting: "Dzień dobry, jestem Nora, cyfrowa asystentka Neurora. Jak mogę dziś pomóc?",
    bubble: "Cześć! Jestem Nora 👋 Czy mogę Ci w czymś pomóc?",
    thinking: "Nora myśli...",
    placeholder: "Zapytaj Norę o cokolwiek...",
  },
  bg: {
    greeting: "Здравейте, аз съм Nora, дигиталният асистент на Neurora. С какво мога да ви помогна днес?",
    bubble: "Здравейте! Аз съм Nora 👋 Мога ли да ви помогна с нещо?",
    thinking: "Nora мисли...",
    placeholder: "Попитайте Nora за каквото пожелаете...",
  },
};

const normalizeNoraLanguage = (language: string) => {
  const lower = (language || "en").toLowerCase();
  if (lower === "ar-lb" || lower.startsWith("ar")) return "ar-LB";
  if (lower.startsWith("zh")) return "zh";
  if (lower.startsWith("uk")) return "uk";
  if (lower.startsWith("de")) return "de";
  if (lower.startsWith("fr")) return "fr";
  if (lower.startsWith("es")) return "es";
  if (lower.startsWith("ro")) return "ro";
  if (lower.startsWith("pl")) return "pl";
  if (lower.startsWith("bg")) return "bg";
  if (lower.startsWith("el")) return "el";
  if (lower.startsWith("ru")) return "ru";
  if (lower.startsWith("he")) return "he";
  return "en";
};

const NoraAvatar = ({ small = false }: { small?: boolean }) => {
  const size = small ? 34 : 64;

  return (
    <img
      src={noraAvatar}
      alt="Nora"
      style={{
        width: size,
        height: size,
        minWidth: size,
        display: "block",
        objectFit: "cover",
        borderRadius: "50%",
      }}
    />
  );
};
const NoraChat = () => {
  const { i18n } = useTranslation();
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [showGreetingBubble, setShowGreetingBubble] = useState(false);

  const noraLanguage = normalizeNoraLanguage(i18n.language);
  const languageContent = NORA_LANGUAGE_CONTENT[noraLanguage] ?? NORA_LANGUAGE_CONTENT.en;

  const getWebsiteContext = () => ({
    language: noraLanguage,
    path: window.location.pathname,
    hash: window.location.hash || "",
    pageTitle: document.title,
  });

  const [messages, setMessages] = useState<Message[]>([
    {
      role: "assistant",
      content: languageContent.greeting,
    },
  ]);

  useEffect(() => {
    const greetingSeen = window.sessionStorage.getItem("neurora-nora-greeting-seen");
    if (!greetingSeen) {
      const timer = window.setTimeout(() => setShowGreetingBubble(true), 3000);
      return () => window.clearTimeout(timer);
    }
  }, []);

  useEffect(() => {
    setMessages((current) => {
      if (current.length === 1 && current[0].role === "assistant") {
        return [{ role: "assistant", content: languageContent.greeting }];
      }
      return current;
    });
  }, [languageContent.greeting]);

  const openNora = () => {
    setOpen(true);
    setShowGreetingBubble(false);
    window.sessionStorage.setItem("neurora-nora-greeting-seen", "true");
  };

  const inputRef = useRef<HTMLInputElement>(null);

  const sendMessage = async (event?: FormEvent) => {
    event?.preventDefault();

    const message = input.trim();

    if (!message || loading) {
      return;
    }

    const history = messages.map((item) => ({
      role: item.role,
      content: item.content,
    }));

    setMessages((current) => [
      ...current,
      {
        role: "user",
        content: message,
      },
    ]);

    setInput("");
    setLoading(true);

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          message,
          history,
          websiteLanguage: noraLanguage,
          websiteContext: getWebsiteContext(),
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data?.error || "Unable to contact Nora.");
      }

      setMessages((current) => [
        ...current,
        {
          role: "assistant",
          content:
            typeof data?.answer === "string"
              ? data.answer
              : "I'm sorry, I couldn't generate a response right now.",
        },
      ]);
    } catch (error) {
      console.error("Nora chat error:", error);

      setMessages((current) => [
        ...current,
        {
          role: "assistant",
          content:
            "I'm sorry, something went wrong while connecting to Nora. Please try again in a moment.",
        },
      ]);
    } finally {
      setLoading(false);

      window.setTimeout(() => {
        inputRef.current?.focus();
      }, 50);
    }
  };

  return (
    <>
      {/* Proactive greeting bubble */}
      {!open && showGreetingBubble && (
        <div
          role="button"
          tabIndex={0}
          onClick={openNora}
          onKeyDown={(event) => {
            if (event.key === "Enter" || event.key === " ") {
              event.preventDefault();
              openNora();
            }
          }}
          style={{
            position: "fixed",
            right: "96px",
            bottom: "24px",
            width: "min(280px, calc(100vw - 112px))",
            maxWidth: "280px",
            padding: "12px 40px 12px 15px",
            borderRadius: "16px",
            border: "1px solid rgba(20,35,48,0.10)",
            background: "#ffffff",
            color: "#253545",
            cursor: "pointer",
            zIndex: 9997,
            textAlign: "left",
            fontSize: 13,
            lineHeight: 1.45,
            boxShadow: "0 10px 30px rgba(0,0,0,0.16)",
          }}
        >
          <button
            type="button"
            aria-label="Dismiss Nora greeting"
            title="Dismiss"
            onClick={(event) => {
              event.stopPropagation();
              setShowGreetingBubble(false);
            }}
            style={{
              position: "absolute",
              top: 7,
              right: 7,
              width: 22,
              height: 22,
              border: "none",
              borderRadius: "50%",
              background: "transparent",
              color: "#7b8794",
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: 17,
              lineHeight: 1,
              padding: 0,
            }}
          >
            <span aria-hidden="true">×</span>
          </button>

          {languageContent.bubble}
        </div>
      )}

      {/* Floating Nora button */}
      {!open && (
        <button
          type="button"
          onClick={openNora}
          aria-label="Open Nora AI Assistant"
          title="Ask Nora"
          style={{
            position: "fixed",
            right: "8px",
            bottom: "24px",
            width: "64px",
            height: "64px",
            borderRadius: "50%",
            border: "none",
            padding: 0,
            background: "transparent",
            cursor: "pointer",
            zIndex: 9998,
            boxShadow: "none",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <NoraAvatar />

          {/* Online indicator */}
          <span
            style={{
              position: "absolute",
              right: 2,
              bottom: 2,
              width: 14,
              height: 14,
              borderRadius: "50%",
              background: "#20b879",
              border: "3px solid white",
            }}
          />
        </button>
      )}

      {/* Chat window */}
      {open && (
        <div
          style={{
            position: "fixed",
            right: "24px",
            bottom: "24px",
            width: "min(390px, calc(100vw - 32px))",
            height: "min(600px, calc(100vh - 48px))",
            minHeight: "420px",
            background: "#ffffff",
            borderRadius: "22px",
            overflow: "hidden",
            zIndex: 9999,
            display: "flex",
            flexDirection: "column",
            border: "1px solid rgba(20,35,48,0.10)",
            boxShadow: "0 20px 60px rgba(0,0,0,0.25)",
          }}
        >
          {/* Header */}
          <div
            style={{
              padding: "16px 18px",
              background:
                "linear-gradient(135deg, #172331 0%, #243444 100%)",
              color: "#ffffff",
              display: "flex",
              alignItems: "center",
              gap: 12,
            }}
          >
            <div style={{ position: "relative" }}>
              <NoraAvatar small />

              <span
                style={{
                  position: "absolute",
                  right: -1,
                  bottom: -1,
                  width: 10,
                  height: 10,
                  borderRadius: "50%",
                  background: "#20b879",
                  border: "2px solid #172331",
                }}
              />
            </div>

            <div style={{ flex: 1 }}>
              <div
                style={{
                  fontSize: 16,
                  fontWeight: 700,
                  lineHeight: 1.2,
                }}
              >
                Nora
              </div>

              <div
                style={{
                  fontSize: 12,
                  opacity: 0.72,
                  marginTop: 3,
                }}
              >
                Neurora AI Assistant
              </div>
            </div>

            <button
              type="button"
              onClick={() => setOpen(false)}
              aria-label="Close Nora"
              style={{
                width: 34,
                height: 34,
                borderRadius: "50%",
                border: "1px solid rgba(255,255,255,0.16)",
                background: "rgba(255,255,255,0.08)",
                color: "#ffffff",
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <X size={18} />
            </button>
          </div>

          {/* Messages */}
          <div
            style={{
              flex: 1,
              overflowY: "auto",
              padding: "18px 14px",
              background: "#f7f8fa",
              display: "flex",
              flexDirection: "column",
              gap: 12,
            }}
          >
            {messages.map((message, index) => {
              const assistant = message.role === "assistant";

              return (
                <div
                  key={`${message.role}-${index}`}
                  style={{
                    display: "flex",
                    alignItems: "flex-end",
                    gap: 8,
                    justifyContent: assistant ? "flex-start" : "flex-end",
                  }}
                >
                  {assistant && <NoraAvatar small />}

                  <div
                    style={{
                      maxWidth: "78%",
                      padding: "11px 13px",
                      borderRadius: assistant
                        ? "15px 15px 15px 5px"
                        : "15px 15px 5px 15px",
                      background: assistant ? "#ffffff" : "#172331",
                      color: assistant ? "#253545" : "#ffffff",
                      border: assistant
                        ? "1px solid rgba(20,35,48,0.08)"
                        : "none",
                      fontSize: 14,
                      lineHeight: 1.5,
                      whiteSpace: "pre-wrap",
                      boxShadow: assistant
                        ? "0 2px 8px rgba(0,0,0,0.04)"
                        : "0 2px 8px rgba(0,0,0,0.10)",
                    }}
                  >
                    {message.content.replace("[LEAD_CTA]", "").trim()}
                    {message.role === "assistant" && message.content.includes("[LEAD_CTA]") && (
                      <button
                        type="button"
                        onClick={() => {
                          window.location.hash = "contact";
                          document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" });
                        }}
                        style={{
                          marginTop: 10,
                          border: "none",
                          borderRadius: 10,
                          padding: "9px 12px",
                          background: "#cda34f",
                          color: "#ffffff",
                          fontSize: 13,
                          fontWeight: 700,
                          cursor: "pointer",
                        }}
                      >
                        {noraLanguage === "el" ? "Ζητήστε Πρόταση" : "Request a Proposal"}
                      </button>
                    )}
                  </div>
                </div>
              );
            })}

            {loading && (
              <div
                style={{
                  display: "flex",
                  alignItems: "flex-end",
                  gap: 8,
                }}
              >
                <NoraAvatar small />

                <div
                  style={{
                    padding: "11px 14px",
                    borderRadius: "15px 15px 15px 5px",
                    background: "#ffffff",
                    border: "1px solid rgba(20,35,48,0.08)",
                    color: "#7b8794",
                    display: "flex",
                    alignItems: "center",
                    gap: 8,
                    fontSize: 13,
                  }}
                >
                  <Loader2
                    size={15}
                    style={{
                      animation: "nora-spin 1s linear infinite",
                    }}
                  />
                  Nora is thinking...
                </div>
              </div>
            )}
          </div>

          {/* Input */}
          <form
            onSubmit={sendMessage}
            style={{
              padding: 12,
              background: "#ffffff",
              borderTop: "1px solid rgba(20,35,48,0.08)",
              display: "flex",
              gap: 8,
            }}
          >
            <input
              ref={inputRef}
              value={input}
              onChange={(event) => setInput(event.target.value)}
              placeholder={languageContent.placeholder}
              disabled={loading}
              style={{
                flex: 1,
                minWidth: 0,
                height: 44,
                borderRadius: 13,
                border: "1px solid #dfe4e8",
                outline: "none",
                padding: "0 13px",
                fontSize: 14,
                color: "#172331",
                background: "#fafbfc",
              }}
            />

            <button
              type="submit"
              disabled={loading || !input.trim()}
              aria-label="Send message"
              style={{
                width: 44,
                height: 44,
                borderRadius: 13,
                border: "none",
                background:
                  loading || !input.trim() ? "#d8dde2" : "#cda34f",
                color: "#ffffff",
                cursor:
                  loading || !input.trim() ? "default" : "pointer",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              {loading ? (
                <Sparkles size={17} />
              ) : (
                <Send size={17} />
              )}
            </button>
          </form>
        </div>
      )}

      <style>
        {`
          @keyframes nora-spin {
            from { transform: rotate(0deg); }
            to { transform: rotate(360deg); }
          }

          @media (max-width: 640px) {
            .nora-chat-window {
              right: 16px !important;
              bottom: 16px !important;
            }
          }
        `}
      </style>
    </>
  );
};

export default NoraChat;