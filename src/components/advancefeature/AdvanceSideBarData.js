import React from 'react';
import * as RiIcons from 'react-icons/ri';

export const AdvanceSideBarData = [
  {
    title: 'Translation Services/ Document Development',
    path: '/translationservices',
    content: '  Translation Services allows users to translate documents into various languages without altering the format or layout. To use it, select your file, choose the target language, and click Translate. Supported languages include English, Chinese, Spanish, French, and more, while document types include PDF, DOCX, TXT, PPTX, CSV, and XLSX. For further reference, please check Link for the reference for technical issues, contact the  Y-ChatGPT team.',
    keywords : ["Translation", "Services", "Supported","languages","include","English,","Chinese,","Spanish,","French,","PDF,","DOCX,","TXT,","PPTX,","CSV,","XLSX.","OpreX","Yoko","Gen","AI","team."],
    iconClosed: <RiIcons.RiArrowDownSFill />,
    iconOpened: <RiIcons.RiArrowUpSFill />,
    subNav: [
      // {
      //   title: 'Translate your docs',
      //   path: '/translationservices/translateyourdocs',
      //   content: '  Translate Your Doc allows quick and accurate translation of text into various languages. To use it, select the destination language, enter text, and press CTRL Enter. Supported languages include English, Chinese, Spanish, French, and more. For further reference, please check Link for the reference for technical issues, contact the Y-ChatGPT team.',
      //   keywords : ["Translate", "Your,","Docs","Supported","languages","include","English,","Chinese,","Spanish,","French,","OpreX","Yoko","Gen","AI","team."],
      // },
      {
        title: 'Translate Your Doc ',
        path: '/translationservices/translateyourdoc',
        content: '  Translate Your Doc allows quick and accurate translation of text into various languages. To use it, select the destination language, enter text, and press CTRL Enter. Supported languages include English, Chinese, Spanish, French, and more. For further reference, please check Link for the reference for technical issues, contact the  Y-ChatGPT team.',
        keywords: ["Translate", "Your,","Docs","Supported","languages","include","English,","Chinese,","Spanish,","French,","OpreX","Yoko","Gen","AI","team."],
      },
      {
        title: 'Translate Your Text',
        path: '/translationservices/translateyourtext',
        content: '  Translate your text is a functionality that allows user to translate your text into wide variety of language quickly and accurately.',
        keywords: ["Translate","Your","Text"]
        
      },
      {
        title: 'Email Generator',
        path: '/translationservices/emailgenerator',
        content: '  The Email Generator is a tool designed to help you quickly and efficiently create emails on any subject or prompt. It allows you to choose the tone based on your recipients role (superior, teammate, or junior) and supports multiple languages, enabling you to generate emails in several languages at once.',
        keywords: ["Email","Generator"]
        
      },
    ]
  },
  {
    title: 'Data Insight Services',
    path: '/datainsightservices',
    content: '  The Data Insight Service Tool allows you to compare PDF or text files to identify differences. This tool highlights what has changed, been Added, or remains unchanged between two versions of a document, and it supports page-wise comparison. To use the Docs Comparison, upload the first file and then the second file. After uploading, users will see both compared files displayed page by page. The comparison results can be downloaded as the old file with highlights, the new file with highlights, or a merged PDF showing all differences highlighted. The tool supports PDF and plain text .txt files up to 200MB. Currently, the tool supports comparison between only two-files at a time. Users can also compare a PDF file with a text-file, with the tool aligning the text content and highlighting the differences accordingly. For further reference, please check Link for the reference for technical issues, contact the  Y-ChatGPT team.',
    keywords : ["Data","Insight","Services","PDF","files","identify","differences.","highlights","changed,","Added,","unchanged","page-wise","comparison.","Comparison,","highlights,","merged","PDF","highlighted.",".txt","200MB.","two-files","text-file,","OpreX","Yoko","Gen","AI","team."],
    iconClosed: <RiIcons.RiArrowDownSFill />,
    iconOpened: <RiIcons.RiArrowUpSFill />,

    subNav: [
      {
        title: 'Chat With Your Data',
        path: '/datainsightservices/chatwithyourdata',
        content: '  Chat With Data is a functionality that allows users to upload documents in various formats PDF, DOCX, TXT, PNG, JPG, JPEG and ask questions to the Y-ChatGPT . Users select chat with your data. For further reference,For technical issues, contact the Y-ChatGPT team.',
        keywords : ["Chat","With","Data","PDF,","DOCX,","TXT,","PNG,","JPG,","JPEG","OpreX","Yoko","Gen","AI","team."],
        cName: 'sub-nav'
      },
  //     // {
  //     //   title: 'Excel Analyzer',
  //     //   path: '/datainsightservices/excelanalyzer',
  //     //   content: '  The Excel Analyzer allows users to upload Excel files or data sheets to perform various data analysis tasks, ask questions about their data, adjust the header row, and visualize results using different charts and models. Users can upload a file, confirm or adjust the header row, and start querying their data. Questions can include data summaries, filters, comparisons, and trend analysis. Visualization options include pie charts, histograms, scatter plots, and linear regression models. Supported formats are .xls, .xlsx, and CSV. For issues, contact the Oprex Y-ChatGPT team for support.',
  //     //   keywords : ["Excel","Analyzer","Excel","files","perform","various","data","analysis","tasks,","ask","questions","data,","adjust","header","row,","visualize","results","charts","models.","data","summaries,","filters,","comparisons,","trend","analysis.","pie","charts,","histograms,","scatter","plots,","linear","regression","models.",".xls,",".xlsx,","CSV.","OpreX","Yoko","Gen","AI","team"],
  //     //   cName: 'sub-nav'
  //     // },
  //     {
  //       title: 'PDF Query System',
  //       path: '/datainsightservices/pdfquerysystem',
  //       content: '  The PDF Query System allows users to search for specific text or metadata within uploaded PDF files, providing details such as page number, screen ID, page text, and a screenshot. To use it, upload a PDF, select the query type (metadata or text), enter the necessary information, and submit. Query results include the page number, screen ID, page text, screenshot, and any instructions. If errors occur, check the PDF format, query type, and screen ID. For issues, contact the Y-ChatGPT team for support .',
  //       keywords : ["PDF","Query","System","PDF","files,","page","number,","screen","ID,","ID.","text,","screenshot,","screenshot.","instructions.","OpreX","Yoko","Gen","AI","team","support","format,","query","type,"],
  //     },
  //     // {
  //     //   title: 'PDF Query System',
  //     //   path: '/datainsightservices/pdfquery',
  //     //   content: '  The PDF Query System allows users to search for specific text or metadata within uploaded PDF files, providing details such as page number, screen ID, page text, and a screenshot. To use it, upload a PDF, select the query type (metadata or text), enter the necessary information, and submit. Query results include the page number, screen ID, page text, screenshot, and any instructions. If errors occur, check the PDF format, query type, and screen ID. For issues, contact the Y-ChatGPT team for support .',
  //     //   keywords : ["PDF","Query","System","PDF","files,","page","number,","screen","ID,","ID.","text,","screenshot,","screenshot.","instructions.","OpreX","Yoko","Gen","AI","team","support","format,","query","type,"],
       
  //     // },
  //     {
  //       title: 'Excel Analyzer',
  //       path: '/datainsightservices/excelanalyzer',
  //       content: '  The Excel Analyzer allows users to upload Excel files or data sheets to perform various data analysis tasks, ask questions about their data, adjust the header row, and visualize results using different charts and models. Users can upload a file, confirm or adjust the header row, and start querying their data. Questions can include data summaries, filters, comparisons, and trend analysis. Visualization options include pie charts, histograms, scatter plots, and linear regression models. Supported formats are .xls, .xlsx, and CSV. For issues, contact the Oprex Y-ChatGPT team for support.',
  //       keywords : ["Excel","Analyzer","Excel","files","perform","various","data","analysis","tasks,","ask","questions","data,","adjust","header","row,","visualize","results","charts","models.","data","summaries,","filters,","comparisons,","trend","analysis.","pie","charts,","histograms,","scatter","plots,","linear","regression","models.",".xls,",".xlsx,","CSV.","OpreX","Yoko","Gen","AI","team"],
  //       cName: 'sub-nav'
  //     },
  //     // {
  //     //   title: 'Chat With Your Data',
  //     //   path: '/datainsightservices/chatwithyoudata',
  //     //   content: '  Chat With Data is a functionality that allows users to upload documents in various formats PDF, DOCX, TXT, PNG, JPG, JPEG and ask questions to the Y-ChatGPT . Users select chat with your data. For further reference,For technical issues, contact the Y-ChatGPT team.',
  //     //   keywords : ["Chat","With","Data","PDF,","DOCX,","TXT,","PNG,","JPG,","JPEG","OpreX","Yoko","Gen","AI","team."],
  //     //   cName: 'sub-nav'
  //     // },
    ]
  },
  // {
  //   title: 'RPA Services',
  //   path: '/rpaservices',
  //   content: '   Robotic Process Automation (RPA) services offered, designed to streamline and optimize business processes through automation.',
  //   keywords : ["Robotic","Process","Automation","services","streamline","optimize","business","processes","through","automation."],
  //   iconClosed: <RiIcons.RiArrowDownSFill />,
  //   iconOpened: <RiIcons.RiArrowUpSFill />,

  //   subNav: [
  //     // {
  //     //   title: 'Advance RPA',
  //     //   path: '/rpaservices/advancerpa',
  //     //   content: `  The various Robotic Process Automation (RPA) services offered, designed to streamline and optimize business processes through automation.
  //     //           Comment Extractor: Automates the extraction of comments from various documents,  ensuring no critical feedback or annotations are missed. Ideal for processing large volumes of text efficiently.
  //     //           P&ID Extractor: Facilitates the extraction of Piping and Instrumentation Diagram (P&ID)   data from engineering drawings. This tool helps in accurately capturing complex technical details for analysis and documentation.
  //     //           Document Comparison: Provides automated comparison of documents to identify differences and ensure consistency. Useful for legal, technical, and business documents where precision is critical.
  //     //           Compliance Extractor: Extracts compliance-related information from documents to ensure adherence to regulatory standards. This service helps organizations maintain compliance with minimal manual effort.`,
  //     //   keywords : ["Various","Robotic","Process","Automation","services","streamline","optimize","business","processes","through","automation.","Comment","Extractor:","Automates","extraction","comments","ensuring","no","critical","feedback","annotations","missed.","processing","large","volumes","text","efficiently."
  //     //           ,"P&ID","Extractor:","Facilitates","extraction","Piping","Instrumentation","Diagram","data","engineering","drawings.","accurately","capturing","complex","technical","details","analysis","documentation.",
  //     //           "Document","Comparison:","automated","comparison","differences","ensure","consistency.","legal,","technical,","business","documents","precision","critical.",
  //     //           "Compliance","Extractor:","compliance-related","adherence","regulatory","standards.","maintain","compliance","minimal","manual","effort."],
  //     //   cName: 'sub-nav'
  //     // },
  //     {
  //       title: 'Comment Extractor',
  //       path: '/rpaservices/commentextractor',
  //       content: '  This feature allows the user to upload a PDF and automatically extract all comments and annotations,  and generate the excel file with the extracted comments, making it easy to review and analyze feedback in one place. Also automatically finds the free slot on the calendar and schedules the meeting with the subject as the tile, triggers an email with the uploaded pdf and generated excel file with the concerned persons. ',
  //       keywords: ["upload","extracted","PDF","automatically","comments","annotations","generate","excel","analyze","feedback","calendar","schedules","meeting","triggers","email"],
  //       cName: 'sub-nav'
  //     },
  //     //    {
  //     //   title: 'Compliance Extractor',
  //     //   path: '/rpaservices/complienceextractor',
  //     //   content: '  Compliance Extractor is a tool that allows you to convert standard format PDF Standard Operating Procedure (SOP) documents into Excel sheets. This makes it easier to manage, analyse, and share SOP data. ',
  //     //   keywords: ["Compliance","Extractor","SOP","Manage","Analyze"],
  //     //   cName: 'sub-nav'
  //     // },
  //     // {
  //     //   title: 'P&ID Extractor',
  //     //   path: '/rpaservices/p&idextractor',
  //     //   content: '  The P&ID Extractor is a tool designed to help users extract PI (Piping and Instrumentation) numbers from PDF files into an Excel spreadsheet. Users can download the extracted data and add multiple files for processing.',
  //     //   keywords: ["P&ID","Extractor","Piping","Instrumentation"],
  //     //   cName: 'sub-nav'
  //     // },
  //     // {
  //     //   title: 'Document Comparison',
  //     //   path: '/rpaservices/documentcomparison',
  //     //   content: '  The Document Comparison Tool allows you to compare PDF or text files to identify differences. This tool highlights what has changed, been added, or remains unchanged between two versions of a document, and it supports page-wise comparison. ',
  //     //   keywords: ["Document","Comparison","PDF"],
  //     //   cName: 'sub-nav'
  //     // },
  //   ]
  // },
  // {
  //   title: 'Support Services',
  //   path: '/supportservices',
  //   content: '  The Y-ChatGPT-Support Mechanism is a comprehensive solution that enhances organizational efficiency and user satisfaction. By integrating advanced AI capabilities with practical functionalities, it ensures that users receive timely and relevant support, making their daily tasks easier and more manageable.',
  //   keywords : ["OpreX","Yoko","Gen","AI-Support","Mechanism","comprehensive","enhances","organizational","efficiency","user","satisfaction.","integrating","advanced","AI","capabilities","practical","functionalities,","timely","relevant","support,","manageable."],
  //   iconClosed: <RiIcons.RiArrowDownSFill />,
  //   iconOpened: <RiIcons.RiArrowUpSFill />,

  //   subNav: [
  //     {
  //       title: 'L0 & L1 Support SOP',
  //       path: '/supportservices/supportsop',
  //       content: `  All L0 & L1 The Support mechanism is a virtual assistant designed to help you raise tickets with support personnel when user faces issue with responses generated for Yokogawa internal based search.'

  //       Note: This tool is for demo purposes only and can be integrated with desired teams or regions on demand, either within their tool or separately.`,
  //       keywords : ["L0","L1","Support","ServiceNow","troubleshoot","issues","ticket.","resolved,","chatbot","ticket/incident","region","specific.","Note:","This","tool","for","demo","purposes","only","and","can","be","integrated","with","desired","teams","or","regions","on","demand,","either","within","their","tool","or","separately.","is"],
  //       cName: 'sub-nav'
  //     }
  //   ]
  // },
  // {
  //   title: 'Security Services',
  //   path: '/securityservices',
  //   content: '  Security Services encompass a wide range of solutions designed to protect systems, networks, and data from various threats. Leveraging advanced technologies, these services ensure the integrity, confidentiality, and availability of information while mitigating risks associated with cyber attacks, data breaches, and unauthorized access.',
  //   keywords : ["Security","Services","encompass","solutions","designed","protect","systems,","networks,","data","various","threats.","Leveraging","advanced","technologies,","services","ensure","integrity,","confidentiality,","availability","information","mitigating","risks","associated","cyber","attacks,","data","breaches,","unauthorized","access."],
  //   iconClosed: <RiIcons.RiArrowDownSFill />,
  //   iconOpened: <RiIcons.RiArrowUpSFill />,

  //   subNav: [
  //     {
  //       title: `Customer Asset And Information Security`,
  //       path: '/securityservices/customerassetsandinformationsecurity',
  //       content: '  Customer Asset & Security Information allows cybersecurity teams to monitor and analyze user activity and vulnerabilities based on IP addresses using AI. Users can provide prompts related to specific IP addresses, such as querying message summaries, destination IPs, or network applications. For further reference, technical issues, contact the Y-ChatGPT team.',
  //       keywords : ["Customer","Asset","Security","Information","cybersecurity","monitor","analyze","activity","vulnerabilities","IP","AI.","querying","message","summaries,","destination","IPs,","network","applications.","OpreX","Yoko","Gen","AI","team."],
  //       cName: 'sub-nav'
  //     },
  //     // {
  //     //   title: 'Customer Assets and Information Security',
  //     //   path: '/securityservices/soc',
  //     //   content: '  Customer Asset & Security Information allows cybersecurity teams to monitor and analyze user activity and vulnerabilities based on IP addresses using AI. Users can provide prompts related to specific IP addresses, such as querying message summaries, destination IPs, or network applications. For further reference, technical issues, contact the Y-ChatGPT team.',
  //     //   keywords : ["Customer","Asset","Security","Information","cybersecurity","monitor","analyze","activity","vulnerabilities","IP","AI.","querying","message","summaries,","destination","IPs,","network","applications.","OpreX","Yoko","Gen","AI","team."],
  //     //   cName: 'sub-nav'
  //     // },
  //   ]
  // },
  // {
  //   title: 'Image/ Video Recognition Services',
  //   path: '/imagevideorecognitionservices',
  //   content: '  The Image and Video Recognition Services offer powerful tools for extracting valuable insights from visual data. By automating the analysis of images and videos, these services can significantly enhance efficiency, accuracy, and decision-making across various industries.',
  //   keywords : ["Image","Video","Recognition","Services","extracting","valuable","insights","visual","data.","automating","analysis","images","videos,","significantly","enhance","efficiency,","accuracy,","decision-making","across","various","industries."],
  //   iconClosed: <RiIcons.RiArrowDownSFill />,
  //   iconOpened: <RiIcons.RiArrowUpSFill />,

  //   subNav: [
  //     // {
  //     //   title: 'Personal Protective Equipment',
  //     //   path: '/imagevideorecognitionservices/personalprotectiveequipment',
  //     //   content: '  PPE Personal Protective Equipment Object Detection is a functionality that allows users to detect personal protective equipment such as masks, hard hats, and safety vests in images or videos. This technology helps ensure compliance with safety standards by identifying and counting the presence of required safety gear.',
  //     //   keywords : ["Personal","Protective","Equipment","users","detect","personal","protective","equipment","masks,","hard","hats,","safety","vests","images","videos."],
  //     //   cName: 'sub-nav'
  //     // },
  //     {
  //       title: 'Personal Protective Equipment',
  //       path: '/imagevideorecognitionservices/ppe',
  //       content: '  PPE Personal Protective Equipment Object Detection is a functionality that allows users to detect personal protective equipment such as masks, hard hats, and safety vests in images or videos. This technology helps ensure compliance with safety standards by identifying and counting the presence of required safety gear.',
  //       keywords : ["Personal","Protective","Equipment","users","detect","personal","protective","equipment","masks,","hard","hats,","safety","vests","images","videos."],
  //       cName: 'sub-nav'
  //     },
  //   ]
  // },
  {
    title: 'Code Development Services/ Assistance',
    path: '/codedevelopmentservicesassistance',
    content: '  Code Development Services Assistance provide comprehensive support for software development, ensuring the creation of high-quality, maintainable, and efficient code.Code Development Services help organizations achieve their software development goals effectively and efficiently.',
    keywords : ["Code","Development","Services","Assistance","comprehensive","support","software","development,","high-quality,","maintainable,","efficient","Development","Services","effectively","efficiently."],
    iconClosed: <RiIcons.RiArrowDownSFill />,
    iconOpened: <RiIcons.RiArrowUpSFill />,

    subNav: [
      // {
      //   title: 'Code Generation and Debugging',
      //   path: '/codedevelopmentservicesassistance/codegenerationanddebugging',
      //   content: '  The code generator automatically creates code snippets or complete programs in various programming languages based on user requirements or prompts. Users provide details on the desired functionality, variables, inputs outputs, and click Generate to receive the code along with a description. Supported languages include Python, JavaScript, Java, C++, C#, PHP, Ruby, Swift, Kotlin, TypeScript, HTML,CSS, and SQL. The tool can generate both entire programs and snippets. The code is functional but may require further optimization. Accuracy depends on the clarity of input requirements. There are no strict limits on code generation, but it is recommended to generate code in manageable segments. The generated code can be easily integrated into standard IDEs and text editors. For support, technical issues, contact the Y-ChatGPT team.',
      //   keywords : ["code","generator","automatically","snippets","complete","programs","programming","languages","functionality,","variables,","inputs","outputs,","Generate","receive","description.","Python,","JavaScript,","Java,","PHP,","Ruby,","Swift,","Kotlin,","TypeScript,","HTML,","CSS,","SQL.","entire","programs","snippets.","further","optimization.","Accuracy","depends","clarity","input","requirements.","limits","generation,","recommended","generate","manageable","segments.","standard","IDEs","text","editors.","OpreX","Yoko","Gen","AI","team."],
      //   cName: 'sub-nav'
      // },
      {
        title: 'Code Development And Debugging',
        path: '/codedevelopmentservicesassistance/codegeneration',
        content: '  The code generator automatically creates code snippets or complete programs in various programming languages based on user requirements or prompts. Users provide details on the desired functionality, variables, inputs outputs, and click Generate to receive the code along with a description. Supported languages include Python, JavaScript, Java, C++, C#, PHP, Ruby, Swift, Kotlin, TypeScript, HTML,CSS, and SQL. The tool can generate both entire programs and snippets. The code is functional but may require further optimization. Accuracy depends on the clarity of input requirements. There are no strict limits on code generation, but it is recommended to generate code in manageable segments. The generated code can be easily integrated into standard IDEs and text editors. For support, technical issues, contact the Y-ChatGPT team.',
        keywords : ["code","generator","automatically","snippets","complete","programs","programming","languages","functionality,","variables,","inputs","outputs,","Generate","receive","description.","Python,","JavaScript,","Java,","PHP,","Ruby,","Swift,","Kotlin,","TypeScript,","HTML,","CSS,","SQL.","entire","programs","snippets.","further","optimization.","Accuracy","depends","clarity","input","requirements.","limits","recommended","generate","manageable","segments.","standard","IDEs","text","editors.","OpreX","Yoko","Gen","AI","team."],
        cName: 'sub-nav'
      }
     
    ]
  },
  // {
  //   title: 'Contract Management Services',
  //   path: '/contractmanagementservices',
  //   content: '  Contract Management Services provide comprehensive solutions for the creation, negotiation, execution, management, and analysis of contracts to maximize operational and financial performance while minimizing risk. These services streamline the entire contract lifecycle, from drafting and approval to compliance and renewal, ensuring that organizations can efficiently manage their contractual obligations.',
  //   keywords : ["Contract","Management","Services","comprehensive","solutions","creation,","negotiation,","execution,","management,","analysis","contracts","maximize","operational","financial","performance","minimizing","risk.","streamline","contract","lifecycle,","drafting","approval","renewal,","organizations","contractual","obligations."],
  //   iconClosed: <RiIcons.RiArrowDownSFill />,
  //   iconOpened: <RiIcons.RiArrowUpSFill />,

  //   subNav: [
  //     // {
  //     //   title: 'AI Contract Manager',
  //     //   path: '/contractmanagementservices/aicontractmanager',
  //     //   content: '  AI Contract Manager leverages artificial intelligence to streamline and enhance the contract management process. This advanced system automates various aspects of contract lifecycle management, from drafting and negotiation to compliance and renewal, ensuring efficiency, accuracy, and risk mitigation. AI Contract Managers use machine learning, natural language processing (NLP), and data analytics to provide intelligent insights and automate repetitive tasks, freeing up valuable time for legal and procurement professionals.',
  //     //   keywords : ["AI","Contract","Manager","leverages","artificial","intelligence","streamline","contract","management","process.","automates","aspects","contract","lifecycle","management,","drafting","negotiation","compliance","renewal,","ensuring","efficiency,","accuracy,","risk","mitigation.","machine","learning,","natural","language","processing","data","analytics","intelligent","insights","automate","repetitive","tasks,","freeing","valuable","legal","procurement","professionals."],
  //     //   cName: 'sub-nav'
  //     // },
  //     {
  //       title: 'AI Contract Manager',
  //       path: '/contractmanagementservices/aicontract',
  //       content: '  AI Contract Manager leverages artificial intelligence to streamline and enhance the contract management process. This advanced system automates various aspects of contract lifecycle management, from drafting and negotiation to compliance and renewal, ensuring efficiency, accuracy, and risk mitigation. AI Contract Managers use machine learning, natural language processing (NLP), and data analytics to provide intelligent insights and automate repetitive tasks, freeing up valuable time for legal and procurement professionals.',
  //       keywords : ["AI","Contract","Manager","leverages","artificial","intelligence","streamline","contract","management","process.","automates","aspects","contract","lifecycle","management,","drafting","negotiation","compliance","renewal,","ensuring","efficiency,","accuracy,","risk","mitigation.","machine","learning,","natural","language","processing","data","analytics","intelligent","insights","automate","repetitive","tasks,","freeing","valuable","legal","procurement","professionals."],
  //       cName: 'sub-nav'
  //     },
  //   ]
  // },

//   {
//   title: 'Recommender System',
//   path: '/recommendersystem',
//   content: '  Recommender System .',
//   keywords: ["Recommender","System"],
//   iconClosed: <RiIcons.RiArrowDownSFill />,
//   iconOpened: <RiIcons.RiArrowUpSFill />,

//   subNav: [
//     {
//       title: 'Image Search,Background Remover And OCR (Text Extraction)',
//       path: '/recommendersystem/imagesearchbackgroundremoverandocr',
//       content: '  Image Search,Background Remover and OCR (Text Extraction).',
//       keywords: ["Image","Search","Background","Remover","OCR"],
//       cName: 'sub-nav'
//     }
//   ]
// },

//   {
//     title: 'Gen DCS AI',
//     path: '/contractmanagementservices',
//     content: '  The Gen DCS AI system is a sophisticated Distributed Control System (DCS) enhanced with artificial intelligence to provide advanced automation, monitoring, and control capabilities across industrial processes. This AI-augmented DCS optimizes operational efficiency, enhances predictive maintenance, ensures high reliability, and facilitates seamless integration with other digital systems.',
//     keywords : ["Gen","DCS","AI","sophisticated","Distributed","Control","System","enhanced","artificial","intelligence","advanced","automation,","monitoring,","control","capabilities","industrial","processes.","AI-augmented","DCS","optimizes", "operational","efficiency,","enhances","predictive","maintenance,","ensures","high","reliability,","facilitates","seamless","integration","digital","systems."],
//     iconClosed: <RiIcons.RiArrowDownSFill />,
//     iconOpened: <RiIcons.RiArrowUpSFill />,

//     subNav: [
//       {
//         title: 'Gen DCS',
//         path: '/gendcsai/gendcs',
//         content: '  The Gen DCS AI system represents a significant advancement in industrial automation, combining traditional DCS functionalities with cutting-edge AI technologies. By leveraging AI for process optimization, predictive maintenance, and real-time monitoring, Gen DCS AI enhances operational efficiency, reliability, and safety. Its seamless integration capabilities and advanced functionalities, such as digital twins and AR/VR, position it as a critical tool for modern industrial operations, enabling organizations to stay competitive in a rapidly evolving landscape.',
//         keywords : ["Gen","DCS","AI","system","significant","advancement","industrial","automation,","combining","traditional","DCS","cutting-edge","AI","technologies.","leveraging","AI","process","optimization,","predictive","maintenance,","real-time","monitoring,","Gen","DCS","AI","enhances","efficiency,","reliability,","safety.","seamless","integration","capabilities","advanced","functionalities,","digital","twins","AR/VR,","modern","industrial","operations,","enabling","organizations","stay","competitive","rapidly","evolving","landscape."],
//         cName: 'sub-nav'
//       }
//     ]
//   }
];
