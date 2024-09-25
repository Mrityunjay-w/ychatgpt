import PropTypes from "prop-types";
import React, { useState, useCallback } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { IoArrowForward } from "react-icons/io5";

// const SubMenu = ({ item, onMouseEnter, onMouseLeave, sidebar }) => {
//   const [subnav, setSubnav] = useState(false);

//   const formatText = (text, keywords) => {
//     const regex = new RegExp(`(${keywords.join("|")})`, "gi");
//     const parts = text.split(regex);
//     return parts.map((part, index) =>
//       keywords.includes(part.toLowerCase()) ? (
//         <span className="font-bold bg-yellow-500" key={index}>
//           {part}{" "}
//         </span>
//       ) : (
//         <span className="" key={index}>
//           {part}{" "}
//         </span>
//       )
//     );
//   };

//   const showSubnav = useCallback(
//     () => setSubnav((prevSubnav) => !prevSubnav),
//     []
//   );

//   const textSizeClass = "textlg";

//   // Define the icon to be used for "Advance Features"
//   const advanceFeaturesIcon = <span className="ml-28"><IoArrowForward size={1} /></span>;

//   return (
//     <>
//       <Link
//         className={`flex items-center justify-between list-none mb-2 rounded-2xl hover:shadow-md
//           ${textSizeClass} h-[50px] sm:h-[55px] md:h-[60px] px-[10px]
//           hover:bg-sidebar-main hover:cursor-pointer hover:text-sm sm:hover:text-base lg:hover:text-sm xl:hover:text-lg`}
//         style={{
//           fontFamily: "poppins",
//         }}
//         to={item.path}
//         onClick={item.subNav && showSubnav}
//         onMouseEnter={() => onMouseEnter(item.content, item.keywords)}
//         onMouseLeave={onMouseLeave}
//         aria-expanded={subnav}
//       >
//         <div className="flex items-center gap-2">
//           {item.icon}
//           {sidebar && (
//             <span className="inline">
//               {formatText(item.title, item.keywords || [])}
//             </span>
//           )}
//         </div>
//         <div>
//           {item.subNav && Array.isArray(item.subNav) && subnav
//             ? item.iconOpened
//             : item.subNav && Array.isArray(item.subNav)
//             ? item.iconClosed
//             : null}
//         </div>
//       </Link>

//       {subnav &&
//         Array.isArray(item.subNav) &&
//         item.subNav.map((subItem, index) => {
//           return (
//             <Link
//               className={`flex items-center justify-between text-white hover:bg-sidebar-main rounded-2xl hover:shadow-md
//                 h-[40px] sm:h-[45px] md:h-[50px] lg:h-[55px] xl:h-[60px] px-4 ${textSizeClass}`}
//               style={{
//                 fontFamily: "poppins",
//               }}
//               to={subItem.path}
//               key={index}
//               onMouseEnter={() =>
//                 onMouseEnter(subItem.content, subItem.keywords)
//               }
//               onMouseLeave={onMouseLeave}
//             >
//               <div className="flex items-center gap-2">
//                 {subItem.icon}
//                 {sidebar && (
//                   <>
//                     <span className="inline">
//                       {formatText(subItem.title, subItem.keywords || [])}
//                     </span>
//                     {/* Add the icon only for "Advance Features" */}
//                     {subItem.title === "Advance Features" && advanceFeaturesIcon}
//                   </>
//                 )}
//               </div>
//               {!sidebar && (
//                 <div className="absolute left-[88px] top-0 bg-back-gradient hover:bg-sidebar-main text-white p-[10px] rounded z-[1]">
//                   {subItem.title}
//                 </div>
//               )}
//             </Link>
//           );
//         })}
//     </>
//   );
// };

// SubMenu.propTypes = {
//   item: PropTypes.object.isRequired,
//   onMouseEnter: PropTypes.func.isRequired,
//   onMouseLeave: PropTypes.func.isRequired,
//   sidebar: PropTypes.bool.isRequired,
// };

// export default SubMenu;


// const SubMenu = ({ item, onMouseEnter, onMouseLeave, sidebar }) => {
//   const [subnav, setSubnav] = useState(false);

//   const formatText = (text, keywords) => {
//     const regex = new RegExp(`(${keywords.join('|')})`, 'gi');
//     const parts = text.split(regex);
//     return parts.map((part, index) =>
//       keywords.includes(part.toLowerCase()) ? (
//         <HighlightedText key={index}>{part} </HighlightedText>
//       ) : (
//         <span key={index}>{part} </span>
//       )
//     );
//   };

//   const showSubnav = useCallback(() => setSubnav((prevSubnav) => !prevSubnav), []);

//   return (
//     <>
//       <SidebarLink
//         to={item.path}
//         onClick={item.subNav && showSubnav}
//         onMouseEnter={() => onMouseEnter(item.content, item.keywords)}
//         onMouseLeave={onMouseLeave}
//         sidebar={sidebar}
//       >
//         <div>
//           {item.icon}
//           {sidebar && <SidebarLabel>{formatText(item.title, item.keywords || [])}</SidebarLabel>}
//         </div>
//         <div>
//           {item.subNav && Array.isArray(item.subNav) && subnav
//             ? item.iconOpened
//             : item.subNav && Array.isArray(item.subNav)
//             ? item.iconClosed
//             : null}
//         </div>
//       </SidebarLink>
//       {subnav &&
//         Array.isArray(item.subNav) &&
//         item.subNav.map((subItem, index) => {
//           return (
//             <DropdownLink
//               to={subItem.path}
//               key={index}
//               onMouseEnter={() => onMouseEnter(subItem.content, subItem.keywords)}
//               onMouseLeave={onMouseLeave}
//               sidebar={sidebar}
//             >
//               {subItem.icon}
//               {sidebar && <SidebarLabel>{formatText(subItem.title, subItem.keywords || [])}</SidebarLabel>}
//               {!sidebar && <Tooltip>{subItem.title}</Tooltip>}
//             </DropdownLink>
//           );
//         })}
//     </>
//   );
// };

// SubMenu.propTypes = {
//   item: PropTypes.object.isRequired,
//   onMouseEnter: PropTypes.func.isRequired,
//   onMouseLeave: PropTypes.func.isRequired,
//   sidebar: PropTypes.bool.isRequired,
// };

// const SidebarLink = styled(Link)`
//   display: flex;
//   color: #e1e9fc;
//   justify-content: ${({ sidebar }) => (sidebar ? 'space-between' : 'center')};
//   align-items: center;
//   padding: ${({ sidebar }) => (sidebar ? '20px' : '10px')};
//   list-style: none;
//   height: 60px;
//   text-decoration: none;
//   font-size: ${({ sidebar }) => (sidebar ? '13px' : '20px')};

//   &:hover {
//     background: linear-gradient(to left, #1f4e96, #632ce4);
//     cursor: pointer;
//     font-size: ${({ sidebar }) => (sidebar ? '15px' : '20px')};
//   }

//   & > div {
//     display: flex;
//     align-items: center;
//   }
// `;

// const DropdownLink = styled(Link)`
//   background: #1f4e96;
//   height: 60px;
//   padding-left: 1rem;
//   display: flex;
//   align-items: center;
//   text-decoration: none;
//   color: #f5f5f5;
//   font-size: 11px;
//   position: relative;

//   &:hover {
//     background: linear-gradient(to right, #1f4e96, blue);
//     cursor: pointer;
//     font-size: 13px;
//   }

//   &:hover div {
//     display: ${({ sidebar }) => (sidebar ? 'none' : 'block')};
//   }
// `;

// const Tooltip = styled.div`
//   display: none;
//   position: absolute;
//   left: 88px;
//   top: 0;
//   background: #1f4e96;
//   color: #fff;
//   padding: 10px;
//   border-radius: 4px;
//   white-space: nowrap;
//   z-index: 1;
// `;

// const SidebarLabel = styled.span`
//   margin-left: 16px;
// `;

// const HighlightedText = styled.span`
//   font-weight: bold;
//   background-color: yellow; /* Highlight keywords */
// `;

// export default SubMenu;



// const SubMenu = ({ item, onMouseEnter, onMouseLeave, sidebar }) => {
//   const [subnav, setSubnav] = useState(false);

//   const formatText = (text, keywords) => {
//     const regex = new RegExp(`(${keywords.join("|")})`, "gi");
//     const parts = text.split(regex);
//     return parts.map((part, index) =>
//       keywords.includes(part.toLowerCase()) ? (
//         <span className="font-bold bg-yellow-500" key={index}>
//           {part}{" "}
//         </span>
//       ) : (
//         <span className="" key={index}>
//           {part}{" "}
//         </span>
//       )
//     );
//   };

//   const showSubnav = useCallback(
//     () => setSubnav((prevSubnav) => !prevSubnav),
//     []
//   );

//   const textSizeClass = "textlg";

//   // Define the icon to be used for "Advance Features"
//   const advanceFeaturesIcon = <span className="ml-2">🚀</span>;

//   return (
//     <>
//       <Link
//         className={`flex items-center justify-between list-none mb-2 rounded-2xl hover:shadow-md
//           ${textSizeClass} h-[50px] sm:h-[55px] md:h-[60px] px-[10px]
//           hover:bg-sidebar-main hover:cursor-pointer hover:text-sm sm:hover:text-base lg:hover:text-sm xl:hover:text-lg`}
//         style={{
//           fontFamily: "poppins",
//         }}
//         to={item.path}
//         onClick={item.subNav && showSubnav}
//         onMouseEnter={() => onMouseEnter(item.content, item.keywords)}
//         onMouseLeave={onMouseLeave}
//         aria-expanded={subnav}
//       >
//         <div className="flex items-center gap-2">
//           {item.icon}
//           {sidebar && (
//             <span className="inline">
//               {formatText(item.title, item.keywords || [])}
//             </span>
//           )}
//         </div>
//         <div>
//           {item.subNav && Array.isArray(item.subNav) && subnav
//             ? item.iconOpened
//             : item.subNav && Array.isArray(item.subNav)
//             ? item.iconClosed
//             : null}
//         </div>
//       </Link>

//       {subnav &&
//         Array.isArray(item.subNav) &&
//         item.subNav.map((subItem, index) => {
//           // Check if the submenu item is "Intranet"
//           const isIntranet = subItem.title === "Intranet";

//           return isIntranet ? (
//             // Render a non-clickable div for "Intranet"
//             <div
//               key={index}
//               className={`flex items-center justify-between text-white rounded-2xl h-[40px] sm:h-[45px] md:h-[50px] lg:h-[55px] xl:h-[60px] px-4 cursor-not-allowed ${textSizeClass}`}
//               style={{
//                 fontFamily: "poppins",
//               }}
//               onMouseEnter={() =>
//                 onMouseEnter(subItem.content, subItem.keywords)
//               }
//               onMouseLeave={onMouseLeave}
//             >
//               <div className="flex items-center gap-2">
//                 {subItem.icon}
//                 {sidebar && (
//                   <span className="inline">
//                     {formatText(subItem.title, subItem.keywords || [])}
//                   </span>
//                 )}
//               </div>
//             </div>
//           ) : (
//             // Render regular Link for all other items
//             <Link
//               className={`flex items-center justify-between text-white hover:bg-sidebar-main rounded-2xl hover:shadow-md
//                 h-[40px] sm:h-[45px] md:h-[50px] lg:h-[55px] xl:h-[60px] px-4 ${textSizeClass}`}
//               style={{
//                 fontFamily: "poppins",
//               }}
//               to={subItem.path}
//               key={index}
//               onMouseEnter={() =>
//                 onMouseEnter(subItem.content, subItem.keywords)
//               }
//               onMouseLeave={onMouseLeave}
//             >
//               <div className="flex items-center gap-2">
//                 {subItem.icon}
//                 {sidebar && (
//                   <>
//                     <span className="inline">
//                       {formatText(subItem.title, subItem.keywords || [])}
//                     </span>
//                     {subItem.title === "Advance Features" && advanceFeaturesIcon}
//                   </>
//                 )}
//               </div>
//               {!sidebar && (
//                 <div className="absolute left-[88px] top-0 bg-back-gradient hover:bg-sidebar-main text-white p-[10px] rounded z-[1]">
//                   {subItem.title}
//                 </div>
//               )}
//             </Link>
//           );
//         })}
//     </>
//   );
// };

// SubMenu.propTypes = {
//   item: PropTypes.object.isRequired,
//   onMouseEnter: PropTypes.func.isRequired,
//   onMouseLeave: PropTypes.func.isRequired,
//   sidebar: PropTypes.bool.isRequired,
// };

// export default SubMenu;

const SubMenu = ({ item, onMouseEnter, onMouseLeave, sidebar }) => {
  const [subnav, setSubnav] = useState(false);
  const [isIntranetDisabled, setIsIntranetDisabled] = useState(true); // New state for Intranet

  const formatText = (text, keywords) => {
    const regex = new RegExp(`(${keywords.join("|")})`, "gi");
    const parts = text.split(regex);
    return parts.map((part, index) =>
      keywords.includes(part.toLowerCase()) ? (
        <span className="font-bold bg-yellow-500" key={index}>
          {part}{" "}
        </span>
      ) : (
        <span key={index}>{part} </span>
      )
    );
  };

  const showSubnav = useCallback(() => setSubnav((prevSubnav) => !prevSubnav), []);

  const textSizeClass = "text-lg";

  return (
    <>
      <Link
        className={`flex items-center justify-between list-none mb-2 rounded-2xl hover:shadow-md
          ${textSizeClass} h-[50px] sm:h-[55px] md:h-[60px] px-[10px]
          hover:bg-sidebar-main hover:cursor-pointer hover:text-sm sm:hover:text-base lg:hover:text-sm xl:hover:text-xl`}
        style={{ fontFamily: "poppins" }}
        to={item.path}
        onClick={item.subNav && showSubnav}
        onMouseEnter={() => onMouseEnter(item.content, item.keywords)}
        onMouseLeave={onMouseLeave}
        aria-expanded={subnav}
      >
        <div className="flex items-center gap-2">
          {item.icon}
          {sidebar && <span>{formatText(item.title, item.keywords || [])}</span>}
        </div>
        <div>
          {item.subNav && Array.isArray(item.subNav) && subnav
            ? item.iconOpened
            : item.subNav && Array.isArray(item.subNav)
            ? item.iconClosed
            : null}
        </div>
      </Link>

      {subnav &&
        Array.isArray(item.subNav) &&
        item.subNav.map((subItem, index) => {
          const isDisabled = subItem.title === "Intranet" && isIntranetDisabled; // Disable "Intranet" sub-feature

          return (
            <div key={index} className="relative">
              <div className="flex items-center justify-between w-full"> {/* Flex container for alignment */}
                <Link
                  className={`flex items-center justify-between text-white  rounded-2xl hover:text-xl h-[50px] sm:h-[55px] md:h-[60px] lg:h-[55px] xl:h-[60px] px-4 ${textSizeClass}`}
                  style={{ fontFamily: "poppins", cursor: isDisabled ? "not-allowed" : "pointer" }}
                  to={isDisabled ? "#" : subItem.path} // Disable navigation for disabled Intranet
                  onClick={(e) => isDisabled && e.preventDefault()} // Prevent default action if disabled
                  onMouseEnter={() => onMouseEnter(subItem.content, subItem.keywords)}
                  onMouseLeave={onMouseLeave}
                >
                  <div className="flex items-center gap-2">
                    {subItem.icon} {/* Ensure the icon is here */}
                    {sidebar && <span>{formatText(subItem.title, subItem.keywords || [])}</span>}
                  </div>
                </Link>

                {/* Show the clickable button when Intranet is disabled */}
                {isDisabled && (
                  <button
                    className="bg-blue-500 text-white px-3 py-1 rounded-lg hover:bg-blue-700 ml-2" // Added margin-left for spacing
                    onClick={() => alert('For support regarding this feature, please contact the Y-ChatGPT Team for technical assistance.')} // Replace with your logic
                  >
                    On Demand
                  </button>
                )}
              </div>
            </div>
          );
        })}
    </>
  );
};


SubMenu.propTypes = {
  item: PropTypes.object.isRequired,
  onMouseEnter: PropTypes.func.isRequired,
  onMouseLeave: PropTypes.func.isRequired,
  sidebar: PropTypes.bool.isRequired,
};

export default SubMenu;

