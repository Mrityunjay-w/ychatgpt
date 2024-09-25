import React from "react";
import { useNavigate } from "react-router-dom";
import Image from "../image/Images";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import BotFAQ from "./BotFAQ";
import "./../../styles/Header.css";

const CustomerQnA = () => {
  const navigate = useNavigate();

  const handleCustomerlogin = () => {
    navigate("/login");
  };

  return (
    <div>
      {/* <div className="w-full  text-Black text-center" style={{
                backgroundColor: '#1f4e96', display: 'flex',
                justifyContent: 'space-between', height: '80px'
            }}>
                <div className='text-2xl '>
                    
                    <div className="bannerHeader">
                        <span className="branding2">Y-ChatGPT</span>
                    </div>
                </div>

                <div className='' style={{ marginRight: '20px', marginTop: '17px' }}>

                    <button onClick={handleCustomerlogin} className='bg-transparent text-white mr-4 mb-2 py-2 px-4' style={{ border: 'none' }}>
                        <FontAwesomeIcon icon={faArrowLeft} style={{ fontSize: '20px' }} title="Back" />
                    </button>

                </div>
            </div> */}
      <header
        className="flex items-center justify-between bg-[#1f4e96] h-20 sm:h-24 px-4 sm:px-8"
        style={{ fontFamily: "Poppins" }}
      >
        {/* Left Section (Arrow Button) */}
        <div className="logo flex items-center">
          <button
            onClick={handleCustomerlogin}
            className="bg-transparent text-white py-2 px-2 sm:px-4 ml-2 sm:ml-6 md:ml-12 lg:ml-6 xl:ml-4"
            style={{ border: "none" }}
          >
            <FontAwesomeIcon
              className="text-lg sm:text-xl md:text-3xl xl:text-4xl 2xl:text-5xl"
              icon={faArrowLeft}
              title="Back"
            />
          </button>

          <div className="ml-[1360px]">
            <span className="text-white font-bold mr-5 text-sm sm:text-lg md:text-xl xl:text-2xl 2xl:text-3xl">
              Y-ChatGPT
            </span>
          </div>
        </div>
      </header>

      <div>
        <BotFAQ />
      </div>

      <div>
        <footer className="footer">
          <p>&copy; 2024 Yokogawa Electric Corporation. All rights reserved.</p>
        </footer>
      </div>
    </div>
  );
};

export default CustomerQnA;
