import React, { useState, useCallback, useEffect } from "react";
import * as WebChat from "botframework-webchat";
import { useNavigate } from "react-router-dom";

const Internal = () => {
  const [isChatbotActive, setIsChatbotActive] = useState(true);
  const [isMinimized, setIsMinimized] = useState(false);
  const navigate = useNavigate();

  const handleClose = () => {
    setIsChatbotActive(false);
    navigate("/home");
  };

  const storedValue1 = sessionStorage.getItem("msal.account.keys");
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
      botAvatarImage: "path_to_footerLogo_image",
    };

    const tokenEndpointURL = new URL(
      "https://default0da2a83b13d94a35965fec53a220ed.9d.environment.api.powerplatform.com/powervirtualagents/botsbyschema/cr09e_ychatgptInternal/directline/token?api-version=2022-03-01-preview"
    );
    const locale = document.documentElement.lang || "en";

    const apiVersion = tokenEndpointURL.searchParams.get("api-version");

    const [directLineURL, token] = await Promise.all([
      fetch(
        new URL(
          `/powervirtualagents/regionalchannelsettings?api-version=${apiVersion}`,
          tokenEndpointURL
        )
      )
        .then((response) => response.json())
        .then(({ channelUrlsById: { directline } }) => directline),
      fetch(tokenEndpointURL)
        .then((response) => response.json())
        .then(({ token }) => token),
    ]);

    const directLine = WebChat.createDirectLine({
      domain: new URL("v3/directline", directLineURL),
      token,
    });

    const subscription = directLine.connectionStatus$.subscribe({
      next(value) {
        if (value === 2) {
          directLine
            .postActivity({
              localTimezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
              locale,
              name: "startConversation",
              type: "message",
              text: `Hello ${username}`,
            })
            .subscribe();

          subscription.unsubscribe();
        }
      },
    });

    WebChat.renderWebChat(
      { directLine, locale, styleOptions, avatarOptions },
      document.getElementById("webchat")
    );
  }, [username]);

  useEffect(() => {
    if (isChatbotActive) {
      InitializeWebChat();
    }
  }, [InitializeWebChat, isChatbotActive]);

  return (
    <>
      {isChatbotActive && (
        <>
          {/* Overlay for background dimming */}
          <div
            className="fixed inset-0 bg-black bg-opacity-50 z-[1000]"
            onClick={handleClose}
          ></div>

          {/* Chatbot Popup */}
          <div
            className={`chatbot-popup ${
              isMinimized ? "minimized" : ""
            } fixed bottom-2 right-2 w-[95vw] sm:w-[90vw] md:w-[85vw] lg:w-[80vw] xl:w-[75vw] 2xl:w-[79vw] max-w-[1900px] h-[80vh] sm:h-[85vh] md:h-[88vh] lg:h-[90vh] max-h-[900px] bg-white bg-opacity-10 rounded-lg shadow-lg flex flex-col z-[1001] backdrop-blur-lg`}
          >
            {/* Banner */}
            <div
              id="banner"
              className="flex justify-between items-center bg-background text-white py-2 px-4 rounded-t-lg font-poppins"
            >
              <h1 className="banner-title font-semibold text-lg md:text-xl">
                Y-ChatGPT-Internal
              </h1>
              <div className="banner-controls flex gap-2">
                <button
                  onClick={handleClose}
                  className="close-modal-button text-white text-lg md:text-xl cursor-pointer"
                >
                  X
                </button>
              </div>
            </div>

            {/* Chatbot body and watermark */}
            {!isMinimized && (
              <>
                <div
                  id="webchat"
                  role="main"
                  className="flex-grow"
                  style={{ height: "calc(100% - 50px)" }}
                ></div>
                <div className="watermark1 text-center font-bold text-transparent text-4xl sm:text-6xl md:text-8xl lg:text-9xl opacity-30 absolute inset-0 flex items-center justify-center pointer-events-none font-poppins">
                  Y-ChatGPT
                </div>
              </>
            )}
          </div>
        </>
      )}
    </>
  );
};

export default Internal;
