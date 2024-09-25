import React, { createContext, useState } from 'react';

// Create a context for the theme
const EmailGeneratorThemeContext = createContext();

// Define a provider component to wrap the entire application
export const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState('light');

  // Function to toggle between light and dark theme
  const toggleTheme = () => {
    setTheme(prevTheme => prevTheme === 'light' ? 'dark' : 'light');
  };

  const [data, setData] = useState([]);

  return (
    <EmailGeneratorThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </EmailGeneratorThemeContext.Provider>
  );
};

export default EmailGeneratorThemeContext;