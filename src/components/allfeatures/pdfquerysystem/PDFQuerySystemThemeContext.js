
import React, { createContext, useState } from 'react';

// Create a context for the theme
const PDFQuerySystemThemeContext = createContext();

// Define a provider component to wrap the entire application
export const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState('light');

  // Function to toggle between light and dark theme
  const toggleTheme = () => {
    setTheme(prevTheme => prevTheme === 'light' ? 'dark' : 'light');
  };

  const [dataresponse, setDataresponse] = useState([]);

  const [loading, setLoading] = useState(false); // State to manage loading spinner
  const [fileReady, setFileReady] = useState(false);
  const [isQueryStarted, setIsQueryStarted] = useState(false);
  const [atLeastOneFileSelected, setAtLeastOneFileSelected] = useState(false);
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [inputText, setInputText] = useState('');
  const [x,setx] = useState()

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
    // setData(newData);
  };

  const startQuery = () => {
    setIsQueryStarted(true);
  };

  const setAtLeastOneFile = (hasFile) => {
    setAtLeastOneFileSelected(hasFile);
  };

  

  const handleSubmit = async (inputText,selectedFiles, queryType, queryData) => {
    // console.log('handleSubmit called with:', inputText, selectedFiles, queryType, queryData);
    setLoading(true);
    const formData = new FormData();
    formData.append('directory', inputText);
    // formData.append('selectedFiles', JSON.stringify(selectedFiles));
    for (let i=0;i<selectedFiles.length; i++){
       formData.append('selectedFiles', selectedFiles[i])
    }
    // selectedFiles.forEach(file => formData.append('selectedFiles', file));
    console.log("selected files",selectedFiles)
    formData.append('queryType', queryType);
    console.log(queryType)

    if (queryType === 'Metadata') {
      console.log('queryScreenId:', queryData.queryScreenId);
      formData.append('queryScreenId', queryData.queryScreenId);
      // console.log(queryData.queryScreenId)
      // formData.append('queryScreenId', queryData.queryScreenId ||'');
      formData.append('queryInstructions', queryData.queryInstructions);
      console.log('queryInstructions:', queryData.queryInstructions);
      // console.log("queryInstructions")
      // formData.append('queryInstructions', queryData.queryInstructions ||'');
    } else   {
      formData.append('queryText', queryData.queryText);
      console.log('queryText:', queryData.queryText);
      // formData.append('queryText', queryData.queryText || '');
    }

  

    try {
      console.log("Sending selected files to backend");
      const response = await fetch('http://localhost:5000/api/route', {
        method: 'POST',
        headers: {
          'x-directory-data': 'route2'
        },
        body: formData
      });
      const responseData = await response.json();
      console.log(responseData)
      // const responsex = await response.text()
      // const responseData = await response.text();
      setDataresponse(responseData);
      console.log(typeof(dataresponse))
      // setx(responsex)
      // setData(responseData);
      // console.log(setData)
      setFileReady(true);
    } catch (error) {
      console.error('Error submitting data:', error);
    }
    setLoading(false);
  };


  return (
    <PDFQuerySystemThemeContext.Provider value={{ theme, toggleTheme,dataresponse , sendData,loading ,loadTrue ,loadFalse,fileReady , fileTrue, isQueryStarted, startQuery, atLeastOneFileSelected, setAtLeastOneFile, handleSubmit,selectedFiles ,setSelectedFiles,inputText,setInputText ,x,setDataresponse }}>
      {children}
    </PDFQuerySystemThemeContext.Provider>
  );
};

export default PDFQuerySystemThemeContext;