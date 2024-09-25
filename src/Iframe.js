
import React, { useState } from "react";
import Image from "./components/image/Images";
import './styles/iframest.css';
import ChatBot from "./components/chatbot/ChatBot";
import * as WebChat from 'botframework-webchat';
import { useEffect } from "react";
import './styles/ChatBot.css'



const Iframe = () => {

    const [isClosed, setIsClosed] = useState(false);

    const toggleChatbot = () => {
        setIsClosed((prevIsClosed) => !prevIsClosed);
    };

    const storedValue1 = sessionStorage.getItem('msal.account.keys');

    let jsonArray = JSON.parse(storedValue1);

    // Access the first (and only) element in the array
    let tenantid1 = jsonArray[0];
    //console.log('storedvalue:', tenantid1);


    const storedValue = sessionStorage.getItem(tenantid1);
    // console.log(storedValue);


    const jsonObject = JSON.parse(storedValue);

    // Accessing the username
    const username = jsonObject.username;

    //console.log('Email', username);

    useEffect(() => {

        const InitializeWebChat = async () => {


            const styleOptions = {
                hideUploadButton: true,
                sendBoxTextWrap: true
            };

            const avatarOptions = {
                botAvatarImage: Image.footerLogo,
                // botAvatarInitials: 'BF',
                // userAvatarImage: '<URL to your user avatar image>',
                // userAvatarInitials: 'WC'
            };



            //   console.log('WebChat component mounted');


            const tokenEndpointURL = new URL('https://default0da2a83b13d94a35965fec53a220ed.9d.environment.api.powerplatform.com/powervirtualagents/botsbyschema/cr09e_yBot/directline/token?api-version=2022-03-01-preview');

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
                                // type: 'event',
                                type: 'message',
                                text: `Hello ${username}`
                            })
                            .subscribe();


                        subscription.unsubscribe();
                    }
                }
            });
            WebChat.renderWebChat({ directLine, locale, styleOptions, avatarOptions }, document.getElementById('webchat'));


        };//end async

        if (!isClosed) {
            InitializeWebChat();
        }
    }, [])

    return (
        <>

            
            <div className={`chatbot-icon ${isClosed ? 'closed' : ''}`} onClick={toggleChatbot} title="Y-ChatGPT">
                <img
                    src={Image.chatboticon}
                    alt="Chat Icon"
                    className="chat-icon"
                    style={{ width: '65px', height: '65px', position: 'fixed', bottom: '59px', right: '30px' }}
                />
            </div>

            <div className={`chatbot-container ${isClosed ? 'closed' : ''}`}>

                <div id="banner">
                    <h1 style={{ fontSize: '20px' }}>Y-ChatGPT</h1>
                    <button
                        onClick={toggleChatbot}
                        style={{
                            marginRight: '20px',
                            fontSize: '39px',
                            backgroundColor: 'rgb(11, 85, 106)',
                            color: 'white',
                            border: 'none',
                            cursor: 'pointer',
                        }}
                    >
                        {' '}
                        -{' '}
                    </button>
                </div>

                {/* <button className="minimize-button" style={{ width: '15px', background: 'white' }} onClick={toggleChatbot}>
              -
           
          </button> */}
                {/* <img style={{ width: '15px', background: 'white' }} src="../../assets/img/minimize.png" alt="Minimize Icon" title="Minimize" /> */}

                <div id="webchat" role="main" style={{ height: '1300px' }}></div>

                {/* <iframe
            id="chatbot-iframe"
            src="https://web.powerva.microsoft.com/environments/Default-0da2a83b-13d9-4a35-965f-ec53a220ed9d/bots/cr09e_yBot/webchat"
            
            style={{ height: '490px' }}
          ></iframe> */}
            </div>
        </>
    )
}

export default Iframe;