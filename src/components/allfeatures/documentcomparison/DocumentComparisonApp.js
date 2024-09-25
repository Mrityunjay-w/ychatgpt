import DocumentComparisonBody from "./DocumentComparisonBody";
import DocumentComparisonHeader from "./DocumentComparisonHeader";
import DocumentComparisonFooter from "./DocumentComparisonFooter";
import DocumentComparisonSidebar from "./DocumentComparisonSidebar";
import { ThemeProvider } from "./DocumentComparisonThemeContext";

function DocumentComparisonApp() {

  return (
    <ThemeProvider>
      <div className="min-h-screen">

        <div className="bg-[#1f4e96] text-Black text-center py-4 h-20">

          <DocumentComparisonHeader />
        </div>

        <div className="flex min-h-screen">
          <div className=" text-white w-1/4 p-6">
            <DocumentComparisonSidebar />
          </div>
          <div className="border-l border-blue-800 border-2"></div>
          <div className=" w-3/4 p-10">
            <DocumentComparisonBody />
          </div>
        </div>
        <div className='bg-[#1f4e96] text-white p-6 py-4'>
          <DocumentComparisonFooter />
        </div>

      </div>
    </ThemeProvider>
  );
}

export default DocumentComparisonApp;
