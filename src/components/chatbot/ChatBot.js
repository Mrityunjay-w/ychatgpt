import React, { useEffect, useState, useRef, useMemo } from 'react'
import * as WebChat from 'botframework-webchat';
import './../../styles/ChatBot.css'
import { jwtDecode } from 'jwt-decode';

import axios from "axios";

import Image from '../image/Images';

//const ChatBot = ({ isMinimized, conversationHistory, onNewMessage, onToggleVisibility }) => {

    const ChatBot = () => {

    



    
        // const storedValue1 = sessionStorage.getItem('msal.account.keys');

        // let jsonArray = JSON.parse(storedValue1);
    
        // // Access the first (and only) element in the array
        // let tenantid1 = jsonArray[0];
        // console.log('storedvalue:', tenantid1);
    
    
        // const storedValue = sessionStorage.getItem(tenantid1);
        // console.log(storedValue);
    
    
        // const jsonObject = JSON.parse(storedValue);
    
        // // Accessing the username
        // const username = jsonObject.username;
    
        // console.log('Email', username);


  


    useEffect(() => {
        

           
            const initializeWebChat = async () => {


                const styleOptions = {
                    hideUploadButton: true,
                    sendBoxTextWrap: true
                };


              
    
                console.log('WebChat component mounted');


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
                                    text: `Hello `
                                })
                                .subscribe();


                            subscription.unsubscribe();
                        }
                    }
                });
                const instance = WebChat.renderWebChat(
                    { directLine, locale, styleOptions },
                    //webChatRef.current
                );

               // setWebChatInstance(instance);
               // setIsWebChatInitialized(true);

            };//end async
            initializeWebChat();
        

    }, [])
    
return(
    <>
   <div id="webchat"  role="main">
    </div>
    </>
)
   

    // const memoizedChatBot = useMemo(() => {
    //     return (
    //         <div>
    //             {isVisible && (
    //                 <div>
    //                     <div id="banner">
    //                         <h1>Y-ChatGPT</h1>
    //                         <button
    //                             onClick={handleMinimizeClick}
    //                             style={{
    //                                 marginRight: '20px',
    //                                 fontSize: '39px',
    //                                 backgroundColor: 'rgb(11, 85, 106)',
    //                                 color: 'white',
    //                                 border: 'none',
    //                                 cursor: 'pointer',
    //                             }}
    //                         >
    //                             {' '}
    //                             -{' '}
    //                         </button>
    //                     </div>
    //                     <div id="webchat" ref={webChatRef} role="main">
    //                         {conversationHistory.map((message, index) => (
    //                             <div key={index}>{message.text}</div>
    //                         ))}
    //                     </div>
    //                 </div>
    //             )}
    //         </div>
    //     );
    // }, [isVisible, handleMinimizeClick, webChatRef]);

    // return <>{memoizedChatBot}</>;
};

export default ChatBot;