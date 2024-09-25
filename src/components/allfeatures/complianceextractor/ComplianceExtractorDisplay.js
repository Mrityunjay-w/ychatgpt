import React, { useContext, useState } from 'react';
import ComplianceExtractorThemeContext from './ComplianceExtractorThemeContext';
import { ClipLoader } from 'react-spinners';

const ComplianceExtractorDisplay = () => {
    const [fileName, setFileName] = useState(localStorage.getItem('fileName'));
    const { loading, fileReady,fileError, setFileError,formError, setFormError,serverError, setServerError,setFileReady } = useContext(ComplianceExtractorThemeContext);

    const handleDownload = () => {
        const base64String = localStorage.getItem('excelFile');
        const fileName = new Date().toISOString().split('T')[0] + '.xlsx'; // Using system date as file name
    
        if (base64String) {
            const link = document.createElement('a');
            link.href = base64String;
            link.download = fileName;
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
        } else {
            alert('No file found in local storage');
        }
    };
    

    return (
        <div style={{ padding: '20px' }}>
            <div className='flex flex-col items-center justify-center pt-6'>
                {fileReady ? (
                    <div className='w-2/3 text-center'>
                        {/* <h1 className='text-lg mb-4'>Data Extraction Results</h1> */}
                        <div className='bg-lime-200 h-20 rounded-full text-black mb-6'>
                            <p className='pt-6'>"Data extraction completed! Excel file generated successfully."</p>
                        </div>
                        <div className='bg-orange-100  h-20 rounded-full text-black mb-6'>
                            <p className='pt-6'>Generated File: {fileName}</p>
                        </div>
                        <button
                            className='mt-6 px-6 py-2 bg-[#1f4e96] text-white rounded-md'
                            onClick={handleDownload}
                            disabled={!fileName}
                        >
                            Download
                        </button>
                    </div>
                ) : (
                    <></> // Empty fragment if no file is ready
                )}

                {loading && (
                <div className="flex flex-col items-center w-full max-w-lg bg-white p-8 rounded-lg shadow-lg">
                <ClipLoader size={50} color={"#1f4e96"} loading={loading} />
                <p className="mt-4 text-gray-600 text-lg">Loading file, please wait...</p>
              </div>
                )}
                {fileError && (
                <div className='bg-red-200 h-20 rounded-full text-black p-4 mb-4 w-2/3'>
                    {/* toast.error('Please enter text to translate.'); */}
                    <p className='text-center'>{fileError}</p>
                </div>
                )}
                {formError && (
                <div className='bg-red-200 h-20 rounded-full text-black p-4 mb-4 w-2/3'>
                    <p className='text-center'>{formError}</p>
                </div>
                )}
                {serverError && (
                <div className='bg-red-200 h-20 rounded-full text-black p-4 mt-20 w-2/3'>
                    <p className='text-center'>{serverError}</p>
                </div>
                )}
            </div>
        </div>
    );
};

export default ComplianceExtractorDisplay;
