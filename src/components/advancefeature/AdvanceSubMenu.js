import React, { useState, useCallback } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import PropTypes from "prop-types";

const SidebarLink = styled(Link)`
  display: flex;
  color: #ffffff;
  justify-content: space-between;
  align-items: center;
  font-family: poppins;
  padding: 20px;
  list-style: none;
  height: 60px;
  text-decoration: none;
  font-size: 14px;
  font-weight: bold;

  &:hover {
    background: linear-gradient(to left, rgb(31, 78, 150), rgb(99, 44, 228));
    border-radius: 1rem;
    box-shadow: 0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1);
    cursor: pointer;
    font-size: 16px;
  }
`;

const SidebarLabel = styled.span``;

const DropdownLink = styled(Link)`
  hove:background: #2c5282;
  height: 60px;
  padding-left: 3rem;
  display: flex;
  font-family: poppins;
  align-items: center;
  text-decoration: none;
  color: #ffffff;
  font-size: 13px;
  font-weight: bold;

  &:hover {
    cursor: pointer;
    border-radius: 1rem;
    font-size: 15px;
  }
`;
const HighlightedText = styled.span`
  // font-weight: bold;
`;

const AdvanceSubMenu = ({ item, onMouseEnter, onMouseLeave }) => {
  const [subnav, setSubnav] = useState(false);
  const formatText = (text, keywords) => {
    const regex = new RegExp(`(${keywords.join("|")})`, "gi");
    const parts = text.split(regex);
    return parts.map((part, index) =>
      keywords.includes(part.toLowerCase()) ? (
        <HighlightedText key={index}>{part} </HighlightedText>
      ) : (
        <span key={index}>{part} </span>
      )
    );
  };
  const showSubnav = useCallback(
    () => setSubnav((prevSubnav) => !prevSubnav),
    []
  );

  return (
    <>
      <SidebarLink
        to={item.path}
        onClick={item.subNav && showSubnav}
        onMouseEnter={() => onMouseEnter(item.content, item.keywords)}
        onMouseLeave={onMouseLeave}
      >
        <div>
          {item.icon}
          <SidebarLabel>
            {formatText(item.title, item.keywords || [])}
          </SidebarLabel>
        </div>
        <div>
          {item.subNav && Array.isArray(item.subNav) && subnav
            ? item.iconOpened
            : item.subNav
            ? item.iconClosed
            : null}
        </div>
      </SidebarLink>
      {subnav &&
        Array.isArray(item.subNav) &&
        item.subNav.map((subItem, index) => {
          return (
            <DropdownLink
              to={subItem.path}
              key={index}
              onMouseEnter={() =>
                onMouseEnter(subItem.content, subItem.keywords)
              }
              onMouseLeave={onMouseLeave}
            >
              {subItem.icon}
              <SidebarLabel>
                {formatText(subItem.title, subItem.keywords || [])}
              </SidebarLabel>
            </DropdownLink>
          );
        })}
    </>
  );
};

export default AdvanceSubMenu;
