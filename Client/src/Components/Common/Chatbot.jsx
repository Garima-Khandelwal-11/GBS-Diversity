import React, { useState, useRef, useEffect } from 'react';
import { FaCommentDots, FaTimes, FaPaperPlane } from 'react-icons/fa';
import toast from 'react-hot-toast';
import { sendChatMessage } from '../../operations/services/chatbotApi';
import '../../Styles/Chatbot.css';

const WELCOME_MESSAGE = {
  role: 'assistant',
  text: "Hi! I'm the MentHer assistant. Ask me about finding a mentor, career resources, or how the platform works.",
};

const Chatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([WELCOME_MESSAGE]);
  const [input, setInput] = useState('');
  const [isSending, setIsSending] = useState(false);
  const messagesEndRef = useRef(null);

  useEffect(() => {
    if (isOpen) {
      messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, isOpen]);

  const handleSend = async (e) => {
    e.preventDefault();
    const trimmed = input.trim();
    if (!trimmed || isSending) return;

    const nextMessages = [...messages, { role: 'user', text: trimmed }];
    setMessages(nextMessages);
    setInput('');
    setIsSending(true);

    try {
      const reply = await sendChatMessage(trimmed, nextMessages);
      setMessages((prev) => [...prev, { role: 'assistant', text: reply }]);
    } catch (error) {
      toast.error(error.response?.data?.message || 'Chatbot is unavailable right now');
    } finally {
      setIsSending(false);
    }
  };

  return (
    <div className="chatbot-widget">
      {isOpen && (
        <div className="chatbot-panel">
          <div className="chatbot-header">
            <span>MentHer Assistant</span>
            <button className="chatbot-close-btn" onClick={() => setIsOpen(false)} aria-label="Close chat">
              <FaTimes />
            </button>
          </div>
          <div className="chatbot-messages">
            {messages.map((msg, idx) => (
              <div key={idx} className={`chatbot-message chatbot-message-${msg.role}`}>
                {msg.text}
              </div>
            ))}
            {isSending && <div className="chatbot-message chatbot-message-assistant chatbot-typing">Typing...</div>}
            <div ref={messagesEndRef} />
          </div>
          <form className="chatbot-input-row" onSubmit={handleSend}>
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Type your question..."
              disabled={isSending}
            />
            <button type="submit" disabled={isSending || !input.trim()} aria-label="Send message">
              <FaPaperPlane />
            </button>
          </form>
        </div>
      )}
      <button className="chatbot-toggle-btn" onClick={() => setIsOpen((prev) => !prev)} aria-label="Toggle chat">
        {isOpen ? <FaTimes /> : <FaCommentDots />}
      </button>
    </div>
  );
};

export default Chatbot;
