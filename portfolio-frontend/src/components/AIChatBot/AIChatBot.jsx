import { useEffect, useState } from "react";
import { PostMessage } from "../../service/APIChatBot";
import { getSummary } from "../../service/resume.api";

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
        return;
      }

      setChat((prev) => [
        ...prev,
        { sender: "bot", text: "Something went wrong. Please try again." },
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
    <div className="fixed bottom-6 right-6 z-[9999] max-sm:bottom-4 max-sm:right-4">
      {isOpen && (
        <section
          className="absolute bottom-[82px] right-0 flex h-[min(520px,calc(100vh-128px))] w-[min(360px,calc(100vw-32px))] flex-col overflow-hidden rounded-lg border border-amber-400/45 bg-stone-100 text-neutral-900 shadow-[0_24px_70px_rgba(0,0,0,0.42)] max-sm:bottom-[74px] max-sm:h-[min(500px,calc(100vh-106px))]"
          aria-label="AI Portfolio Bot"
        >
          <div className="flex items-center justify-between gap-3 bg-neutral-900 p-3.5 text-white">
            <div className="flex min-w-0 items-center gap-2.5">
              <span
                className="inline-flex h-[30px] w-9 flex-none items-center justify-center gap-1.5 rounded-[10px] border-2 border-white bg-amber-400"
                aria-hidden="true"
              >
                <span className="h-1.5 w-1.5 rounded-full bg-neutral-900"></span>
                <span className="h-1.5 w-1.5 rounded-full bg-neutral-900"></span>
              </span>
              <div>
                <h2 className="text-base leading-tight">AI Portfolio Bot</h2>
                <p className="mt-0.5 text-xs leading-snug text-stone-300">
                  Ask about Himanshu&apos;s skills and projects
                </p>
              </div>
            </div>

            <button
              type="button"
              className="inline-flex h-[34px] w-[34px] items-center justify-center rounded-full border border-white/25 bg-transparent text-lg leading-none text-white"
              onClick={() => setIsOpen(false)}
              aria-label="Close chatbot"
            >
              x
            </button>
          </div>

          <div className="flex flex-1 flex-col gap-2.5 overflow-y-auto p-3.5">
            {chat.length === 0 && (
              <div className="self-start text-sm text-neutral-500">
                Hi, I can help you explore this portfolio.
              </div>
            )}

            {chat.map((msg, index) => (
              <div
                key={index}
                className={`max-w-[82%] whitespace-pre-wrap rounded-lg px-3 py-2.5 text-sm leading-[1.45] ${
                  msg.sender === "user"
                    ? "self-end bg-amber-400 text-neutral-900"
                    : "self-start bg-neutral-200 text-neutral-900"
                }`}
              >
                {msg.text}
              </div>
            ))}

            {loading && <div className="self-start text-sm text-neutral-500">Typing...</div>}
          </div>

          <div className="flex gap-2 border-t border-neutral-300 bg-white p-3">
            <input
              className="min-w-0 flex-1 rounded-lg border border-neutral-300 px-3 py-2.5 text-sm outline-none transition focus:border-amber-400 focus:ring-4 focus:ring-amber-400/20"
              type="text"
              placeholder="Ask about me..."
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && sendMessage()}
            />

            <button
              className="rounded-lg bg-neutral-900 px-3.5 font-semibold text-white"
              type="button"
              onClick={sendMessage}
            >
              Send
            </button>
          </div>
        </section>
      )}

      <button
        type="button"
        className={`inline-flex h-16 w-16 items-center justify-center rounded-full border-0 shadow-[0_18px_40px_rgba(0,0,0,0.35)] transition hover:-translate-y-1 hover:shadow-[0_22px_50px_rgba(0,0,0,0.45)] max-sm:h-[58px] max-sm:w-[58px] ${
          isOpen
            ? "bg-gradient-to-br from-neutral-800 to-neutral-500"
            : "bg-gradient-to-br from-amber-400 to-cyan-400"
        }`}
        onClick={() => setIsOpen((prev) => !prev)}
        aria-label={isOpen ? "Close chatbot" : "Open chatbot"}
        aria-expanded={isOpen}
      >
        <span
          className="relative flex h-7 w-[34px] items-center justify-center gap-[7px] rounded-xl border-[3px] border-neutral-900 bg-white"
          aria-hidden="true"
        >
          <span className="absolute -top-[10px] h-[9px] w-[3px] bg-neutral-900"></span>
          <span className="absolute -top-[15px] h-[9px] w-[9px] rounded-full bg-neutral-900"></span>
          <span className="h-1.5 w-1.5 rounded-full bg-neutral-900"></span>
          <span className="h-1.5 w-1.5 rounded-full bg-neutral-900"></span>
          <span className="absolute bottom-[5px] h-[3px] w-[14px] rounded-full bg-amber-400"></span>
        </span>
      </button>
    </div>
  );
}

export default AIChatBot;
