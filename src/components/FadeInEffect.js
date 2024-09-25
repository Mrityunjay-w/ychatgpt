import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import styled from "styled-components";

const FadeInEffect = ({ text, delay, isBold }) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setIsVisible(true); // Make the text visible after the delay
    }, delay);

    return () => clearTimeout(timeout);
  }, [delay]);

  return (
    <FadeInText isVisible={isVisible} isBold={isBold}>
      {text}
    </FadeInText>
  );
};

FadeInEffect.propTypes = {
  text: PropTypes.string.isRequired,
  delay: PropTypes.number,
  isBold: PropTypes.bool, // New prop to handle bold text
};

FadeInEffect.defaultProps = {
  delay: 0,
  isBold: false, // Default not bold
};

const FadeInText = styled.div`
  opacity: ${({ isVisible }) => (isVisible ? 1 : 0)};
  transition: opacity 1s ease-in; /* Fade-in duration of 1 second */
  font-size: 18px;
  font-weight: ${({ isBold }) =>
    isBold ? "bold" : "normal"}; /* Set font-weight based on isBold prop */
  white-space: pre-wrap;
  overflow: hidden;
  text-align: left;
`;

export default FadeInEffect;
