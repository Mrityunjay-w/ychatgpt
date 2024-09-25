
import React, { createContext, useState } from 'react';

// Create a context for the theme
const ExcelAnalyzerThemeContext = createContext();

// Define a provider component to wrap the entire application
export const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState('light');

  // Function to toggle between light and dark theme
  const toggleTheme = () => {
    setTheme(prevTheme => prevTheme === 'light' ? 'dark' : 'light');
  };

  const [data, setData] = useState([]);

  const [loading, setLoading] = useState(false); // State to manage loading spinner
  const [fileReady, setFileReady] = useState(false);

  const [data1, setData1] = useState([]);

  const setdataa = (x) => {
    setData1(x);
  }

  const loadTrue = () => {
    setLoading(true);
  };
  const loadFalse = () => {
    setLoading(false);
  };
  const fileTrue = () => {
    setFileReady(true);
  };

  const sendData = (newData) => {
    setData(newData);
  };

  return (
    <ExcelAnalyzerThemeContext.Provider value={{ theme, toggleTheme, data , sendData,loading ,loadTrue ,loadFalse,fileReady , fileTrue, data1,setdataa   }}>
      {children}
    </ExcelAnalyzerThemeContext.Provider>
  );
};

export default ExcelAnalyzerThemeContext;