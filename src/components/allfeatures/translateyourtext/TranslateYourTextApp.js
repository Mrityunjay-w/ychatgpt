
import TranslateYourTextHeader from "./TranslateYourTextHeader";
import TranslateYourTextBody from "./TranslateYourTextBody";
import { ThemeProvider } from "./TranslateYourTextThemeContext";
import TranslateYourTextFooter from "./TranslateYourTextFooter";


function TranslateYourTextApp() {
  return (
    <ThemeProvider>
      <div className="min-h-screen flex flex-col">
        <div className="bg-[#1f4e96] text-black text-center py-4 h-20">
          <TranslateYourTextHeader />
        </div>
        <div className="flex-grow flex flex-col justify-between">
          <div className="flex-grow p-10 mx-24 mt-10">
            <TranslateYourTextBody />
          </div>
        </div>
        <div className="bg-[#1f4e96] text-white p-6 py-4">
          <TranslateYourTextFooter />
        </div>
      </div>
    </ThemeProvider>
  );
}

export default TranslateYourTextApp;
