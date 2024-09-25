import React, { useContext, useState } from 'react';
import ExcelAnalyzerThemeContext from './ExcelAnalyzerThemeContext';
import { ClipLoader } from 'react-spinners';
import ExcelAnalyzerChatBot from './ExcelAnalyzerChatBot';

const ExcelAnalyzerDisplay = () => {
  const [fileName, setFileName] = useState(localStorage.getItem('fileName'));

  const { loading, fileReady } = useContext(ExcelAnalyzerThemeContext);

  return (
    <div style={{ padding: '20px' }}>
      <div className='flex flex-col items-center justify-center pt-6'>
        {fileReady ? (
          <div className='w-2/3 text-center'>
            <ExcelAnalyzerChatBot />
          </div>
        ) : (
          <p className='text-lg font-bold'></p>
        )}

        <div className='pt-8'>
          {loading && (
         <div className="flex flex-col items-center w-full max-w-lg bg-white p-8 rounded-lg shadow-lg">
         <ClipLoader size={50} color={"#1f4e96"} loading={loading} />
         <p className="mt-4 text-gray-600 text-lg">Loading file, please wait...</p>
       </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ExcelAnalyzerDisplay;
