// import react, {useEffect,useState} from 'react'
// import Body from './Components/Body';
// import Footer from './Components/Footer';
// import Head from './Components/Head';
// import Sidebar from './Components/Sidebar';
// import { AppContextProvider, ThemeProvider } from './Components/ThemeContext';

import ComplianceExtractorBody from "./ComplianceExtractorBody";
import ComplianceExtractorSidebar from "./ComplianceExtractorSidebar";
import ComplianceExtractorHeader from "./ComplianceExtractorHeader";
import ComplianceExtractorFooter from "./ComplianceExtractorFooter";
import { AppContextProvider,ThemeProvider } from "./ComplianceExtractorThemeContext";


function ComplianceExtractorApp() {

  return (
    <ThemeProvider>
    <div className="min-h-screen">
      {/* <div className="flex overflow-scroll"> */}
        <div className="bg-[#1f4e96] text-Black text-center py-4 h-20">
          {/* <Head theme={theme} setTheme={setTheme}/> */}
          <ComplianceExtractorHeader/>
        </div>
        {/* <hr className="border-r border-black h-full mx-4" /> */}
        <div className="flex min-h-screen">
          <div className=" text-white w-1/4 p-6">
            <ComplianceExtractorSidebar/>
          </div>
          <div className="border-l border-blue-800 border-2"></div>
          <div className=" w-3/4 p-10">
            <ComplianceExtractorBody />
          </div>
        </div>
        <div className='bg-[#1f4e96] text-white p-6 py-4'>
          <ComplianceExtractorFooter/>
        </div>
      {/* </div> */}
    </div>
    </ThemeProvider>
  );
}

export default ComplianceExtractorApp;
