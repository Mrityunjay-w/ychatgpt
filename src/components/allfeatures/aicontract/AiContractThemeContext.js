import React, { createContext, useState } from 'react';

// Create a context for the theme
const AiContractThemeContext = createContext();

// Define a provider component to wrap the entire application
export const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState('light');
  const [downloadUrl, setDownloadUrl] = useState('')
  const [successMessage, setSuccessMessage] = useState('');
  const [projectName, setProjectName] = useState("");
  const [showVersionFields, setShowVersionFields] = useState(false);
  const [versionName, setVersionName] = useState("");
  const [showFileUpload, setShowFileUpload] = useState(false);
  const [action, setAction] = useState("create");
  const [selectedProject, setSelectedProject] = useState("");
  const [extraAction, setExtraAction] = useState("");
  const [version, setVersion] = useState('create');
  const [file,setFile ] = useState()
  const [projects, setProjects] = useState([]);
  const [selectedVersion, setSelectedVersion] = useState('');
  const [option, setOption] = useState("contract");
  const [selectedPdfFile, setSelectedPdfFile] = useState("");
  const [pdffiles,setpdffiles]=useState([])
  // const [selectedPdfFile, setSelectedPdfFile] = useState(pdffiles.length > 0 ? pdffiles[0] : '');
  const [versionName1, setVersionName1] = useState("");
  const [showFileUpload1, setShowFileUpload1] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [submitted1, setSubmitted1] = useState(false);
  const [submitted2, setSubmitted2] = useState(false);
  const [selectedProject1, setSelectedProject1] = useState('');
  const [submitted3, setSubmitted3] = useState(false);
  const [deleteVersion1, setDeleteVersion1] = useState('');
  const [selectedOption2, setSelectedOption2] = useState('');

  // Function to toggle between light and dark theme
  const toggleTheme = () => {
    setTheme(prevTheme => prevTheme === 'light' ? 'dark' : 'light');
  };

  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false); // State to manage loading spinner
  const [loading1,setLoading1] = useState(false);
  const [fileReady, setFileReady] = useState(false);
  const [selectedOption, setSelectedOption] = useState('contract');
  // const [selectedVersion, setSelectedVersion] = useState('');
  const [selectedisplay,setSelectedisplay] = useState('')
  const [searchPrompt, setSearchPrompt] = useState('');
  const [fileError, setFileError] = useState('');
  const [formError, setFormError] = useState('');
  const [serverError, setServerError] = useState('');
  const [showactiondropdown,setShowactiondropdown]=useState(false)
  
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
    <AiContractThemeContext.Provider value={{theme, toggleTheme, data, sendData, loading, setLoading, loadTrue, loadFalse, fileReady, fileTrue,
      downloadUrl, setDownloadLink, resetFileState, selectedOption, setSelectedOption,
      projectName, setProjectName, showVersionFields, setShowVersionFields, versionName, setVersionName,
      showFileUpload, setShowFileUpload, action, setAction, selectedProject, setSelectedProject,
      extraAction, setExtraAction,version, setVersion,file,setFile,successMessage, setSuccessMessage,projects, setProjects,selectedisplay,setSelectedisplay,
      searchPrompt, setSearchPrompt,selectedVersion, setSelectedVersion,option, setOption,selectedPdfFile, setSelectedPdfFile,versionName1, setVersionName1,
      showFileUpload1, setShowFileUpload1,submitted, setSubmitted,submitted1, setSubmitted1,pdffiles,setpdffiles,submitted2, setSubmitted2,selectedProject1, setSelectedProject1,
      submitted3, setSubmitted3,deleteVersion1, setDeleteVersion1,selectedOption2, setSelectedOption2, fileError, setFileError,formError, setFormError,serverError, setServerError,
      showactiondropdown,setShowactiondropdown,loading1,setLoading1}}>
      {children}
    </AiContractThemeContext.Provider>
  );
};

export default AiContractThemeContext;