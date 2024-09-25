import React, { useContext, useState, useEffect } from 'react';
// import ThemeContext from './ThemeContext';
import TranslateYourTextThemeContext from './TranslateYourTextThemeContext';
import { ClipLoader } from 'react-spinners';
import Select from 'react-select';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';

const TranslateYourTextDisplay= () => {
  const [inputText, setInputText] = useState('');
  const { resetFileState } = useContext(TranslateYourTextThemeContext);
  const [translatedText, setTranslatedText] = useState('');
  const [selectedLanguage, setSelectedLanguage] = useState('');
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [enterPressed, setEnterPressed] = useState(false);

  const handleLanguageChange = (selectedOption) => {
    setSelectedLanguage(selectedOption.value);
    setErrorMessage(''); // Clear error if language is selected
    setTranslatedText(''); // Clear previous translation when language changes
  };

  const handleInputTextChange = (e) => {
    setInputText(e.target.value);
    setErrorMessage(''); // Clear error if text is being typed
    setTranslatedText(''); // Clear previous translation when text changes
  
    // Optionally reset the selected language when text is cleared
    if (!e.target.value.trim()) {
      setSelectedLanguage(''); // Reset the selected language
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setErrorMessage(''); // Clear any previous error message
    
    // Check if text and language are entered
    if (!inputText.trim()) {
      setErrorMessage('Please Provide Text To Translate.');
      return;
    }
    if (!selectedLanguage) {
      setErrorMessage('Please Select Target Language.');
      return;
    }
  
    setLoading(true);
    setTranslatedText(''); // Reset the translated text to avoid UI shift

const TextTran=process.env.REACT_APP_TRANSLATION_TEXT;
    const username = 'ychatgpt';
    const password = 'dfnefiwnfwfniwfndscscnxzcx3243cxx';
    const credentials = btoa(`${username}:${password}`);
  
    const jsonData = {
      text: inputText,
      to_language: selectedLanguage,
    };
  
    try {
      const response = await fetch(TextTran , {
        method: 'POST',
        body: JSON.stringify(jsonData),
        headers: {
          Authorization: `Basic ${credentials}`,
          'Content-Type': 'application/json',
        },
      });
  
      if (response.status === 400) {
        // Handle 400 Bad Request
        const errorData = await response.json();
        const errorMessage = errorData.error || 'Invalid request. Please check the input and try again.';
        throw new Error(errorMessage);
      }
  
      if (!response.ok) {
        throw new Error('An error occurred while translating. Please try again.');
      }
  
      const data = await response.json();
      setTranslatedText(data.translated_text); 
    } catch (error) {
      console.error('Error uploading file:', error);
      setErrorMessage(error.message || 'An error occurred while translating. Please try again.');
    } finally {
      setLoading(false); 
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      setEnterPressed(true);
      handleSubmit(e); 
    }
  };

  const languageOptions = [
    { value: 'en', label: 'English' },
    { value: 'es', label: 'Spanish' },
    { value: 'fr', label: 'French' },
    { value: 'de', label: 'German' },
    { value: 'hi', label: 'Hindi' },
    { value: 'ru', label: 'Russian' },
    { value: 'id', label: 'Indonesian' },
    { value: 'zhc', label: 'Mandarin Chinese' },
    { value: 'fi', label: 'Finnish' },
    { value: 'ar', label: 'Standard Arabic' },
    { value: 'pt', label: 'Portuguese' },
    { value: 'ja', label: 'Japanese' },
    { value: 'sw', label: 'Swahili' },
    { value: 'tr', label: 'Turkish' },
    { value: 'ko', label: 'Korean' },
    { value: 'it', label: 'Italian' },
    { value: 'nl', label: 'Dutch' },
    { value: 'vi', label: 'Vietnamese' },
    { value: 'th', label: 'Thai' },
    { value: 'ms', label: 'Malay' },
    { value: 'fil', label: 'Filipino' },
  ];

  return (
    <div className='flex flex-col items-center justify-center pt-6' style={{ padding: '20px' }}>
      <div className='flex flex-col items-center justify-center mt-4 w-full'>
        <label
          htmlFor='translate_label'
          className='mb-2 text-black text-lg font-semibold w-full -mr-60 text-left'
          style={{ color: '#000000', borderColor: 'black' }}
        >
          Enter Text To Translate:
        </label>
      </div>

      <div className="w-4/5">
      <textarea
  className="w-full border border-gray-800 rounded-lg p-2 focus:outline-none font-medium"
  rows="5"
  placeholder="Enter text here"
  value={inputText}
  onChange={handleInputTextChange} // <-- Use this new handler
  onKeyDown={handleKeyDown}
  style={{ color: 'black' }}
></textarea>
      </div>

      <div className='w-4/5 flex flex-col items-center justify-center mt-4'>
        <label
          htmlFor='language-select'
          className='mb-2 text-black text-lg font-semibold w-full text-left'
          style={{ color: '#000000', borderColor: 'black' }}
        >
          Choose Target Language:
        </label>
        <div className='w-full text-left '>
        <Select
  id='language-select'
  value={languageOptions.find(option => option.value === selectedLanguage) || null} // If no language is selected, show placeholder
  onChange={handleLanguageChange}
  options={languageOptions}
  placeholder="Select Language"
  isSearchable={true}
  className='font-medium'
  styles={{
    control: (provided) => ({
      ...provided,
      background: '',
      color: 'black',
      width: '100%',
      maxWidth: '100%',
    }),
    singleValue: (provided) => ({
      ...provided,
      color: 'black',
    }),
    option: (provided) => ({
      ...provided,
      color: 'black',
    })
  }}
/>
        </div>
      </div>

      <div className='flex flex-col items-start justify-start pt-6 -mr-60 w-full'>
        <button
          className='px-6 py-2 bg-[#1f4e96] text-white rounded-md'
          onClick={handleSubmit}
        >
          Translate
        </button>
      </div>

      
      {errorMessage && (
        <div className='bg-red-200 h-20 rounded-full text-black p-4 mt-12 w-4/5'>
          {/* {errorMessage} */}
          <p className='text-center'>{errorMessage}</p>
        </div>
      )}

      <div className='pt-8'>
        {loading ? (
          <div className="flex flex-col items-center w-full max-w-lg bg-white p-8 rounded-lg shadow-lg">
            <ClipLoader size={50} color={"#123abc"} loading={loading} />
            <p className="mt-4 text-gray-600 text-lg">Loading file, please wait...</p>
          </div>
        ) : (
          <>
          </>
        )}
      </div>

      
      {translatedText && !loading && (
        <div className='flex flex-col items-center justify-center mt-4 w-4/5'>
          <div className='relative bg-lime-200 h-auto w-full p-4 rounded-md overflow-auto'>
            <p className='text-black pr-16'>{translatedText}</p>
            <button
              className='absolute top-2 right-2 bg-black text-white text-xs px-2 py-1 rounded hover:bg-gray-800 flex items-center'
              title='copy'
              onClick={() => navigator.clipboard.writeText(translatedText)}
            >
              <ContentCopyIcon className='-mr-0 text-xs' />
              Copy
            </button>
          </div>
          <p style={{fontSize: 'small',position: 'fixed', bottom: '120px'}}>This output is generated by Y-ChatGPT AI bot</p>
        </div>
        
      )}
    </div>
  );
};

export default TranslateYourTextDisplay;

