import TranslateYourDocsFooter from './TranslateYourDocsFooter';
import TranslateYourDocsHeader from './TranslateYourDocsHeader';
import TranslateYourDocsSidebar from './TranslateYourDocsSidebar';
import TranslateYourDocsBody from './TranslateYourDocsBody';
import { ThemeProvider } from './TranslateYourDocsThemeContext';

function TranslateYourDocsApp() {
  return (
    <ThemeProvider>
    <div className="min-h-screen">
       <div>
          {/* <Head theme={theme} setTheme={setTheme}/> */}
          <TranslateYourDocsHeader/>
        </div>
        <div className="flex">
          <div className=" text-white w-1/4 p-6">
            <TranslateYourDocsSidebar/>
          </div>
          <div className="border-l border-blue-800 border-2"></div>
          <div className=" w-3/4 p-10">
            <TranslateYourDocsBody />
          </div>
        </div>  
        <div className='bg-[#1f4e96] text-white p-6 py-4'>
          <TranslateYourDocsFooter/>
        </div>
    </div>
    </ ThemeProvider>
  );
}

export default TranslateYourDocsApp;
