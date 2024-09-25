import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useMsal, useIsAuthenticated } from '@azure/msal-react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSignInAlt } from '@fortawesome/free-solid-svg-icons';

const SignIn = () => {
    const navigate = useNavigate();
    const { instance } = useMsal();
    const isAuthenticated = useIsAuthenticated();

    useEffect(() => {
        if (isAuthenticated) {
            navigate('/home');  // Redirect to home if authenticated
        }
    }, [isAuthenticated, navigate]);

    const handleSigninClick = () => {
        navigate('/login');  // Navigate to login page
    };

    return (
        <div className="background-video-container">
            <video autoPlay muted loop id="background-video" disablePictureInPicture>
                <source src="https://rgopenai951a.blob.core.windows.net/image/YCHATGPTV.mp4" type="video/mp4" />
                Your browser does not support the video tag.
            </video>
            <div className="content">
                <div className='divSignIn'>
                    <button className='btnSignIn' onClick={handleSigninClick}>
                        <FontAwesomeIcon icon={faSignInAlt} style={{ fontSize: '26px' }} title='Enter' />
                    </button>
                </div>
                <div>
                    <img className='lgsignin' src='assets/YokogawaPreview.png' alt="Sign In Logo" />
                </div>
            </div>
        </div>
    );
};

export default SignIn;
