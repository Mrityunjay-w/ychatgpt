import React, { useState, useContext } from 'react';
import { FaFileUpload } from 'react-icons/fa';
import { useDropzone } from 'react-dropzone';
import ComplianceExtractorThemeContext from './ComplianceExtractorThemeContext';

const MAX_FILE_SIZE = 200 * 1024 * 1024; // 200MB in bytes

const ComplianceExtractorSidebar = () => {
    const [file, setFile] = useState(null);
    // const [fileError, setFileError] = useState('');
    const { sendData, loadTrue, fileTrue, loadFalse, filedata, setFiledata,fileError, setFileError,formError, setFormError,serverError, setServerError,setFileReady } = useContext(ComplianceExtractorThemeContext);

    const onDrop = (acceptedFiles) => {
        const selectedFile = acceptedFiles[0];
        if (selectedFile && selectedFile.size > MAX_FILE_SIZE) {
            setFileError('File size exceeds 200MB limit');
            setFile(null);
        } else {
            setFile(selectedFile);
            setFileError('');
            setFileError(''); 
            setFormError(''); 
            setServerError(''); 
            setFileReady('');
        }
    };

    const { getRootProps, getInputProps, isDragActive } = useDropzone({
        onDrop,
        accept: {
            'application/pdf': ['.pdf'] // Show only PDF files in the file picker
        },
        multiple: false
    });

    const handleSubmit = async (event) => {
        event.preventDefault();

        setFileError('');
        setFormError('');
        setServerError('');

        if (!file) {
            setFileError('Please upload a file.');
            return;
        }

        setFiledata(true);
        const Comments=process.env.REACT_APP_COMMENTS_GENERATOR;
        const username = 'ychatgpt';
        const password = 'dfnefiwnfwfniwfndscscnxzcx3243cxx';
        const credentials = btoa(`${username}:${password}`);

        const formData = new FormData();
        formData.append('file', file);

        loadTrue();
        try {
            const response = await fetch(Comments, {
                method: 'POST',
                body: formData,
                headers: {
                    'Authorization': `Basic ${credentials}`,
                },
            });

            if (!response.ok) {
                let errorMessage = `Error: ${response.status} ${response.statusText}`;
            
                try {
                    // Try to parse the response as JSON and extract the message
                    const errorData = await response.json();
                    if (errorData && errorData.message) {
                        errorMessage = errorData.message;
                    }
                } catch (e) {
                    // If parsing fails, fall back to a generic message based on the status code
                    if (response.status === 400) {
                        errorMessage = 'Bad Request: Please check the file and try again.';
                    } else if (response.status === 404) {
                        errorMessage = 'Error: The requested resource was not found.';
                    } else if (response.status === 500) {
                        errorMessage = 'Server Error: Please try again later.';
                    } else {
                        errorMessage = `Unexpected error occurred: ${response.status} ${response.statusText}`;
                    }
                }
            
                setServerError(errorMessage);
                throw new Error(errorMessage);
            }

            const blob = await response.blob();
            const reader = new FileReader();
            reader.readAsDataURL(blob);

            reader.onloadend = () => {
                const base64data = reader.result;
                localStorage.setItem('excelFile', base64data);
                localStorage.setItem('fileName', 'Output.xlsx');
                fileTrue();
            };
        } catch (error) {
            console.error('Error uploading file:', error);
            setServerError('Error connecting to the server. Please try again later.');
        } finally {
            loadFalse();
        }
    };

    return (
        <div className="w-full p-6">
            {/* File Upload Section with Drag-and-Drop */}
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
                <input {...getInputProps()} accept="application/pdf" />
                <FaFileUpload color="#e7baff" size="3em" />
                {isDragActive ? (
                    <p className="mt-4">Drop the file here...</p>
                ) : (
                    <p className="mt-4">Drag & Drop a PDF file here, or click to select a file</p>
                )}
                <p className="mt-2" style={{color:"brown"}}>Note: Limit 200MB per file </p>
            </div>

            {/* Display file details */}
            {file && !fileError && (
                <div className="mb-4 text-center">
                    <p className="text-black">Uploaded File: {file.name}</p>
                    <p className="text-black">File Size: {(file.size / (1024 * 1024)).toFixed(2)} MB</p>
                </div>
            )}

            {/* Display file error */}
            {fileError && (
                <div className="mt-4 text-center text-red-500">
                    {fileError}
                </div>
            )}

            {/* Submit Button */}
            {file && !fileError && (
                <div className="flex flex-col items-center justify-center pt-6">
                    <button
                        className="px-6 py-2 bg-[#1f4e96] text-white rounded-md"
                        onClick={handleSubmit}
                    >
                        Extract
                    </button>
                </div>
            )}
        </div>
    );
};

export default ComplianceExtractorSidebar;
