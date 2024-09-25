import ChatWithYourDataBody from "./ChatWithYourDataBody";
import ChatWithYourDataFooter from "./ChatWithYourDataFooter";
import ChatWithYourDataHeader from "./ChatWithYourDataHeader";
import ChatWithYourDataSidebar from "./ChatWithYourDataSidebar";
import { ThemeProvider } from "./ChatWithYourDataThemeContext";

function ChatWithYourDataApp() {

  return (
    <ThemeProvider>
      <div className="min-h-screen">
        {/* <div className="flex overflow-scroll"> */}
        <div className="bg-[#1f4e96] text-Black text-center py-4 h-20">
          {/* <Head theme={theme} setTheme={setTheme}/> */}
          <ChatWithYourDataHeader />
        </div>
        {/* <hr className="border-r border-black h-full mx-4" /> */}
        <div className="flex">
          <div className=" text-white w-1/4 p-6 h-full">
            <ChatWithYourDataSidebar />
          </div>
          <div className="border-l border-blue-800 border-2"></div>
          <div className=" w-3/4 h-full"
            style={{ height: '670px' }}
          >
            <ChatWithYourDataBody />
          </div>
        </div>
        <div className='bg-[#1f4e96] text-white p-6 py-4'>
          <ChatWithYourDataFooter />
        </div>
        {/* </div> */}
      </div>
    </ThemeProvider>
  );
}

export default ChatWithYourDataApp;
