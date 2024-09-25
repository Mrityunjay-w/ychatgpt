
import React, { createContext, useState } from 'react';

// Create a context for the theme
const ChatWithYourDataThemeContext = createContext();

// Define a provider component to wrap the entire application
export const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState('light');

  // Function to toggle between light and dark theme
  const toggleTheme = () => {
    setTheme(prevTheme => prevTheme === 'light' ? 'dark' : 'light');
  };

  const [databasePath, setDatabasePath] = useState();
  const [fileName, setFileName] = useState('');

  const [loading, setLoading] = useState(false); // State to manage loading spinner
  const [fileReady, setFileReady] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);
  const [chatAdded , setChatAdded] = useState(false);

  const loadTrue = () => {
    setLoading(true);
  };
  const loadFalse = () => {
    setLoading(false);
  };
  const fileTrue = () => {
    setFileReady(true);
  };


  return (
    <ChatWithYourDataThemeContext.Provider value={{ theme, toggleTheme, databasePath, setDatabasePath ,loading ,loadTrue ,loadFalse,fileReady , fileTrue ,fileName,setFileName, selectedFile, setSelectedFile,chatAdded,setChatAdded}}>
      {children}
    </ChatWithYourDataThemeContext.Provider>
  );
};

export default ChatWithYourDataThemeContext;