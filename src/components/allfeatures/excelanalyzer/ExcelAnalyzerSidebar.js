import React, { useState, useContext, useEffect } from 'react';
import { FaFileUpload } from "react-icons/fa";
import { useDropzone } from 'react-dropzone';
import ExcelAnalyzerThemeContext from './ExcelAnalyzerThemeContext';

const ExcelAnalyzerSidebar = () => {
    const [file1, setFile1] = useState(null);
    const [fileSizeError, setFileSizeError] = useState(false);
    const [formError, setFormError] = useState(''); // State to track validation errors
    const [fileName, setFileName] = useState('');
    const [fileSize, setFileSize] = useState(0);
    const MAX_FILE_SIZE = 200 * 1024 * 1024; // 200MB in bytes

    const { loadTrue, fileTrue, loadFalse, setdataa } = useContext(ExcelAnalyzerThemeContext);

    const onDrop = (acceptedFiles, rejectedFiles) => {
        const file = acceptedFiles[0];
        setFormError(''); // Reset form error on new file drop

        // Check if the file was rejected due to file type
        if (rejectedFiles.length > 0) {
            setFormError("Please upload only Excel or CSV files.");
            return;
        }

        if (file && file.size > MAX_FILE_SIZE) {
            setFileSizeError(true);
            setFile1(null);
            setFileName('');
            setFileSize(0);
            setFormError("The file size exceeds the maximum limit of 200MB.");
        } else if (file) {
            setFileSizeError(false);
            setFile1(file);
            setFileName(file.name);
            setFileSize(file.size);
        }
    };

    const { getRootProps, getInputProps, isDragActive } = useDropzone({
        onDrop,
        accept: {
            'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet': ['.xlsx'],
            'application/vnd.ms-excel': ['.xls'],
            'text/plain': ['.csv']
        },
        multiple: false,
    });

    useEffect(() => {
        localStorage.setItem('items', JSON.stringify([]));
    }, []);

    const handleSubmit = async (event) => {
        event.preventDefault();
        if (!file1) {
            setFormError("Please upload a file before submitting.");
            return;
        }

        const username = 'ychatgpt';
        const password = 'dfnefiwnfwfniwfndscscnxzcx3243cxx';
        const credentials = btoa(`${username}:${password}`);

        const formData = new FormData();
        formData.append('file1', file1);
        console.log('file1', file1);

        loadTrue();

        try {
            const response = await fetch('https://ychatgpt-apis.azurewebsites.net/excel_analyzer/analyze-excel', {
                method: 'POST',
                headers: {
                    'custom-header': 'route1',
                    'Authorization': `Basic ${credentials}`
                },
                body: formData
            });

            if (!response.ok) {
                const errorText = await response.text();  // Retrieve error message from server
                throw new Error(errorText || "Failed to upload the file");
            }

            const rawResponse = await response.text();
            console.log('Raw response:', rawResponse);

            const data = JSON.parse(rawResponse);
            console.log('Parsed data:', data);
            setdataa(data);

            if (response.ok) {
                fileTrue();
                console.log("File uploaded successfully.");
            }
        } catch (error) {
            setFormError(`Error uploading file: ${error.message}`);
            console.error('Error uploading file:', error);
        } finally {
            loadFalse();
        }
    };

    return (
        <div className='w-full'>
            <div
                {...getRootProps()}
                className={`flex flex-col items-center mt-52 justify-center border-2 border-dashed rounded p-6 mb-6 ${isDragActive ? 'bg-blue-200' : 'bg-white'}`}
                style={{ background: 'linear-gradient(rgb(31, 78, 150), rgb(81 208 253))', transition: 'transform 0.2s' }}
            >
                <input {...getInputProps()} />
                <FaFileUpload color='#e7baff' size='3em' />
                {isDragActive ? (
                    <p className="mt-4">Drop the file here...</p>
                ) : (
                    <p className="mt-4">Drag & Drop a file here, or click to select a file ("xlsx", "csv")</p>
                )}
                <p className="mt-2" style={{color:"brown"}}>Note: Limit 200MB per file </p>
            </div>

            {formError && (
                <div className='bg-red-200 h-auto rounded text-black p-4 mb-4 w-full'>
                    <p className='text-center'>{formError}</p>
                </div>
            )}

            {file1 && (
                <div className="text-center mb-4">
                    <p className="text-black">Uploaded File: {fileName}</p>
                    <p className="text-black">File Size: {(fileSize / (1024 * 1024)).toFixed(2)} MB</p>
                </div>
            )}

            {fileSizeError && (
                <div className="text-red-500 text-center mb-4">
                    The file size exceeds the maximum limit of 200MB.
                </div>
            )}

            <div className='flex flex-col items-center justify-center pt-6'>
                <button
                    className='px-6 py-2 bg-[#1f4e96] text-white rounded-md'
                    onClick={handleSubmit}
                    disabled={fileSizeError}
                >
                    Submit
                </button>
            </div>
        </div>
    );
};

export default ExcelAnalyzerSidebar;
