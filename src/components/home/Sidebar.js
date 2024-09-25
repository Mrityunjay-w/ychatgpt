import React, { useState } from "react";
import styled from "styled-components";
import { IconContext } from "react-icons/lib";
import { SidebarData } from "./SidebarData";
import SubMenu from "./SubMenu";
import Popup from "../Popup";
import { FaBars } from "react-icons/fa";
import { FaLessThan, FaGreaterThan, FaHeadset } from "react-icons/fa"; // Import the customer support icon
import { Link } from "react-router-dom"; // Import Link for navigation
import { context } from "react-three-fiber";
import Hometext from "./Hometext";
import Image from "../image/Images";
import policyImage from "../../assets/images/policy_2.png";
import supportBot from "../../assets/images/supportBot.png";

const SidebarNav = styled.nav`
  background: rgb(31, 78, 150);
  width: ${({ sidebar }) => (sidebar ? "333px" : "80px")};
  height: 100vh;
  display: flex;
  justify-content: center;
  top: 103px;
  left: 0;
  transition: 350ms;
  z-index: 10;

  @media (max-width: 768px) {
    width: ${({ sidebar }) =>
      sidebar ? "250px" : "60px"}; // Adjust for smaller screens
  }

  @media (max-width: 480px) {
    width: ${({ sidebar }) =>
      sidebar ? "200px" : "50px"}; // Further adjustments for mobile
  }
`;

const SidebarWrap = styled.div`
  width: 100%;
  font-weight: bold;
  position: relative;
`;

const ToggleButton = styled.div`
  position: absolute;
  bottom: 110px;
  left: ${({ sidebar }) => (sidebar ? "130px" : "26px")};
  background: #1f4e96;
  padding: 10px;
  border-radius: 50%;
  cursor: pointer;
  transition: 350ms;

  @media (max-width: 768px) {
    left: ${({ sidebar }) =>
      sidebar ? "100px" : "20px"}; // Adjust position for smaller screens
  }
`;

const SupportIcon = styled(FaHeadset)`
  position: absolute;
  bottom: 20px;
  left: 50%;
  transform: translateX(-50%);
  font-size: 24px;
  cursor: pointer;
  color: #fff;

  @media (max-width: 480px) {
    font-size: 20px; // Smaller icon for mobile
  }
`;

const SupportLink = styled(Link)`
  position: absolute;
  bottom: 60px;
  left: 50%;
  transform: translateX(-50%);
  font-size: 18px;
  color: #fff;
  text-decoration: none;
  cursor: pointer;

  @media (max-width: 480px) {
    font-size: 16px;
  }
`;

const PolicyLink = styled.a`
  position: fixed;
  bottom: 63px;
  left: 9%;
  transform: translateX(-50%);
  font-size: 20px;
  cursor: pointer;
  color: #fff;
  text-decoration: none;

  @media (max-width: 480px) {
    font-size: 18px; // Smaller text for mobile
  }
`;

const QRCodeImage = styled.img`
  position: fixed;
  bottom: 120px;
  left: 9%;
  transform: translateX(-50%);
  width: 100px;
  height: 100px;

  @media (max-width: 480px) {
    width: 80px; // Smaller QR code for mobile
    height: 80px;
  }
`;

const Sidebar = () => {
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
      {/* Side Hamgurger Icon Shown when screen size is less than equal to 7px */}
      <div>
        <Link
          to="#"
          className="fixed top-4 left-5 md:top-4 md:left-5 z-50 p-3 text-white rounded-full shadow-lg lg:hidden"
        >
          <FaBars onClick={toggleSidebar} />
        </Link>
      </div>

      {/* Responsive side bar */}
      <div
        className={`fixed inset-y-0 left-0 bg-background-opa w-[250px] xl:w-[300px] 2xl:w-[320px] h-[100vh] lg:bg-background text-white transition-transform transform ${
          sidebar ? "translate-x-0" : "-translate-x-full"
        } z-40 p-4  xl:translate-x-0 xl:relative top-20 sm:top-20 md:top-20 bottom-16 sm:py-1 sm:bottom-16 md:w-65 lg:block md:py-16 lg:top-20 xl:-top-4 2xl:-top-4`}
        style={{
          color: "#fff",
          fontFamily: "Poppins",
          fontWeight: "600",
        }}
      >
        {/* Sidebar Content */}
        <div>
          {SidebarData.map((item, index) => (
            <SubMenu
              item={item}
              key={index}
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
              sidebar={sidebar}
            />
          ))}
          {/* {popupVisible && (
            <Popup content={popupContent} keywords={popupKeywords} />
          )} */}

          {/* QR and Policies */}
          <div className="fixed bottom-36 lg:bottom-36 xl:bottom-36 2xl:bottom-36 left-8 flex items-center justify-center space-x-4 mb-4">
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
                className="w-12 h-12 md:-ml-2 lg:ml-0 xl:ml-1 2xl:ml-4"
              />
              <u className=" text-lg sm:text-xl md:text-lg lg:text-base xl:text-xl 2xl:text-xl no-underline transition-all duration-300">
                GMS Policies
              </u>
            </Link>
            {/* Uncomment this section if you want to use the QR Code */}
            {/* <img
    src={Image.QrCode}
    alt="QR Code"
    className="h-[100px] w-[100px] sm:h-[70px] sm:w-[70px] md:h-[80px] md:w-[80px] lg:h-[80px] lg:w-[80px] xl:h-[90px] xl:w-[90px] 2xl:h-[70px] 2xl:w-[70px] transition-all duration-300"
  /> */}
          </div>

          {/* Ychat Bot Link */}
          <div className="fixed bottom-[80px] 2xl:bottom-24 left-1/3 transform -translate-x-1/3 ml-3 flex items-center justify-center space-x-2">
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
    </div>
  );
};

export default Sidebar;
