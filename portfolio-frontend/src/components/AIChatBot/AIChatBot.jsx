import { useEffect, useState } from "react";
import { PostMessage } from "../../service/APIChatBot";
import { getSummary } from "../../service/resume.api";
import { soundEngine } from "../../utils/soundEngine";

function AIChatBot() {
  const [isOpen, setIsOpen] = useState(false);
  const [message, setMessage] = useState("");
  const [chat, setChat] = useState([]);
  const [loading, setLoading] = useState(false);
  const [summary, setSummary] = useState([]);

  const SummaryGet = async () => {
    try {
      const res = await getSummary();
      return Array.isArray(res?.data) ? res.data : [];
    } catch (error) {
      return [];
    }
  };

  const sendMessage = async () => {
    if (!message.trim()) return;
    soundEngine.playClick();

    const userMessage = message;

    setChat((prev) => [...prev, { sender: "user", text: userMessage }]);
    setMessage("");
    setLoading(true);

    try {
      const summaryContent =
        summary[0]?.content ||
        "You are an assistant for Himanshu Mandowra's portfolio. Keep replies short, professional, and helpful for visitors or recruiters.";
      const prompt = ` ${summaryContent} and do not answer like I provided you the description, just behiave like a assistent of mine and do not go too high, keep the conversation sort and professional and remember evertime you are talking to the HR or my portfolio visitor not me and if I use code 1720 than I am directly talking to you non-other just me and as I type exit with code then back to assistent profile for visitors and all always so just keep this in mind and answers smarty, and if any weired or stupid question asked then answer it like they deserve or roast them. User Question: ${userMessage}`;

      const res = await PostMessage(prompt);

      const reply = res?.reply || "No response";

      setChat((prev) => [...prev, { sender: "bot", text: reply }]);
    } catch (error) {
      if (error.response?.data?.error?.code === 429) {
        setChat((prev) => [
          ...prev,
          {
            sender: "bot",
            text: "The AI is tired of working for free. Please try again later 😒",
          },
        ]);
        setLoading(false);
        return;
      }

      setChat((prev) => [
        ...prev,
        { sender: "bot", text: "Transmission interrupted. Please try again." },
      ]);
    }

    setLoading(false);
  };

  useEffect(() => {
    let isMounted = true;

    const loadSummary = async () => {
      const data = await SummaryGet();
      if (isMounted) {
        setSummary(data);
      }
    };

    loadSummary();

    return () => {
      isMounted = false;
    };
  }, []);

  return (
    <div className="fixed bottom-5 right-4 z-[9000] sm:right-6">
      {isOpen && (
        <section
          className="theme-surface absolute bottom-[64px] right-0 flex h-[min(480px,calc(100vh-130px))] w-[min(360px,calc(100vw-32px))] flex-col overflow-hidden rounded-2xl backdrop-blur-xl"
          style={{ borderColor: "var(--border-strong)" }}
          aria-label="Red Queen AI Portfolio Assistant"
        >
          <div
            className="flex items-center justify-between gap-3 border-b p-3.5"
            style={{
              borderColor: "var(--border-color)",
              backgroundColor: "var(--bg-input)",
            }}
          >
            <div className="flex min-w-0 items-center gap-2.5">
              <span
                className="theme-badge inline-flex h-8 w-8 flex-none items-center justify-center rounded-lg font-mono-tech text-xs font-bold"
                aria-hidden="true"
              >
                AI
              </span>
              <div>
                <h2 className="font-requiem text-sm font-bold uppercase tracking-[0.12em] theme-text-primary">
                  RED QUEEN {"//"} AI TERMINAL
                </h2>
                <p className="font-mono-tech text-[10px] uppercase tracking-[0.15em] theme-text-muted">
                  QUERY OPERATIVE SKILLS &amp; PROJECTS
                </p>
              </div>
            </div>

            <button
              type="button"
              className="theme-badge inline-flex h-7 w-7 items-center justify-center rounded-lg font-mono-tech text-xs font-bold transition hover:opacity-80"
              onClick={() => {
                soundEngine.playClick();
                setIsOpen(false);
              }}
              aria-label="Close chatbot"
            >
              X
            </button>
          </div>

          <div className="flex flex-1 flex-col gap-2.5 overflow-y-auto p-3.5 font-mono-tech text-xs">
            {chat.length === 0 && (
              <div className="theme-badge self-start rounded-xl p-3">
                [RED QUEEN ONLINE]: Greetings. Query me regarding Himanshu&apos;s
                engineering stack, experience, or case files.
              </div>
            )}

            {chat.map((msg, index) => (
              <div
                key={index}
                className={`max-w-[85%] whitespace-pre-wrap rounded-xl px-3 py-2.5 leading-relaxed ${
                  msg.sender === "user"
                    ? "theme-accent-bg self-end"
                    : "theme-input self-start"
                }`}
              >
                {msg.text}
              </div>
            ))}

            {loading && (
              <div className="self-start font-mono-tech text-xs theme-accent-text">
                DECRYPTING RESPONSE...
              </div>
            )}
          </div>

          <div
            className="flex gap-2 border-t p-3"
            style={{
              borderColor: "var(--border-color)",
              backgroundColor: "var(--bg-input)",
            }}
          >
            <input
              className="theme-input min-w-0 flex-1 rounded-lg px-3 py-2 font-mono-tech text-xs outline-none transition"
              type="text"
              placeholder="TRANSMIT QUERY..."
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && sendMessage()}
            />

            <button
              className="re-requiem-btn px-3.5 py-2 text-xs"
              type="button"
              onClick={sendMessage}
            >
              SEND
            </button>
          </div>
        </section>
      )}

      <button
        type="button"
        className="re-requiem-btn h-12 rounded-xl px-4 text-xs shadow-lg"
        onClick={() => {
          soundEngine.playClick();
          setIsOpen((prev) => !prev);
        }}
        aria-label={isOpen ? "Close chatbot" : "Open chatbot"}
        aria-expanded={isOpen}
      >
        <span
          className="h-2 w-2 animate-ping rounded-full"
          style={{ backgroundColor: "var(--accent)" }}
        />
        <span>{isOpen ? "CLOSE AI" : "AI COMMS"}</span>
      </button>
    </div>
  );
}

export default AIChatBot;
