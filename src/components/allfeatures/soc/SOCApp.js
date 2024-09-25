import SOCFooter from "./SOCFooter";
import SOCHeader from "./SOCHeader";
import { ThemeProvider } from "./SOCThemeContext";
import SOCBody from "./SOCBody";

function SOCApp() {
  return (
    <ThemeProvider>
    <div className="min-h-screen">
       <div className="bg-[#1f4e96] text-Black text-center py-4 h-20">
          
          <SOCHeader/>
        </div>
        <div className="flex min-h-screen">
         
          <div className=" w-full p-10 mt-10 ml-24 mr-24">
            <SOCBody />
          </div>
        </div>  
        <div className='bg-[#1f4e96] text-white p-6 py-4'>
          <SOCFooter/>
        </div>
    </div>
    </ ThemeProvider>
  );
}

export default SOCApp;
