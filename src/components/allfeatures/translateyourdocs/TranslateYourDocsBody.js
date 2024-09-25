import React, { useContext, useEffect, useState } from 'react'
import TranslateYourDocsThemeContext from './TranslateYourDocsThemeContext';
import TranslateYourDocsDisplay from './TranslateYourDocsDisplay';

const getclass = (currenttheme) => {
    return currenttheme === 'light' ? 'border-2 shadow-lg shadow-black w-full h-full' : 'border-2 shadow-lg shadow-black w-full h-full bg-black text-white';
};

const TranslateYourDocsBody = () => {

    const { theme} = useContext(TranslateYourDocsThemeContext);


    const class1 = getclass(theme);
    
  return (
    <div className='flex bg-white w-full h-full border border-gray-800 rounded-lg'>
        <div className={`p-4 text-center ${class1}`} style={{ overflowY: 'auto', height: '74vh' }}>
          {/* <h className='text-3xl mt-4'>File Translator</h><br></br><br></br> */}
          {/* <h>Page No {} Vs Page No {}</h><br></br> */}
          <div>
            <TranslateYourDocsDisplay />
          </div>         
          </div>
    </div>
  )
}

export default TranslateYourDocsBody;