import React, { useState } from 'react';
//import { Configuration, OpenAIApi } from "azure-openai";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSpinner, faUser, faRobot,faPaperPlane } from '@fortawesome/free-solid-svg-icons';
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

function ChatBotCurrentPower({ lineData }) {
    const [formData, setFormData] = useState({ prompt: '' });
    const [messages, setMessages] = useState([]);
    const [loading, setLoading] = useState(false);

    const handleChange = (event) => {
        setFormData({ ...formData, prompt: event.target.value });
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        const userQuery = formData.prompt.trim();
        addMessage('user', userQuery);

        // Processing the input query
        processQuery(userQuery.toLowerCase());

        setLoading(false);
        setFormData({ prompt: "" });  // Reset input after submission
    };

    const processQuery = (query) => {
        const readingsRegex = /readings? for (\w+)( and (\w+))?/;
        const match = query.match(readingsRegex);

        if (match) {
            const tag1 = match[1];
            const tag2 = match[3]; // Could be undefined if only one tag is mentioned

            const reading1 = getReadingForTag(tag1);
            if (tag2) {
                const reading2 = getReadingForTag(tag2);
                if (reading1 !== undefined && reading2 !== undefined) {
                    const difference = Math.abs(reading1 - reading2).toFixed(2);
                    addMessage('bot', `The difference between ${tag1.toUpperCase()} and ${tag2.toUpperCase()} is ${difference}`);
                } else {
                    addMessage('bot', 'One or both tag names not found.');
                }
            } else if (reading1 !== undefined) {
                addMessage('bot', `Reading for ${tag1.toUpperCase()} is ${reading1}`);
            } else {
                addMessage('bot', 'Tag name not found.');
            }
        } else {
            addMessage('bot', "Please ask for readings like 'readings for scr1' or 'difference between scr1 and scr6'.");
        }
    };

    const getReadingForTag = (tagName) => {
        const index = lineData.labels.findIndex(label => label.toLowerCase() === tagName);
        return index !== -1 ? lineData.datasets[0].data[index] : undefined;
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
                            <FontAwesomeIcon icon={faUser} className="user-icon" style={{position:'relative',top:'23px',right:'19px',color:'blueviolet'}}/>
                        ) : (
                            <FontAwesomeIcon icon={faRobot} className="bot-icon" style={{position:'relative',top:'23px',right:'23px',color:'blueviolet'}}/>
                        )}
                        <p>{message.text}</p>
                    </div>
                ))}
            </div>
            {loading && <div className="loading">
                <FontAwesomeIcon icon={faSpinner} className="spinner" />
            </div>}
            <form onSubmit={handleSubmit} className="chat-form">
                <input
                    type="text"
                    className='inputChatBotcurrentPower'
                    value={formData.prompt}
                    onChange={handleChange}
                    style={{width:'1013px'}}
                    placeholder="Ask about readings, e.g., 'Readings for SCR1'"
                />
                <button type="submit" className='btnChatBotcurrentPower' >
                <FontAwesomeIcon icon={faPaperPlane}  style={{color:'white'}}/>
                
                </button>
            </form>
        </>
    );
}

export default ChatBotCurrentPower;
