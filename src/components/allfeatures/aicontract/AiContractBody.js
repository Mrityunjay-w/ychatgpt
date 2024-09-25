import React, { useContext, useEffect, useState } from 'react'
import AiContractThemeContext from './AiContractThemeContext';
import AiContractDisplay from './AiContractDisplay';

const getclass = (currenttheme) => {
    return currenttheme === 'light' ? 'border-2 shadow-lg shadow-black w-full h-full' : 'border-2 shadow-lg shadow-black w-full h-full bg-black text-white';
};

const AiContractBody = () => {

    const { theme} = useContext(AiContractThemeContext);
    const class1 = getclass(theme);
    
  return (
    <div className='flex bg-white w-full h-full border-gray-800 rounded-lg'>
        <div className={`p-4 rounded-lg text-center ${class1}`} style={{ overflowY: 'auto', height: '800px' }}>
           <div>
            <AiContractDisplay/>   
          </div>         
        </div> 
    </div>
  )
}

export default AiContractBody