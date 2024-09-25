import React, { useContext, useEffect, useState } from 'react'
import TranslateYourTextThemeContext from './TranslateYourTextThemeContext';
import TranslateYourTextDisplay from './TranslateYourTextDisplay';


const getclass = (currenttheme) => {
  return currenttheme === 'light' ? 'border-2 shadow-lg shadow-black w-full h-full' : 'border-2 shadow-lg shadow-black w-full h-full bg-black text-white';
};

const TranslateYourTextBody = () => {

  const { theme } = useContext(TranslateYourTextThemeContext);



  const class1 = getclass(theme);

  return (
    <div className="flex bg-white w-4/5 -mt-12 border ml-32 border-gray-800 rounded-lg">
      <div className="w-full text-center">
        <div>
          <TranslateYourTextDisplay />
        </div>
      </div>
    </div>
  )
}

export default TranslateYourTextBody;