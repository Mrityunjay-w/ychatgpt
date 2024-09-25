import React, { useContext, useState } from 'react';
import { ClipLoader } from 'react-spinners';
import SOCThemeContext from './SOCThemeContext';
import QuestionAnswerIcon from '@mui/icons-material/QuestionAnswer';
import AssistantIcon from '@mui/icons-material/Assistant';

const getclass1 = (currenttheme) => {
    return currenttheme === 'light' ? '' : 'bg-black text-white';
};

const SOCDisplay = () => {

   

    const [inputText, setInputText] = useState('');
    const { downloadUrl, resetFileState,theme } = useContext(SOCThemeContext);
    const [fileName, setFileName] = useState(localStorage.getItem('fileName'));
    const [progress, setProgress] = useState(50);
    const [selectedLanguage, setSelectedLanguage] = useState('');
    const [file1, setFile1] = useState(null);
    const [translatedText, setTranslatedText] = useState('');
    const [enterPressed, setEnterPressed] = useState(false);
    const [loading, setLoading] = useState(false);
    const [result, setResult] = useState([]); // Initialize result as an array
    const [submittedPrompt, setSubmittedPrompt] = useState('');

    const class1 = getclass1(theme);

    const handleLanguageChange = (selectedOption) => {
        setSelectedLanguage(selectedOption);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        setLoading(true);
        setSubmittedPrompt(inputText);
        const formData = new FormData();
        formData.append('text', inputText);

        try {
            const response = await fetch('http://localhost:5000/api/route', {
                method: 'POST',
                body: formData
            });
            const data = await response.json();
            setResult([{ question: inputText, answer: data }, ...result]); // Prepend new question-answer pair
            setInputText(''); // Clear the input field after submitting
        } catch (error) {
            console.error('Error uploading file:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleKeyDown = (e) => {
        if (e.key === 'Enter') {
            handleSubmit(e);
        }
    };

    return (
        <div className={`${class1}`} style={{ padding: '5px' }}>
            <div className="mx-auto w-4/6 py-5">
                <h1 className={`text-left text-3xl font-bold mb-4 ${class1}`} style={{color:'black'}}>Search Customer Asset & Security Information</h1>
                <div className="border-b-2 border-red-300 mb-4"></div>
                <div className='flex flex-col items-start text-left justify-center mt-4 w-full'>
                    <label htmlFor='Prompt_label' className={`mb-2 text-black mr-96 font-medium text-xl ${class1}`} style={{ color: '#000000', borderColor: 'black', width: '100%' }}>
                        Enter the Prompt:
                    </label>
                </div>
                <div className='relative mb-20'>
                    <input
                        type='text'
                        className='w-full border-stone-700 rounded-md font-medium text-black border-2 h-11 text-xl pl-4 pr-12'
                        placeholder='Type New Question'
                        value={inputText}
                        onChange={(e) => setInputText(e.target.value)}
                        onKeyDown={handleKeyDown}
                        style={{ color: 'black', borderRadius: '10px' }}
                    />
                    <button
                        onClick={handleSubmit}
                        className='absolute right-0 top-1/2 transform -translate-y-1/2 p-2'
                        style={{ backgroundColor: 'black', border: '2px solid black', borderLeft: 'none', borderRadius: '0 10px 10px 0', color: 'white' }}
                    >
                        <span role='img' aria-label='submit' style={{ fontSize: '1.5em', lineHeight: '0' }}>&#x27A4;</span>
                    </button>
                </div>
                <div className="qa-container -mt-14">
                    {loading && (
                     <div className="flex flex-col items-center w-full max-w-lg bg-white p-8 rounded-lg shadow-lg">
                     <ClipLoader size={50} color={"#1f4e96"} loading={loading} />
                     <p className="mt-4 text-gray-600 text-lg">Loading file, please wait...</p>
                   </div>
                    )}
                    {result.map((qaPair, index) => (
                        <div key={index} className="result-container mr-4 ml-4 mb-4">
                            <div className="flex items-center lg:-mx-4 mb-4 p-4 rounded-lg bg-indigo-100">
                                <QuestionAnswerIcon className="mr-2" sx={{ color: "red" }} />
                                <pre className={`whitespace-pre-wrap text-left font-medium text-lg leading-relaxed ${class1}`}>
                                    <strong>{qaPair.question}</strong>
                                </pre>
                            </div>
                            {Object.keys(qaPair.answer).length === 0 ? (
                                <div className="flex items-center lg:-mx-4 p-4 rounded-lg bg-indigo-100 text-black">
                                    <AssistantIcon className="mr-2 self-start" sx={{ color: "black" }} />
                                    <pre className={`whitespace-pre-wrap text-left font-medium text-lg leading-relaxed ${class1}`}>
                                        I'm unable to directly query external databases or systems to fetch real-time data like destination IPs, source IPs, or Network application. However, if you have access to an Elasticsearch index or another data source that contains this information, then please coordinate with Y-ChatGPT team to help you formulate a query to retrieve it.
                                    </pre>
                                </div>
                            ) : (
                                <div className="flex items-center p-4 lg:-mx-4 rounded-lg bg-indigo-100 text-black">
                                    <AssistantIcon className="mr-2 self-start" sx={{ color: "black" }} />
                                    <pre className={`whitespace-pre-wrap text-left font-medium text-lg leading-relaxed ${class1}`}>
                                        {qaPair.answer.NetworkApplication && (
                                            <div>
                                                <p className='text-left font-medium mb-4 text-2xl'><strong>Network Application:</strong>{qaPair.answer.NetworkApplication}</p>
                                                <p className='text-left mb-4 font-medium'><strong>Destination IP:</strong>{qaPair.answer.DestinationIP}</p>
                                                <p className='text-left mb-4 font-medium'><strong>Network Session:</strong>{qaPair.answer.NetworkSession}</p>
                                                <p className='text-left mb-4 font-medium'><strong>Tags:</strong>{qaPair.answer.Tags}</p>
                                                <p className='text-left mb-4 font-medium'><strong>Source Location:</strong>{qaPair.answer.SourceLocation}</p>
                                                <p className='text-left mb-4 font-medium'><strong>Destination Zone:</strong>{qaPair.answer.DestinationZone}</p>
                                                <p className='text-left mb-4 font-medium'><strong>Message Summary:</strong>{qaPair.answer.MessageSummary}</p>
                                            </div>
                                        )}
                                    </pre>
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default SOCDisplay;
