import React, { useContext, useEffect, useState } from 'react'
import PIDExtractorThemeContext from './PIDExtractorThemeContext';
import PIDExtractorDisplay from './PIDExtractorDisplay';

const getclass = (currenttheme) => {
    return currenttheme === 'light' ? 'border-2 shadow-lg shadow-black w-full h-full' : 'border-2 shadow-lg shadow-black w-full h-full bg-black text-white';
};

const PIDExtractorBody = () => {

    const { theme} = useContext(PIDExtractorThemeContext);


    const class1 = getclass(theme);
    
  return (
    <div className='flex bg-white w-full h-full'>
        <div className={`p-4 text-center ${class1}`} style={{ overflowY: 'auto', height: '74vh' }}>
          {/* <h className='text-3xl mt-4'>P&ID Extractor and Excel Generator :</h><br></br><br></br> */}
          {/* <h>Page No {} Vs Page No {}</h><br></br> */}
          <div>
            <PIDExtractorDisplay/>
          </div>         
          </div>
    </div>
  )
}

export default PIDExtractorBody;