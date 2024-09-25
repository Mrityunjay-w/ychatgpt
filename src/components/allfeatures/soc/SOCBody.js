import React, { useContext, useEffect, useState } from 'react'
import SOCThemeContext from './SOCThemeContext';
import SOCDisplay from './SOCDisplay';

const getclass = (currenttheme) => {
    return currenttheme === 'light' ? 'border-2 shadow-lg shadow-black w-full h-full' : 'border-2 shadow-lg shadow-black w-full h-full bg-black text-white';
};

const SOCBody = () => {

    const { theme} = useContext(SOCThemeContext);

   

    const class1 = getclass(theme);
    
  return (
    <div className='flex bg-white w-full h-full border border-gray-800 rounded-lg'>
        <div className={`p-4  text-center ${class1}`} style={{ overflowY: 'auto', height: '700px' }}>
        
          <div>
            <SOCDisplay/>
          </div>         
          </div>
    </div>
  )
}

export default SOCBody;