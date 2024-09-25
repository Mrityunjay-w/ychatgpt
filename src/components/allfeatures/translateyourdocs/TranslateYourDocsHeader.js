import React, { useContext } from "react";
import TranslateYourDocsThemeContext from "./TranslateYourDocsThemeContext";
import Image from "../../image/Images";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";
import "./../../../styles/Header.css";

const TranslateYourDocsHeader = () => {
  const navigate = useNavigate();

  const handleAdvanceFeaturesClick = () => {
    navigate("/translationservices");
  };

  const { theme, toggleTheme } = useContext(TranslateYourDocsThemeContext);

  //   return (
  //     <div className="bg-background h-20">
  //       <div className="text-2xl ">
  //         <button
  //           onClick={handleAdvanceFeaturesClick}
  //           className="text-white mr-4 mb-2 py-2 px-4"
  //           style={{ border: "none" }}
  //         >
  //           <FontAwesomeIcon
  //             icon={faArrowLeft}
  //             style={{
  //               fontSize: "25px",
  //               position: "absolute",
  //               top: "38px",
  //               right: "126px",
  //             }}
  //             title="Back"
  //           />
  //         </button>

  //         {/* <img src={Image.logoYoko} alt='Logo' className="w-48 h-14 mt-0 mr-2 ml-20" /> */}
  //         <div className="text-white text-xl md:text-2xl xl:text-3xl ml-14 md:ml-20 lg:ml-0 font-bold">
  //           Y-ChatGPT
  //         </div>
  //         <div>
  //           <p
  //             className="text-3xl font-semibold"
  //             style={{ position: "absolute", top: "21px", right: "638px" }}
  //           >
  //             <span className="text-white">Translate Your Doc</span>
  //           </p>
  //         </div>

  //         <button
  //           onClick={handleAdvanceFeaturesClick}
  //           className="bg-transparent text-white mr-4 mb-2 py-2 px-4"
  //           style={{ border: "none" }}
  //         >
  //           <FontAwesomeIcon
  //             icon={faArrowLeft}
  //             style={{
  //               fontSize: "25px",
  //               position: "absolute",
  //               top: "38px",
  //               right: "126px",
  //             }}
  //             title="Back"
  //           />
  //         </button>

  //         {/* <img  alt='DarkMode' onClick={toggleTheme} src={theme === 'Image.light' ? Image.dark :Image.light } style={{width: '38px', height: '35px', position: 'relative', cursor: 'pointer',left:'1774px',bottom:'93px' }} />    */}
  //       </div>
  //     </div>
  //   );

  return (
    <div style={{ overflow: "hidden" }}>
      <header
        className="flex items-center justify-between bg-[#1f4e96] h-20 sm:h-24 px-4 sm:px-8"
        style={{ fontFamily: "Poppins" }}
      >
        {/* Left Section (Arrow Button) */}
        <div className="logo flex items-center">
          <button
            onClick={handleAdvanceFeaturesClick}
            className="bg-transparent text-white py-2 px-2 sm:px-4 ml-2 sm:ml-6 md:ml-12 lg:ml-6 xl:ml-4"
            style={{ border: "none" }}
          >
            <FontAwesomeIcon
              className="text-lg sm:text-xl md:text-3xl xl:text-4xl 2xl:text-5xl"
              icon={faArrowLeft}
              title="Back"
            />
          </button>
        </div>

        {/* Center Section (Translate Your Doc Text) */}
        <div className="flex justify-center">
          <span className="text-white text-sm sm:text-lg md:text-xl xl:text-2xl 2xl:text-3xl">
            Translate your doc
          </span>
        </div>

        {/* Right Section (Y-ChatGPT Text) */}
        <div className="flex items-center">
          <span className="text-white mr-5 font-bold text-sm sm:text-lg md:text-xl xl:text-2xl 2xl:text-3xl">
            Y-ChatGPT
          </span>
        </div>
      </header>
    </div>
  );
};

export default TranslateYourDocsHeader;
