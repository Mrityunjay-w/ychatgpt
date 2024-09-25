import React, { useState, useCallback, useEffect } from 'react';
import * as WebChat from 'botframework-webchat';
import './../../styles/SearchAdvance.css';
import { useNavigate, Navigate } from 'react-router-dom';

const AssistBot = () => {
    const [isChatbotActive, setIsChatbotActive] = useState(true);
    const [isMinimized, setIsMinimized] = useState(false);
    const navigate = useNavigate();
   

    const handleClose = () => {
        setIsChatbotActive(false);
        navigate('/home');
    };

    const storedValue1 = sessionStorage.getItem('msal.account.keys');
    const jsonArray = JSON.parse(storedValue1);
    const tenantid1 = jsonArray[0];

    const storedValue = sessionStorage.getItem(tenantid1);
    const jsonObject = JSON.parse(storedValue);
    const username = jsonObject.username;

    const InitializeWebChat = useCallback(async () => {
        const styleOptions = {
            hideUploadButton: true,
            sendBoxTextWrap: true,
        };

        const avatarOptions = {
            botAvatarImage: 'path_to_footerLogo_image',
        };

        const tokenEndpointURL = new URL('https://default0da2a83b13d94a35965fec53a220ed.9d.environment.api.powerplatform.com/powervirtualagents/botsbyschema/cr09e_ychatgptAssistbot/directline/token?api-version=2022-03-01-preview');
        const locale = document.documentElement.lang || 'en';

        const apiVersion = tokenEndpointURL.searchParams.get('api-version');

        const [directLineURL, token] = await Promise.all([
            fetch(new URL(`/powervirtualagents/regionalchannelsettings?api-version=${apiVersion}`, tokenEndpointURL))
                .then(response => response.json())
                .then(({ channelUrlsById: { directline } }) => directline),
            fetch(tokenEndpointURL)
                .then(response => response.json())
                .then(({ token }) => token)
        ]);

        const directLine = WebChat.createDirectLine({ domain: new URL('v3/directline', directLineURL), token });

        const subscription = directLine.connectionStatus$.subscribe({
            next(value) {
                if (value === 2) {
                    directLine
                        .postActivity({
                            localTimezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
                            locale,
                            name: 'startConversation',
                            type: 'message',
                            text: `Hello ${username}`
                        })
                        .subscribe();

                    subscription.unsubscribe();
                }
            }
        });

        WebChat.renderWebChat({ directLine, locale, styleOptions, avatarOptions }, document.getElementById('webchat'));
    }, [username]);

    useEffect(() => {
        if (isChatbotActive) {
            InitializeWebChat();
        }
    }, [InitializeWebChat, isChatbotActive]);

    return (
        <>
            {/* <button onClick={handleChatbotToggle} className="open-chatbot-btn">
                {isChatbotActive ? 'Hide Assist Bot' : 'Show Assist Bot'}
            </button> */}

            {isChatbotActive && (
                <div className={`chatbot-popup ${isMinimized ? 'minimized' : ''}`}>
                    <div id="banner">
                        <h1 className="banner-title">Y-ChatGPT-Assist Bot</h1>
                        <div className="banner-controls">
                           
                            <button onClick={handleClose} className="banner-btn">X</button>
                        </div>
                    </div>
                     {!isMinimized && (
                        <>
                            <div id="webchat" role="main" style={{ height: 'calc(100% - 50px)' }}></div>
                            {/* Watermark */}
                            <div className="watermark1">Y-ChatGPT</div>
                        </>
                    )}
                </div>
            )}
        </>
    );
};

export default AssistBot;
