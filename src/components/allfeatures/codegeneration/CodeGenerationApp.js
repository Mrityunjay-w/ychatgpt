import CodeGenerationBody from "./CodeGenerationBody";
import CodeGenerationFooter from "./CodeGenerationFooter";
import CodeGenerationHeader from "./CodeGenerationHeader";
import CodeGenerationSidebar from "./CodeGenerationSidebar";
import { ThemeProvider } from "./CodeGenerationThemeContext";

function CodeGenerationApp() {

  return (
    <ThemeProvider>
    <div className="min-h-screen">
     
        <div className="bg-[#1f4e96] text-Black text-center py-4 h-20">
         
          <CodeGenerationHeader/>
        </div>
       
        <div className="flex min-h-screen">
          <div className=" text-black w-1/4 p-6">
            <CodeGenerationSidebar/>
          </div>
          <div className="border-l border-blue-800 border-2"></div>
          <div className=" w-3/4">
            <CodeGenerationBody />
          </div>
        </div>
        <div className='bg-[#1f4e96] text-white p-6 py-4'>
          <CodeGenerationFooter/>
        </div>
    
    </div>
    </ThemeProvider>
  );
}

export default CodeGenerationApp;
