import React from 'react';
import * as RiIcons from 'react-icons/ri';
import Image from '../image/Images';

export const SidebarData = [
  {
    title: 'Search Oriented Functionalities',
    content: '  The Search Oriented Functionalities provide a platform for easy Yokogawa document access and assist users in searching online content.',
    keywords: ['Search', 'Oriented', 'Functionalities', 'assist', 'users', 'in', 'searching', 'online', 'content.'],
    icon: <img src={Image.searchoriented} style={{ width: '50px', marginRight: '10px' }} />,
    iconClosed: <RiIcons.RiArrowDownSFill size={17}/>,
    iconOpened: <RiIcons.RiArrowUpSFill size={17}/>,
    subNav: [
      {
        title: 'Internal',
        path: '/searchorientedfunctionalities/internal',
        content: '  The Internal Chatbot helps users find organizational information, access documents related to Yokogawa through a chat interface. Currently its integrated with Yokogawa website. On demand tags is required to integrate the documents from the respective teams. To use it, Click on Internal. Users can chat in Japanese or English to get details on organizational information, policies, FAQs, and documents. Conversations are confidential, and users can provide feedback directly in the chat. For technical issues, contact the Y-ChatGPT team.',
        keywords: ['Internal', 'Chatbot', 'organizational', 'information,', 'access', 'documents,', 'receive', 'support', 'through', 'chat', 'interface.', 'Japanese', 'English', 'organizational', 'structure,', 'policies,', 'FAQs,', 'documents.', 'Conversations', 'confidential', 'OpreX', 'Yoko', 'Gen', 'AI', 'team.'],
        icon: <img src={Image.internal} style={{ width: '50px', marginRight: '10px' }} />,
      },
      {
        title: 'Web',
        path: '/searchorientedfunctionalities/web',
        content: '  The Web Chatbot helps users search for internet content in Japanese or English. To use it, Click on Web. Type your question or keyword, and the chatbot will provide relevant information. You can search for news, definitions, explanations, and general web content without any question limits. The chatbot understands complex queries best when phrased clearly. Accuracy depends on online sources. If the chatbot doesn’t understand your question, try rephrasing it. For technical issues, contact the Y-ChatGPT team.',
        keywords: ['Chatbot', 'internet', 'content', 'Japanese', 'English.', 'news,', 'definitions,', 'explanations,', 'general', 'Web', 'content', 'without', 'any', 'limits.', 'OpreX', 'Yoko', 'Gen', 'AI', 'team.'],
        icon: <img src={Image.web} style={{ width: '50px', marginRight: '10px' }} />,
      },
    ],
  },
  {
    title: 'Action Oriented Functionalities',
    content: '  Action Oriented Functionalities provide a system for office-related tasks by facilitating leave applications, managing WFH/WFO requests, and raising IT tickets for various technical issues. It also offers advanced features which reduces manual labor and provides easy, ready-to-use methods such as document translation, code and email generation, PDF query system, etc.',
    keywords: ['Action', 'Oriented', 'Functionalities', 'office-related', 'facilitating', 'leave', 'applications', 'managing', 'WFH/WFO', 'raising', 'IT', 'tickets', 'advanced', 'features', 'document', 'translation,', 'code', 'email', 'generation,', 'PDF', 'query', 'system,', 'OpreX', 'Yoko', 'Gen', 'AI', 'team.'],
    icon: <img src={Image.advancefeature} style={{ width: '50px', marginRight: '10px' }} />,
    iconClosed: <RiIcons.RiArrowDownSFill size={17}/>,
    iconOpened: <RiIcons.RiArrowUpSFill size={17}/>,
    subNav: [
      
      {
        title: 'Assist Bot',
        path: '/actionorientedfunctionalities/assistbot',
        content: '  Assist Bot helps users to raise IT tickets and seek L0 technical assistance from ServiceNow. Currently ServiceNow integrated with YIL Sandbox environment. On demand this need to be integrated with different RHQ of ServiceNow in intranet system. To use it, Click on Assist Bot. Choose your language Japanese/English and select Help Desk for laptop, software, VPN issues, or Other Assistance for code debugging, troubleshooting, or calculations. The bot will guide you through the process. Users can provide feedback directly in the chat interface. For technical issues, contact the Y-ChatGPT team.',
        keywords: ['Assist', 'Bot', 'IT', 'tickets', 'Technical', 'assistance', 'Japanese/English', 'Help', 'Desk', 'laptop,', 'software,', 'VPN', 'issues,', 'Other', 'Assistance', 'code', 'debugging,', 'troubleshooting,', 'calculations.', 'OpreX', 'Yoko', 'Gen', 'AI', 'team.'],
        icon: <img src={Image.assistbot} style={{ width: '50px', marginRight: '10px' }} />,
      },
      {
        title: 'Advance Features',
        path: '/actionorientedfunctionalities/advancefeature',
        content: '  The Advanced Features leverage artificial intelligence, automation, and data analytics to improve organizational efficiency, decision-making, and user experience across various domains. Each service plays a crucial role in optimizing processes and achieving strategic business goals.',
        keywords: ['Advanced', 'Features', 'artificial', 'intelligence,', 'automation,', 'data', 'analytics', 'organizational', 'efficiency,', 'decision-making,', 'user', 'experience', 'across', 'various', 'domains.'],
        icon: <img src={Image.advancefeature} style={{ width: '50px', marginRight: '10px' }} />,
      },
      {
        title: 'Intranet',
        path: '/actionorientedfunctionalities/intranet',
        content: '  The feature Intranet helps users for leave application, WFH/WFO requests, and Timesheet submissions. Currently its integrated with YIL Sandbox environment. On demand this needs to be integrate with different RHQ in Intranet feature. Click on Intranet, select your preferred language Japanese/English and choose the domain you need assistance with: Leave, WFH/WFO, or Timesheet. The bot will guide you through the necessary steps by asking for details and providing forms. If you encounter any technical issues, please contact the Y-ChatGPT team for support.',
        keywords: ['Intranet', 'Chatbot', 'leave', 'applications,', 'WFH/WFO', 'Timesheet', 'submissions', 'Japanese/English', 'Leave,', 'WFH/WFO,', 'Timesheet.', 'OpreX', 'Yoko', 'Gen', 'AI', 'team.'],
        icon: <img src={Image.intranet} style={{ width: '50px', marginRight: '10px' }} />,
      }
    ],
  },  
];
