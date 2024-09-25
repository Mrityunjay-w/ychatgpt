import React, { useState, useContext, useEffect, useRef  } from 'react';
import { FaFileUpload, FaTimesCircle } from "react-icons/fa";
import AiContractThemeContext from './AiContractThemeContext';
import Select from 'react-select';
import InsertDriveFileRoundedIcon from '@mui/icons-material/InsertDriveFileRounded';

const getclass1 = (currenttheme) => {
    return currenttheme === 'light' ? '' : 'bg-black text-white';
  };

const AiContractSidebar = () => {
    const ContractManager = process.env.REACT_APP_AI_CONTRACT_MANAGER;
    // const [option, setOption] = useState("contract");
    const [fileName, setFileName] = useState('');  
    const [fileName1,setFileName1] = useState('') 
    const [selectedLanguage, setSelectedLanguage] = useState('');
    const [downloadUrl, setDownloadUrl] = useState('');
    const [ver,setVer] = useState([]);
    // const [selectedVersion, setSelectedVersion] = useState(''); // New state for selected version
    // const [pdffiles,setpdffiles]=useState([])
    const [searchQuery,setSearchQuery]=useState('')
    // const [selectedProject1, setSelectedProject1] = useState('');
    const [showSecondDropdown, setShowSecondDropdown] = useState(false);
    // const [showactiondropdown,setShowactiondropdown]=useState(false)
    // const [selectedOption2, setSelectedOption2] = useState('');
    // const [deleteVersion1, setDeleteVersion1] = useState('');
    const [selectedFile, setSelectedFile] = useState(null);
    const [selectedFile1, setSelectedFile1] = useState(null);
    const { theme} = useContext(AiContractThemeContext);
    
    const class1 = getclass1(theme);
    const { 
        setSelectedOption,selectedisplay,setSelectedisplay, setSuccessMessage, successMessage, projects, setProjects, 
        sendData, loadTrue, fileTrue, loadFalse, setDownloadLink, setFileReady, progress, updateProgress,
        projectName, setProjectName, showVersionFields, setShowVersionFields, versionName, setVersionName,
        showFileUpload, setShowFileUpload, action, setAction, selectedProject, setSelectedProject,
        extraAction, setExtraAction, version, setVersion, file, setFile,searchPrompt,selectedVersion, setSelectedVersion,option, setOption,
        selectedPdfFile, setSelectedPdfFile,versionName1, setVersionName1,showFileUpload1, setShowFileUpload1,submitted, setSubmitted,
        submitted1, setSubmitted1,pdffiles,setpdffiles,submitted2, setSubmitted2,selectedProject1, setSelectedProject1,submitted3, setSubmitted3,
        deleteVersion1, setDeleteVersion1,selectedOption2, setSelectedOption2, fileError, setFileError,formError, setFormError,serverError, setServerError,
        showactiondropdown,setShowactiondropdown
    } = useContext(AiContractThemeContext);

    const handleOptionChange = async (event) => {
        const selectedOption = event.target.value;
        setOption(selectedOption);
        setSelectedOption(selectedOption); 
    };

    const handleActionChange =  async (event) => {
        const selectedAction = event.target.value;
        setAction(selectedAction);
        setShowVersionFields(false);
        setShowFileUpload(false);
        setShowSecondDropdown(false);
        setShowactiondropdown(false);
        setProjectName("");
        setVersionName("");
        setFormError(null);
        setServerError(null);
        
       
        const username = 'ychatgpt';
        const password = 'dfnefiwnfwfniwfndscscnxzcx3243cxx';
        const credentials = btoa(`${username}:${password}`);

        const formData = new FormData();
        formData.append('option', option);  
        if (option === 'contract') {
            formData.append('action', action);
        }
        //http://127.0.0.1:8000/contract_manager/contract_manager
        //https://ychatgpt-apis.azurewebsites.net/contract_manager/contract_manager

        try {
            const response = await fetch(ContractManager, {
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
                if (response.status === 406) {
                    errorMessage = 'Bad request. Please check your input and try again.';
                } else if (response.status >= 500) {
                    errorMessage = 'Server error. Please try again later.';
                }
                setServerError(errorMessage);
                return;
            }    

            const data = await response.json();
            console.log('Response Data', data);
            setProjects(data)
            fileTrue();  
            setServerError(null); 
            setFormError(null);
        } catch (error) {
            setServerError('Error connecting to the server. Please try again later.');
        } finally {
            loadFalse();  
        }
    };

    const handleFileChange = (event) => {
        const file = event.target.files[0];
        setSelectedFile(file);
        if(event.target.files[0]) {
            setFileName(event.target.files[0].name);
            console.log(event.target.files[0].name);
        }
        
    };

    const handleFileChange1 = (event) => {
        const file = event.target.files[0];
        setSelectedFile1(file);
        if(event.target.files[0]) {
            setFileName1(event.target.files[0].name);
            console.log(event.target.files[0].name);
        }
        
    };

    const handleDragOver1 = (e) => {
        e.preventDefault();
    };

    const handleDrop1 = (e) => {
        e.preventDefault();
        const file = e.dataTransfer.files[0];
        setSelectedFile1(file);
    };

    const clearFile1 = () => {
        setSelectedFile1(null);
    };

    const handleDragOver = (e) => {
        e.preventDefault();
    };

    const handleDrop = (e) => {
        e.preventDefault();
        const file = e.dataTransfer.files[0];
        setSelectedFile(file);
    };

    const clearFile = () => {
        setSelectedFile(null);
    };

    const handleProjectNameChange = (event) => {
        setProjectName(event.target.value);
        setShowVersionFields(false);
        setShowFileUpload(false); 
    };

    // const handleProjectNameKeyPress = (event) => {
    //     if (event.key === 'Enter') {
    //         setShowVersionFields(true);
    //         setShowFileUpload(false);
    //     }
    // };
    const handleProjectNameKeyPress = (event) => {
        if (event.key === 'Enter') {
            // Check if projectName is empty
            if (!projectName.trim()) {
                setFormError('Please enter new project name.');
                setShowVersionFields(false);  
                setShowFileUpload(false);     
            } else {
                setFormError(null);  
                setShowVersionFields(true); 
                setShowFileUpload(false);      
            }
        }
    };

    const handleVersionNameChange = (event) => {
        setVersionName(event.target.value);

    };
    const handleVersionNameChange1 = (event) => {
        setVersionName1(event.target.value);
    };

    const handleVersionNameKeyPress1 = (event) => {
        if (event.key === 'Enter') {
            // setShowFileUpload1(true);
            if (!versionName1.trim()) {
                setFormError('Please enter new version name.');
                setShowFileUpload1(false);    
            } else {
                setFormError(null);  
                setShowFileUpload1(true);      
            }
        }
    };

    const handleVersionNameKeyPress = (event) => {
        if (event.key === 'Enter') {
            // setShowFileUpload(true);
            if (!versionName.trim()) {
                setFormError('Please enter new version name.');
                setShowFileUpload(false);    
            } else {
                setFormError(null);  
                setShowFileUpload(true);      
            }
        }
    };

    const handleProjectSelectChange =  async (event) => {
        const selectedProject = event.target.value
        setShowactiondropdown(true)
        setServerError(null);
        setFormError(null);

        if (!selectedProject) {
            setFormError('Please select a project.');
            return;
        }

        setSelectedProject(selectedProject);
        setExtraAction("");

        const username = 'ychatgpt';
        const password = 'dfnefiwnfwfniwfndscscnxzcx3243cxx';
        const credentials = btoa(`${username}:${password}`);

        const formData = new FormData();
        formData.append('selected_project', selectedProject);
    
        try {
            const response = await fetch(ContractManager, {
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
                if (response.status === 404) {
                    errorMessage = 'Project not found. Please select another project';
                } else if (response.status >= 500) {
                    errorMessage = 'Server error. Please try again later.';
                }
                setServerError(errorMessage);
                return;
            }

            const data = await response.json();
            setVer(data)

            fileTrue(); 
            setServerError(null); 
            setFormError(null); 
        } catch (error) {
            setServerError('Error connecting to the server. Please try again later.');
        } finally {
            // Handle loading state
            loadFalse();  
        }
    };

    const handleLanguageChange = (selectedOption) => {
        setSelectedLanguage(selectedOption);
    };

    // const handleExtraActionChange = (event) => {
    //     // setExtraAction(event.target.value);
    //     const selectedExtraAction = event.target.value;
    //     setExtraAction(selectedExtraAction);
    //     // setExtraAction(event.target.value);
    //     setShowFileUpload1(false);
    // };

    const handleExtraActionChange = async (event) => {
        // setExtraAction(event.target.value);
        const selectedExtraAction = event.target.value;
        setExtraAction(selectedExtraAction);
        // setExtraAction(event.target.value);
        setShowFileUpload1(false);
        setFormError(null);
        setServerError(null);

        let formValid = true;
        // Check if selected project is set
        if (!selectedProject || selectedProject === 'None') {
            setFormError('Please select a project.');
            formValid = false;
        }

        // If form is not valid, stop submission
        if (!formValid) return;

        const username = 'ychatgpt';
        const password = 'dfnefiwnfwfniwfndscscnxzcx3243cxx';
        const credentials = btoa(`${username}:${password}`);

        const formData = new FormData();
        formData.append('selected_project', selectedProject);

        try {
            const response = await fetch(ContractManager, {
                method: 'POST',
                headers: {
                    'custom-header': 'route10',
                    'Authorization': `Basic ${credentials}`
                },
                body: formData
            });

            if (!response.ok) {
                const errorData = await response.json();
                let errorMessage = errorData.error || errorData.message || 'An error occurred.';
                if (response.status === 404) {
                    errorMessage = 'Project not found. Please select another project';
                } else if (response.status >= 500) {
                    errorMessage = 'Server error. Please try again later.';
                }
                setServerError(errorMessage);
                return;
            }
    
            const data = await response.json();
            setVer(data)
            fileTrue();  
            setServerError(null); 
            setFormError(null);
        } catch (error) {
            setServerError('Error connecting to the server. Please try again later.');
        } finally {
            loadFalse();  
        }

    };


    const handleVersionChange = async (event) => {
        const version = event.target.value;
        setSelectedVersion(version);
        setFormError(null);
        setServerError(null);

        let formValid = true;
        // Check if selected project is set
        if (!selectedProject || selectedProject === 'None') {
            setFormError('Please select a project.');
            formValid = false;
        }

        // Check if version option is set
        if (!extraAction) {
            setFormError('Please select an action.');
            formValid = false;
        }

        // Check if version is selected
        if (!version || version === 'None') {
            setFormError('Please select a version.');
            formValid = false;
        }

        // If form is not valid, stop submission
        if (!formValid) return;

        const username = 'ychatgpt';
        const password = 'dfnefiwnfwfniwfndscscnxzcx3243cxx';
        const credentials = btoa(`${username}:${password}`);

        const formData = new FormData();
        formData.append('selected_project', selectedProject);
        formData.append('version_option', extraAction);  
        formData.append('selected_version', version);  
                
        try {
            const response = await fetch(ContractManager, {
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
                if (response.status === 404) {
                    errorMessage = 'Resource not found. Please check the project and try again.';
                } else if (response.status >= 500) {
                    errorMessage = 'Server error. Please try again later.';
                }
                setServerError(errorMessage);
                return;
            }
    
            const data = await response.json();
            setpdffiles(data)
            fileTrue();  
            setServerError(null); 
            setFormError(null);
        } catch (error) {
            setServerError('Error connecting to the server. Please try again later.');
        } finally {
            loadFalse();  
        }
    };

    const handlePdfFileChange = (event) => {
        const selectedPdfFile = event.target.value;
            setSelectedPdfFile(selectedPdfFile);
    }

    const handleSubmit = async (event) => {
        event.preventDefault();
        // setSubmitted(true);
        let formValid = true;
    
        // Reset form errors before validation
        setFormError(null);
        setServerError(null);
        setSubmitted(false);

        // Check if project name (input text field) is entered
        if (!projectName.trim()) {
            setFormError('Please enter new project name.');
            formValid = false;
        }

        if (!versionName.trim()){
            setFormError('Please enter new version name.');
            formValid = false;
        }

        // Check if file is uploaded
        if (!selectedFile) {
            setFormError('Please upload a file.');
            formValid = false;
        }

        // If form is not valid, stop submission
        if (!formValid) return;

        const username = 'ychatgpt';
        const password = 'dfnefiwnfwfniwfndscscnxzcx3243cxx';
        const credentials = btoa(`${username}:${password}`);

        const formData = new FormData();
        formData.append('new_project_name', projectName);
        formData.append('version_option', version);
        formData.append('version_name', versionName);
        formData.append('uploaded_files', selectedFile);
        loadTrue();
       
        try {
            const response = await fetch(ContractManager, {
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
            if (response.status === 406) {
                errorMessage = 'Project name already exists!';
            } else if (response.status === 400) {
                errorMessage = 'Invalid file format. Only PDFs are supported.';
            } else if (response.status >= 500){
                errorMessage = 'Server error. Please try again later.'; 
            }
            setServerError(errorMessage);
            return;
        }

        const data = await response.json();
        setProjects(data);
        setSubmitted(true);
        fileTrue();
        setServerError(null); 
        setFormError(null);
        } catch (error) {
            setServerError('Error connecting to the server. Please try again later.');
        } finally {
            loadFalse();
        }
    };

    const handleProjectChange = (e) => {
        const option = e.target.value
        setSelectedProject1(option);
        setShowSecondDropdown(true);
    };

    const handleOption2Change = async (event) => {
        setSelectedOption2(event.target.value);
        setFormError(null);
        setServerError(null);

        let formValid = true;

        // Check if selected project is set
        if (!selectedProject1 ||  selectedProject1=== 'None') {
            setFormError('Please select a project.');
            formValid = false;
        }

        // If form is not valid, stop submission
        if (!formValid) return;

        const username = 'ychatgpt';
        const password = 'dfnefiwnfwfniwfndscscnxzcx3243cxx';
        const credentials = btoa(`${username}:${password}`);

        const formData = new FormData();
        formData.append('selected_project',selectedProject1)
        
        try {
            const response = await fetch(ContractManager, {
                method: 'POST',
                headers: {
                    'custom-header': 'route6',
                    'Authorization': `Basic ${credentials}`
                },
                body: formData
            });

            if (!response.ok) {
                const errorData = await response.json();
                let errorMessage = errorData.error || errorData.message || 'An error occurred.';
                if (response.status === 404) {
                    errorMessage = 'Resource not found. Please check the project and try again';
                } else if (response.status >= 500) {
                    errorMessage = 'Server error. Please try again later.';
                }
                setServerError(errorMessage);
                return;
            }    
    
            const data = await response.json();
            setVer(data)
            fileTrue(); 
            setServerError(null); 
            setFormError(null); 
        } catch (error) {
            setServerError('Error connecting to the server. Please try again later.');
        } finally {
            // Handle loading state
            loadFalse();  
        }
    };

    const handleVersionChange1 = (event) => {
        setDeleteVersion1(event.target.value);
    };

    const handleConfirmDelete1 = async (event) => {
        event.preventDefault();
        // setSubmitted2(true)
        setServerError(null); 
        setFormError(null);
        setSubmitted2(false)

        let formValid = true;

        // Check if selected project is set
        if (!selectedProject1 || selectedProject1=='None') {
            setFormError('Please select a project to delete.');
            formValid = false;
        }

        // If form is not valid, stop submission
        if (!formValid) return;

        const username = 'ychatgpt';
        const password = 'dfnefiwnfwfniwfndscscnxzcx3243cxx';
        const credentials = btoa(`${username}:${password}`);

        const formData = new FormData();
        formData.append('selected_project',selectedProject1)
 
        try {
            const response = await fetch(ContractManager, {
                method: 'POST',
                headers: {
                    'custom-header': 'route8',
                    'Authorization': `Basic ${credentials}`
                },
                body: formData
            });

            if (!response.ok) {
                const errorData = await response.json();
                let errorMessage = errorData.error || errorData.message || 'An error occurred.';
                if (response.status === 404) {
                    errorMessage = 'Project not found. Please verify the project selection.';
                } else if (response.status >= 500) {
                    errorMessage = 'Server error. Please try again later.';
                }
                setServerError(errorMessage);
                return;
            }
    
            const data = await response.json();
            setVer(data)
    
            // Perform actions based on response data
            setSubmitted2(true)
            fileTrue(); 
            setServerError(null); 
            setFormError(null); 
        } catch (error) {
            setServerError('Error connecting to the server. Please try again later.');
        } finally {
            // Handle loading state
            loadFalse();  
        }
    };


    const handleConfirmDelete = async (event) => {
        event.preventDefault();
        setFormError(null);
        setServerError(null);
        setSubmitted3(false)
        let formValid = true;

        // Check if selected project is set
        if (!selectedProject1 || selectedProject1=='None') {
            setFormError('Please select a project.');
            formValid = false;
        }

        // Check if selected version is set
        if (!deleteVersion1 || deleteVersion1=='None') {
            setFormError('Please select a version to delete.');
            formValid = false;
        }

        // If form is not valid, stop submission
        if (!formValid) return;

        const username = 'ychatgpt';
        const password = 'dfnefiwnfwfniwfndscscnxzcx3243cxx';
        const credentials = btoa(`${username}:${password}`);

        const formData = new FormData();
        formData.append('selected_project',selectedProject1)
        formData.append('selected_version',deleteVersion1)

        loadTrue();
        try {
            const response = await fetch(ContractManager, {
                method: 'POST',
                headers: {
                    'custom-header': 'route7',
                    'Authorization': `Basic ${credentials}`
                },
                body: formData
            });

            if (!response.ok) {
                const errorData = await response.json();
                let errorMessage = errorData.error || errorData.message || 'An error occurred.';
                if (response.status === 404) {
                    errorMessage = 'Project and version not found. Please verify your inputs.';
                } else if (response.status >= 500) {
                    errorMessage = 'Server error. Please try again later.';
                }
                setServerError(errorMessage);
                return;
            }
    
            const data = await response.json();
            // setVer(data)
            setSubmitted3(true)
            fileTrue(); 
            setServerError(null); 
            setFormError(null);
        } catch (error) {
            setServerError('Error connecting to the server. Please try again later.');
        } finally {
            // Handle loading state
            loadFalse();  
        }
    };

    const handleSubmit1 = async (event) => {
        event.preventDefault();
        // setSubmitted1(true);
        setFormError(null);
        setServerError(null);
        setSubmitted1(false);

        let formValid = true;
        if (!selectedProject) {
            setFormError('Please select a project.');
            formValid = false;
        }
    
        // Validate the version name
        if (!versionName1.trim()) {
            setFormError('Please enter a version name.');
            formValid = false;
        }
    
        // Validate the uploaded file
        if (!selectedFile1) {
            setFormError('Please upload a file.');
            formValid = false;
        }
    
        // If form is not valid, stop submission
        if (!formValid) return;

        const username = 'ychatgpt';
        const password = 'dfnefiwnfwfniwfndscscnxzcx3243cxx';
        const credentials = btoa(`${username}:${password}`);

        const formData = new FormData();
        formData.append('selected_project', selectedProject);
        formData.append('version_name', versionName1);
        formData.append('uploaded_files', selectedFile1);
        loadTrue();

        try {
            const response = await fetch(ContractManager, {
                method: 'POST',
                headers: {
                    'custom-header': 'route9',
                    'Authorization': `Basic ${credentials}`
                },
                body: formData
            });

            if (!response.ok) {
                const errorData = await response.json();
                let errorMessage = errorData.error || errorData.message || 'An error occurred.';
                if (response.status === 406) {
                    errorMessage = 'Version name already exists!';
                } else if (response.status === 400) {
                    errorMessage = 'Invalid file format. Only PDFs are supported.';
                } else if (response.status >= 500){
                    errorMessage = 'Server error. Please try again later.'; 
                }
                setServerError(errorMessage);
                return;
            }

            const data = await response.json();
            // setProjects(data);
            setSubmitted1(true);
            fileTrue();
            setServerError(null); 
            setFormError(null);
        } catch (error) {
            setServerError('Error connecting to the server. Please try again later.');
        } finally {
            loadFalse();
        }
    };

    const handleSearchChange = (event) => {
      const query = event.target.value;
      setSearchQuery(query);
    };

    const truncateText = (text, maxLength) => {
        if (text.length > maxLength) {
            return text.substring(0, maxLength) + '...';
        }
        return text;
    };

    return (
        <div className='w-full'>
             {/* <div className={` ${class1}`}> */}
            <div className='mb-4'>
                <label className={`block text-xl text-black  font-medium mb-0.5 ${class1}`}>Choose an option:</label>
                <select 
                    className='w-full border-stone-700 rounded-md text-black border-2 h-10 text-xl mt-1 font-medium'
                    
                    onChange={handleOptionChange}
                    value={option}
                >
                    <option value="contract">Contract Manager</option>
                    <option value="search">Search Manager</option>
                </select>
            </div>

            {option === 'contract' && (
                <>
                    <div className='mb-4'>
                        <label className={`block text-xl font-medium text-black mb-0.5 ${class1}`}>Choose an action:</label>
                        <select 
                            className='w-full border-stone-700 rounded-md text-black border-2 h-10 text-xl mt-1 font-medium '
                            value={action}
                            onChange={handleActionChange}
                        >
                            <option value="create">Create New Project</option>
                            <option value="select">Select Existing Project</option>
                            <option value="delete">Delete</option>
                        </select>
                    </div>

                    {action === "create" && (
                        <div className='mb-4'>
                            <label className={`block text-xl text-black mb-0.5 font-medium ${class1}`}>Enter new project name:</label>
                            <input 
                                type='text' 
                                className='w-full border-stone-700 rounded-md text-black border-2 h-10 text-xl mt-1 font-medium '
                                onChange={handleProjectNameChange}
                                onKeyPress={handleProjectNameKeyPress}
                            />
                        </div>
                    )}

                    {action === "select" && (
                        <div className='mb-4'>
                            <label className={`block text-xl text-black mb-0.5 font-medium ${class1}`}>Select project:</label>
                            <select 
                                className='w-full border-stone-700 rounded-md text-black border-2 h-10 text-xl mt-1 font-medium '
                                onChange={handleProjectSelectChange}
                                value={selectedProject}
                            >
                                <option value="none">None</option>
                                {/* {projects.map(project => (
                                    <option key={project.id} value={project.id}>{project.name}</option>
                                ))} */}
                                {projects.map((project, index) => (
                                    <option key={index} value={project}>{project}</option>
                                ))}
                            </select>
                        </div>
                    )}


                    {action === 'delete' && (
                                    <div className='mt-4'>
                                        <label className={`block text-xl text-black mb-0.5 font-medium ${class1}`}>Select project to delete:</label>
                                        <select 
                                            className='w-full  border-stone-700 rounded-md text-black border-2 h-10 text-xl mt-1 font-medium'
                                            value={selectedProject1}
                                            onChange={handleProjectChange}
                                        >   
                                            <option value="none">None</option>
                                            {projects.map((project, index) => (
                                                <option key={index} value={project}>{project}</option>
                                            ))}
                                        </select>
                                    </div>
                                )}

                        {showSecondDropdown && (
                            <>
                                        <div className='mt-4'>
                                            <label className={`block text-xl text-black mb-0.5 font-medium ${class1}`}>Select an action:</label>
                                            <select 
                                                className='w-full border-stone-700  rounded-md text-black border-2 h-10 text-xl mt-1 font-medium'
                                                value={selectedOption2}
                                                onChange={handleOption2Change}
                                            >
                                                <option value="delete project">Delete Project</option>
                                                <option value="delete version">Delete Version</option>
                                            </select>

                                            {selectedOption2 === 'delete version' && (
                                            <>
                                                <div className='mt-4'>
                                                    <label className={`block text-xl text-black mb-0.5 font-medium ${class1}`}>Select version to delete:</label>
                                                    <select 
                                                        className='w-full border-stone-700  rounded-md text-black border-2 h-10 text-xl mt-1 font-medium'
                                                        value={deleteVersion1}
                                                        onChange={handleVersionChange1}
                                                    >
                                                        <option value="none">None</option>
                                                        {ver.map((version, index) => (
                                                            <option key={index} value={version}>{version}</option>
                                                        ))}
                                                    </select>
                                                </div>

                                                <button 
                                                    className="mt-6 px-4 py-2 bg-[#1f4e96] text-white rounded-md transition-colors duration-300 text-center block w-full "
                                                    onClick={handleConfirmDelete}
                                                >
                                                    Confirm Delete Version
                                                </button>
                                            </>
                                        )}
                                          <div className={`flex justify-center ${selectedOption2 === 'delete version'? 'hidden' : ''}`}>
                                            <button 
                                                className="mt-6 px-4 py-2 bg-[#1f4e96] text-white rounded-md transition-colors duration-300 text-center block w-full "
                                                onClick={handleConfirmDelete1}
                                            >
                                                Confirm Delete Project
                                            </button>
                                            </div>

                                            {/* <p className="text-left text-lg font-medium mt-2">Please select from the dropdown</p> */}
                                        </div>
                                        </>
                                    )}            

                      {selectedProject && showactiondropdown && (
                        <>
                            <div className='mb-4'>
                                <label className={`block text-xl text-black mb-0.5 font-medium ${class1}`}>Choose an  action:</label>
                                <select 
                                    className='w-full border-stone-700 rounded-md text-black border-2 h-10 text-xl mt-1 font-medium'
                                    onChange={handleExtraActionChange}
                                    value={extraAction}
                                >
                                    <option value="create">Create New Version</option>
                                    <option value="view">Select Existing Version</option>
                                </select>
                                {/* {extraAction === "view1" && ( */}
                                        <div className={`mb-4 mt-4 ${extraAction === 'view' ? 'hidden' : ''} `}>
                                            <label className={`block text-xl text-black mb-0.5 font-medium ${class1}`}>Enter the new version name:</label>
                                            <input 
                                                type='text' 
                                                className='w-full border-stone-700 rounded-md text-black border-2 h-10 text-xl mt-1 font-medium'
                                                // value={versionName}
                                                onChange={handleVersionNameChange1}
                                                onKeyPress={handleVersionNameKeyPress1}
                                            />
                                        </div>
                                    {/* )} */}
                            </div>

                            {showFileUpload1 && (
                                            <>
                                               <h2 className={`text-xl text-black mb-4 font-medium ${class1}`}>Supported file type: PDF</h2>
                                            <div
                                                className="flex flex-col items-center mt-4 justify-center rounded border-black w-70 h-44 transition-transform "
                                                style={{ padding: '20px', background: 'linear-gradient(rgb(31, 78, 150), rgb(81, 208, 253))', marginBottom: '50px' }}
                                                onDragOver={handleDragOver1}
                                                onDrop={handleDrop1}
                                            >
                                                    <div className="flex flex-col items-center font-medium text-black">
                                                        <FaFileUpload color='#e7baff' size='2em' />
                                                        <p>Drag & drop your file here</p>
                                                        <p style={{color:'brown'}}>Note:Limit 200MB per file</p>
                                                        <label className='mt-2 cursor-pointer px-4 py-2 border-2 border-black rounded text-black' htmlFor='input-file'>
                                                            Browse files
                                                            <input
                                                                type='file'
                                                                accept='application/pdf'
                                                                id='input-file'
                                                                onChange={handleFileChange1}
                                                                className="hidden"
                                                            />
                                                        </label>
                                                    </div>
                                                    
                                            </div>
                                            {selectedFile1 && (
                                                    <div className={`flex items-center justify-between w-70 -mt-11 text-black border-gray-300 ${class1}`}>
                                                    <div className="flex items-center truncate font-medium">
                                                        <InsertDriveFileRoundedIcon style={{ color: 'black', fontSize: '2em' }} />
                                                        <p className="ml-2 truncate font-medium max-w-xs">{selectedFile1.name}</p>
                                                        <p className="text-black font-medium">{`(${(selectedFile1.size / 1024).toFixed(2)} KB)`}</p>
                                                    </div>
                                                    <button onClick={clearFile1} className="text-red-600 hover:text-red-800">
                                                        <FaTimesCircle size='1.5em' />
                                                    </button>
                                                </div>
                                                )}
                                            {selectedFile1 && (
                                                <button 
                                                    className={`mt-3 px-4 py-2  bg-[#1f4e96] text-white rounded-md transition-colors duration-300 text-center block w-full ${action== 'create' ? 'hidden': ''}`}
                                                    onClick={handleSubmit1}
                                                >
                                                    Submit
                                                </button>
                                            )}
                                            </>
                                        )}

                            {extraAction === "view" && (
                                <div className='mb-4'>
                                    <label className={`block text-xl text-black mb-0.5 font-medium ${class1}`}>Select version:</label>
                                    <select 
                                        className='w-full border-stone-700 rounded-md text-black border-2 h-10 text-xl mt-1 font-medium'
                                        onChange={handleVersionChange}
                                        value={selectedVersion} 
                                    >
                                        <option value="none">None</option>
                                        {ver.map((ver, index) => (
                                                <option key={index} value={ver}>{ver}</option>
                                        ))}
                                    </select>
                                </div>
                            )}

                            {selectedVersion && (
                                            <div className='mb-4'>
                                                <label className={`block text-xl text-black mb-0.5 font-medium ${class1}`}>Fetch data from document:</label>
                                                <select 
                                                    className='w-full border-stone-700 rounded-md text-black border-2 h-10 text-xl mt-1 truncate max-w-full overflow-hidden text-ellipsis whitespace-nowrap font-medium'
                                                    onChange={handlePdfFileChange}
                                                >
                                                    <option>None</option>
                                                    {pdffiles.map((pdf, index) => (
                                                        <option
                                                            key={index}
                                                            value={pdf}
                                                            className="truncate max-w-full overflow-hidden text-ellipsis whitespace-nowrap"
                                                            title={pdf} 
                                                        >
                                                            {truncateText(pdf, 30)}
                                                        </option>
                                                    ))}
                                                </select>
                                            </div>
                                        )}
                        </>
                    )}

                    {showVersionFields && (
                        <>
                            <div className='mb-4'>
                                <label className={`block text-xl text-black mb-0.5 font-medium ${class1}`}>Version:</label>
                                <select className='w-full border-stone-700 rounded-md text-black border-2 h-10 text-xl mt-1 font-medium'>
                                    <option value="create">Create New Version</option>
                                </select>
                            </div>
                            <div className='mb-4'>
                                <label className={`block text-xl text-black mb-0.5 font-medium ${class1}`}>Enter new version name:</label>
                                <input
                                    type='text'
                                    className='w-full border-stone-700 rounded-md text-black border-2 h-10 text-xl mt-1 font-medium'
                                    onChange={handleVersionNameChange}
                                    onKeyPress={handleVersionNameKeyPress}
                                />
                            </div>
                        </>
                    )}

                    {showFileUpload && (
                        <>
                    <h2 className={`text-xl text-black mb-4 font-medium`}>Supported file type: PDF</h2>
                    <div
                        className="flex flex-col items-center mt-4 justify-center rounded border-black w-70 h-44 transition-transform "
                        style={{ padding: '20px', background: 'linear-gradient(rgb(31, 78, 150), rgb(81, 208, 253))', marginBottom: '50px' }}
                        onDragOver={handleDragOver}
                        onDrop={handleDrop}
                    >
                            <div className="flex flex-col items-center font-medium text-black">
                                <FaFileUpload color='#e7baff' size='2em' />
                                <p>Drag & drop your file here</p>
                                <p style={{color:'brown'}}>Note:Limit 200MB per file</p>
                                <label className='mt-2 cursor-pointer px-4 py-2 border-2 border-black rounded text-black' htmlFor='input-file'>
                                    Browse files
                                    <input
                                        type='file'
                                        accept='application/pdf'
                                        id='input-file'
                                        onChange={handleFileChange}
                                        className="hidden"
                                    />
                                </label>
                            </div>
                    </div>
                    {selectedFile && (
                            <div className={`flex items-center justify-between w-70 -mt-9 text-black border-gray-300 ${class1}`}>
                            <div className="flex items-center truncate font-medium">
                                <InsertDriveFileRoundedIcon style={{ color: 'black', fontSize: '2em' }} />
                                <p className="ml-2 truncate font-medium max-w-xs">{selectedFile.name}</p>
                                <p className="text-black font-medium">{`(${(selectedFile.size / 1024).toFixed(2)} KB)`}</p>
                            </div>
                            <button onClick={clearFile} className="text-red-600 hover:text-red-800">
                                <FaTimesCircle size='1.5em' />
                            </button>
                        </div>
                        )}
                     </>
                    )}
            
            {selectedFile && (
                <div className={`flex justify-center ${action === 'delete' ? 'hidden' : ''} ${action== 'select' ? 'hidden': ''} `}>
                    <button 
                        className="mt-3 px-4 py-2 bg-[#1f4e96] text-white rounded-md transition-colors duration-300 text-center block w-full"
                        onClick={handleSubmit}
                    >
                        Submit
                    </button>
                </div>
            )}
                                               
                </>
            )}

            {option === "search" && (
                <>
                </>
            )}
        </div>
    );
}

export default AiContractSidebar;
