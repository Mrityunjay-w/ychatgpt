// src/components/AdvanceSideBar.js
import React, { useState } from "react";
import styled from "styled-components";
import { IconContext } from "react-icons/lib";
import AdvanceSubMenu from "./AdvanceSubMenu";
import { AdvanceSideBarData } from "./AdvanceSideBarData";
import Popup from "../Popup";
import { Link } from "react-router-dom"; // Import Link for navigation
import { FaBars } from "react-icons/fa";
import policyImage from "../../assets/images/policy_2.png";
import supportBot from "../../assets/images/supportBot.png";

const SidebarNav = styled.nav`
  background: rgb(31, 78, 150);
  width: 333px;
  height: 91vh;
  display: flex;
  justify-content: center;
  top: 103px; /* Adjust this value to position the sidebar as needed */
  left: 0;
  transition: 350ms;
  z-index: 10;
`;

// const SidebarWrap = styled.div`
//   width: 100%;
//   overflow-y: overlay;
//   overflow-x: hidden;
//   font-weight: bold;
// `;

const AdvanceSideBar = () => {
  const [popupContent, setPopupContent] = useState("");
  const [popupKeywords, setPopupKeywords] = useState([]);
  const [popupVisible, setPopupVisible] = useState(false);
  const [sidebar, setSidebar] = useState(true);

  const handleMouseEnter = (content, keywords) => {
    setPopupContent(content);
    setPopupKeywords(keywords);
    setPopupVisible(true);
  };

  const handleMouseLeave = () => {
    setPopupVisible(false);
  };

  const toggleSidebar = () => {
    setSidebar(!sidebar); // Toggle sidebar open/close
  };

  return (
    <div>
      <div>
        <Link
          to="#"
          className="fixed top-5 left-5 md:top-5 md:left-[40px] z-50 p-3 text-white rounded-full shadow-lg lg:hidden"
        >
          <FaBars onClick={toggleSidebar} />
        </Link>
      </div>
      <div
        className={`fixed inset-y-0 left-0 bg-background-opa w-[250px] xl:w-[300px] 2xl:w-[320px] h-[100vh] lg:bg-background text-white transition-transform transform ${
          sidebar ? "translate-x-0" : "-translate-x-full"
        } z-40  xl:translate-x-0 xl:relative top-24 md:top-24 bottom-16 sm:py-1 sm:top-24 sm:bottom-16 md:w-65 lg:block md:py-16 lg:py-0 xl:top-0 2xl:top-0`}
        style={{
          fontFamily: "poppins",
          color: "#fff",
          padding: "20px 20px",
          fontWeight: "600",
        }}
      >
        <div>
          {AdvanceSideBarData.map((item, index) => (
            <AdvanceSubMenu
              item={item}
              key={index}
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
            />
          ))}
          {/* {popupVisible && (
            <Popup
              content={popupContent}
              onClose={handleMouseLeave}
              keywords={popupKeywords}
            />
          )} */}
        </div>
        {/* Policies */}
        <div className="fixed bottom-36 lg:bottom-36 xl:bottom-36 2xl:bottom-40  flex items-center justify-center space-x-4 mb-4">
          <Link
            href="http://gappli01.jp.ykgw.net/GMS/default_e.aspx"
            target="_blank"
            onClick={() => {
              window.open(
                "http://gappli01.jp.ykgw.net/GMS/files/GMS-030/p/2/GMSe-030.pdf"
              );
              window.open(
                "http://gappli01.jp.ykgw.net/GMS/files/GMS-030/p/1/GMSj-030.pdf"
              );
            }}
            className="flex items-center space-x-2 text-center"
          >
            <img
              src={policyImage}
              alt="Clickable GIF"
              className="w-12 h-12 md:-ml-1 lg:ml-2 xl:ml-4"
            />
            <u className=" text-lg sm:text-xl md:text-lg lg:text-base xl:text-xl 2xl:text-xl no-underline transition-all duration-300">
              GMS Policies
            </u>
          </Link>
        </div>
        {/* Support Bot */}
        <div className="fixed bottom-[80px] 2xl:bottom-28 left-1/3 transform -translate-x-1/3 ml-4 flex items-center justify-center space-x-2">
          {/* <FaHeadset className="text-xs sm:text-sm md:text-lg lg:text-xl xl:text-2xl 2xl:text-2xl cursor-pointer text-white" /> */}
          <img src={supportBot} className="w-14 h-14 cursor-pointer " />
          <Link
            className="text-xs sm:text-sm md:text-lg lg:text-base xl:text-xl 2xl:text-xl cursor-pointer whitespace-nowrap"
            to="/searchorientedfunctionalities/YchatGPTSupportBot"
          >
            {/* Y-ChatGPTSupportBot */}
            Y-ChatGPT Support-Bot
          </Link>
        </div>
      </div>
    </div>
  );
};

export default AdvanceSideBar;
