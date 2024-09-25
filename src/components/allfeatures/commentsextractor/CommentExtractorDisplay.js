
import React, { useContext,useState, useEffect } from 'react';
import CommentExtractorThemeContext from './CommentExtractorThemeContext';
import { FaTimesCircle } from 'react-icons/fa';
import { ClipLoader } from 'react-spinners';

const CommentExtractorDisplay = () => {
  const [fileName, setFileName] = useState(localStorage.getItem('fileName'));

  const {loading,fileReady,userEmail,setUserEmail,ccEmail,setccEmail,subject,setSubject,fileUrls,
    fileError, setFileError, formError, setFormError, serverError, setServerError,setFileReady
   } = useContext(CommentExtractorThemeContext);

  // Clear email, cc email, and subject
  const clearUserEmail = () => setUserEmail('');
  const clearCcEmail = () => setccEmail('');
  const clearSubject = () => setSubject('');
     
  return (
    <div style={{ padding: '20px' }}>
      <div className="mb-4 flex flex-col items-center">
        <label htmlFor="email1" className="block text-lg font-medium text-black mb-2">
          Enter User Email Address:
        </label>
        <div className="flex items-center space-x-2 w-2/3">
          <input
            type="email"
            id="email1"
            value={userEmail}
            className="shadow-sm text-center rounded-md flex-grow px-3 py-2 border border-black"
            onChange={(e) => {
              setUserEmail(e.target.value);
              setFormError('');
            }}
            placeholder="user@email.com"
            required
          />         
        </div>
      </div>
      <div className="mb-4 flex flex-col items-center">
        <label htmlFor="email2" className="block text-lg font-medium text-black mb-2">
          Enter CC Email Address:
        </label>
        <div className="flex items-center space-x-2 w-2/3">
          <input
            type="email"
            id="email2"
            value={ccEmail}
            className="shadow-sm text-center rounded-md flex-grow px-3 py-2 border border-black"
            onChange={(e) => {
              setccEmail(e.target.value);
              setFormError('');
            }}
            placeholder="cc@gmail.com"
            required
          />
          
        </div>
      </div>
      <div className="mb-4 flex flex-col items-center ">
        <label htmlFor="subject" className="block text-lg font-medium text-black mb-2 ">
          Subject:
        </label>
          <div className="flex items-center space-x-2 w-2/3">
            <input
              type="text"
              id="subject"
              value={subject}
              className="shadow-sm text-center rounded-md flex-grow px-3 py-2 border border-black"
              onChange={(e) => {
                setSubject(e.target.value);
                setFormError('');
              }}
              placeholder="Subject"
              required
            />
         
          </div>
      </div>

      <div className=' flex flex-col items-center justify-center pt-6'>
        <div className='w-2/3'>
          {fileUrls.excel_url === "No URL available" ?(<div className='mt-6 h-20 rounded-xl text-black' style={{background:'linear-gradient(#FFE5CC,#ffcc99)'}}>
              <p className='pt-6'>No Comments Found</p>
            </div>):(<>
            
              {fileReady ? (<div className=' mt-6 text-center items-center'>
            <div className='bg-lime-200 h-20 rounded-full text-black p-4 mb-4 '>
              <p className='text-center'>"Excel file generated and Email sent successfully!"</p>
            </div>
            {/* <div className='mt-6 h-20 rounded-xl' style={{background:'linear-gradient(#1f4e96,#fdf251)'}}>
              <p className='pt-6 '>File : {fileName}</p>
            </div> */}
            <div >
              <button
                  className='mt-6 px-6 py-2 bg-[#1f4e96] text-white rounded-md' >
                  <a href={fileUrls.excel_url} download>Download Excel file</a>
              </button>
            </div>
        {/* <div>
          <a href={fileUrls.excel_url} download>Download Excel file</a>
        </div> */}
          </div>
          ) 
          : (
            <>
              {/* <div className='mt-6 h-20 w-2/3 rounded-xl' style={{background:'linear-gradient(#1f4e96,#fdf251)'}}>
                <p className='pt-6 text-lg font-bold'>No File Uploaded</p>
              </div> */}
            </>
          )
          }

            </>)}
        </div>

        {/* Display errors */}
        {fileError && (
        <div className='bg-red-200 h-20 rounded-full text-black p-4 mb-4 w-2/3'>
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

        {/* </div> */}
        <div className='pt-8'>
            {loading ? (
              <div className="flex flex-col items-center w-full max-w-lg bg-white p-8 rounded-lg shadow-lg">
                <ClipLoader size={50} color={"#1f4e96"} loading={loading} />
                <p className="mt-4 text-gray-600 text-lg">Loading file, please wait...</p>
              </div>
            ) : (
              <></>
            )}
        </div>   
        
      </div>
      
    </div>
  );
};


export default CommentExtractorDisplay;

