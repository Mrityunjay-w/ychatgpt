import React, { useRef, useState } from 'react';

const PersonalProtectiveEquipmentVideoPlayer = ({ src, autoPlay = false, controls = true }) => {
    const videoRef = useRef(null);
    const [isPlaying, setIsPlaying] = useState(autoPlay);

    const togglePlay = () => {
        if (videoRef.current.paused) {
            videoRef.current.play();
            setIsPlaying(true);
        } else {
            videoRef.current.pause();
            setIsPlaying(false);
        }
    };

    return (
        <div>
            <video ref={videoRef} src={src} autoPlay={autoPlay} controls={controls}></video>
            <button onClick={togglePlay}>{isPlaying ? 'Pause' : 'Play'}</button>
        </div>
    );
};

export default PersonalProtectiveEquipmentVideoPlayer;
