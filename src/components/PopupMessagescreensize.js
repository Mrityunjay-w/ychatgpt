import React, { useEffect, useState } from 'react';
import '../styles/PopupMessagescreensize.css'; // Assuming you have some CSS for styling

const PopupMessage = ({ isVisible, onClose }) => {
  return (
    isVisible && (
      <div className="popup-overlay">
        <div className="popup-container">
          <p>Please adjust your screen size for the best experience.</p>
          <p>For adjust screen resolution press CTRL++ for Zoom In , CTRL-- for Zoom Out</p>
          {/* <button onClick={onClose}>Close</button> */}
        </div>
      </div>
    )
  );
};

export default PopupMessage;
