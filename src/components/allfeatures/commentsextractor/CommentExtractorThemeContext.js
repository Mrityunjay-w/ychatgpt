// import React, { createContext, useState } from 'react';

// // Create a context for the theme
// const CommentExtractorThemeContext = createContext();

// // Define a provider component to wrap the entire application
// export const ThemeProvider = ({ children }) => {
//   const [theme, setTheme] = useState('light');

//   // Function to toggle between light and dark theme
//   const toggleTheme = () => {
//     setTheme(prevTheme => prevTheme === 'light' ? 'dark' : 'light');
//   };

//   const [data, setData] = useState([]);

//   const [loading, setLoading] = useState(false); // State to manage loading spinner
//   const [fileReady, setFileReady] = useState(false);
//   const [userEmail, setUserEmail] = new useState('user@email.com');
//   const [ccEmail, setccEmail] = new useState('cc@gmail.com');
//   const [subject, setSubject] = new useState('Subject');
//   const [fileUrls, setFileUrls] = useState({ excel_url: '', pdf_url: '' });

//   const loadTrue = () => {
//     setLoading(true);
//   };
//   const loadFalse = () => {
//     setLoading(false);
//   };
//   const fileTrue = () => {
//     setFileReady(true);
//   };

//   const sendData = (newData) => {
//     setData(newData);
//   };

//   return (
//     <CommentExtractorThemeContext.Provider value={{ theme, toggleTheme, data , sendData,loading ,loadTrue ,loadFalse,fileReady , fileTrue ,userEmail ,setUserEmail,ccEmail,setccEmail,subject,setSubject, fileUrls, setFileUrls }}>
//       {children}
//     </CommentExtractorThemeContext.Provider>
//   );
// };

// export default CommentExtractorThemeContext;

import React, { createContext, useState } from 'react';

// Create a context for the theme
const CommentExtractorThemeContext = createContext();

// Define a provider component to wrap the entire application
export const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState('light');

  // Function to toggle between light and dark theme
  const toggleTheme = () => {
    setTheme(prevTheme => prevTheme === 'light' ? 'dark' : 'light');
  };

  const [data, setData] = useState([]);

  const [loading, setLoading] = useState(false); 
  const [fileReady, setFileReady] = useState(false);
  const [userEmail, setUserEmail] = useState('');
  const [ccEmail, setccEmail] = useState('');
  const [subject, setSubject] = useState('');
  const [fileUrls, setFileUrls] = useState({ excel_url: '', pdf_url: '' });
  const [fileError, setFileError] = useState('');
  const [formError, setFormError] = useState('');
  const [serverError, setServerError] = useState('');

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
    <CommentExtractorThemeContext.Provider value={{ theme, toggleTheme, data , sendData,loading ,loadTrue ,loadFalse,fileReady,setFileReady , fileTrue ,userEmail ,setUserEmail,ccEmail,setccEmail,subject,setSubject, fileUrls, setFileUrls,fileError, setFileError,formError, setFormError,serverError, setServerError }}>
      {children}
    </CommentExtractorThemeContext.Provider>
  );
};

export default CommentExtractorThemeContext;