import { useState } from "react";
import "./ChatBot.css";

const FAQ = [
  {
    q: "How can I book a visit?",
    a: "Go to the property page and click on 'Book Visit'. No login required."
  },
  {
    q: "Do I need to login?",
    a: "No, you can book a visit without logging in."
  },
  {
    q: "How can I contact the agent?",
    a: "You can call, WhatsApp, or send SMS from the Contact section."
  },
  {
    q: "What does In Progress mean?",
    a: "It means a visit is already booked for this property."
  }
];

export default function ChatBot() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState([
    { sender: "bot", text: "Hi 👋 How can I help you?" }
  ]);

  const handleQuestion = (item) => {
    setMessages((prev) => [
      ...prev,
      { sender: "user", text: item.q },
      { sender: "bot", text: item.a }
    ]);
  };

  return (
    <>
      {/* CHAT ICON */}
      <div className="chat-icon" onClick={() => setOpen(!open)}>
        💬
      </div>

      {/* CHAT BOX */}
      {open && (
        <div className="chat-box">
          <div className="chat-header">EstateCore Assistant</div>

          <div className="chat-body">
            {messages.map((m, i) => (
              <div key={i} className={`msg ${m.sender}`}>
                {m.text}
              </div>
            ))}
          </div>

          <div className="chat-footer">
            {FAQ.map((item, i) => (
              <button key={i} onClick={() => handleQuestion(item)}>
                {item.q}
              </button>
            ))}
          </div>
        </div>
      )}
    </>
  );
}

