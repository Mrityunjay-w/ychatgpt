import React, { createContext, useState } from 'react';

// Create a context for the theme
const PersonalProtectiveEquipmentThemeContext = createContext();

// Define a provider component to wrap the entire application
export const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState('light');

  // Function to toggle between light and dark theme
  const toggleTheme = () => {
    setTheme(prevTheme => prevTheme === 'light' ? 'dark' : 'light');
  };

  const [data, setData] = useState([]);

  return (
    <PersonalProtectiveEquipmentThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </PersonalProtectiveEquipmentThemeContext.Provider>
  );
};

export default PersonalProtectiveEquipmentThemeContext;