import { FormEvent, useRef, useState } from "react";
import { Send, X, Sparkles, Loader2 } from "lucide-react";
import noraAvatar from "@/assets/Nora.png";

type Message = {
  role: "user" | "assistant";
  content: string;
};

const NoraAvatar = ({ small = false }: { small?: boolean }) => {
  const size = small ? 42 : 56;

  return (
    <div
      style={{
        width: size,
        height: size,
        minWidth: size,
        minHeight: size,
        borderRadius: "50%",
        overflow: "hidden",
        position: "relative",
        background: "#172331",
        border: "2px solid #cda34f",
        boxShadow: "0 3px 14px rgba(0,0,0,0.18)",
      }}
    >
      <img
        src={noraAvatar}
        alt="Nora"
        style={{
          width: "100%",
          height: "100%",
          objectFit: "cover",
          objectPosition: "center center",
          display: "block",
        }}
      />
    </div>
  );
};

const NoraChat = () => {
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

  const [messages, setMessages] = useState<Message[]>([
    {
      role: "assistant",
      content:
        "Hello, I'm Nora, the Neurora AI Assistant. How can I help you today?",
    },
  ]);

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
      {/* Floating Nora button */}
      {!open && (
        <button
          type="button"
          onClick={() => setOpen(true)}
          aria-label="Open Nora AI Assistant"
          title="Ask Nora"
          className="nora-floating-button"
          style={{
            position: "fixed",
            right: "24px",
            bottom: "24px",
            width: "64px",
            height: "64px",
            borderRadius: "50%",
            border: "2px solid rgba(255,255,255,0.9)",
            padding: 0,
            background: "#ffffff",
            cursor: "pointer",
            zIndex: 9998,
            boxShadow:
              "0 8px 28px rgba(0,0,0,0.20), 0 0 0 1px rgba(197,153,69,0.25)",
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
                    {message.content}
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
              placeholder="Ask Nora anything..."
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
            .nora-floating-button {
              right: 6px !important;
            }

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