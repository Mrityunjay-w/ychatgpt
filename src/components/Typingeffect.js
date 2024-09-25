import React, { useEffect, useRef, useState } from "react";
import PropTypes from "prop-types";
import styled from "styled-components";

const TypingEffect = ({ text, keywords, speed, delay }) => {
  const [displayedText, setDisplayedText] = useState([]);
  const intervalRef = useRef(null);

  useEffect(() => {
    setDisplayedText([]); // Reset displayed text
    let index = 0;

    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }

    const startTyping = () => {
      intervalRef.current = setInterval(() => {
        setDisplayedText((prev) => [...prev, text[index] || ""]);
        index++;
        if (index >= text.length) {
          clearInterval(intervalRef.current);
        }
      }, speed);
    };

    const delayTimeout = setTimeout(startTyping, delay);

    return () => {
      clearTimeout(delayTimeout);
      clearInterval(intervalRef.current);
    };
  }, [text, speed, delay]);

  const formatText = (text) => {
    const words = text.split(" ");
    return words.map((word, idx) =>
      keywords.includes(word) ? (
        <BoldText key={idx}>{word} </BoldText>
      ) : (
        <span key={idx}>{word} </span>
      )
    );
  };

  return <TypingText>{formatText(displayedText.join(""))}</TypingText>;
};

TypingEffect.propTypes = {
  text: PropTypes.string.isRequired,
  keywords: PropTypes.array.isRequired,
  speed: PropTypes.number,
  delay: PropTypes.number,
};

TypingEffect.defaultProps = {
  speed: 100,
  keywords: [],
  delay: 0,
};

const TypingText = styled.div`
  font-size: 18px;
  font-weight: normal;
  white-space: pre-wrap;
  overflow: hidden;
  border-right: 3px solid transparent; /* Make the cursor visible */
  text-align: left
`;

const BoldText = styled.span`
  font-weight: bold;
`;

export default TypingEffect;
