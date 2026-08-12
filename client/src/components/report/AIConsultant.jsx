import { useState } from "react";
import "./AIConsultant.css";

function AIConsultant({ business }) {
  const [question, setQuestion] = useState("");
  const [messages, setMessages] = useState([]);

  const askAI = async () => {
    if (!question.trim()) return;

    const userMessage = {
      role: "user",
      text: question,
    };

    setMessages((prev) => [...prev, userMessage]);

    try {
      const response = await fetch("http://localhost:5000/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          business,
          question,
        }),
      });

      const data = await response.json();

      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          text: data.answer,
        },
      ]);

      setQuestion("");

    } catch (err) {
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          text: "Unable to connect with AI Consultant.",
        },
      ]);
    }
  };

  return (
    <section className="ai-consultant">

      <div className="section-header">
        <h2>9. AI Business Consultant</h2>
      </div>

      <p className="intro">
        Ask follow-up questions about your business report.
      </p>

      <div className="suggestions">

        <button onClick={() => setQuestion("How can I improve my business success rate?")}>
          Improve Success Rate
        </button>

        <button onClick={() => setQuestion("Suggest better marketing ideas.")}>
          Marketing Ideas
        </button>

        <button onClick={() => setQuestion("How can I reduce my investment?")}>
          Reduce Investment
        </button>

      </div>

      <div className="chat-box">

        {messages.map((msg, index) => (
          <div
            key={index}
            className={msg.role === "user" ? "user-message" : "ai-message"}
          >
            {msg.text}
          </div>
        ))}

      </div>

      <div className="chat-input">

        <input
          type="text"
          placeholder="Ask BizGuide AI..."
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
        />

        <button onClick={askAI}>
          Send
        </button>

      </div>

    </section>
  );
}

export default AIConsultant;