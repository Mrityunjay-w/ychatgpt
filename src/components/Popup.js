import React from 'react';
import PropTypes from 'prop-types';
import '../styles/Popup.css';
import RobotWatermark from '../assets/images/Assistbot.png';
import TypingEffect from './Typingeffect';

const Popup = ({ content, keywords }) => {
  return (
    <div className="popup">
      <div className="popup-inner">
        <TypingEffect text={content} keywords={keywords} speed={50} />
        <img src={RobotWatermark} alt="Robot Watermark" className="watermark" />
      </div>
    </div>
  );
};

Popup.propTypes = {
  content: PropTypes.string.isRequired,
  keywords: PropTypes.array.isRequired,
};

export default Popup;
