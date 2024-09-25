import React, { useContext,useState, useEffect } from 'react';
import AiContractThemeContext from './AiContractThemeContext';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import SendIcon from '@mui/icons-material/Send';
import QuestionAnswerIcon from '@mui/icons-material/QuestionAnswer';
import InfoIcon from '@mui/icons-material/Info';
import AssistantIcon from '@mui/icons-material/Assistant';
import { ClipLoader } from 'react-spinners';

const getclass1 = (currenttheme) => {
  return currenttheme === 'light' ? '' : 'bg-black text-white';
};

const AiContractDisplay = () => {
 
  const {downloadUrl,resetFileState,projectName, action, setAction,setProjectName,selectedProject, selectedOption, 
    setSelectedOption,successMessage,extraAction, setExtraAction, searchPrompt, 
    setSearchPrompt,selectedVersion, setSelectedVersion,option, setOption,selectedPdfFile, setSelectedPdfFile,projects, setProjects,
    submitted, setSubmitted,submitted1, setSubmitted1,versionName1, setVersionName1,submitted2, setSubmitted2,selectedProject1, setSelectedProject1,
    submitted3, setSubmitted3,deleteVersion1, setDeleteVersion1,selectedOption2, setSelectedOption2, fileError, setFileError,formError, 
    setFormError,serverError, setServerError,showactiondropdown,setShowactiondropdown,loading1,setLoading1} = useContext(AiContractThemeContext);
  const { theme} = useContext(AiContractThemeContext);
  const class1 = getclass1(theme);
  const {loading, setLoading ,fileReady ,loadFalse,fileTrue} = useContext(AiContractThemeContext);
  const [fileName, setFileName] = useState(localStorage.getItem('fileName'));
  // const { selectedOption, successMessage } = useContext(ThemeContext);
  const [searchQuery, setSearchQuery] = useState(searchPrompt);
  const [contractresponse,setContractresponse]=useState([])
  // const [displayedText, setDisplayedText] = useState("");
  const [displayedTexts, setDisplayedTexts] = useState({});
  const [searchQuery1,setSearchQuery1] = useState("")
  const [activeTab, setActiveTab] = useState('translate');
  const [translateOption, setTranslateOption] = useState('none');
  const [compareOption,setCompareOption] = useState('none')
  const [translateFileType, setTranslateFileType] = useState('none');
  const [showTargetLanguage, setShowTargetLanguage] = useState(false)
  const [selectedLanguage, setSelectedLanguage] = useState('');
  const [paths,setPaths] = useState([])
  const [downloadLink ,setDownloadLink] = useState('')
  const [selectedProjectName, setSelectedProjectName] = useState('');
  const [selectedVersion1, setSelectedVersion1] = useState('');
  const [selectedVersion2, setSelectedVersion2] = useState('');
  const [filteredVersions, setFilteredVersions] = useState([]);
  const [filteredFiles, setFilteredFiles] = useState([]);
  const [files, setFiles] = useState({ file1: '', file2: '' });
  const [showInputs, setShowInputs] = useState(false);
  const [leftInputValue, setLeftInputValue] = useState(1);
  const [rightInputValue, setRightInputValue] = useState(1);
  const [img1, setImg1] = useState('');
  const [img1Caption, setImg1Caption] = useState('');
  const [img2, setImg2] = useState('');
  const [img2Caption, setImg2Caption] = useState('');
  const [mergedPdf, setMergedPdf] = useState('');
  const [versionfiles,setVersionfiles] = useState([])
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [serverError1,setServerError1] =useState('')
  const [formError1,setFormError1] = useState('')
  const [compareServerError1,setCompareServerError1] = useState('')
  const [compareFormError1,setCompareFormError1] = useState('')
  const [compareServerError2,setCompareServerError2] = useState('')
  const [compareFormError2,setCompareFormError2] = useState('')
  // const [loading, setLoading] = useState(false);
  const Aimain=process.env.REACT_APP_AI_CONTRACT_MAIN;

  const handleSearchChange = (event) => {
    const query = event.target.value;
    setSearchQuery(query);
    setSearchPrompt(query); 
  };

  const handleSubmit =  async (event) => {
    event.preventDefault();
    
    setFormError(null);
    setServerError(null);
    let formValid = true;

    // Check if project is selected
    if (!selectedProject || selectedProject === 'None') {
        setFormError('Please select a project.');
        formValid = false;
    }

    // Check if version is selected
    if (!selectedVersion || selectedVersion === 'None') {
        setFormError('Please select a version.');
        formValid = false;
    }

    // Check if PDF file is selected
    if (!selectedPdfFile || selectedPdfFile === 'None') {
        setFormError('Please select a PDF file.');
        formValid = false;
    }

    // Check if search prompt is provided
    if (!searchPrompt.trim()) {
        setFormError('Please enter a search prompt.');
        formValid = false;
    }

    // If form is not valid, stop submission
    if (!formValid) return;
    const ContractManager = process.env.REACT_APP_AI_CONTRACT_MANAGER;
    const username = 'ychatgpt';
    const password = 'dfnefiwnfwfniwfndscscnxzcx3243cxx';
    const credentials = btoa(`${username}:${password}`);
    
    const formData = new FormData();
    formData.append('selected_project', selectedProject);
    formData.append('selected_version', selectedVersion); 
    formData.append('doc_name', selectedPdfFile); 
    formData.append('prompt',searchPrompt)

    setLoading(true);
   try {
    const response = await fetch(ContractManager, {
        method: 'POST',
        headers: {
            'custom-header': 'route4',
            'Authorization': `Basic ${credentials}`
        },
        body: formData
    });

    if (!response.ok) {
      const errorData = await response.json();
      let errorMessage = errorData.error || errorData.message || 'An error occurred.';
      if (response.status === 406) {
          errorMessage = 'Project name already exists!';
      } else if (response.status >= 500) {
          errorMessage = 'Server error. Please try again later.';
      }
      setServerError(errorMessage);
      return;
    }

    const data = await response.json();
    // setContractresponse(data)
    // Assume the response data is a string or contains a string field 'responseText'
    const responseText = typeof data === 'string' ? data : data.responseText;
    // Add the new response to the array of responses
    setContractresponse(prevContractresponse => [...prevContractresponse, { question: searchPrompt, answer: responseText }]);
    setSearchQuery(''); 
    // setDisplayedText(""); 
    // displayText(data);
    handleDisplayText(responseText, contractresponse.length); 
    setServerError(null); 
    setFormError(null);
    fileTrue();  
  } catch (error) {
    setServerError('Error connecting to the server. Please try again later.');
  } finally {
    setLoading(false);  
  }  
  };

  const handleDisplayText = (text, key) => {
    setDisplayedTexts(prevDisplayedTexts => ({
        ...prevDisplayedTexts,
        [key]: ""
    }));

    displayText(text, key);
};

const displayText = (text, key, index = 0) => {
    if (index < text.length) {
        setDisplayedTexts(prevDisplayedTexts => ({
            ...prevDisplayedTexts,
            [key]: prevDisplayedTexts[key] + text[index]
        }));
        setTimeout(() => displayText(text, key, index + 1), 0.005); 
    }
};

  const handleSearchChange1 = (e) => {
    setSearchQuery1(e.target.value);
  };
  
  const handleSearchSubmit = async (event) => {
    event.preventDefault();
    setServerError(null); 
    setFormError(null);
    setIsSubmitted(true);

    let formValid = true;

    // Check if search query is set
    if (!searchQuery1 || searchQuery1.trim() === '') {
        setFormError('Please enter name of the file to seacrh.');
        formValid = false;
    }

    // If form is not valid, stop submission
    if (!formValid) return;

    const username = 'ychatgpt';
    const password = 'dfnefiwnfwfniwfndscscnxzcx3243cxx';
    const credentials = btoa(`${username}:${password}`);

   const formData = new FormData();
   formData.append('search_query',searchQuery1)
   
   setLoading(true);
      try {
        const response = await fetch(Aimain, {
            method: 'POST',
            headers: {
                'custom-header': 'route1',
                'Authorization': `Basic ${credentials}`
            },
            body: formData
        });

        if (!response.ok) {
          const errorData = await response.json();
          let errorMessage = errorData.error || errorData.message || 'An error occurred.';
          if (response.status === 400) {
              errorMessage = 'No matches found';
          } else if (response.status >= 500) {
              errorMessage = 'Server error. Please try again later.';
          }
          setServerError(errorMessage);
          return;
        }

        const data = await response.json();
        setPaths(data)
        fileTrue(); 
        setServerError(null); 
        setFormError(null);
    } catch (error) {
        setServerError('Error connecting to the server. Please try again later.');
    } finally {
        setLoading(false); 
    }
    
  };


  const handleTabClick = (tab) => {
    setActiveTab(tab);
  };

  const handleTranslateChange = (event) => {
    const option = event.target.value;
    setTranslateOption(option);
    setTranslateFileType('none');
    setShowTargetLanguage(false); 
  };

  const handleFileTypeChange = (event) => {
    const fileType = event.target.value;
    setTranslateFileType(fileType);
    // console.log('Selected file type:', fileType);
    setServerError1(null)
    setFormError1(null)
    setDownloadLink(null)

    if (fileType !== 'none') {
      setShowTargetLanguage(false); // Reset before setting a timeout
      setTimeout(() => {
        setShowTargetLanguage(true);
      }, 1000); // Adjust delay time as needed (500ms in this case)
    } else {
      setShowTargetLanguage(false);
      
    }
  };

  const handleLanguageChange = (event) => {
    const language = event.target.value;
    setSelectedLanguage(language);
    setServerError1(null)
    setFormError1(null)
  };

  const languageOptions = [
    { value: 'en', label: 'English' },
    { value: 'es', label: 'Spanish' },
    { value: 'fr', label: 'French' },
    { value: 'de', label: 'German' },
    { value: 'hi', label: 'Hindi' },
    { value: 'ru', label: 'Russian' },
    { value: 'id', label: 'Indonesian' },
    { value: 'zhc', label: 'Mandarin Chinese' },
    { value: 'fi', label: 'Finnish' },
    { value: 'ar', label: 'Standard Arabic' },
    { value: 'pt', label: 'Portuguese' },
    { value: 'ja', label: 'Japanese' },
    { value: 'sw', label: 'Swahili' },
    { value: 'tr', label: 'Turkish' },
    { value: 'ko', label: 'Korean' },
    { value: 'it', label: 'Italian' },
    { value: 'nl', label: 'Dutch' },
    { value: 'fa', label: 'Persian' },
    { value: 'vi', label: 'Vietnamese' },
    { value: 'th', label: 'Thai' },
    { value: 'ms', label: 'Malay' },
    { value: 'fil', label: 'Filipino' },
  ];

  const handleTranslateButtonClick = async (event) => {
    event.preventDefault(); 
    setServerError1(null); 
    setFormError1(null);

    // Validate required fields
    let formValid = true;

    if (!translateFileType) {
        setFormError1('Please select a file to translate.');
        formValid = false;
    }

    if (!selectedLanguage || selectedLanguage === 'None') {
        setFormError1('Please select a target language.');
        formValid = false;
    }
    if (!formValid) return;

    const selectedLanguageLabel = languageOptions.find(lang => lang.value === selectedLanguage)?.label || selectedLanguage;
    const username = 'ychatgpt';
    const password = 'dfnefiwnfwfniwfndscscnxzcx3243cxx';
    const credentials = btoa(`${username}:${password}`);

    const formData = new FormData();
    formData.append('file_to_translate', translateFileType); 
    formData.append('target_language_name', selectedLanguageLabel);
    setLoading1(true)
    
    try {
        const response = await fetch(Aimain, {
            method: 'POST',
            headers: {
                'custom-header': 'route2',
                'Authorization': `Basic ${credentials}`
            },
            body: formData
        });

        if (!response.ok) {
          const errorData = await response.json();
          let errorMessage = errorData.error || errorData.message || 'An error occurred.';
          if (response.status === 400) {
              errorMessage = 'File to translate is missing.';
          } else if (response.status === 406) {
              errorMessage = 'Document exceeds the 50k character limit for translation. Please select another document.';
          } else if (response.status >= 500) {
              errorMessage = 'Server error. Please try again later.';
          }
          setServerError1(errorMessage);
          return;
        }

      const data = await response.json();
      setDownloadLink(data);
      setServerError1(null); 
      setFormError1(null);  
      fileTrue();  
    } catch (error) {
        setServerError1('Error connecting to the server. Please try again later.');
    } finally {
        // Handle loading state
        setLoading1(false)
    }
  };

  const handleCompareChange = (event) => {
    const option = event.target.value;
    setCompareOption(option);
  };
  
  const handleProjectChange = async (event) => {
    const selectedProjectName = event.target.value
    setSelectedProjectName(selectedProjectName);
    setCompareServerError1(null)
    setCompareFormError1(null)

    let formValid = true;

    // Check if compareOption is provided and valid
    if (!compareOption || compareOption === 'None') {
        setCompareFormError1('Please select a valid compare option.');
        formValid = false;
    }

    // Check if selectedProjectName is provided
    if (!selectedProjectName || selectedProjectName === 'None') {
      setCompareFormError1('Please select a valid project name.');
        formValid = false;
    }

    // If the form is not valid, stop further processing
    if (!formValid) return;

    const username = 'ychatgpt';
    const password = 'dfnefiwnfwfniwfndscscnxzcx3243cxx';
    const credentials = btoa(`${username}:${password}`);
    
    const formData = new FormData();
    formData.append('compare_option',compareOption)
    formData.append('selected_project_name',selectedProjectName)
   
    try {
      const response = await fetch(Aimain, {
          method: 'POST',
          headers: {
              'custom-header': 'route5',
              'Authorization': `Basic ${credentials}`
          },
          body: formData
      });

      if (!response.ok) {
        const errorData = await response.json();
        let errorMessage = errorData.error || errorData.message || 'An error occurred.';
        if (response.status === 400) {
            errorMessage = 'Project or comparison option missing.';
        } else if (response.status >= 500) {
            errorMessage = 'Server error. Please try again later.';
        }
        setCompareServerError1(errorMessage);
        return;
      }
  
      const data = await response.json();
      setVersionfiles(data)
      
      setCompareServerError1(null); 
      setCompareFormError1(null);
      fileTrue(); 
  } catch (error) {
      setCompareServerError1('Error connecting to the server. Please try again later.');
  } finally {
      // Handle loading state
      loadFalse();
  }
};

const handleVersion1Change = (event) => {
  const option = event.target.value
    setSelectedVersion1(option);

};

const handleVersion2Change =  async (event) => {
    const option = event.target.value
    setSelectedVersion2(option);
};

  const handleCompareButtonClick = async (event)  => {
    event.preventDefault();
    setCompareFormError1(null);
    setCompareServerError1(null);
    setShowInputs(true);

    let formValid = true;

    if (!selectedProjectName || selectedProjectName === 'None') {
        setCompareFormError1('Please select a project.');
        formValid = false;
    }

    if (!selectedVersion1 || selectedVersion1 === 'None') {
        setCompareFormError1('Please select the first version to compare.');
        formValid = false;
    }

    if (!selectedVersion2 || selectedVersion2 === 'None') {
        setCompareFormError1('Please select the second version to compare.');
        formValid = false;
    }

    if (!formValid) return;

    const username = 'ychatgpt';
    const password = 'dfnefiwnfwfniwfndscscnxzcx3243cxx';
    const credentials = btoa(`${username}:${password}`);

    const formData = new FormData();
    // formData.append('option', option);
    formData.append('selected_project_name',selectedProjectName)
    formData.append('selected_version1',selectedVersion1)
    formData.append('selected_version2',selectedVersion2)

    try {
      const response = await fetch(Aimain, {
          method: 'POST',
          headers: {
              'custom-header': 'route3',
              'Authorization': `Basic ${credentials}`
          },
          body: formData
      });

      if (!response.ok) {
        const errorData = await response.json();
        let errorMessage = errorData.error || errorData.message || 'An error occurred.';
        if (response.status === 400) {
            errorMessage = 'Project or version selection missing.';
        } else if (response.status >= 500) {
            errorMessage = 'Server error. Please try again later.';
        }
        setCompareServerError1(errorMessage);
        return;
      }
  
      const data = await response.json();
      setFiles(data)
      // setDownloadLink(data);
      setCompareFormError1(null);
      setCompareServerError1(null);
      fileTrue();  
  } catch (error) {
      console.error('Error in route4:', error);
      setCompareServerError1('Error connecting to the server. Please try again later.');
  } finally {
      // Handle loading state
      loadFalse();
  }
  };

  const handleIncrement = () => {
    setLeftInputValue((prevValue) => (parseInt(prevValue, 10) || 0) + 1);
  };
  
  const handleIncrement1 = () => {
    setRightInputValue((prevValue) => (parseInt(prevValue, 10) || 0) + 1);
  };

  const handleDecrement = () => {
    if (leftInputValue > 1) {
      setLeftInputValue(leftInputValue - 1);
    }
  };

  const handleDecrement1 = () => {
    if (rightInputValue > 1) {
      setRightInputValue(rightInputValue - 1);
    }
  };
  
  const handleCompareButtonClick1 = async(event) => {
    event.preventDefault();
    setCompareServerError2(null); 
    setCompareFormError2(null);
    setShowInputs(true);
    let formValid = true;

    if (!selectedProjectName || selectedProjectName === 'None') {
      setCompareFormError2('Please select a project.');
      formValid = false;
    }

    if (!selectedVersion1 || selectedVersion1 === 'None') {
      setCompareFormError2('Please select the first version.');
      formValid = false;
    }

    if (!selectedVersion2 || selectedVersion2 === 'None') {
      setCompareFormError2('Please select the second version.');
      formValid = false;
    }

    if (!leftInputValue || isNaN(leftInputValue) || leftInputValue <= 0) {
      setCompareFormError2('Please enter a valid left page number.');
      formValid = false;
    }

    if (!rightInputValue || isNaN(rightInputValue) || rightInputValue <= 0) {
      setCompareFormError2('Please enter a valid right page number.');
      formValid = false;
    }

    if (!formValid) return;

    const username = 'ychatgpt';
    const password = 'dfnefiwnfwfniwfndscscnxzcx3243cxx';
    const credentials = btoa(`${username}:${password}`);

    const formData = new FormData();
    formData.append('selected_project_name',selectedProjectName)
    formData.append('selected_version1',selectedVersion1)
    formData.append('selected_version2',selectedVersion2)
    formData.append('left_page_number', leftInputValue)
    formData.append('right_page_number', rightInputValue)
    setLoading1(true)
    try {
      const response = await fetch(Aimain, {
          method: 'POST',
          headers: {
              'custom-header': 'route4',
              'Authorization': `Basic ${credentials}`
          },
          body: formData
      });

      if (!response.ok) {
        const errorData = await response.json();
        let errorMessage = errorData.error || errorData.message || 'An error occurred.';
        if (response.status === 400) {
            errorMessage = 'Project or version selection missing.';
        } else if (response.status >= 500) {
            errorMessage = 'Server error. Please try again later.';
        }
        setCompareServerError2(errorMessage);
        return;
       }

      const data = await response.json();
      
      setImg1(`data:image/png;base64,${data.img1}`);
      setImg1Caption(data.img1_caption);
      setImg2(`data:image/png;base64,${data.img2}`);
      setImg2Caption(data.img2_caption);
      setMergedPdf(`data:application/pdf;base64,${data.merged_pdf}`);
      
      setCompareServerError2(null); 
      setCompareFormError2(null);
      fileTrue();  
  } catch (error) {
      setCompareServerError2('Error connecting to the server. Please try again later.');  
  } finally {
      // Handle loading state
      setLoading1(false)
  }
  
  };

  const numMatches = paths && paths['File'] ? paths['File'].length : 0;
  
  return (
    <div style={{ padding: '20px' }}>
     
      {/* {selectedOption === 'contract' && showactiondropdown &&( */}
      {selectedOption === 'contract' && (  
        <div className={`mx-auto w-4/5 py-5 `}>
          {/* <h1 className={`text-left text-3xl font-bold mb-4 ${class1}`}>AI Contract Manager</h1>
          <div className="border-b-2 border-red-300 mb-4"></div> */}
          {submitted && (
              <div className={`bg-lime-200 h-20 rounded-full mx-auto text-black p-4 mb-4 w-4/5 py-5 ${action == 'select'  ? 'hidden' : ''} `}>
                  <p className='text-center -mt-3'>
                    Please select the created {projectName} project from "Select Existing Project".
                  </p>
              </div>
          )}
          {submitted1 && (
              <div className={`bg-lime-200 h-20 rounded-full mx-auto text-black p-4 mb-4 w-4/5 py-5 ${extraAction === 'view' ? 'hidden' : ''} `}>
                  <p className='text-center -mt-3'>
                  Please select the created {versionName1} version from "Select Existing Versions".
                  </p>
              </div>
          )}
          {submitted2 && (
              <div className={`bg-lime-200 h-20 rounded-full mx-auto text-black p-4 mb-4 w-4/5 py-5 ${selectedOption2  ? 'hidden' : ''}`}>
                  <p className='text-center -mt-3'>
                  Project {selectedProject1} deleted successfully.
                  </p>
              </div>
          )}
          {submitted3 && (
              <div className={`bg-lime-200 h-20 rounded-full mx-auto text-black p-4 mb-4 w-4/5 py-5`}>
                  <p className='text-center -mt-3'>
                  Version {deleteVersion1} deleted successfully.
                  </p>
              </div>
          )}
          
          {extraAction === 'view' && (
           <div className="relative mb-20 mt-2 ">
            <h3 className={`text-left text-xl font-semibold mb-6  ${class1}`}>Enter prompt:</h3>
           <form onSubmit={handleSubmit} className="flex -mt-1">
             <input
               id="searchInput"
               type="text"
               className="w-full border-stone-700 rounded-md font-medium text-black border-2 h-10 text-xl pl-4 pr-12"
               placeholder="Ask your questions?"
               value={searchQuery}
               onChange={handleSearchChange}
             />
              <button
                        // onClick={handleSubmit}
                        className='absolute right-0 top-1/2 mt-4 -mr-0.5 transform -translate-y-1/2 p-2'
                        style={{ backgroundColor: 'black', border: '0px solid black', borderLeft: 'none', borderRadius: '0 10px 10px 0', color: 'white' }}
                    >
                        <span role='img' aria-label='submit' style={{ fontSize: '1.5em', lineHeight: '0' }}>&#x27A4;</span>
                </button>
           </form>
         </div>
          )}

          {fileError && (
          <div className='bg-red-200 h-20 rounded-full text-black p-4 mb-4 w-2/3'>
              {/* toast.error('Please enter text to translate.'); */}
              <p className='text-center -mt-3'>{fileError}</p>
          </div>
          )}
          {formError && (
          <div className='bg-red-200 h-20 rounded-full mx-auto text-black p-4 mb-4 w-4/5 py-5'>
              <p className='text-center -mt-3'>{formError}</p>
          </div>
          )}
          {serverError && (
            <div className='bg-red-200 h-20 rounded-full mx-auto text-black p-4 mb-4 w-4/5 py-5'>
                <p className='text-center -mt-3'>{serverError}</p>
            </div>
          )}  

        {loading && (
            <div className="flex justify-center items-center">
              <div className="flex flex-col items-center w-full max-w-lg bg-white p-8 rounded-lg shadow-lg">
                <ClipLoader size={50} color={"#1f4e96"} loading={loading} />
                <p className="mt-4 text-gray-600 text-lg">Loading file, please wait...</p>
              </div>
            </div>
        )}

        <div className="qa-container -mt-14">
                    {contractresponse && contractresponse.length > 0 && !loading && (
                        contractresponse.slice().reverse().map((response, index) => (
                            <div key={index} className={`result-container mr-4 ml-4 mb-4 ${class1}`}>
                                <div className="flex items-center lg:-mx-4 mb-4 p-4 rounded-lg bg-indigo-100">
                                    <QuestionAnswerIcon className="mr-2" sx={{ color: "red" }} />
                                    <pre className="whitespace-pre-wrap text-left font-medium text-lg leading-relaxed">
                                        <strong>{response.question}</strong>
                                    </pre>
                                </div>
                                <div className={`flex items-center p-4 lg:-mx-4 rounded-lg bg-indigo-100 text-black ${class1}`}>
                                    <AssistantIcon className="mr-2 self-start" sx={{ color: "black" }} />
                                    <pre className="whitespace-pre-wrap text-left font-medium text-lg leading-relaxed">
                                        {displayedTexts[contractresponse.length - 1 - index]}
                                    </pre>
                                </div>
                            </div>
                        ))
                    )}
            </div> 
        </div>
      )}

      {selectedOption === 'search' && (
        <div className="mx-auto w-4/5 py-5">
          {/* <h1 className={`text-left text-3xl font-bold mb-4 ${class1}`}>Contract Document Search</h1>
          <div className="border-b-2 border-red-300 mb-4"></div> */}
 
          <label className={`block text-xl text-left font-medium text-black mb-4 ${class1}`}>Enter the name of the file to search:</label>
            <div className="relative mb-20">
              <form onSubmit={handleSearchSubmit} className="flex">
                <input
                  id="searchInput"
                  type="text"
                  className="w-full border-stone-700 rounded-md font-medium text-black border-2 h-10 text-xl pl-4 pr-12"
                  placeholder="Search..."
                  value={searchQuery1}
                  onChange={handleSearchChange1}
                />
                <button
                        // onClick={handleSubmit}
                        className='absolute right-0 top-1/2 -mr-0.5 transform -translate-y-1/2 p-2'
                        style={{ backgroundColor: 'black', border: '0px solid black', borderLeft: 'none', borderRadius: '0 10px 10px 0', color: 'white' }}
                    >
                        <span role='img' aria-label='submit' style={{ fontSize: '1.5em', lineHeight: '0' }}>&#x27A4;</span>
                </button>
              </form>
            </div>
            
          {loading && (
            // <div className="spinner-container font-medium mb-4">
            //   <ClipLoader size={50} color={"#123abc"} loading={loading} />
            //   <p>Loading... , please wait...</p>
            // </div>
            <div className="flex justify-center items-center">
              <div className="flex flex-col items-center w-full max-w-lg bg-white p-8 rounded-lg shadow-lg">
                <ClipLoader size={50} color={"#1f4e96"} loading={loading} />
                <p className="mt-4 text-gray-600 text-lg">Loading file, please wait...</p>
              </div>
            </div>
          )}

          {fileError && (
          <div className='bg-red-200 h-20 rounded-full text-black p-4 mb-4 w-2/3'>
              {/* toast.error('Please enter text to translate.'); */}
              <p className='text-center mt-2'>{fileError}</p>
          </div>
          )}
          {formError && (
          <div className='bg-red-200 h-20 rounded-full mx-auto text-black p-4 mb-4 w-4/5 py-5'>
              <p className='text-center -mt-3'>{formError}</p>
          </div>
          )}
          {serverError && (
            <div className='bg-red-200 h-20 rounded-full mx-auto text-black p-4 mb-4 w-4/5 py-5'>
                <p className='text-center -mt-3'>{serverError}</p>
            </div>
          )}
         
         {isSubmitted && !loading && !formError && !serverError && (
          <div className='-mt-14'>
          <h1 className={`text-left -ml-5 text-3xl font-bold mb-4 ${class1}`}>
            {`Found ${numMatches} match${numMatches !== 1 ? 'es' : ''}:`}
          </h1>
          <div className={`overflow-x-auto ${class1}`}>
            <table className="min-w-full bg-white border">
              <thead>
                <tr>
                  <th className="px-4 py-2 border"></th>   
                  <th className="px-4 py-2 border ">File</th>
                  <th className="px-4 py-2 border">Project</th>
                  <th className="px-4 py-2 border">Version</th>
                  <th className="px-4 py-2 border">File Path</th>
                </tr>
              </thead>
              <tbody>
                {paths && paths['File'] && paths['File'].map((file, index) => (
                  <tr key={index}>
                    <td className="px-4 py-2 border font-medium">{index + 1}</td>
                    <td className="px-4 py-2 border font-medium">{file}</td>
                    <td className="px-4 py-2 border font-medium">{paths['Project'][index]}</td>
                    <td className="px-4 py-2 border font-medium">{paths['Version'][index]}</td>
                    <td className="px-4 py-2 border font-medium">{paths['File Path'][index]}</td>
                  </tr>
                ))}
              </tbody>
            </table>
           </div>

           <div className="border-b-2 border-red-300 mb-4 flex justify-start mt-1">
            <button
              onClick={() => handleTabClick('translate')}
              className={` block px-4 py-2 text-xl font-semibold ${class1}  ${activeTab === 'translate' ? 'border-b-2 border-red-500' : ''}`}
            >
              Translate
            </button>
            <button
              onClick={() => handleTabClick('compare')}
              className={`px-4 py-2 text-xl font-semibold ${class1} ${activeTab === 'compare' ? 'border-b-2 border-red-500' : ''}`}
            >
              Compare
            </button>
           </div>
         
        

         {activeTab === 'translate' && !serverError && !formError && (
         <div>
          <label className={`block text-left text-lg font-medium mb-2 ${class1}`} htmlFor="dropdown">
            Do you want to translate a document?
          </label>
          <select
                id="dropdown"
                className="w-full border-stone-700 rounded-md text-black border-2 h-10 text-xl mt-1 mb-4 font-medium"
                value={translateOption}
                onChange={handleTranslateChange}
              >
                <option value="none">None</option>
                <option value="yes">Yes</option>
                <option value="no">No</option>
              </select>

              {translateOption === 'yes' && (
                <div>
                  <label className={`block text-left text-lg font-medium mb-2 ${class1}`} htmlFor="dropdown-filetype">
                    Select file to translate
                  </label>
                  <select
                    id="dropdown-filetype"
                    className="w-full border-stone-700 rounded-md text-black border-2 h-10 text-xl mt-1 font-medium"
                    value={translateFileType}
                    onChange={handleFileTypeChange}
                  >
                  <option value="none">None</option>
                  {/* <option value= "./Projects/new_project_100/v1/StandardContractFebruary2023.pdf">./Projects/new_project_100/v1/StandardContractFebruary2023.pdf</option> */}
                            {paths &&
                              paths['File Path'] &&
                              paths['File'] &&
                              paths['File Path'].map((path, index) => (
                                <option key={index} value={`${path}/${paths['File'][index]}`}>
                                  {`${path}/${paths['File'][index]}`}
                                </option>
                              ))}
                  </select>
                </div> 
              )}

              {translateFileType !== 'none' && (
                          <>
                            <h2 className={`text-left text-4xl font-bold mt-4 mb-4 ${class1}`}>File Translator</h2>
                            {showTargetLanguage && (
                              <div>
                                <label className={`block text-left text-lg font-medium mb-3 ${class1}`} htmlFor="dropdown-target-language">
                                  Choose target language
                                </label>
                                <select
                                    id="dropdown-target-language"
                                    className="w-full border-stone-700 rounded-md text-black border-2 h-10 text-xl mt-1 font-medium"
                                    value={selectedLanguage}
                                    onChange={handleLanguageChange}
                                  >
                                    <option value="none">None</option>
                                    {languageOptions.map((option) => (
                                      <option key={option.value} value={option.value}>
                                        {option.label}
                                      </option>
                                    ))}
                                  </select>
                                  <button
                                      className="mt-3 px-4 py-2 bg-[#1f4e96]  text-white rounded-md  transition-colors duration-300 text-left block w-auto"
                                      onClick={handleTranslateButtonClick}
                                    >
                                      Translate
                                    </button>
                              </div>
                           )}

                        {loading1 && (
                                    <div className="flex justify-center items-center">
                                      <div className="flex flex-col items-center w-full max-w-lg bg-white p-8 rounded-lg shadow-lg">
                                        <ClipLoader size={50} color={"#1f4e96"} loading={loading1} />
                                        <p className="mt-4 text-gray-600 text-lg">Loading file, please wait...</p>
                                      </div>
                                    </div>
                                )}
                              {formError1 && !loading1 &&(
                                <div className='bg-red-200 h-20 rounded-full mx-auto text-black p-4 mt-10 w-4/5 py-5'>
                                    <p className='text-center -mt-3'>{formError1}</p>
                                </div>
                                )}
                                {serverError1 && !loading && (
                                  <div className='bg-red-200 h-20 rounded-full mx-auto text-black p-4 mt-10 w-4/5 py-5'>
                                      <p className='text-center -mt-3'>{serverError1}</p>
                                  </div>
                                )}
                           {downloadLink && !loading1 &&(
                              <div className='bg-lime-200 h-20 rounded-full mx-auto text-black p-4 mt-10 w-4/5 py-5'>
                                <p className={`text-center -mt-3`}>File Translated successfully!</p>
                              </div>  
                            )}
                        {downloadLink && !loading1 && (
                          <div className="flex justify-center mt-5">
                          <button className="px-4 py-2 bg-[#1f4e96] text-white rounded-md transition-colors duration-300 text-center block w-auto">
                            <a href={downloadLink}>Download</a>
                          </button>
                        </div>
                      )}       
                        </>
              )}

              {translateOption === 'no' && (
                <p className={`text-left text-lg font-medium mt-2 ${class1}`}>Thank you</p>
              )}

              {translateOption === 'none' && (
                    <p className={`text-left text-lg font-medium mt-2 ${class1}`}>Please select from the dropdown</p>
                  )}
          </div>
         )}
          </div>
        )}

         {activeTab === 'compare' && !serverError && !formError && (
         <div>
          <label className={ `block text-left text-lg font-medium mb-2 ${class1}`} htmlFor="dropdown-compare">
            Do you want to compare documents?
          </label>
          <select
                id="dropdown"
                className="w-full border-stone-700 rounded-md text-black border-2 h-10 text-xl mt-1 font-medium"
                value={compareOption}
                onChange={handleCompareChange}
              >
                <option value="none">None</option>
                <option value="yes">Yes</option>
                <option value="no">No</option>
          </select>
          {compareOption === 'yes' && (
                        <>
                            <label className={`block text-left text-lg font-medium mt-2 ${class1}`} htmlFor="project-dropdown">
                                Select project for comparison
                            </label>
                            <select
                                id="project-dropdown"
                                className="w-full border-stone-700 rounded-md text-black border-2 h-10 text-xl mt-1 font-medium"
                                value={selectedProjectName}
                                onChange={handleProjectChange}
                            >
                               <option value="none">None</option>
                                {paths &&
                                        paths['Project'] &&
                                        [...new Set(paths['Project'])].map((project, index) => (
                                            <option key={index} value={project}>
                                                {project}
                                            </option>
                                        ))
                                    }
                            </select>

                            <label className={`block text-left text-lg font-medium mt-2 ${class1}`} htmlFor="version1-dropdown">
                                Select first version/file
                            </label>
                            <select
                                id="version1-dropdown"
                                className="w-full border-stone-700 rounded-md text-black border-2 h-10 text-xl mt-1 font-medium"
                                value={selectedVersion1}
                                onChange={handleVersion1Change}
                            >
                                <option value="none">None</option>
                                {versionfiles.map((file, index) => (
                                      <option key={index} value={file}>
                                          {file}
                                      </option>
                                  ))}
                            </select>

                            <label className={`block text-left text-lg font-medium mt-2 ${class1}`} htmlFor="version2-dropdown">
                                Select second version/file
                            </label>
                            <select
                                id="version2-dropdown"
                                className="w-full border-stone-700 rounded-md text-black border-2 h-10 text-xl mt-1 font-medium"
                                value={selectedVersion2}
                                onChange={handleVersion2Change}
                            >
                                <option value="none">None</option>
                                {versionfiles.map((file, index) => (
                                      <option key={index} value={file}>
                                          {file}
                                      </option>
                                  ))}
                            </select>

                            <h2 className={`text-left text-4xl font-bold mt-4 ${class1}`}>File Comparison Tool</h2>

                            {!showInputs && (
                                            <button
                                              className="mt-3 px-4 py-2 bg-[#1f4e96] text-white rounded-md transition-colors duration-300 text-left block w-auto"
                                              onClick={handleCompareButtonClick}
                                            >
                                              Compare
                                            </button>
                                          )}
                              {showInputs && !compareFormError1 && !compareServerError1 &&(
                                    <div className="mt-3  flex space-x-4">
                                      <div className="w-1/2">
                                        <label htmlFor="leftInput" className={`block text-lg font-medium text-left mt-4 mb-2 ${class1}`}
                                        style={{ minHeight: '3rem', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }} // Ensure label height and ellipsis for long text
                                        >
                                           Select page for <br /> {files.file1}
                                          </label>
                                        <form className="flex flex-col items-center border border-gray-700 rounded-md mb-4 relative w-full">
                                          <div className="flex items-center w-full">
                                            <input
                                              id="leftInput"
                                              type="text"
                                              value={leftInputValue}
                                              onChange={(e) => setLeftInputValue(e.target.value)}
                                              className="bg-gray-800 text-white border-0 px-4 py-2 w-full"
                                              style={{ zIndex: 1 }}
                                            />
                                            <button
                                              type="button"
                                              onClick={handleDecrement}
                                              className="bg-gray-800 text-white px-4 py-2 group-hover:bg-gray-700 hover:bg-gray-700"
                                              style={{ borderTopLeftRadius: "0", borderBottomLeftRadius: "0" }}
                                            >
                                              -
                                            </button>
                                            <button
                                              type="button"
                                              onClick={handleIncrement}
                                              className="bg-gray-800 text-white px-4 py-2 rounded-r-md group-hover:bg-gray-700 hover:bg-gray-700"
                                              style={{ borderTopRightRadius: "0", borderBottomRightRadius: "0" }}
                                            >
                                              +
                                            </button>
                                          </div>
                                        </form>
                                      </div>
                                      <div className="w-1/2">
                                        <label htmlFor="rightInput" className={`block text-lg font-medium text-left mt-4  mb-2 ${class1}`}
                                        style={{ minHeight: '3rem', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }} 
                                        >
                                           Select page for <br /> {files.file2}
                                          </label>
                                        <form className="flex flex-col items-center border border-gray-700 rounded-md mb-4 relative w-full">
                                          <div className="flex items-center w-full">
                                            <input
                                              id="rightInput"
                                              type="text"
                                              value={rightInputValue}
                                              onChange={(e) => setRightInputValue(e.target.value)}
                                              className="bg-gray-800 text-white border-0 px-4 py-2 w-full"
                                              style={{ zIndex: 1 }}
                                            />
                                            <button
                                              type="button"
                                              onClick={handleDecrement1}
                                              className="bg-gray-800 text-white px-4 py-2 group-hover:bg-gray-700 hover:bg-gray-700"
                                              style={{ borderTopLeftRadius: "0", borderBottomLeftRadius: "0" }}
                                            >
                                              -
                                            </button>
                                            <button
                                              type="button"
                                              onClick={handleIncrement1}
                                              className="bg-gray-800 text-white px-4 py-2 rounded-r-md group-hover:bg-gray-700 hover:bg-gray-700"
                                              style={{ borderTopRightRadius: "0", borderBottomRightRadius: "0" }}
                                            >
                                              +
                                            </button>
                                          </div>
                                        </form>
                                      </div>
                                    </div>
                                  )}
                             {showInputs && !compareFormError1 && !compareServerError1 && ( <button
                              className="mt-3 px-4 py-2 bg-[#1f4e96] text-white rounded-md transition-colors duration-300 text-left block w-auto"
                              onClick={handleCompareButtonClick1}
                            >
                              Compare
                            </button>
                             )}

                                {!loading1 && img1 && img2 && (
                                  <div className="mt-7">
                                    <h2 className={`text-left mb-4 text-xl font-bold ${class1}`}>Comparison of PDFs images with highlighted differences:</h2>
                                    <div className="flex justify-end">
                                      <div className="text-center -mr-5 -ml-4">
                                        <img src={img1} alt="PDF 1" className="max-w-full h-auto " />
                                        <p className={`font-medium ${class1}`}>{img1Caption}</p>
                                      </div>
                                      <div class="border-l border-blue-800 border-2"></div>
                                      <div className="text-center -mr-14">
                                        <img src={img2} alt="PDF 2" className="max-w-full h-auto " />
                                        <p className={`font-medium ${class1}`}>{img2Caption}</p>
                                      </div>
                                    </div>
                                  </div>
                                )}
                             {mergedPdf && !loading1 && (
                                      <div className='space-x-4 justify-items-start justify-start w-4/12' style={{display: 'flex',flexwrap: 'wrap',justifycontent: 'space-around'}}>
                                          {/* <embed src={mergedPdf} type="application/pdf" width="100%" height="600px" /> */}
                                          <a href={mergedPdf} download="merged.pdf">
                                              <button className="mt-4 px-4 py-2 bg-[#1f4e96]  text-white rounded-md transition-colors duration-300 text-left block w-auto ">
                                                  Download Merged PDF with Highlighted Differences
                                              </button>
                                          </a>
                                      </div>
                                  )}
                                {loading1 && (
                                    <div className="flex justify-center items-center">
                                      <div className="flex flex-col items-center w-full max-w-lg bg-white p-8 rounded-lg shadow-lg">
                                        <ClipLoader size={50} color={"#1f4e96"} loading={loading1} />
                                        <p className="mt-4 text-gray-600 text-lg">Loading file, please wait...</p>
                                      </div>
                                    </div>
                                )}  
                                {compareFormError1 && !loading1 &&(
                                <div className='bg-red-200 h-20 rounded-full mx-auto text-black p-4 mt-10 w-4/5 py-5'>
                                    <p className='text-center -mt-3'>{compareFormError1}</p>
                                </div>
                                )}
                                {compareServerError1 && !loading1 &&(
                                  <div className='bg-red-200 h-20 rounded-full mx-auto text-black p-4 mt-10 w-4/5 py-5'>
                                      <p className='text-center -mt-3'>{compareServerError1}</p>
                                  </div>
                                )}
                                {compareFormError2 && !loading1 &&(
                                <div className='bg-red-200 h-20 rounded-full mx-auto text-black p-4 mt-10 w-4/5 py-5'>
                                    <p className='text-center -mt-3'>{compareFormError2}</p>
                                </div>
                                )}
                                {compareServerError2 && !loading1 &&(
                                  <div className='bg-red-200 h-20 rounded-full mx-auto text-black p-4 mt-10 w-4/5 py-5'>
                                      <p className='text-center -mt-3'>{compareServerError2}</p>
                                  </div>
                                )}
                      </>
                    )}

          {compareOption === 'no' && (
                        <p className={ `text-left text-lg font-medium mt-2 ${class1}`}>Thank You</p>
                    )}

          {compareOption === 'none' && (
                        <p className={`text-left text-lg font-medium mt-2`}>Please select from the dropdown</p>
          )}

      
              
          {/* <p className="text-left text-lg font-medium mt-2">Please select from the dropdown</p> */}
         </div>
         )}
        
        
      </div>
        
      )}
    </div>
  
  );
};


export default AiContractDisplay;
