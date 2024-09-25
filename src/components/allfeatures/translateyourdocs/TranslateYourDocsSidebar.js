import React, { useState, useContext, useEffect } from 'react';
import { FaFileUpload } from "react-icons/fa";
import { useDropzone } from 'react-dropzone';
import TranslateYourDocsThemeContext from './TranslateYourDocsThemeContext';
import Select from 'react-select';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const TranslateYourDocsSidebar = () => {
    const [file1, setFile1] = useState(null);
    const [fileSizeError, setFileSizeError] = useState(false);
    const [selectedLanguage, setSelectedLanguage] = useState('');
    
    const { sendData, loadTrue, fileTrue, loadFalse, setDownloadLink,setFileReady, fileReady, progress, updateProgress,
        fileError, setFileError, formError, setFormError, serverError, setServerError
     } = useContext(TranslateYourDocsThemeContext);

    const MAX_FILE_SIZE = 200 * 1024 * 1024; // 200MB in bytes

    const onDrop = (acceptedFiles) => {
        const file = acceptedFiles[0];
        if (file.size > MAX_FILE_SIZE) {
            setFileSizeError(true);
            setFile1(null);
        } else {
            setFile1(file);
            setFileSizeError(false);
            setFileError(''); 
            setFormError(''); // Reset form errors if file is valid
            setServerError(''); // Reset server errors if new file is selected
            setFileReady('');
            setSelectedLanguage('');
        }
    };

    const { getRootProps, getInputProps, isDragActive } = useDropzone({
        onDrop,
        accept: {'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet': ['.xlsx'],
        'application/vnd.ms-excel': ['.xls'],
        'text/plain': ['.csv'],
         'application/pdf':['.pdf'],
         'application/vnd.openxmlformats-officedocument.wordprocessingml.document':['.doc'],
        'application/vnd.openxmlformats-officedocument.presentationml.presentation':['.ppt']},
        multiple: false
    });

    const handleLanguageChange = (selectedOption) => {
        setSelectedLanguage(selectedOption.value);
        setFormError('')
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        setFileError('');
        setFormError('');
        setServerError('');
        
        // Error handling before submission
        if (!file1) {
            setFormError('Please upload a file.');
            return;
        }
        if (!selectedLanguage) {
            setFormError('Please select a target language.');
            return;
        }
        const Translatedoc=process.env.REACT_APP_TRANSLATION_DOC
        const username = 'ychatgpt';
        const password = 'dfnefiwnfwfniwfndscscnxzcx3243cxx';
        const credentials = btoa(`${username}:${password}`);

        const formData = new FormData();
        formData.append('file', file1);
        
        loadTrue(); // Trigger loading state

        try {
            const response = await fetch(Translatedoc+`target_language_code=${selectedLanguage}`, {
          
                method: 'POST',
                body: formData,
                headers: {
                    'Authorization': `Basic ${credentials}`,
                },
            });
            console.log(response);
            
            if (!response.ok) {
                const errorData = await response.json();
                let errorMessage = errorData.error || errorData.message || 'An error occurred.';
                if (response.status === 404) {
                    errorMessage = 'Error translating the document, Please try again later.';
                } else if (response.status === 406) {
                    errorMessage = 'Document exceeds the 50k character limit for translation. Please select another document.';
                } else if (response.status >= 500) {
                    errorMessage = 'Server error. Please try again later.';
                }
                setServerError(errorMessage);
                return;
            }  

            const data = await response.json();
            setDownloadLink(data.download_url);
            console.log("url",data)
            fileTrue(); 
            setServerError(null); 
            setFormError(null);
            
        } catch (error) {
            setServerError('Error connecting to the server.Translation failed, please try again later.'); 
        } finally {
            loadFalse();
        }
    };

    const clearFile = () => {
        setFile1(null);
        setSelectedLanguage('');
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

    return (
        <div className="w-full p-6">
            {/* File Upload Section */}
            <div
                {...getRootProps()}
                className={`flex flex-col items-center justify-center border-2 border-dashed rounded-md p-6 mb-6 ${
                    isDragActive ? 'bg-blue-200' : 'bg-white'
                }`}
                style={{
                    background: 'linear-gradient(rgb(31, 78, 150), rgb(81, 208, 253))',
                    transition: 'transform 0.2s',
                }}
            >
                <input {...getInputProps()} />
                <FaFileUpload size="3em" color="#e7baff" />
                {isDragActive ? (
                    <p className="mt-4">Drop the file here...</p>
                ) : (
                    <p className="mt-4">Drag & Drop file here, or click to select a file ("pdf", "docx", "txt","pptx","csv","xlsx")</p>
                )}
                <p className="mt-2" style={{color:"brown"}}>Note: Limit 200MB per file </p>
            </div>

            {/* Error Handling */}
            

            {/* File Details */}
            {file1 && (
                <div className="mb-4 text-center">
                    <p className="text-black">Uploaded File:  <span style={{fontSize:'small'}}>{file1.name}</span></p>
                  
                    <p className="text-black">File Size: {(file1.size / (1024 * 1024)).toFixed(2)} MB</p>
                </div>
            )}

            {/* File Size Error */}
            {fileSizeError && (
                <div className="text-red-500 text-center mb-4">
                    The file size exceeds the maximum limit of 200MB.
                </div>
            )}

            {/* Language Selection */}
            {file1 && !fileSizeError && (
                <div className="flex flex-col items-start justify-start ">
                    <label htmlFor="language-select" className="mb-2 text-black w-full text-center">
                        Choose Target Language:
                    </label>
                    <div className="w-full flex justify-center border-x-black">
                        <Select
                            id="language-select"
                            value={languageOptions.find(option => option.value === selectedLanguage)}
                            onChange={handleLanguageChange}
                            options={languageOptions}
                            placeholder="Select Language"
                            isSearchable
                            styles={{
                                control: (provided) => ({
                                    ...provided,
                                    color: 'black',
                                    width: '100%',
                                    maxWidth: '620px',
                                    minWidth: '360px',
                                }),
                                singleValue: (provided) => ({
                                    ...provided,
                                    color: 'black',
                                }),
                                option: (provided) => ({
                                    ...provided,
                                    color: 'black',
                                }),
                            }}
                        />
                    </div>
                </div>
            )}

            {/* Buttons Section */}
            {file1 && !fileSizeError && (
                <div className="flex flex-col items-center justify-center pt-6">
                    <button
                        className="px-6 py-2 bg-[#1f4e96] text-white rounded-md mb-4"
                        onClick={handleSubmit}
                    >
                        Translate
                    </button>
                    <p className="text-red-500 mt-2">Note: Each document translation is limited to 50,000 characters, please ensure your document doesn't exceed this limit.</p>
                </div>
            )}

            <ToastContainer />
        </div>
    );
};

export default TranslateYourDocsSidebar;

