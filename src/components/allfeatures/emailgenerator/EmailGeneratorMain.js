import React, { useState } from 'react';
import { ClipLoader } from 'react-spinners';
import EmailGeneratorTransitionAlert from './EmailGeneratorTransitionAlert';
import language from './Language.json';

function EmailGeneratorMain() {
  const [loading, setLoading] = useState(false);
  const [successAlert, setShowAlert] = useState(false);
  const [errormsg, setErrormsg] = useState(false);
  const [messageError, setMessageError] = useState('');
  const [textareaValue, setTextareaValue] = useState('');
  const [top_languages, setLanguage] = useState('');
  const [mode, setSelectedModeText] = useState('');
  const [isVisible, setIsVisible] = useState(false);
  const [textareaValue1, setTextareaValue1] = useState('');
  const [textareaValue2, setTextareaValue2] = useState('');
  const [formError, setFormError] = useState('');
  const [serverError, setServerError] = useState('');

  const handleShowAlert = () => {
    setShowAlert(true);
    setTimeout(() => {
      setShowAlert(false);
    }, 6000);
  };

  const errorMsgAlert = () => {
    setErrormsg(true);
    setTimeout(() => {
      setErrormsg(false);
    }, 6000);
  };

  const handleModeChange = (event) => {
    const selectedOption = event.target.selectedOptions[0];
    setSelectedModeText(selectedOption.textContent);
  };

  const handleLanguageChange = (event) => {
    const selectedId = event.target.value;
    setLanguage(selectedId);
  };

  const handleTextareaChange = (event) => {
    setTextareaValue(event.target.value);
  };

  const GenerateEmail = async (event) => {
    event.preventDefault();
    setIsVisible(false);
    setFormError('');
    setServerError('');
    setMessageError('');
    
  
    
    if (!textareaValue) {
      setFormError('Please enter the email prompt.');
      return;  
    }
  
    if (!mode || mode === 'None') {
      setFormError('Please select a mode.');
      return;  
    }
  
    if (!top_languages || top_languages === 'None') {
      setFormError('Please select a language.');
      return;  
    }

    const email=process.env.REACT_APP_EMAIL_GENERATOR;
    const username = 'ychatgpt';
    const password = 'dfnefiwnfwfniwfndscscnxzcx3243cxx';
    const credentials = btoa(`${username}:${password}`);


    setLoading(true);

    const payload = {
      prompt: textareaValue,
      mode: mode,
      target_lang: top_languages,
    };

    try {
      const response = await fetch(email, {
        method: 'POST',
        body: JSON.stringify(payload),
        headers: {
          Authorization: `Basic ${credentials}`,
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        const errorData = await response.json();
        let errorMessage = errorData.error || errorData.message || 'An error occurred.';
  
        if (response.status === 408) {
          errorMessage = 'Error generating the email. Please try again later.';
        } else if (response.status === 400) {
          errorMessage = 'Invalid selected mode and language. Please adjust your input.';
        } else if (response.status >= 500) {
          errorMessage = 'Server error. Please try again later.';
        }
  
        setServerError(errorMessage);
        return;
      }
  
      const data = await response.json();
      setTextareaValue1(data.original_email);
      setTextareaValue2(data.translated_email);
      
      handleShowAlert();
      setFormError('')
      setServerError('')
      setIsVisible(true);
    } catch (error) {
      setServerError('Error connecting to the server. Please try again later.');
    } finally {
      setLoading(false);
    }
  };
  

  return (
    <div className="max-w-7xl w-full mx-auto p-6 bg-white">
      <form className="space-y-6">
        <div className="mb-4">
          <label className="block mb-2 text-sm font-medium text-black">
            Enter Your Email Prompt:
          </label>
          <textarea
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            id="txtAreaEmail"
            rows="3"
            placeholder='Please Give the Valid Prompt. Other Wise Bot Will Generate Sample Email with Selected Language.'
            value={textareaValue}
            onChange={handleTextareaChange}
          ></textarea>
        </div>
        <div className="mb-4">
          <label className="block mb-2 text-sm font-medium text-black">
            Select Mode:
          </label>
          <select
            className="block w-full px-3 py-2 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            id="ddlselectmode"
            onChange={handleModeChange}
          >
            <option value="">--Select Mode--</option>
            <option value="1">To superior</option>
            <option value="2">To teammate</option>
            <option value="3">To junior</option>
          </select>
        </div>
        <div className="mb-4">
          <label className="block mb-2 text-sm font-medium text-black">
            Select Target Language:
          </label>
          <select
            className="block w-full px-3 py-2 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            id="ddllanguage"
            onChange={handleLanguageChange}
          >
            <option value="">--Select Language--</option>
            {language.lang.map((result) => (
              <option key={result.Id} value={result.Id}>
                {result.value}
              </option>
            ))}
          </select>
        </div>
        <div className="flex justify-between">
          <button
            type="submit"
            className="px-4 py-2 font-medium text-white bg-[#1f4e96] rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
            onClick={GenerateEmail}
          >
            Generate Email
          </button>
        </div>

        {loading && (
            <div className="flex justify-center items-center">
              <div className="flex flex-col items-center w-full max-w-lg bg-white p-8 rounded-lg shadow-lg">
                <ClipLoader size={50} color={"#1f4e96"} loading={loading} />
                <p className="mt-4 text-gray-600 text-lg">Loading file, please wait...</p>
              </div>
            </div>
        )}

        {/* {successAlert && (
          <EmailGeneratorTransitionAlert type="success" isAlert={false} message="Email generated successfully!" />
        )} */}

        {formError && (
          <div className="flex justify-center">
            <div className="bg-red-200 h-20 rounded-full text-black p-4 mb-4 w-2/3">
              <p className="text-center">{formError}</p>
            </div>
          </div>
        )}

        {serverError && (
          <div className="flex justify-center">
            <div className="bg-red-200 h-20 rounded-full text-black p-4 mb-4 w-2/3">
              <p className="text-center">{serverError}</p>
            </div>
          </div>
        )}

        {errormsg && (
          <div className="flex justify-center">
            <div className='bg-red-200 h-20 rounded-full text-black p-4 mb-4 w-2/3'>
              <p className='text-center mt-1'>{messageError}</p>
            </div>
          </div>
        )}

        {isVisible && (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="flex flex-col">
              <label className="block text-sm font-medium mb-2 text-black">Generated Email:</label>
              <div
                className="flex-1 mt-1 block w-full px-3 py-2 border-2 border-lime-400 rounded-md shadow-sm bg-white sm:text-sm"
                id="generatedEmail"
                style={{ whiteSpace: 'pre-wrap', minHeight: '150px' }}
              >
                {textareaValue1}
              </div>
            </div>
            <div className="flex flex-col">
              <label className="block text-sm font-medium mb-2 text-black">Translated Email:</label>
              <div
                className="flex-1 mt-1 block w-full px-3 py-2 border-2 border-lime-400 rounded-md shadow-sm bg-white sm:text-sm"
                id="translatedEmail"
                style={{ whiteSpace: 'pre-wrap', minHeight: '150px' }}
              >
                {textareaValue2}
              </div>
            </div>
          </div>
        )}
      </form>
    </div>
  );
}

export default EmailGeneratorMain;
