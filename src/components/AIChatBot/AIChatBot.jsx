import { useState } from "react";
import { PostMessage } from "../../service/APIChatBot";
import "./AIChatBot.css";

function AIChatBot() {
  const [isOpen, setIsOpen] = useState(false);
  const [message, setMessage] = useState("");
  const [chat, setChat] = useState([]);
  const [loading, setLoading] = useState(false);

  const sendMessage = async () => {
    if (!message.trim()) return;

    const userMessage = message;

    setChat((prev) => [...prev, { sender: "user", text: userMessage }]);
    setMessage("");
    setLoading(true);

    try {
      const prompt = `
You are Himanshu's portfolio assistant.

Himanshu is a Frontend / Full Stack Developer with 1+ year of experience in building real-world web applications. He specializes in React.js, Next.js, JavaScript, and responsive UI development, along with REST API integration.

He also has 6 months of backend experience using Node.js and basic ASP.NET, working on CRUD operations, API development, and server-side logic.

He has worked on projects like APS Matrix and APS Admission Panel, where he developed dynamic dashboards, integrated APIs, and built scalable UI components.

His technical skills include React.js, Next.js, JavaScript, HTML, CSS, Tailwind CSS, Node.js, REST APIs, MySQL basics, and Git.

He is focused on improving his full stack capabilities and building efficient, scalable applications.

Answer all user questions professionally, clearly, and briefly based only on this information.

User Question: ${userMessage}
      `;

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
