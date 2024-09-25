import React, { useState, useEffect } from "react";
//import { Configuration, OpenAIApi } from "azure-openai";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSpinner, faUser, faRobot, faPaperPlane } from "@fortawesome/free-solid-svg-icons";
import './../../styles/ChatBotEnergy.css'

// const openai = new OpenAIApi(
//     new Configuration({
//         azure: {
//             apiKey: "245b9782f4744cc681465e5459c3ee18",
//             endpoint: "https://openai-yokogawa-internal.openai.azure.com/",
//             deploymentName: "yokogawaconnectgpt16k",
//         }
//     }),
// );

function LoadingIcon() {
    return (
        <div className="flex items-center justify-center space-x-2 animate-spin">
            <FontAwesomeIcon icon={faSpinner} className="text-blue-400" />
            <FontAwesomeIcon icon={faSpinner} className="text-blue-400" />
            <FontAwesomeIcon icon={faSpinner} className="text-blue-400" />
        </div>
    );
}

const ChatBotAiEnergy = ({ chartData }) => {
    const [formData, setFormData] = useState({ prompt: "" });
    const [messages, setMessages] = useState([]);
    const [loading, setLoading] = useState(false);

    const handleChange = (event) => {
        setFormData({ ...formData, prompt: event.target.value });
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        setLoading(true);
        const userQuery = formData.prompt.trim();

        // First, add the user's question to the messages array
        addMessage('user', userQuery);

        // Regex to extract tag name and handle complex queries
        const tagMatch = userQuery.match(/average reading for (\w+)\s*\??/i);
        if (tagMatch && tagMatch[1]) {
            const tagName = tagMatch[1].toLowerCase(); // Ensure case consistency
            const tagIndex = chartData.labels.findIndex(label => label.toLowerCase() === tagName);

            if (tagIndex !== -1) {
                const reading = chartData.datasets[0].data[tagIndex];
                addMessage('bot', `Average reading for ${chartData.labels[tagIndex]} is ${reading}`);
            } else {
                addMessage('bot', "Tag name not found in the chart.");
            }
        } else {
            addMessage('bot', "I'm sorry, I didn't understand that. Can you specify a tag name?");
        }

        setLoading(false);
        setFormData({ prompt: "" });
    };

    const addMessage = (type, text) => {
        setMessages(messages => [...messages, { type, text }]);
    };

    return (
        <>
            <div className="chat-responses">
                {messages.map((message, index) => (
                    <div key={index} className={`message ${message.type}`}>
                        {message.type === 'user' ? (
                            <FontAwesomeIcon icon={faUser} className="user-icon" style={{ position: 'relative', top: '23px', right: '19px', color: 'blueviolet' }} />
                        ) : (
                            <FontAwesomeIcon icon={faRobot} className="bot-icon" style={{ position: 'relative', top: '23px', right: '23px', color: 'blueviolet' }} />
                        )}
                        <p>{message.text}</p>
                    </div>
                ))}
            </div>
            {loading && <LoadingIcon />}
            <form onSubmit={handleSubmit} className="chat-form">
                <input
                    type="text"
                    className="inputAiEnergy"
                    value={formData.prompt}
                    onChange={handleChange}
                    style={{ width: '1013px' }}
                    placeholder="Ask about average readings, e.g., 'Average reading for scr1'"
                />
                <button type="submit" className="btnAiEnergySubmit">
                <FontAwesomeIcon icon={faPaperPlane}  style={{color:'white'}}/>
                </button>
            </form>
        </>
    );
};

export default ChatBotAiEnergy;
