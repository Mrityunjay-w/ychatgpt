import React, { useState, useEffect } from "react";
import Image from "../image/Images";
import * as WebChat from 'botframework-webchat';
import './../../styles/ChatBot.css';

const BotFAQ = () => {
  const [isClosed, setIsClosed] = useState(false);

  const handleClose = () => {
    setIsClosed(true);
    navigator('/login')
  };

  useEffect(() => {
    const InitializeWebChat = async () => {
      const styleOptions = {
        hideUploadButton: true,
        sendBoxTextWrap: true
      };

      const avatarOptions = {
        botAvatarImage: Image.footerLogo,
      };

      const tokenEndpointURL = new URL('https://default0da2a83b13d94a35965fec53a220ed.9d.environment.api.powerplatform.com/powervirtualagents/botsbyschema/cr09e_oprexYokoGenAiQnA/directline/token?api-version=2022-03-01-preview');

      const locale = document.documentElement.lang || 'en';

      const apiVersion = tokenEndpointURL.searchParams.get('api-version');

      const [directLineURL, token] = await Promise.all([
        fetch(new URL(`/powervirtualagents/regionalchannelsettings?api-version=${apiVersion}`, tokenEndpointURL))
          .then(response => {
            if (!response.ok) {
              throw new Error('Failed to retrieve regional channel settings.');
            }
            return response.json();
          })
          .then(({ channelUrlsById: { directline } }) => directline),
        fetch(tokenEndpointURL)
          .then(response => {
            if (!response.ok) {
              throw new Error('Failed to retrieve Direct Line token.');
            }
            return response.json();
          })
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
                text: 'Details on Y-ChatGPT'
              })
              .subscribe();

            subscription.unsubscribe();
          }
        }
      });

      WebChat.renderWebChat({ directLine, locale, styleOptions, avatarOptions }, document.getElementById('webchatbot'));
    };

    if (!isClosed) {
      InitializeWebChat();
    }
  }, [isClosed]);

  return (
    <>
      {!isClosed && (
        <div className="chatbot-containerbot">
          <div id="banner">
            <h1 style={{ fontSize: '20px' }}>Y-ChatGPT</h1>
            {/* <button
              onClick={handleClose}
              style={{
                fontSize: '20px',
                backgroundColor: 'red',
                color: 'white',
                border: 'none',
                cursor: 'pointer',
                marginLeft: '10px'
              }}
            >
              X
            </button> */}
          </div>
          <div id="webchatbot" role="main" style={{ height: 'calc(99% - 179px)', position: 'fixed', overflow: 'hidden', width: '100%' }}></div>
        </div>
      )}
    </>
  );
};

export default BotFAQ;
