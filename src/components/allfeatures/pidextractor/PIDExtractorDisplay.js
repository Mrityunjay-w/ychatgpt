import React, { useContext, useState } from 'react';
import PIDExtractorThemeContext from './PIDExtractorThemeContext';
import { ClipLoader } from 'react-spinners';

const PIDExtractorDisplay = () => {
  const [fileName, setFileName] = useState(localStorage.getItem('fileName'));
  const { loading, fileReady,fileError, setFileError,formError, setFormError,serverError, setServerError,setFileReady } = useContext(PIDExtractorThemeContext);

  // Function to generate current date as part of the file name
  const getCurrentDateString = () => {
    const currentDate = new Date();
    const year = currentDate.getFullYear();
    const month = String(currentDate.getMonth() + 1).padStart(2, '0'); // Add leading zero for month
    const day = String(currentDate.getDate()).padStart(2, '0'); // Add leading zero for day
    return `${year}-${month}-${day}`;
  };

  // const handleDownload = () => {
  //   const base64String = localStorage.getItem('excelFile');
  //   const originalFileName = localStorage.getItem('fileName');
  //   const currentDateString = getCurrentDateString();

  //   if (base64String && originalFileName) {
  //     // Extract file extension from the original file name
  //     const fileExtension = originalFileName.split('.').pop();
  //     // Create the new file name with the current date
  //      setFileName = `PID_Data_${currentDateString}.${fileExtension}`;
  //     const newFileName = `PID_Data_${currentDateString}.${fileExtension}`;
  //     // Update fileName state to display the new file name
  //     setFileName(newFileName);

  //     const link = document.createElement('a');
  //     link.href = base64String;
  //     link.download = newFileName; // Use the new file name
  //     document.body.appendChild(link);
  //     link.click();
  //     document.body.removeChild(link);
  //   } else {
  //     alert('No file found in local storage');
  //   }
  // };

  const handleDownload = () => {
    const base64String = localStorage.getItem('excelFile');
    const fileName = localStorage.getItem('fileName');

    if (base64String && fileName) {
      // Convert base64 string to binary Blob

      // Create a link element and trigger a download
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
    <div className="p-7">
      <div className="flex flex-col items-center justify-center mt-6">
        {fileReady && (
          <div className="w-2/3 text-center">
            <div className="bg-lime-200 bg-lime-200 h-20 rounded-full text-black mb-6">
              <p class="pt-6">Data Extracted and Excel file generated successfully!</p>
            </div>
            <div className="bg-orange-100 bg-lime-200 h-20 rounded-full text-black mb-6">
              <p class="pt-6">Generated File: {fileName}</p>
            </div>  
            <button
              className="px-6 py-2 bg-[#1f4e96] text-white rounded-md  transition duration-300"
              onClick={handleDownload}
              disabled={!fileName}
            >
              Download
            </button>
          </div>
        )}

        <div className="pt-8">
          {loading && (
           <div className="flex flex-col items-center w-full max-w-lg bg-white p-8 rounded-lg shadow-lg">
           <ClipLoader size={50} color={"#1f4e96"} loading={loading} />
           <p className="mt-4 text-gray-600 text-lg">Loading file, please wait...</p>
         </div>
          )}
          
        </div>
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
          <div className='bg-red-200 h-20 rounded-full text-black p-4 mb-4 w-2/3'>
              <p className='text-center'>{serverError}</p>
          </div>
          )}
      </div>
    </div>
  );
};

export default PIDExtractorDisplay;
