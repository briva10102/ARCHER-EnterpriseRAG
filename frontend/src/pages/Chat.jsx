import { useState, useRef, useEffect } from "react";

import "../styles/Chat.css";

import Header from "../components/Header/Header";
import DatabaseDrawer from "../components/Drawers/DatabaseDrawer";
import ProfileDrawer from "../components/Drawers/ProfileDrawer";
import GridScan from "../components/GridScan";
import { useNavigate } from "react-router-dom";

import {
    FiSend,
    FiShield,
    FiBox,
    FiTool,
    FiFileText,
    FiBatteryCharging,
    FiHelpCircle,
} from "react-icons/fi";

import {
    uploadPDF,
    askQuestion,
} from "../api/api";

const suggestionCards = [

    {
        id: 1,
        title: "Warranty",
        text: "What is the warranty period for...",
        icon: <FiShield />
    },

    {
        id: 2,
        title: "Installation",
        text: "Guide me through installation...",
        icon: <FiTool />
    },

    {
        id: 3,
        title: "Company Docs",
        text: "Find company documentation...",
        icon: <FiFileText />
    }

];

function Chat() {
    const navigate = useNavigate();
    const [messages, setMessages] = useState([]);

    const [input, setInput] = useState("");

    const [loading, setLoading] = useState(false);

    const [selectedFiles, setSelectedFiles] = useState([]);
    const [category, setCategory] = useState("");
    const [allowedRoles, setAllowedRoles] = useState("employee");

    const [databaseOpen, setDatabaseOpen] = useState(false);

    const [profileOpen, setProfileOpen] = useState(false);

    const fileInputRef = useRef(null);

    const scrollRef = useRef(null);

    useEffect(() => {
        if (scrollRef.current) {
            scrollRef.current.scrollTo({
                top: scrollRef.current.scrollHeight,
                behavior: "smooth",
            });
        }
    }, [messages, loading]);

    const handleCardClick = (text) => {

        if (text) {

            setInput(text);

        }

    };

    const handleSend = async () => {

        if (!input.trim()) return;

        const question = input;

        setMessages((prev) => [
            ...prev,
            {
                sender: "user",
                text: question,
            },
        ]);

        setInput("");

        try {

            setLoading(true);

            const response = await askQuestion(question);

            setMessages((prev) => [
                ...prev,
                {
                    sender: "bot",
                    text: response.answer,
                },
            ]);

        } catch {

            setMessages((prev) => [
                ...prev,
                {
                    sender: "bot",
                    text: "Something went wrong while contacting the server.",
                },
            ]);

        } finally {

            setLoading(false);

        }

    };

    const handleUpload = async () => {

        if (selectedFiles.length === 0) {

            alert("Please select at least one PDF.");

            return;

        }

        try {

            for (const file of selectedFiles) {

                await uploadPDF(
                    file,
                    category,
                    allowedRoles
                );

            }

            

            alert("Documents processed successfully.");

            setSelectedFiles([]);

            setDatabaseOpen(false);

        } catch (err) {

            console.error(err);

            alert("Upload failed.");

        }

    };

    const handleKeyDown = (e) => {

        if (e.key === "Enter" && !e.shiftKey) {

            e.preventDefault();

            handleSend();

        }

    };
    return (

        <div className="chat-page">

            <GridScan />

            <Header
                onDatabaseClick={() => navigate("/vault")}
                onProfileClick={() => setProfileOpen(true)}
            />

            <main className="chat-main">

                <section
                    className="messages-section"
                    ref={scrollRef}
                >

                    {messages.length === 0 ? (

                        <div className="welcome-screen">

                            

                            <h1>

                                Where is the arrow heading?

                            </h1>

                            

                            <div className="suggestion-grid">

                                {suggestionCards.map((card) => (

                                    <button
                                        key={card.id}
                                        className="suggestion-card"
                                        onClick={() =>
                                            handleCardClick(card.text)
                                        }
                                    >

                                        <div className="card-icon">

                                            {card.icon}

                                        </div>

                                        <div className="card-content">

                                            <h3>{card.title}</h3>

                                            

                                        </div>

                                    </button>

                                ))}

                            </div>

                        </div>

                    ) : (

                        <div className="messages-container">

                            {messages.map((message, index) => (

                                <div
                                    key={index}
                                    className={`message-row ${message.sender}`}
                                >

                                    <div
                                        className={`message-bubble ${message.sender}`}
                                    >

                                        {message.text}

                                    </div>

                                </div>

                            ))}

                            {loading && (

                                <div className="message-row bot">

                                    <div className="message-bubble bot typing">

                                        <span></span>
                                        <span></span>
                                        <span></span>

                                    </div>

                                </div>

                            )}

                        </div>

                    )}

                </section>
                <div className="input-wrapper">

                    <div className="chat-input">

                        <textarea
                            value={input}
                            onChange={(e) =>
                                setInput(e.target.value)
                            }
                            onKeyDown={handleKeyDown}
                            placeholder="Ask Archer anything..."
                            rows={1}
                        />

                        <button
                            className="send-button"
                            onClick={handleSend}
                            disabled={loading || !input.trim()}
                        >

                            <FiSend />

                        </button>

                    </div>

                </div>

            </main>

            <DatabaseDrawer
                isOpen={databaseOpen}
                onClose={() => setDatabaseOpen(false)}
                selectedFiles={selectedFiles}
                setSelectedFiles={setSelectedFiles}
                fileInputRef={fileInputRef}
                handleUpload={handleUpload}
            />

            <ProfileDrawer
                isOpen={profileOpen}
                onClose={() => setProfileOpen(false)}
                user={{
                    username: "Employee",
                    email: "employee@company.com",
                    role: "Employee",
                }}
            />
        </div>

    );

}

export default Chat;