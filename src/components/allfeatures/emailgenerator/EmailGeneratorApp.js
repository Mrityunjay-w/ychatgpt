import React from 'react';
import EmailGeneratorHeader from './EmailGeneratorHeader';
import EmailGeneratorMain from './EmailGeneratorMain';
import EmailGeneratorFooter from './EmailGeneratorFooter';
import { ThemeProvider } from './EmailGeneratorThemeContext';
import 'bootstrap/dist/css/bootstrap.min.css';


function EmailGeneratorApp() {


    return (
        

        <div className="App flex flex-col min-h-screen ">
            <EmailGeneratorHeader />
            <div className="flex-grow">
                <ThemeProvider>
                    <div className="flex justify-center">
                        <EmailGeneratorMain />
                    </div>
                </ThemeProvider>
            </div>
            <footer className="bg-[#1f4e96] text-white p-6 py-4 w-full mt-auto">
                <EmailGeneratorFooter />
            </footer>
        </div>
    );
}

export default EmailGeneratorApp;
