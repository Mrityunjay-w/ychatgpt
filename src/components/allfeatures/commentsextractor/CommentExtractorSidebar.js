// import React, { useState, useContext, useEffect } from 'react';
// import { FaFileUpload } from 'react-icons/fa';
// import CommentExtractorThemeContext from './CommentExtractorThemeContext';
// import { useDropzone } from 'react-dropzone';

// // File size limit: 200MB in bytes
// const MAX_FILE_SIZE = 200 * 1024 * 1024;

// // File validation function
// const validateFileSize = (file) => {
//   if (file.size > MAX_FILE_SIZE) {
//     return { isValid: false, error: 'File size exceeds 200MB limit' };
//   }
//   return { isValid: true };
// };

// const CommentExtractorSidebar = () => {
//     const [file, setFile] = useState(null);
//     const [fileError, setFileError] = useState('');
//     const { sendData, loadTrue, fileTrue, loadFalse, userEmail, ccEmail, subject, setFileUrls } = useContext(CommentExtractorThemeContext);

//     useEffect(() => {
//         if (file) {
//             localStorage.setItem('file', JSON.stringify(file));
//         }
//     }, [file]);

//     // Handle file drop (for drag-and-drop)
//     const onDrop = (acceptedFiles) => {
//         const file = acceptedFiles[0];
//         const { isValid, error } = validateFileSize(file);
//         if (!isValid) {
//             setFileError(error);
//             setFile(null);
//         } else {
//             setFile(file);
//             setFileError('');
//         }
//     };

//     const { getRootProps, getInputProps, isDragActive } = useDropzone({
//         onDrop,
//         accept: {
//             'application/pdf': ['.pdf'] // Show only PDF files in the file picker
//         },
//         multiple: false
//     });
//     const handleSubmit = async (event) => {
//         event.preventDefault();

//         if (!file || !userEmail || !subject) {
//             console.error('File, email, or subject missing');
//             return;
//         }

//         const formData = new FormData();
//         formData.append('file', file);
//         formData.append('userEmail', userEmail);
//         formData.append('ccEmail', ccEmail);
//         formData.append('subject', subject);

//         const username = 'ychatgpt';
//         const password = 'dfnefiwnfwfniwfndscscnxzcx3243cxx';
//         const credentials = btoa(`${username}:${password}`);

//         loadTrue();

//         try {
//             const response = await fetch('https://ychatgpt-api.azurewebsites.net/pdf_comment_extractor/extract_comments', {
//                 method: 'POST',
//                 body: formData,
//                 headers: {
//                     Authorization: `Basic ${credentials}`,
//                 },
//             });

//             if (response.ok) {
//                 const data = await response.json();
//                 setFileUrls(data);
//                 localStorage.setItem('excelFile', data.excel_url);
//                 localStorage.setItem('pdfFile', data.pdf_url);
//                 fileTrue(); // Mark file as processed
//             } else {
//                 console.error('Error extracting comments');
//             }
//         } catch (error) {
//             console.error('Error:', error);
//         } finally {
//             loadFalse(); // Hide loading indicator
//         }
//     };

//     return (
//         <div className="w-full p-6">
//             {/* File Upload Section */}
//             <div
//                 {...getRootProps()}
//                 className={`flex flex-col items-center justify-center border-2 border-dashed rounded-md p-6 mb-6 ${
//                     isDragActive ? 'bg-blue-200' : 'bg-white'
//                 }`}
//                 style={{
//                     background: 'linear-gradient(rgb(31, 78, 150), rgb(81, 208, 253))',
//                     transition: 'transform 0.2s',
//                 }}
//             >
//                 <input {...getInputProps()} />
//                 <FaFileUpload size="3em" color="#e7baff" />
//                 {isDragActive ? (
//                     <p className="mt-4">Drop the file here...</p>
//                 ) : (
//                     <p className="mt-4">Drag & Drop a PDF file here, or click to select a file</p>
//                 )}
//                 <p className="mt-2" style={{color:"brown"}}>Note: Limit 200MB per file </p>
//             </div>

//             {/* Display file details */}
//             {file && !fileError && (
//                 <div className="mb-4 text-center">
//                     <p className="text-black">Uploaded File: {file.name}</p>
//                     <p className="text-black">File Size: {(file.size / (1024 * 1024)).toFixed(2)} MB</p>
//                 </div>
//             )}

//             {/* Display file error if any */}
//             {fileError && <p className="text-red-500 text-center mb-4">{fileError}</p>}

//             {/* Submit Button */}
//             {file && !fileError && (
//                 <div className="flex flex-col items-center justify-center pt-6">
//                     <button
//                         className="px-6 py-2 bg-[#1f4e96] text-white rounded-md"
//                         onClick={handleSubmit}
//                         disabled={!file || fileError}
//                     >
//                         Extract Comments
//                     </button>
//                 </div>
//             )}
//         </div>
//     );
// };

// export default CommentExtractorSidebar;

import React, { useState, useContext, useEffect } from 'react';
import { FaFileUpload } from 'react-icons/fa';
import CommentExtractorThemeContext from './CommentExtractorThemeContext';
import { useDropzone } from 'react-dropzone';

// File size limit: 200MB in bytes
const MAX_FILE_SIZE = 200 * 1024 * 1024;

// File validation function
const validateFileSize = (file) => {
    if (file.size > MAX_FILE_SIZE) {
        return { isValid: false, error: 'File size exceeds 200MB limit' };
    }
    return { isValid: true };
};

// Email validation function
const isValidEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
};

const CommentExtractorSidebar = () => {
    const [file, setFile] = useState(null);
    const { sendData, loadTrue, fileTrue, loadFalse, userEmail, setUserEmail, ccEmail, setccEmail, subject, setSubject,
        setFileUrls, fileError, setFileError, formError, setFormError, serverError, setServerError,setFileReady,
    } = useContext(CommentExtractorThemeContext);

    useEffect(() => {
        if (file) {
            localStorage.setItem('file', JSON.stringify(file));
        }
    }, [file]);

    // Handle file drop (for drag-and-drop)
    const onDrop = (acceptedFiles) => {
        const file = acceptedFiles[0];
        const { isValid, error } = validateFileSize(file);
        if (!isValid) {
            setFileError(error);
            setFile(null);
        } else {
            setFile(file);
            setFileError(''); 
            setFormError(''); 
            setServerError(''); 

            setUserEmail('');
            setccEmail('');
            setSubject('');

            setFileReady('');
            
        }
    };

    const { getRootProps, getInputProps, isDragActive } = useDropzone({
        onDrop,
        accept: {
            'application/pdf': ['.pdf'] 
        },
        multiple: false,
    });

    const handleSubmit = async (event) => {
        event.preventDefault();

        setFileError('');
        setFormError('');
        setServerError('');
        setFileReady('')

        if (!userEmail || !isValidEmail(userEmail)) {
            setFormError('Please provide a valid user email address.');
            return;
        }
        if (!ccEmail || !isValidEmail(ccEmail)) {
            setFormError('Please provide a valid CC email address.');
            return;
        }
        if (!subject || subject.trim() === '') {
            setFormError('Please provide a subject.');
            return;
        }
        if (!file) {
            setFormError('Please upload a file.');
            return;
        }

        const formData = new FormData();
        formData.append('file', file);
        formData.append('userEmail', userEmail);
        formData.append('ccEmail', ccEmail);
        formData.append('subject', subject);
        
        const COMMENTS=process.env.REACT_APP_COMMENTS_GENERATOR;
        const username = 'ychatgpt';
        const password = 'dfnefiwnfwfniwfndscscnxzcx3243cxx';
        const credentials = btoa(`${username}:${password}`);

        loadTrue();

        try {
            const response = await fetch(COMMENTS, {
                method: 'POST',
                body: formData,
                headers: {
                    Authorization: `Basic ${credentials}`,
                },
            });

            // if (response.ok) {
            //     const data = await response.json();
            //     const isCommentsEmpty = Array.isArray(data.comments) && data.comments.length === 0;
            //     const isExcelUrlUnavailable = data.excel_url === "No URL available";

            // if (isCommentsEmpty && isExcelUrlUnavailable) {
            //     setFileUrls({ excel_url: "No URL available" });
            // } else {
            //     setFileUrls(data);
            //     localStorage.setItem('excelFile', data.excel_url);
            //     console.log('excelFile', data.excel_url)
            //     localStorage.setItem('pdfFile', data.pdf_url); 
            // }
            //     // setFileUrls(data);
            //     // localStorage.setItem('excelFile', data.excel_url);
            //     // localStorage.setItem('pdfFile', data.pdf_url);
            //     fileTrue(); 
            //     setFormError(''); 
            //     setServerError(''); 
            // } else {
            //     const errorData = await response.json();
            //     setServerError(errorData.message || 'Error extracting comments from the PDF.');
            // }
            if (!response.ok) {
                const errorData = await response.json();
                let errorMessage = errorData.error || errorData.message || 'An error occurred.';
                if (response.status === 400) {
                    errorMessage = 'Invalid email/cc id.';
                } else if (response.status === 403) {
                    errorMessage = 'Invalid file format. Only PDFs are supported';
                } else if (response.status === 404) {
                    errorMessage = 'No comments available in the uploaded PDF file.';
                } else if (response.status === 409) {
                    errorMessage = 'CC email id should be different from user email id.';
                } else if (response.status >= 500) {
                    errorMessage = 'Server error. Please try again later.';
                }
                setServerError(errorMessage);
                return;
            }

            const data = await response.json();
            setFileUrls(data);
            localStorage.setItem('excelFile', data.excel_url);
            console.log('excelFile', data.excel_url)
            localStorage.setItem('pdfFile', data.pdf_url); 
            fileTrue(); 
            setFormError(''); 
            setServerError('');

        } catch (error) {
            setServerError('Error connecting to the server. Please try again later.');
        } finally {
            loadFalse();
        }
    };

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
                <input {...getInputProps()}  accept="application/pdf" />
                <FaFileUpload size="3em" color="#e7baff" />
                {isDragActive ? (
                    <p className="mt-4">Drop the file here...</p>
                ) : (
                    <p className="mt-4">Drag & Drop a PDF file here, or click to select a file</p>
                )}
                <p className="mt-2" style={{color: "brown"}}>Note: Limit 200MB per file</p>
            </div>

            {/* Display file details */}
            {file && !fileError && (
                <div className="mb-4 text-center">
                    <p className="text-black">Uploaded File:  <span style={{fontSize:'small'}}>{file.name}</span></p>
                    <p className="text-black">File Size: {(file.size / (1024 * 1024)).toFixed(2)} MB</p>
                </div>
            )}

            {/* Submit Button */}
            {file && !fileError && (
                <div className="flex flex-col items-center justify-center pt-6">
                    <button
                        className="px-6 py-2 bg-[#1f4e96] text-white rounded-md"
                        onClick={handleSubmit}
                        disabled={!file || fileError}
                    >
                        Extract Comments
                    </button>
                </div>
            )}
        </div>
    );
};

export default CommentExtractorSidebar;
