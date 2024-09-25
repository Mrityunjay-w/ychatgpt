
import AiContractFooter from "./AiContractFooter";
import AiContractHeader from "./AiContractHeader";
import { ThemeProvider } from "./AiContractThemeContext";
import AiContractSidebar from "./AiContractSidebar";
import AiContractBody from "./AiContractBody";

function AiContractApp() {
    return (
        <ThemeProvider>
            <div className="min-h-screen">
                <div className="bg-[#1f4e96] text-Black text-center py-4 h-20">
                   
                    <AiContractHeader />
                </div>
                <div className="flex min-h-screen">
                    <div className=" text-white w-1/4 p-6">
                        <AiContractSidebar />
                    </div>
                    <div className="border-l border-blue-800 border-2"></div>
                    <div className=" w-3/4 p-10">
                        <AiContractBody />
                    </div>
                </div>
                <div className='bg-[#1f4e96] text-white p-6 py-4'>
                    <AiContractFooter />
                </div>
            </div>
        </ ThemeProvider>
    );
}

export default AiContractApp;
