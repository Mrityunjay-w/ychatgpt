// src/utils/highlightKeywords.js
import styled from 'styled-components';

const keywords = ['chatbot', 'AI', 'technical issues', 'leave applications']; // Add your keywords here

const highlightKeywords = (text) => {
  const parts = text.split(new RegExp(`(${keywords.join('|')})`, 'gi'));
  return parts.map((part, index) => 
    keywords.includes(part.toLowerCase()) 
    ? <HighlightedText key={index}>{part}</HighlightedText>
    : part
  );
};

const HighlightedText = styled.span`
  font-weight: bold;
  
`;

export default highlightKeywords;
