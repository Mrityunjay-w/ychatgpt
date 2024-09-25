import React, { useContext, useEffect, useState } from 'react'
import ComplianceExtractorThemeContext from './ComplianceExtractorThemeContext';
import ComplianceExtractorDisplay from './ComplianceExtractorDisplay';

const getclass = (currenttheme) => {
    return currenttheme === 'light' ? 'border-2 shadow-lg shadow-black w-full h-full' : 'border-2 shadow-lg shadow-black w-full h-full bg-black text-white';
};

const ComplianceExtractorBody = () => {

    const {theme} = useContext(ComplianceExtractorThemeContext);

   

    const class1 = getclass(theme);
    
  return (
    <div className='flex bg-white w-full h-full'>
        <div className={`p-4 text-center ${class1}`} style={{ overflowY: 'auto', height: '700px' }}>
          {/* <h className='text-3xl mt-4'>PDF Compliance Extractor And Excel Generator</h><br></br><br></br> */}
          {/* <h>Page No {} Vs Page No {}</h><br></br> */}
          <div>
            <ComplianceExtractorDisplay/>
          </div>         
          </div>
    </div>
  )
}

export default ComplianceExtractorBody;