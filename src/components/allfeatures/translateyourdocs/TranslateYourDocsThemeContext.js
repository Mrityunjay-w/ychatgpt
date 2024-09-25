
import React, { createContext, useState } from 'react';


// Create a context for the theme
const TranslateYourDocsThemeContext = createContext();

// Define a provider component to wrap the entire application
export const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState('light');
  const [downloadUrl, setDownloadUrl] = useState('');
  const [progress, setProgress] = useState(0);
  const [fileError, setFileError] = useState('');
  const [formError, setFormError] = useState('');
  const [serverError, setServerError] = useState('');

  // Function to toggle between light and dark theme
  const toggleTheme = () => {
    setTheme(prevTheme => prevTheme === 'light' ? 'dark' : 'light');
  };

  const [data, setData] = useState([]);

  const [loading, setLoading] = useState(false); // State to manage loading spinner
  const [fileReady, setFileReady] = useState(false);

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

  const setDownloadLink = (url) => {
    setDownloadUrl(url);
  };

  const resetFileState = () => {
    setFileReady(false);
    setDownloadUrl('');
  };

  return (
    <TranslateYourDocsThemeContext.Provider value={{ theme, toggleTheme, data , sendData,loading ,loadTrue ,loadFalse,fileReady,setFileReady , fileTrue ,
                                    downloadUrl, setDownloadLink,progress,resetFileState,fileError, setFileError,formError, setFormError,serverError, setServerError }}>
      {children}
    </TranslateYourDocsThemeContext.Provider>
  );
};

export default TranslateYourDocsThemeContext;