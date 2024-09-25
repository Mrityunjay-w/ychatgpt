import React, { useContext, useEffect, useState } from 'react'
import PDFQuerySystemThemeContext from './PDFQuerySystemThemeContext';
import PDFQuerySystemDisplay from './PDFQuerySystemDisplay';
import { ClipLoader } from 'react-spinners';

const getclass = (currenttheme) => {
    return currenttheme === 'light' ? 'border-2 shadow-lg shadow-black w-full h-full' : 'border-2 shadow-lg shadow-black w-full h-full bg-black text-white';
};

const PDFQuerySystemBody = () => {

    const { theme,loading,fileReady, isQueryStarted, atLeastOneFileSelected} = useContext(PDFQuerySystemThemeContext);


    const class1 = getclass(theme);
    
  return (
    <div className='flex bg-white w-full h-full'>
        <div className={`p-4 text-center ${class1}`} style={{ overflowY: 'auto', height: '700px' }}>
          <h className='text-3xl mt-4'>PDF Query</h><br></br><br></br>
          {/* <h>Page No {} Vs Page No {}</h><br></br> */}
          <div style={{ padding: '20px' }}>
            <div className=' flex flex-col items-center justify-center pt-6'>
              {/* <div className='flex bg-lime-200 h-16 w-2/3 items-center rounded-md'> */}
                {/* { isQueryStarted && fileReady ? (<div className='w-2/3 text-center items-center'>  */}
                { atLeastOneFileSelected  && fileReady ? (<div className='w-2/3 text-center items-center'>
                  <PDFQuerySystemDisplay/>                  
                </div>
                ) 
                : (
                  <div className='mt-6 h-20 w-2/3 rounded-xl' style={{background:'linear-gradient(rgb(31, 78, 150), rgb(81 208 253))'}}>
                    <p className='pt-6 text-lg font-bold'>No Directory Path Was Uploaded</p>
                  </div>
                )
                }
              {/* </div> */}
              <div className='pt-8'>
                  {loading ? (
                    <div className="spinner-container">
                      <ClipLoader size={50} color={"#123abc"} loading={loading} />
                      <p>Loading file, please wait...</p>
                    </div>
                  ) : (
                    <>               
                    </>
                  )}
              </div>   
            </div>
          </div>
          {/* <div>
            
          </div>          */}
          </div>
    </div>
  )
}

export default PDFQuerySystemBody;