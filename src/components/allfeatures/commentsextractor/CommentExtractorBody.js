import React, { useContext, useEffect, useState } from 'react'
//import ThemeContext from './ThemeContext';
//import Display from './Display';
import CommentExtractorThemeContext from './CommentExtractorThemeContext';
import CommentExtractorDisplay from './CommentExtractorDisplay';

const getclass = (currenttheme) => {
    return currenttheme === 'light' ? 'border-2 shadow-lg shadow-black w-full h-full' : 'border-2 shadow-lg shadow-black w-full h-full bg-black text-white';
};

const CommentExtractorBody = () => {

    const { theme} = useContext(CommentExtractorThemeContext);

    // const { numberInput1 } = useNumberInput();

    // const [data1, setData] = useState()

    // useEffect(() => {
    //   fetch("/api/route").then(res => res.text()) // Convert response to text
    //   .then(data => {
    //     setData(data)
    //     console.log(data);
    //     // Process the data here
    //   })
    //   .catch(error => {
    //     console.error('Error fetching data:', error);
    //     // Handle errors here
    //   });
    // },[])
    
    

    const class1 = getclass(theme);
    
  return (
    <div className='flex bg-white w-full h-full'>
        <div className={`p-4 text-center ${class1}`} style={{ overflowY: 'auto', height: '750px' }}>
          {/* <h className='text-3xl mt-4'>PDF Comments Extractor :</h><br></br><br></br> */}
          {/* <h>Page No {} Vs Page No {}</h><br></br> */}
          <div>
            <CommentExtractorDisplay/>
          </div>         
          </div>
    </div>
  )
}

export default CommentExtractorBody;