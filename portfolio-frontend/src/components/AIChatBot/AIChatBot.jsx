import { useEffect, useState } from "react";
import { PostMessage } from "../../service/APIChatBot";
import "./AIChatBot.css";
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
      setSummary(res.data);
      console.log("this is data from file", res);
    } catch (error) {
      console.log(error);
    }
  };

  const sendMessage = async () => {
    if (!message.trim()) return;

    const userMessage = message;

    setChat((prev) => [...prev, { sender: "user", text: userMessage }]);
    setMessage("");
    setLoading(true);

    try {
      console.log("This is summary from file:", summary[0].content);
      const prompt = ` ${summary[0].content} and do not answer like I provided you the description, just behiave like a assistent of mine and do not go too high, keep the conversation sort and professional and remember evertime you are talking to the HR or my portfolio visitor not me and if I use code 1720 than I am directly talking to you non-other just me and as I type exit with code then back to assistent profile for visitors and all always so just keep this in mind and answers smarty, and if any weired or stupid question asked then answer it like they deserve or roast them. User Question: ${userMessage}`;

      const res = await PostMessage(prompt);

      const reply =
        res?.data?.candidates?.[0]?.content?.parts?.[0]?.text || "No response";

      setChat((prev) => [...prev, { sender: "bot", text: reply }]);
    } catch (error) {
      console.log(error);
      setChat((prev) => [
        ...prev,
        { sender: "bot", text: "Something went wrong. Please try again." },
      ]);
    }

    setLoading(false);
  };

  useEffect(() => {
    SummaryGet();
  }, []);

  return (
    <div className="ai-chatbot-widget">
      {isOpen && (
        <section className="ai-chatbot-panel" aria-label="AI Portfolio Bot">
          <div className="ai-chatbot-header">
            <div className="ai-chatbot-title">
              <span className="ai-chatbot-avatar" aria-hidden="true">
                <span className="ai-chatbot-avatar-eye"></span>
                <span className="ai-chatbot-avatar-eye"></span>
              </span>
              <div>
                <h2>AI Portfolio Bot</h2>
                <p>Ask about Himanshu's skills and projects</p>
              </div>
            </div>

            <button
              type="button"
              className="ai-chatbot-close"
              onClick={() => setIsOpen(false)}
              aria-label="Close chatbot"
            >
              x
            </button>
          </div>

          <div className="ai-chatbot-messages">
            {chat.length === 0 && (
              <div className="ai-chatbot-empty">
                Hi, I can help you explore this portfolio.
              </div>
            )}

            {chat.map((msg, index) => (
              <div
                key={index}
                className={`ai-chatbot-message ${
                  msg.sender === "user"
                    ? "ai-chatbot-message-user"
                    : "ai-chatbot-message-bot"
                }`}
              >
                {msg.text}
              </div>
            ))}

            {loading && <div className="ai-chatbot-typing">Typing...</div>}
          </div>

          <div className="ai-chatbot-form">
            <input
              type="text"
              placeholder="Ask about me..."
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && sendMessage()}
            />

            <button type="button" onClick={sendMessage}>
              Send
            </button>
          </div>
        </section>
      )}

      <button
        type="button"
        className={`ai-chatbot-launcher ${isOpen ? "is-open" : ""}`}
        onClick={() => setIsOpen((prev) => !prev)}
        aria-label={isOpen ? "Close chatbot" : "Open chatbot"}
        aria-expanded={isOpen}
      >
        <span className="ai-chatbot-icon" aria-hidden="true">
          <span className="ai-chatbot-icon-eye"></span>
          <span className="ai-chatbot-icon-eye"></span>
          <span className="ai-chatbot-icon-mouth"></span>
        </span>
      </button>
    </div>
  );
}

export default AIChatBot;
