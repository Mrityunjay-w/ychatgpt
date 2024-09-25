import React, { useEffect, useRef } from 'react';
import TypingEffect from '../Typingeffect'; // Import the TypingEffect component
import '../../styles/Hometext.css';
import FadeInEffect from '../FadeInEffect';

const sections = [
    { type: 'heading', text: 'Search Oriented Functionalities', delay: 0, keywords: ['Search', 'Oriented', 'Functionalities'] },
    { type: 'paragraph', text: 'The Search Oriented Functionalities provide a platform for easy Yokogawa document access and assist users in searching for online content.', delay: 1000, keywords: [] },
    { type: 'subheading', text: 'Internal', delay: 2000, keywords: ['Internal'] },
    { type: 'paragraph', text: 'The Internal Chatbot helps users find organizational information, access documents related to Yokogawa through a chat interface. Currently its integrated with Yokogawa website. On demand tags is required to integrate the documents from the respective teams. To use it, Click on Internal. Users can chat in Japanese or English to get details on organizational information, policies, FAQs, and documents. Conversations are confidential, and users can provide feedback directly in the chat. For technical issues, contact the Y-ChatGPT team.', delay: 3000, keywords: [] },
    { type: 'subheading', text: 'Web', delay: 4000, keywords: ['Web'] },
    { type: 'paragraph', text: 'The Web Chatbot helps users search for internet content in Japanese or English. To use it, Click on Web. Type your question or keyword, and the chatbot will provide relevant information. You can search for news, definitions, explanations, and general web content without any question limits. The chatbot understands complex queries best when phrased clearly. Accuracy depends on online sources. If the chatbot doesn’t understand your question, try rephrasing it. For technical issues, contact the Y-ChatGPT team.', delay: 5000, keywords: [] },
    { type: 'heading', text: 'Action Oriented Functionalities', delay: 6000, keywords: ['Action', 'Oriented', 'Functionalities'] },
    { type: 'paragraph', text: 'Action Oriented Functionalities provide a system for office-related tasks by facilitating leave applications, managing WFH/WFO requests, and raising IT tickets for various technical issues. It also offers advanced features which reduces manual labor and provides easy, ready-to-use methods such as document translation, code and email generation, PDF query system, etc.', delay: 7000, keywords: [] },
    { type: 'heading', text: 'Intranet', delay: 8000, keywords: ['Intranet'] },
    { type: 'paragraph', text: 'The feature Intranet helps users for leave application, WFH/WFO requests, and Timesheet submissions. Currently its integrated with YIL Sandbox environment. On demand this needs to be integrate with different RHQ in Intranet feature. Click on Intranet, select your preferred language Japanese/English and choose the domain you need assistance with: Leave, WFH/WFO, or Timesheet. The bot will guide you through the necessary steps by asking for details and providing forms. If you encounter any technical issues, please contact the Y-ChatGPT team for support.', delay: 9000, keywords: [] },
    { type: 'heading', text: 'Assist Bot', delay: 10000, keywords: ['Assist', 'Bot'] },
    { type: 'paragraph', text: 'Assist Bot helps users to use Assistance for code debugging, troubleshooting, proof-reading, generate in tabular format. Click on Assist Bot. Choose your language Japanese/English and the bot will guide you through the process. Users can provide feedback directly in the chat interface. For technical issues, contact the ‘Y-ChatGPT’.', delay: 11000, keywords: [] },
    { type: 'heading', text: 'Advance Features', delay: 12000, keywords: ['Advance', 'Feature'] },
    { type: 'paragraph', text: 'The Advanced Features leverage artificial intelligence, automation, and data analytics to improve organizational efficiency, decision-making, and user experience across various domains. Each service plays a crucial role in optimizing processes and achieving strategic business goals.', delay: 13000, keywords: [] }
  
  ];
  


function AdvanceText() {
  const containerRef = useRef(null);

  useEffect(() => {
    const adjustFontSize = () => {
      const container = containerRef.current;
      const { scrollHeight, clientHeight } = container;

      while (scrollHeight > clientHeight && container.style.fontSize !== '0px') {
        const fontSize = parseFloat(window.getComputedStyle(container).fontSize);
        container.style.fontSize = `${fontSize - 3}px`;
      }
    };

    adjustFontSize();
    window.addEventListener('resize', adjustFontSize);

    return () => {
      window.removeEventListener('resize', adjustFontSize);
    };
  }, []);

  return (
    <div className="container1 w-11/12" style={{ fontFamily: "poppins" }}>
      <div
        className="w-full flex flex-col justify-start items-center lg:ml-[60px] xl:ml-0 p-14 bg-main-background text-black rounded-lg max-h-[86vh] h-full overflow-y-auto scrollbar-thin scrollbar-webkit"
        ref={containerRef}
      >
        {sections.map((section, index) => (
          <div key={index} className="mb-2">
            {section.type === 'heading' || section.type === 'subheading' ? (
              <h2 className="text-[28px] mb-1 text-center">
                {section.animation === 'typing' ? (
                  <TypingEffect text={section.text} keywords={section.keywords} speed={50} delay={section.delay} />
                ) : (
                  <FadeInEffect text={section.text} delay={section.delay} isBold={true} />
                )}
              </h2>
            ) : (
              <p className="text-sm text-[#1A1A1A] mb-6 space text-center leading-10">
                {section.animation === 'typing' ? (
                  <TypingEffect text={section.text} keywords={section.keywords} speed={50} delay={section.delay} />
                ) : (
                  <FadeInEffect text={section.text} delay={section.delay} />
                )}
              </p>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export default AdvanceText;


