import React, { useState } from "react";
import { sendMessage } from "../api/chat";

interface ChatProps {
  onClose?: () => void;
}

export default function Chat({ onClose }: ChatProps) {
  const [messages, setMessages] = useState<{ role: string; content: string }[]>([{ role: "assistant", content: "Ask me anything, cutie?" }]);
  const [input, setInput] = useState("");
  const [isThinking, setIsThinking] = useState(false);

  const handleSend = async () => {
    if (!input || isThinking) return;

    const userMessage = { role: "user", content: input };
    setMessages([...messages, userMessage]);
    setInput("");
    setIsThinking(true);

    try {
      const aiResponse = await sendMessage([...messages, userMessage]);
      setMessages((prev) => [...prev, { role: "assistant", content: aiResponse }]);
    } catch (error) {
      setMessages((prev) => [...prev, { role: "assistant", content: "Sorry, I encountered an error. Please try again." }]);
    } finally {
      setIsThinking(false);
    }
  };

  return (
    <div className="chat-container">
      <div className="chat-messages">
        {messages.map((m, i) => (
          <div key={i} className={`chat-message ${m.role === "user" ? "user" : "assistant"}`}>
            {m.content}
          </div>
        ))}
        {isThinking && (
          <div className="chat-message assistant thinking">
            <div className="thinking-indicator">
              <span>🤔</span>
              <span className="thinking-dots">
                <span>.</span>
                <span>.</span>
                <span>.</span>
              </span>
            </div>
            <div className="thinking-text">AI is thinking...</div>
          </div>
        )}
      </div>
      <div className="chat-input-container">
        <button onClick={onClose} className="chat-close-button">
          Close
        </button>
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyPress={(e) => e.key === 'Enter' && handleSend()}
          placeholder="Type your message..."
          disabled={isThinking}
          className="chat-input"
        />
        <button onClick={handleSend} disabled={isThinking} className="chat-send-button">
          {isThinking ? "..." : "Send"}
        </button>
      </div>
    </div>
  );
}
