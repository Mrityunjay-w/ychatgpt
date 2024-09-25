import PIDExtractorBody from "./PIDExtractorBody";
import PIDExtractorFooter from "./PIDExtractorFooter";
import PIDExtractorHeader from "./PIDExtractorHeader";
import PIDExtractorSidebar from "./PIDExtractorSidebar";
import { ThemeProvider } from "./PIDExtractorThemeContext";

function PIDExtractorApp() {

    return (
        <ThemeProvider>
            <div >
                {/* <div className="flex overflow-scroll"> */}
                <div className="bg-[#1f4e96] text-Black text-center py-4 h-20">
                    {/* <Head theme={theme} setTheme={setTheme}/> */}
                    <PIDExtractorHeader />
                </div>
                {/* <hr className="border-r border-black h-full mx-4" /> */}
                <div className="flex">
                    <div className=" text-white w-1/4 p-6">
                        <PIDExtractorSidebar />
                    </div>
                    <div className="border-l border-blue-800 border-2"></div>
                    <div className=" w-3/4 p-10">
                        <PIDExtractorBody />
                    </div>
                </div>
                <div className='bg-[#1f4e96] text-white p-6 py-4'>
                    <PIDExtractorFooter />
                </div>
                {/* </div> */}
            </div>
        </ThemeProvider>
    );
}

export default PIDExtractorApp;
