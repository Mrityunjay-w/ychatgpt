import React, { useContext, useEffect, useState } from 'react'
import ExcelAnalyzerChatBot from './ExcelAnalyzerChatBot';
import ExcelAnalyzerDisplay from './ExcelAnalyzerDisplay';
import ExcelAnalyzerThemeContext from './ExcelAnalyzerThemeContext';

const getclass = (currenttheme) => {
    return currenttheme === 'light' ? ' w-full h-full' : ' w-full h-full bg-black text-white';
};



const ExcelAnalyzerBody = () => {

    const { theme} = useContext(ExcelAnalyzerThemeContext);

   
    const class1 = getclass(theme);
    
  return (
    <div className='flex bg-white w-full h-full'>
        <div className={`p-4 text-center ${class1}`} style={{ overflowY: 'auto' }}>
         
            <div>
              <ExcelAnalyzerDisplay/>
            </div>       
        </div>
    </div>
  )
}

export default ExcelAnalyzerBody;