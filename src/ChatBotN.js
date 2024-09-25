import React, { useState } from 'react';


const ChatBotN = () => {

    const [isOpen, setIsOpen] = useState(true);

  const toggleChatbot = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div>
      {isOpen ? (
        // Your chatbot model component here
        <div>
          {/* Chatbot content */}
        </div>
      ) : null}
      <button onClick={toggleChatbot}>-</button>
      <button onClick={toggleChatbot}>
        <img src="your-icon-image-url" alt="Chatbot Icon" />
      </button>
    </div>
  );

}

export default ChatBotN;