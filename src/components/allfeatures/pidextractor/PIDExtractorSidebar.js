import React, { useState, useContext, useEffect } from 'react';
import { FaFileUpload } from "react-icons/fa";
import { useDropzone } from 'react-dropzone';
import PIDExtractorThemeContext from './PIDExtractorThemeContext';

const PIDExtractorSidebar = () => {
    const [file, setFile] = useState(null);
    const [fileName, setFileName] = useState('');
    const [fileSizeError, setFileSizeError] = useState(false);
    const MAX_FILE_SIZE = 200 * 1024 * 1024; // 200MB limit

    const { sendData, loadTrue, fileTrue, loadFalse,fileError, setFileError,formError, setFormError,serverError, setServerError,setFileReady } = useContext(PIDExtractorThemeContext);

    const onDrop = (acceptedFiles) => {
        const selectedFile = acceptedFiles[0];

        // Ensure the file is a PDF
        if (selectedFile && selectedFile.type !== 'application/pdf') {
            alert('Please upload only PDF files');
            setFile(null);
            setFileName('');
            return;
        }

        if (selectedFile && selectedFile.size > MAX_FILE_SIZE) {
            setFileSizeError(true);
            setFile(null);
            setFileName('');
        } else {
            setFileSizeError(false);
            setFile(selectedFile);
            setFileName(selectedFile.name);
            setFileError(''); 
            setFormError(''); 
            setServerError(''); 
            setFileReady('');
        }
    };

    // Accept only PDF files using MIME type and extension
    const { getRootProps, getInputProps, isDragActive } = useDropzone({
        onDrop,
        accept: {
            'application/pdf': ['.pdf'] // Show only PDF files in the file picker
        },
        multiple: false
    });

    useEffect(() => {
        localStorage.setItem('items', JSON.stringify([]));
    }, []);

    const handleSubmit = async (event) => {
        event.preventDefault();
        if (!file) return;

        setFileError('');
        setFormError('');
        setServerError('');

        if (!file) {
            setFormError('Please upload a file.');
            return;
        }

        const formData = new FormData();
        formData.append('file', file);

        const username = 'ychatgpt';
        const password = 'dfnefiwnfwfniwfndscscnxzcx3243cxx';
        const credentials = btoa(`${username}:${password}`);

        loadTrue();

        try {
            const response = await fetch('https://ychatgpt-apis.azurewebsites.net/pid_extractor/extract-pid', {
                method: 'POST',
                body: formData,
                headers: {
                    'Authorization': `Basic ${credentials}`,
            },
        });

        if (!response.ok) {
            let errorMessage;
            if (response.status === 404) {
                errorMessage = "Uploaded file doesn't contain any P&ID to extract.";
            } else {
                errorMessage = `Error: ${response.status} ${response.statusText}`;
            }
            setServerError(errorMessage);
            throw new Error(errorMessage);
        }

            // Check if the response is OK (status code 2xx)
        if (!response.ok) {
            // Handle different error statuses
            let errorMessage;
            if (response.status === 404) {
            errorMessage = "Uploaded file doesn't contain any P&ID to extract.";
            } else if (response.status === 401) {
            errorMessage = 'Unauthorized: Please check your credentials.';
            } else if (response.status === 500) {
            errorMessage = 'Internal server error. Please try again later.';
            } else {
            errorMessage = `Error: ${response.status} ${response.statusText}`;
            }
            setServerError(errorMessage); // Display the custom error message
            throw new Error(errorMessage); // Throw the error to catch block
        }

        const blob = await response.blob();
        console.log('response:', blob);

        // Ensure the content type is Excel format
        const mimeType = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet';
        const excelBlob = new Blob([blob], { type: mimeType });

        // Extract filename from the Content-Disposition header
        const contentDisposition = response.headers.get('Content-Disposition');
        let filename = 'downloaded-file.xlsx'; // Default fallback filename

        if (contentDisposition && contentDisposition.includes('filename=')) {
        const match = contentDisposition.match(/filename="?(.+)"?/);
        if (match && match.length > 1) {
            filename = match[1];
        }
        }

        // Ensure the filename has the correct .xlsx extension
        if (!filename.endsWith('.xlsx')) {
        filename += '.xlsx';
        }

        const reader = new FileReader();
        reader.readAsDataURL(blob);
        reader.onloadend = () => {
        const base64data = reader.result;
        
        localStorage.setItem('excelFile', base64data);
        console.log('excelFile', base64data);
        localStorage.setItem('fileName', filename);
        console.log('fileName', filename);
        setFileName(filename);
        fileTrue(); // Update file readiness state
      };
    } catch (error) {
        setServerError('Error connecting to the server. Please try again later.');
        console.error('Error uploading file:', error);
    } finally {
        loadFalse();
    }
    };

    return (
        <div className='w-full'>
            {/* Drag and Drop Area */}
            <div
                {...getRootProps()}
                className={`flex flex-col items-center mt-52 justify-center border-2 border-dashed rounded p-6 mb-6 ${isDragActive ? 'bg-blue-200' : 'bg-white'}`}
                style={{ background: 'linear-gradient(rgb(31, 78, 150), rgb(81 208 253))', transition: 'transform 0.2s' }}
            >
                <input {...getInputProps()}  accept="application/pdf"/> {/* Accept only .pdf files */}
                <FaFileUpload color='#e7baff' size='3em' />
                {isDragActive ? (
                    <p className="mt-4">Drop the PDF here...</p>
                ) : (
                    <p className="mt-4">Drag & Drop a PDF file here, or click to select a file</p>
                )}
                <p className="mt-2" style={{color:"brown"}}>Note: Limit 200MB per file </p>
            </div>

            {/* File Details */}
            {file && (
                <div className="mb-4 text-center">
                    <p className="text-black">Uploaded File: {file.name}</p>
                    <p className="text-black">File Size: {(file.size / (1024 * 1024)).toFixed(2)} MB</p>
                </div>
            )}

            {/* File Size Error */}
            {fileSizeError && (
                <div className="text-red-500 text-center mb-4">
                    The file size exceeds the maximum limit of 200MB.
                </div>
            )}

            {/* Extract Button */}
            <div className='flex flex-col items-center justify-center pt-6'>
                <button
                    className='px-6 py-2 bg-[#1f4e96] text-white rounded-md'
                    onClick={handleSubmit}
                    disabled={fileSizeError || !file}
                >
                    Extract P&ID
                </button>
            </div>
        </div>
    );
};

export default PIDExtractorSidebar;
