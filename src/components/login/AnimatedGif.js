import React from 'react';
import videoFile from '../../assets/images/GKZDBfRjuZ6.gif'; // Adjust the path as necessary

const VideoButton = ({ onClick }) => {
    return (
        <img 
          src={videoFile}
          alt="Clickable GIF"       
          onClick={onClick}
          style={{ cursor: 'pointer',width: '76%', height: '100px', marginTop: '3px', marginRight: '10px' }} // Change cursor to pointer to indicate it's clickable
        />
      );
};

export default VideoButton;
