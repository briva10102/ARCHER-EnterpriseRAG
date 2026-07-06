import { useState, useRef } from "react";
import {
  FiSend,
  FiPlus,
  FiUpload,
  FiMessageSquare,
  FiShield,
  FiBox,
  FiTool,
  FiFileText,
  FiBatteryCharging,
  FiHelpCircle,
} from "react-icons/fi";
import {
    askQuestion,
    uploadPDF,
    extractPDF,
} from "../services/api";

// Suggestion cards shown on the empty chat screen.
// Each one has its own color theme (set with a CSS class) and fills the input box when clicked.
const suggestionCards = [
  {
    id: 1,
    title: "Warranty",
    text: "What is the warranty period for this product?",
    icon: <FiShield />,
    color: "card-purple",
  },
  {
    id: 2,
    title: "Products",
    text: "Show me details about your products.",
    icon: <FiBox />,
    color: "card-orange",
  },
  {
    id: 3,
    title: "Installation",
    text: "Guide me through the installation process.",
    icon: <FiTool />,
    color: "card-red",
  },
  {
    id: 4,
    title: "Company Docs",
    text: "Find the latest company documentation.",
    icon: <FiFileText />,
    color: "card-blue",
  },
  {
    id: 5,
    title: "Batteries",
    text: "What battery type does this device use?",
    icon: <FiBatteryCharging />,
    color: "card-gold",
  },
  {
    id: 6,
    title: "Ask Anything",
    text: "",
    icon: <FiHelpCircle />,
    color: "card-charcoal",
  },
];

// A few placeholder recent chats for the sidebar.
const recentChats = [
  "Warranty claim for Model X200",
  "Installation steps - Unit 4",
  "Battery replacement guide",
];

function Home() {
  const [messages, setMessages] = useState([]); // { sender: "user" | "bot", text: string }
  const [input, setInput] = useState("");
    const [selectedFiles, setSelectedFiles] = useState([]);
    const fileInputRef = useRef(null);
    const [loading, setLoading] = useState(false);

  // Fills the input box with the suggestion card's text
  const handleCardClick = (text) => {
    if (text) setInput(text);
  };

  // Sends the current input as a user message
    const handleSend = async () => {
        if (!input.trim()) return;

        const question = input;

        const userMessage = {
            sender: "user",
            text: question,
        };

        setMessages((prev) => [...prev, userMessage]);
        setInput("");

        try {
            setLoading(true);

            const response = await askQuestion(question);

            const botMessage = {
                sender: "bot",
                text: response.data.answer,
            };

            setMessages((prev) => [...prev, botMessage]);
            setLoading(false);
        } catch (error) {
            setLoading(false);
            setMessages((prev) => [
                ...prev,
                {
                    sender: "bot",
                    text: "Something went wrong while contacting the server.",
                },
            ]);
        }
    };
    
    const handleUpload = async () => {
        if (selectedFiles.length === 0) {
            alert("Please select at least one PDF.");
            return;
        }

        try {
            for (const file of selectedFiles) {
                const formData = new FormData();
                formData.append("file", file);

                await uploadPDF(formData);
            }

            await extractPDF();

            alert("Documents processed successfully!");

            setSelectedFiles([]);
        } catch (error) {
            alert("Upload failed.");
            console.error(error);
        }
    };

  // Allow sending with Enter key
  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="app-container">
      {/* Animated background blobs for the subtle mesh effect */}
      <div className="bg-blob blob-one"></div>
      <div className="bg-blob blob-two"></div>

      {/* ---------- Sidebar ---------- */}
      <aside className="sidebar">
        <div className="sidebar-top">
          <h1 className="logo">Archer</h1>
          <p className="tagline">On Target.</p>

          <button
            className="new-chat-btn"
            onClick={() => setMessages([])}
          >
            <FiPlus />
            New Chat
          </button>

          <div className="recent-chats">
            <p className="recent-title">Recent Chats</p>
            <ul>
              {recentChats.map((chat, index) => (
                <li key={index} className="recent-chat-item">
                  <FiMessageSquare className="recent-icon" />
                  <span>{chat}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Fixed near the bottom of the sidebar */}
              <>
                  <input
                      type="file"
                      ref={fileInputRef}
                      multiple
                      accept=".pdf"
                      style={{ display: "none" }}
                      onChange={(e) => setSelectedFiles(Array.from(e.target.files))}
                  />

                  <button
                      className="upload-btn"
                      onClick={() => {
                          if (selectedFiles.length === 0) {
                              fileInputRef.current.click();
                          } else {
                              handleUpload();
                          }
                      }}
                  >
                      <FiUpload />
                      Upload PDFs
                  </button>
              </>
      </aside>

      {/* ---------- Main Chat Area ---------- */}
      <main className="main-area">
        <header className="chat-header">
          <h2>Archer Assistant</h2>
        </header>

        <div className="chat-area">
          {messages.length === 0 ? (
            // Empty state: greeting + suggestion cards
            <div className="empty-state">
              <h3 className="greeting">How can I help you today?</h3>

              <div className="suggestion-grid">
                {suggestionCards.map((card) => (
                  <div
                    key={card.id}
                    className={`suggestion-card ${card.color}`}
                    onClick={() => handleCardClick(card.text)}
                  >
                    <div className="card-icon">{card.icon}</div>
                    <p className="card-title">{card.title}</p>
                  </div>
                ))}
              </div>
            </div>
          ) : (
            // Message list
                          <div className="message-list">
                              {messages.map((msg, index) => (
                                  <div
                                      key={index}
                                      className={`message ${msg.sender === "user" ? "user-message" : "bot-message"
                                          }`}
                                  >
                                      {msg.text}
                                  </div>
                              ))}

                              {loading && (
                                  <div className="typing-indicator">
                                      <span></span>
                                      <span></span>
                                      <span></span>
                                  </div>
                              )}
                          </div>
          )}
        </div>

        {/* ---------- Input Box ---------- */}
        <div className="input-box">
          <textarea
            className="chat-input"
            placeholder="Message Archer..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            rows={1}
          />
          <button className="send-btn" onClick={handleSend}>
            <FiSend />
          </button>
        </div>
      </main>
    </div>
  );
}

export default Home;