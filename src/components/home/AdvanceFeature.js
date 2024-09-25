import React, { useEffect, useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import "./../../styles/Login.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import Image from "../image/Images";
import ReactModal from "react-modal";
import SOP from "./SOP";
import AdvanceSideBar from "../advancefeature/AdvanceSideBar";
import videoFile from "../../assets/images/GKZDBfRjuZ6.gif";
import AdvanceText from "./AdvanceText";

const AdvanceFeature = () => {
  const navigate = useNavigate();

  const handleAdvanceFeatureMenuClick = () => {
    navigate("/home");
  };

  const handleFAQ = () => {
    navigate("/faq");
  };

  const handleCustomerQnA = () => {
    navigate("/customerqna");
  };

  return (
    <div style={{ overflow: "hidden" }}>
      <header
        className="flex items-center justify-between bg-[#1f4e96] h-[60px] px-8"
        style={{ fontFamily: "Poppins", fontWeight:"600" }}
      >
        <div className="logo flex items-center">
          <button
            onClick={handleAdvanceFeatureMenuClick}
            className="bg-transparent text-white py-2 px-4 ml-7 md:ml-24 lg:ml-6 xl:ml-4"
            style={{ border: "none" }}
          >
            <FontAwesomeIcon
              className="text-xl md:text-3xl 2xl:text-5xl"
              icon={faArrowLeft}
              title="Back"
            />
            {/* Home */}
          </button>
        </div>

        <div className="flex items-center">
          <img
            src={videoFile}
            alt="Clickable GIF"
            onClick={handleCustomerQnA}
            className="w-36 h-40 md:w-30 md:h-32 xl:w-32 xl:h-32 mr-2 md:mr-3 lg:mr-6 cursor-pointer"
          />

          <button
            onClick={handleFAQ}
            className="text-white text-xl md:text-2xl xl:text-3xl  hover:text-gray-300 mr-0 md:mr-4 lg:mr-4 transition duration-200"
            style={{ fontFamily: "poppins" }}
          >
            FAQ
          </button>
        </div>
      </header>

      <div style={{ minHeight: "91vh" }}>
        {/* <div className='slide'>
                    <img className='imgsld' src={Image.openai} alt='Chatbot' />
                </div> */}

        <div className="row">
          <div className="col-3">
            <AdvanceSideBar />
          </div>
          <div className="col-8">
            <Outlet />
            <AdvanceText />
          </div>
        </div>
      </div>
      {/* <h5 style={{ position: 'fixed', left: '30px', color: 'white', fontSize: 'x-large' }}>Y-ChatGPT</h5> */}

      {/* <div>
                <footer className='footer'>
                    <img src={Image.footerhomelogo} alt='FooterLogo' style={{ width: '11%',position:'fixed',left:'17px'}} />
                  
                    <p>&copy; 2024 Yokogawa Electric Corporation. All rights reserved.</p>
                </footer>
            </div> */}
    </div>
  );
};

export default AdvanceFeature;
