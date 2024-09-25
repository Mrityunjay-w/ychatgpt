import React, { useContext, useState } from 'react';
import CodeGenerationThemeContext from './CodeGenerationThemeContext';
import { ClipLoader } from 'react-spinners';

// Function to determine theme classes for light or dark modes
const getclass1 = (currenttheme) => {
    return currenttheme === 'light' ? '' : 'bg-gray-900 text-white';
};

const CodeGenerationBody = () => {
    const { theme, setStoredData, storedData, selectedIndex, setSelectedIndex,fileError, setFileError,formError, setFormError,serverError, setServerError } = useContext(CodeGenerationThemeContext);
    const class1 = getclass1(theme);

    const [InputQuestion, setInputQuestion] = useState('');
    const [load, setLoad] = useState(false);
    const [output, setOutput] = useState("");
    const [ready, setready] = useState(false);

    // Handle input change for the question prompt
    const handleInputQuestionChange = (e) => {
        setInputQuestion(e.target.value);

        setServerError('');
        setFormError('')
        setready('')

    };

    // Handle "Enter" key press to trigger form submission
    const handleKeyDown = (event) => {
        if (event.key === 'Enter') {
            handleSubmit();
        }
    };

    // Handle form submission to fetch code generation result
    const handleSubmit = async () => {
        setServerError('');
        setFormError('')
const codegen=process.env.REACT_APP_CODE_GENERATION;
        const username = 'ychatgpt';
        const password = 'dfnefiwnfwfniwfndscscnxzcx3243cxx';
        const credentials = btoa(`${username}:${password}`);

        if (!InputQuestion) {
            setFormError('Please provide a prompt.');
            return;
        }

        const requestData = {
            prompt: InputQuestion,
        };

        setLoad(true);
        setSelectedIndex(null);

        try {
            const response = await fetch(codegen, {
                method: 'POST',
                body: JSON.stringify(requestData),
                headers: {
                    'Authorization': `Basic ${credentials}`,
                    'Content-Type': 'application/json'
                }
            });

            if (!response.ok) {
                // Handle different error statuses
                let errorMessage;
                if (response.status === 400) {
                    errorMessage = "Prompt cannot be empty.";
                } else if (response.status === 500) {
                    errorMessage = 'Internal server error. Please try again later.';
                } else {
                    errorMessage = `Error: ${response.status} ${response.statusText}`;
                }
                
                // setOutput(errorMessage); // Display the custom error message
                setServerError(errorMessage); // Set the custom error message in context
                throw new Error(errorMessage); // Throw the error to be caught below
            }

            const data = await response.text();
            setOutput(data.replace(/\\n/g, '\n'));

            let storedData = JSON.parse(localStorage.getItem('prompts')) || [];
            let newEntry = { prompt: InputQuestion, output: data };
            storedData.push(newEntry);
            localStorage.setItem('prompts', JSON.stringify(storedData));

            const data1 = JSON.parse(localStorage.getItem('prompts')) || [];
            setStoredData(data1);

        } catch (error) {
            console.error('Error generating code:', error);
            setServerError('Error connecting to the server. Please try again later.');
        } finally {
            setLoad(false);
            setready(true);
        }
    };

    // Helper function to render code blocks and regular text
    const renderContent = (text) => {
        const codeRegex = /```([\s\S]*?)```/g;
        const parts = text.split(codeRegex);

        return parts.map((part, index) => {
            if (index % 2 === 1) { // It's a code block
                return (
                    <div key={index} className="p-4 border-2 shadow-lg mb-4 rounded bg-gray-800 text-white">
                        <pre style={{ whiteSpace: 'pre-wrap', wordWrap: 'break-word' }}>{part}</pre>
                        <button
                            className='px-6 py-2 bg-blue-600 text-white rounded-md mt-2'
                            onClick={() => navigator.clipboard.writeText(part)}
                        >
                            Copy
                        </button>
                    </div>
                );
            } else {
                return (
                    <div key={index} className="mb-4">
                        {part.split('\n').map((line, i) => (
                            <p key={i} className={`${class1}`}>{line}</p>
                        ))}
                    </div>
                );
            }
        });
    };

    return (
        <div className={`w-full h-full border-2 ${class1}`} style={{ overflowY: 'auto', height: '800px' }}>
            <div className='px-20 py-10'>
                <div className='mt-4 w-full text-left'>
                    <label htmlFor="instructions" className={`block text-sm font-medium ${class1} mb-2 text-left`}>
                        Enter your prompt below:
                    </label>
                    <textarea
                        id="instructions"
                        className="shadow-sm rounded-md w-full px-3 py-2 border-2 border-slate-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                        rows="3"
                        value={InputQuestion}
                        onChange={handleInputQuestionChange}
                        onKeyDown={handleKeyDown}
                        placeholder='Ask a question?'
                        style={{ backgroundColor: '#f9f9f9', color: '#333' }}
                    />
                </div>
                <button
                    className='px-6 py-2 my-2 bg-blue-600 text-white rounded-md self-end'
                    onClick={handleSubmit}
                >
                    Generate
                </button>

                <div className='w-full text-center justify-center items-center'>
                    {load && (
                   <div className="flex flex-col items-center w-full max-w-lg bg-white p-8 rounded-lg shadow-lg">
                   <ClipLoader size={50} color={"#1f4e96"} loading={load} />
                   <p className="mt-4 text-gray-600 text-lg">Loading file, please wait...</p>
                 </div>
                    )}
                </div>
                 
                {serverError && (
                    <div className='bg-red-200 h-20 rounded-full text-black ml-56 p-4 mb-4 w-2/3 items-center justify-center'>
                        <p className='text-center'>{serverError}</p>
                    </div>
                )}

                {formError && (
                    <div className='bg-red-200 h-20 rounded-full text-black p-4 ml-56 mb-4 w-2/3 items-center justify-center'>
                        <p className='text-center'>{formError}</p>
                    </div>
                )}

                {ready && !serverError && (
                    <div className={`border-2 rounded-md border-lime-400 mt-4 text-left ${class1}`}>
                        <div className='p-6'>
                            {renderContent(output)}
                        </div>
                        <p style={{fontSize: 'small',position: 'fixed', bottom: '120px'}}>This output is generated by Y-ChatGPT AI bot</p>
                    </div>
                    
                )}

                {selectedIndex !== null && storedData[selectedIndex] && (
                    <div className={`border-2 p-6 rounded-md border-amber-400 mt-4 text-left ${class1}`}>
                        <strong>Prompt:</strong> {storedData[selectedIndex].prompt}<br />
                        <strong>Output:</strong> {renderContent(storedData[selectedIndex].output)}
                    </div>
                )}
            </div>
        </div>
    );
}

export default CodeGenerationBody;
