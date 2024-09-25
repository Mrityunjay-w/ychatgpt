import React, { useContext, useState, useEffect } from 'react';
import TranslateYourDocsThemeContext from './TranslateYourDocsThemeContext';
import { ClipLoader } from 'react-spinners';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const TranslateYourDocsDisplay = () => {
  const { downloadUrl, resetFileState,fileError, setFileError, formError, setFormError, serverError, setServerError } = useContext(TranslateYourDocsThemeContext);
  const [fileName] = useState(localStorage.getItem('fileName'));

  useEffect(() => {
    const handleLanguageChange = () => {
      resetFileState();
    };
  }, [resetFileState]);

  const { loading, fileReady,setFileReady } = useContext(TranslateYourDocsThemeContext);

  return (
    <div className="p-7">
      <div className="flex flex-col items-center justify-center mt-6">
        {fileReady && (
          <div className="w-2/3 text-center">
            <h1 className="text-2xl font-semibold text-gray-800 mb-4">File Translated Results</h1>
            <div className="bg-lime-200 h-20 rounded-full text-black mb-6">
              <p className="pt-6">File translated successfully!</p>
            </div>
            <button
              className="px-6 py-2 bg-[#1f4e96] text-white rounded-md transition duration-300"
            >
              <a href={downloadUrl} className="text-white no-underline">
                Download Translated File
              </a>
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
          <div className="bg-red-200 h-20 rounded-full text-black p-4 mb-4 w-2/3">
            <p className="text-center">{fileError}</p>
          </div>
        )}

        {formError && (
          <div className="bg-red-200 h-20 rounded-full text-black p-4 mb-4 w-2/3">
            <p className="text-center">{formError}</p>
          </div>
        )}

        {serverError && (
          <div className="bg-red-200 h-20 rounded-full text-black p-4 mb-4 w-2/3">
            <p className="text-center">{serverError}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default TranslateYourDocsDisplay;
