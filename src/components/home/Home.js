import React, { useEffect, useState } from "react";
import "./../../styles/Home.css";
import Image from "./../image/Images";
import ChatBot from "../chatbot/ChatBot";
import "./../../assets/images/2304.i039.017.F.m004.c9.AI generated art AI powered content creation isometric.jpg";
import "./../../assets/images/5162744.jpg";
import "./../../assets/images/Impacts-of-AI-in-business.jpg";
import { RiLogoutCircleRLine } from "react-icons/ri";

import "./../../assets/images/rm373batch5-banner-08.jpg";

//-------------

import "./../../styles/Login.css";
import { Outlet, Route, Routes } from "react-router-dom";
import Login from "../login/Login";
import Iframe from "../../Iframe";
import { useMsal } from "@azure/msal-react";

//-----
import { useNavigate, Navigate } from "react-router-dom";
import TranslateDoc from "../upload/TranslateDoc";
import { Link } from "react-router-dom";
import ReactModal from "react-modal";
import Dashboard from "../admin/Dashboard";

import {
  AuthenticatedTemplate,
  UnauthenticatedTemplate,
} from "@azure/msal-react";
import Internal from "./Internal";
import SOP from "./SOP";
import Intranet from "./Intranet";
import Web from "./Web";
import AssistBot from "./AssistBot";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { AiOutlineLogout } from "react-icons/ai";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { faGlobeAmericas } from "@fortawesome/free-solid-svg-icons";
import { faNetworkWired } from "@fortawesome/free-solid-svg-icons";
import { faRobot } from "@fortawesome/free-solid-svg-icons";
import { faMicrochip } from "@fortawesome/free-solid-svg-icons";
import { faSignOutAlt } from "@fortawesome/free-solid-svg-icons";
import Sidebar from "./Sidebar";
import Hometext from "./Hometext";
import "./../../styles/Header.css";
import "./../../styles/Footer.css";
import Oprex from "../../assets/images/oprex.png";
import VideoButton from "../login/AnimatedGif";
import videoFile from "../../assets/images/GKZDBfRjuZ6.gif";

const Home = () => {
  //---new--
  const [currentImage, setCurrentImage] = useState(0);
  const [redirect, setRedirect] = useState(false);
  const [timeoutId, setTimeoutId] = useState(null);
  const [externalPageVisible, setExternalPageVisible] = useState(false); // Added state for visibility

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isModalOpenChat, setIsModalOpenChat] = useState(false);
  const [isModalOpenImageOCR, setIsModalOpenImageOCR] = useState(false);

  const [isSidebarExpanded, setIsSidebarExpanded] = useState(false);

  const navigate = useNavigate();

  const handleSearchOrientedMenu = () => {
    navigate("/searchoriented");
  };
  const handleActionOrientedMenu = () => {
    navigate("/actionoriented");
  };

  const handleAdvaceMenuClick = () => {
    navigate("/advancefeature");
  };

  const handleBarChart = () => {
    navigate("/barchart");
  };

  const { instance } = useMsal();

  useEffect(() => {
    localStorage.removeItem("login");
  }, []);

  const handleLogout = () => instance.logout();

  const imgv = [
    Image.aiBusiness,
    Image.aiFuturistic,
    Image.banner5162744,
    Image.isometric,
    Image.microchip,
  ];

  //----------------Based on Username-----------------------

  const handleFAQ = () => {
    navigate("/faq");
  };

  const handleCustomerQnA = () => {
    navigate("/customerqna");
  };

  const isAdminUser = () => {
    const storedValue1 = sessionStorage.getItem("msal.account.keys");

    let jsonArray = JSON.parse(storedValue1);
    let tenantid1 = jsonArray[0];

    const storedValue = sessionStorage.getItem(tenantid1);
    const jsonObject = JSON.parse(storedValue);

    // Accessing the username
    const username = jsonObject.username;
    // console.log('Logged-in Username:', username);

    const adminUsernames = [
      "ratnesh.sah@yokogawa.com",
      "NirajKumar.Dwivedi@yokogawa.com",
      "shrikant.deshmukh@yokogawa.com",
      "Sanjunath.BR@yokogawa.com",
    ];

    // const adminUsernames = ['Sanjunath.BR@yokogawa.com']

    // console.log('admin', adminUsernames)

    const isAdmin = adminUsernames.includes(username);

    //console.log('Is Admin:', isAdmin);

    return isAdmin;
  };

  return (
    <div>
      <div style={{ overflow: "hidden" }}>
        {/* Header */}
        <header
          className="flex items-center justify-between bg-[#1f4e96] h-[60px] px-8"
          style={{ fontFamily: "poppins" }}
        >
          <div className="logo flex items-center">
            <h4 className="text-white text-xl md:text-2xl xl:text-3xl ml-14 md:ml-20 lg:ml-0 font-bold">Y-ChatGPT</h4>
          </div>

          <div className="flex items-center">
            <img
              src={videoFile}
              alt="Clickable GIF"
              onClick={handleCustomerQnA}
              className="w-32 h-32 cursor-pointer"
            />

            <button
              onClick={handleFAQ}
              className="text-white text-xl md:text-2xl xl:text-3xl  hover:text-gray-300 mr-10 transition duration-200"
              style={{ fontFamily: "poppins" }}
            >
              FAQ
            </button>

            {isAdminUser() && (
              <button
                onClick={handleBarChart}
                className="text-white text-xl md:text-2xl xl:text-3xl  hover:text-gray-300 transition duration-200"
              >
                Admin
              </button>
            )}

            <button
              onClick={handleLogout}
              className="text-white text-3xl hover:text-gray-300 transition duration-200"
            >
              <RiLogoutCircleRLine icon={RiLogoutCircleRLine} title="Logout" />
            </button>
          </div>
        </header>

        {/* <div className="w-full  text-Black text-center" style={{
               backgroundColor: '#1f4e96', display: 'flex',
               justifyContent: 'space-between', height: '80px'
            }}> */}
        {/* <div className='text-2xl '> */}
        {/* <img style={{ width: '200px', marginLeft: '60px', marginTop: '15px' }} src={Image.headerlogo} alt='logo' /> */}
        {/* <div className="bannerHeader">
                         <span className="branding2" style={{marginTop:'7px'}}>Y-ChatGPT</span>
                    </div>                   
               </div> */}

        {/* <button onClick={handleFAQ} className='text-white mb-3  ' style={{fontSize: '30px', position: 'fixed', right: '290px', top: '20px' }}>FAQ</button>                    
                    <img src={videoFile} alt="Clickable GIF" onClick={handleCustomerQnA} style={{width: '120px', height: '89px', position: 'absolute', right: '120px'}} /> */}
        {/* <VideoButton  onClick={handleCustomerQnA} /> */}

        {/* {isAdminUser() && (
                     <button className="bg-transparent text-white mr-4 mb-2 py-2 px-4 " style={{ border: 'none',fontSize:'25px'}} onClick={handleBarChart}>
                        Admin
                     </button>
                  )} */}

        {/* <div className='' style={{ marginRight: '20px', marginTop: '17px' }}>
                  <button className="bg-transparent text-white mr-4 mb-2 py-2 px-4 " style={{ border: 'none' }} onClick={handleLogout}>
                     <FontAwesomeIcon icon={faSignOutAlt} title='Logout' style={{ fontSize: '25px' }} />
                  </button> */}

        {/* <button className="bg-transparent text-white mr-4 mb-2 py-2 px-4 " style={{ border: 'none' }} onClick={handleLogout}>
                  <img src={Image.logoutimage} alt='Image' style={{verticalAlign:'middle',width:'50px',height:'50px',borderRadius:'50%'} }/>
               </button> */}
        {/* </div>
            </div> */}

        {/* <div style={{ minHeight: '91.3vh' }}>
               <div className='row'>
                  <div style={{height:'10px'}}>
                     <Sidebar style={{ display: 'flex', justifyContent: 'flex-start' }} />                     
                  </div>
                  <div className='col-8'>
                     <Outlet />
                  </div>
                 
               </div>
            </div> */}

        <div class="ml-0 lg:ml-[210px] xl:ml-[280px] 2xl:ml-[335px]">
          <div class="sidebar">
            <Sidebar
              style={{ display: "flex", justifyContent: "flex-start" }}
            />
          </div>
          <div class="main-content ">
            <Outlet />
            <Hometext />
          </div>
        </div>
        {/* <footer class="footer">
  <img src={Image.footerhomelogo} alt="FooterLogo" style="width: 11%;" />
  <p>&copy; 2024 Yokogawa Electric Corporation. All rights reserved.</p>
</footer> */}

        {/* <div>
               <footer className='footer'>
                  <img src={Image.footerhomelogo} alt='FooterLogo' style={{  width: '11%',position:'fixed',left:'17px' }} />
                 
                  <p>&copy; 2024 Yokogawa Electric Corporation. All rights reserved.</p>
               </footer>
            </div>  */}
      </div>
    </div>
  );
};

export default Home;
