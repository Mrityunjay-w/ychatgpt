import ExcelAnalyzerBody from "./ExcelAnalyzerBody";
import ExcelAnalyzerFooter from "./ExcelAnalyzerFooter";
import ExcelAnalyzerHeader from "./ExcelAnalyzerHeader";
import ExcelAnalyzerSidebar from "./ExcelAnalyzerSidebar";
import { ThemeProvider } from "./ExcelAnalyzerThemeContext";

function ExcelAnalyzerApp() {

  return (
    <ThemeProvider>
    <div className="min-h-screen">
      {/* <div className="flex overflow-scroll"> */}
        <div className="bg-[#1f4e96] text-Black text-center py-4 h-20">
          {/* <Head theme={theme} setTheme={setTheme}/> */}
          <ExcelAnalyzerHeader/>
        </div>
        {/* <hr className="border-r border-black h-full mx-4" /> */}
        <div className="flex " style={{ minHeight:'84vh'}}>
          <div className=" text-white w-1/4 p-6">
            <ExcelAnalyzerSidebar/>
          </div>
          <div className="border-l border-blue-800 border-2"></div>
          <div className=" w-3/4">
            <ExcelAnalyzerBody />
          </div>
        </div>
        <div className='bg-[#1f4e96] text-white p-6 py-4'>
          <ExcelAnalyzerFooter/>
        </div>
      {/* </div> */}
    </div>
    </ThemeProvider>
  );
}

export default ExcelAnalyzerApp;
