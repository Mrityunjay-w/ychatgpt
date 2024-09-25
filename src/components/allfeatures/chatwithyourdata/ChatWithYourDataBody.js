import React, { useContext, useEffect, useState } from 'react'
import ChatWithYourDataThemeContext from './ChatWithYourDataThemeContext';
import { ClipLoader } from 'react-spinners';
import ChatWithYourDataChatBot from './ChatWithYourDataChatBot';

const getclass = (currenttheme) => {
    return currenttheme === 'light' ? ' w-full h-full' : ' w-full h-full bg-black text-white';
};

// border-2 shadow-lg shadow-black

const ChatWithYourDataBody = () => {

    const { theme,loading,fileReady,selectedFile} = useContext(ChatWithYourDataThemeContext);

    

    const class1 = getclass(theme);
    
  return (
    <div className={`w-full h-full text-center ${class1}`} style={{overflowY: 'auto'}}>
      {/* <div className={`p-4 h-fit ${class1}`} > */}
          {/* <h className='text-3xl mt-4'>File types supported: PDF/DOCX/TEXT/JPG/PNG/JPEG</h><br></br><br></br> */}
          {/* <h>Page No {} Vs Page No {}</h><br></br> */}
            {/* <Display/> */}
            <div className='pt-8'>
              {loading ? (
                 <div className="flex flex-col items-center w-full max-w-lg bg-white p-8 rounded-lg shadow-lg">
                 <ClipLoader size={50} color={"#1f4e96"} loading={loading} />
                 <p className="mt-4 text-gray-600 text-lg">Loading file, please wait...</p>
               </div>
              ) : (
                <>                
                </>
              )}
            </div>  
        {/* <div className='text-center'> */}
          {fileReady || selectedFile != null ?(<div>
                <ChatWithYourDataChatBot/> 
              </div>)
              :(<div className='flex flex-col items-center'>
                  <p className='mt-6 h-20 w-3/4  rounded-xl' style={{background:'linear-gradient(rgb(31, 78, 150), rgb(81 208 253))'}}>
                    <p className='pt-6 text-lg font-bold'>No File Uploaded</p>
                  </p>
              </div>)}
        {/* </div>     */}
      {/* </div> */}
    </div>
  )
}

export default ChatWithYourDataBody;