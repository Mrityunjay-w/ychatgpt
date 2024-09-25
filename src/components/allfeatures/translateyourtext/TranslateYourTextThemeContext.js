
import React, { createContext, useState } from 'react';

// Create a context for the theme
const TranslateYourTextThemeContext = createContext();

// Define a provider component to wrap the entire application
export const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState('light');
  const [downloadUrl, setDownloadUrl] = useState('');
  const [progress, setProgress] = useState(0);

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

  // const updateProgress = (newProgress) => {
  //   setProgress(newProgress);
  // };

  const startTranslation = () => {
    // Simulate translation process
    const interval = setInterval(() => {
      setProgress((oldProgress) => {
        if (oldProgress === 100) {
          clearInterval(interval);
          setLoading(false);
          setFileReady(true);
          return 100;
        }
        const diff = Math.random() * 10;
        return Math.min(oldProgress + diff, 100);
      });
    }, 500);
  };

  const resetFileState = () => {
    setFileReady(false);
    setDownloadUrl('');
  };

  return (
    <TranslateYourTextThemeContext.Provider value={{ theme, toggleTheme, data , sendData,loading ,loadTrue ,loadFalse,fileReady , fileTrue ,
                                    downloadUrl, setDownloadLink,progress,resetFileState }}>
      {children}
    </TranslateYourTextThemeContext.Provider>
  );
};

export default TranslateYourTextThemeContext;