 import react, {useEffect,useState} from 'react'
import CommentExtractorBody from './CommentExtractorBody';
import CommentExtractorDisplay from './CommentExtractorDisplay';
import CommentExtractorHeader from './CommentExtractorHeader';
import CommentExtractorSidebar from './CommentExtractorSidebar';
import { AppContextProvider,ThemeProvider } from './CommentExtractorThemeContext';
import CommentExtractorFooter from './CommentExtractorFooter';

const CommentExtractorApp = () => {

    return(
        <ThemeProvider>
        <div className="min-h-screen">
          {/* <div className="flex overflow-scroll"> */}
            <div className="bg-[#1f4e96] text-Black text-center py-4 h-20 ">
              {/* <Head theme={theme} setTheme={setTheme}/> */}
              <CommentExtractorHeader/>
            </div>
            {/* <hr className="border-r border-black h-full mx-4" /> */}
            <div className="flex min-h-screen">
              <div className=" text-white w-1/4 p-6">
                <CommentExtractorSidebar/>
              </div>
              <div className="border-l border-blue-800 border-2"></div>
              <div className=" w-3/4 p-10">
                <CommentExtractorBody />
              </div>
            </div>
            <div className='bg-[#1f4e96] text-white p-6 py-4'>
              <CommentExtractorFooter/>
            </div>
          {/* </div> */}
        </div>
        </ThemeProvider>
    )
}


export default CommentExtractorApp;
