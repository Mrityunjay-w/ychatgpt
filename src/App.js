import logo from './logo.svg';
import './App.css';
import Header from './components/header/Header';
import Home from './components/home/Home';
import Footer from './components/footer/Footer';
import Login from './components/login/Login';
//-----------
import { AuthenticatedTemplate, UnauthenticatedTemplate, useMsal, MsalProvider } from '@azure/msal-react';

//import { loginRequest } from './authConfig';
//import { loginRequest } from './auth';

import { msalConfig } from './authConfig';

import { useState, useEffect } from 'react';
import './styles/Login.css';
import Image from './components/image/Images';
//import { jwtDecode } from 'jwt-decode';
import ChatBot from './components/chatbot/ChatBot';
import { Route, Routes } from 'react-router-dom';
import Iframe from './Iframe';
import Dashboard from './components/admin/Dashboard';

import './styles/SignIn.css';
import { useNavigate, Navigate } from 'react-router-dom';
import SignIn from './components/login/SignInAnimation';
import withAuthRedirect from './components/withAuthRedirect';
import SHAuth from './components/login/SHAuth';
import Faq from './components/faq/Faq';
import SearchOriented from './components/home/SearchOriented';
import ActionOriented from './components/home/ActionOriented';
import AdvanceFeature from './components/home/AdvanceFeature';
import Internal from './components/home/Internal';
import Web from './components/home/Web';
import Intranet from './components/home/Intranet';
import AssistBot from './components/home/AssistBot';
import BarChart from './components/admin/BarChart';
import TranslateYourDocs from './components/advancefeature/TranslateYourDocs';
import ChatWithYourData from './components/advancefeature/ChatWithYourData';
import ExcelAnalyzer from './components/advancefeature/ExcelAnalyzer';
import PDFQuerySystem from './components/advancefeature/PDFQuerySystem';
import AdvanceRPA from './components/advancefeature/AdvanceRPA';
import SOP from './components/home/SOP';
import SOC from './components/advancefeature/SOC';
import PersonalProtectiveEquipment from './components/advancefeature/PersonalProtectiveEquipment';
import CodeGeneration from './components/advancefeature/CodeGeneration';
import AIContractManager from './components/advancefeature/AIContractManager';
import GenDCS from './components/chart/GenDCS';
import CustomerQnA from './components/login/CustomerQnA';
import CommentExtractor from './components/allfeatures/commentsextractor/CommentExtractor';
import ComplianceExtractor from './components/allfeatures/complianceextractor/ComplianceExtractor';
import PIDExtractor from './components/allfeatures/pidextractor/PIDExtractor';
import DocumentComparison from './components/allfeatures/documentcomparison/DocumentComparison';
import TranslateYourDoc from './components/allfeatures/translateyourdocs/TranslateyourDoc';
import TranslateYourText from './components/allfeatures/translateyourtext/TranslateYourText';
import PDFQuery from './components/allfeatures/pdfquerysystem/PDFQuery';
import EmailGenerator from './components/allfeatures/emailgenerator/EmailGenerator';
import Excelanalyzer from './components/allfeatures/excelanalyzer/Excelanalyzer';
import Codegeneration from './components/allfeatures/codegeneration/Codegeneration';
import Chatwithyoudata from './components/allfeatures/chatwithyourdata/Chatwithyoudata';
import Personalprotectiveequipment from './components/allfeatures/personalprotectiveequipment/Personalprotectiveequipment';
import Soc from './components/allfeatures/soc/Soc';
import AiContract from './components/allfeatures/aicontract/AiContract';
import PopupMessage from './components/PopupMessagescreensize';
import ImageSearchBackgroundRemover from './components/advancefeature/ImageSearchBackgroundRemover';
import NotFound from '../src/components/NotFound';
import Loaders from './components/login/Loaders';
import YchatGPTSupportBot from './components/chatbot/support'


function App({ instance }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const [isSidebarExpanded, setIsSidebarExpanded] = useState(false);

  const [showPopup, setShowPopup] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    const handleAuthCheck = async () => {
      const accounts = await instance.getAllAccounts();
      setIsAuthenticated(accounts.length > 0);
    };
    handleAuthCheck();
  }, [instance]);

  // useEffect(() => {
  //   if (isAuthenticated) {
  //     navigate('/home')
  //   }
  // }, [isAuthenticated])

  // const toggleChatbotWidth = () => {
  //   setIsSidebarExpanded(!isSidebarExpanded);
  // };


  const handleResize = () => {
    if (window.innerWidth < 1799) { // You can set your preferred screen width
      setShowPopup(true);
    } else {
      setShowPopup(false);
    }
  };
  useEffect(() => {
    window.addEventListener('resize', handleResize);

    // Check size on initial load
    // handleResize();

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);


  return (
<>
    {/* <PopupMessage isVisible={showPopup} onClose={() => setShowPopup(false)}/> */}

    <MsalProvider instance={instance}>

      <Routes>
        <Route path="*" element={<NotFound />} /> 
        <Route path="/supportbot" element={<YchatGPTSupportBot />} /> {/* Catch-all 404 page */}
        <Route path="/" element={<SignIn />} />
        <Route path="/login" element={<SHAuth />} />
        <Route path="/home" element={<Home />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/barchart" element={<BarChart />} />
        <Route path="/faq" element={<Faq />} />
        <Route path="/searchoriented" element={<SearchOriented />} />
        <Route path="/actionoriented" element={<ActionOriented />} />
        <Route path="/actionorientedfunctionalities/advancefeature" element={<AdvanceFeature />} />
        <Route path="/customerqna" element={<CustomerQnA />} />

        <Route path="/gendcsai/gendcs" element={<GenDCS />} />

        <Route path="/translationservices/translateyourdoc" element={<TranslateYourDoc />} />
        <Route path="/translationservices/translateyourtext" element={<TranslateYourText />} />

        <Route path="/translationservices/emailgenerator" element={<EmailGenerator />} />

        <Route path="/datainsightservices/pdfquery" element={<PDFQuery />} />
        <Route path="/datainsightservices/excelanalyzer" element={<Excelanalyzer />} />
        <Route path="/datainsightservices/chatwithyoudata" element={<Chatwithyoudata />} />

        <Route path="/rpaservices/commentextractor" element={<CommentExtractor />} />
        <Route path="/rpaservices/complienceextractor" element={<ComplianceExtractor />} />
        <Route path="/rpaservices/p&idextractor" element={<PIDExtractor />} />
        <Route path="/rpaservices/documentcomparison" element={<DocumentComparison />} />
        <Route path="/codedevelopmentservicesassistance/codegeneration" element={<Codegeneration />} />
        <Route path="/imagevideorecognitionservices/ppe" element={<Personalprotectiveequipment />} />
        <Route path="/securityservices/soc" element={<Soc />} />
        <Route path="/contractmanagementservices/aicontract" element={<AiContract />} />
       



        <Route path="/searchorientedfunctionalities" element={<Home />} >
          <Route path="internal" element={<Internal />} />
          <Route path="web" element={<Web />} />
        </Route>

        <Route path="/actionorientedfunctionalities" element={<Home />} >
          <Route path="intranet" element={<Intranet />} />
          <Route path="assistbot" element={<AssistBot />} />
        </Route>

        <Route path="/translationservices" element={<AdvanceFeature />} >
          <Route path="translateyourdocs" element={<TranslateYourDocs />} />

        </Route>

        <Route path="/datainsightservices" element={<AdvanceFeature />} >
          <Route path="chatwithyourdata" element={<ChatWithYourData />} />
          <Route path="excelanalyzer" element={<ExcelAnalyzer />} />
          <Route path="pdfquerysystem" element={<PDFQuerySystem />} />

        </Route>

        <Route path="/rpaservices" element={<AdvanceFeature />} >
          <Route path="advancerpa" element={<AdvanceRPA />} />
        </Route>

        <Route path="/supportservices" element={<AdvanceFeature />} >
          <Route path="supportsop" element={<SOP />} />
        </Route>

        <Route path="/securityservices" element={<AdvanceFeature />} >
          <Route path="customerassetsandinformationsecurity" element={<SOC />} />
        </Route>

        <Route path="/imagevideorecognitionservices" element={<AdvanceFeature />} >
          <Route path="personalprotectiveequipment" element={<PersonalProtectiveEquipment />} />
        </Route>

        <Route path="/codedevelopmentservicesassistance" element={<AdvanceFeature />} >
          <Route path="codegenerationanddebugging" element={<CodeGeneration />} />
        </Route>

        <Route path="/contractmanagementservices" element={<AdvanceFeature />} >
          <Route path="aicontractmanager" element={<AIContractManager />} />
        </Route>



        <Route path="/recommendersystem" element={<AdvanceFeature />} >
          <Route path="imagesearchbackgroundremoverandocr" element={<ImageSearchBackgroundRemover />} />
        </Route>
        {/* <Route path="/RobotBackground" element={<Loaders />} /> */}

        <Route path="/searchorientedfunctionalities" element={<Home />} >         
          <Route path="/searchorientedfunctionalities/YchatGPTSupportBot" element={<YchatGPTSupportBot />} />
        </Route>
        


      </Routes>




    </MsalProvider>

    </>
  );
}

export default App;




