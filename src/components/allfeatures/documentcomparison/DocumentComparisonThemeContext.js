
import React, { createContext, useState } from 'react';

// Create a context for the theme
const DocumentComparisonThemeContext = createContext();

// Define a provider component to wrap the entire application
export const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState('light');
  const [downloadUrl, setDownloadUrl] = useState('');
  const [progress, setProgress] = useState(0);
  const [file1, setFile1] = useState(null);
  const [file2, setFile2] = useState(null);
  const [highlightedText1,setHighlightedText1] = useState('')
  const [highlightedText2,setHighlightedText2] = useState('')
  const [firstText,setFirstText] = useState('')
  const [secondText,setSecondText] = useState('')
  const [mergedText,setMergedText] = useState('')
  const [submitted1, setSubmitted1] = useState(false);

  // Function to toggle between light and dark theme
  const toggleTheme = () => {
    setTheme(prevTheme => prevTheme === 'light' ? 'dark' : 'light');
  };

  const [data, setData] = useState([]);

  const [loading, setLoading] = useState(false); 
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
    <DocumentComparisonThemeContext.Provider value={{ theme, toggleTheme, data , sendData,loading ,setLoading,loadTrue ,loadFalse,fileReady , fileTrue ,
                                    downloadUrl, setDownloadLink,progress,resetFileState,file1, setFile1,file2, setFile2,highlightedText1,setHighlightedText1,
                                    highlightedText2,setHighlightedText2,firstText,setFirstText,secondText,setSecondText,mergedText,setMergedText,submitted1, setSubmitted1 }}>
      {children}
    </DocumentComparisonThemeContext.Provider>
  );
};

export default DocumentComparisonThemeContext;