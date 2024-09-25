import PDFQuerySystemBody from "./PDFQuerySystemBody";
import PDFQuerySystemFooter from "./PDFQuerySystemFooter";
import PDFQuerySystemHeader from "./PDFQuerySystemHeader";
import PDFQuerySystemSidebar from "./PDFQuerySystemSidebar";
import { ThemeProvider } from "./PDFQuerySystemThemeContext";

function PDFQuerySystemApp() {

    return (
        <ThemeProvider>
            <div className="min-h-screen">

                <div className="bg-[#1f4e96] text-Black text-center py-4 h-20">

                    <PDFQuerySystemHeader />
                </div>

                <div className="flex min-h-screen">
                    <div className=" text-white w-1/4 p-6">
                        <PDFQuerySystemSidebar />
                    </div>
                    <div className="border-l border-blue-800 border-2"></div>
                    <div className=" w-3/4 p-10">
                        <PDFQuerySystemBody />
                    </div>
                </div>
                <div className='bg-[#1f4e96] text-white p-6 py-4'>
                    <PDFQuerySystemFooter />
                </div>
               
            </div>
        </ThemeProvider>
    );
}

export default PDFQuerySystemApp;
