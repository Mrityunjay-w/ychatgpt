import React, { useState, useContext } from 'react';
import { ClipLoader } from 'react-spinners';
import ExcelAnalyzerThemeContext from './ExcelAnalyzerThemeContext';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';

// Register Chart.js components
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const ExcelAnalyzerChatbox = () => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [data, setData] = useState([]);
  const [InputQuestion, setInputQuestion] = useState('');
  const [headerValue, setHeaderValue] = useState('');
  const [formError, setFormError] = useState(''); // Add form error state
  const [load, setLoad] = useState(false);

  const { data1, setdataa } = useContext(ExcelAnalyzerThemeContext);

  const handleInputQuestionChange = (e) => {
    setInputQuestion(e.target.value);
    setFormError(''); // Reset form error when typing
  };

  const handleInputChange = (e) => {
    setHeaderValue(e.target.value);
    setFormError(''); // Reset form error when typing
    headerChange();
  };

  const handleKeyDown = (event) => {
    if (event.key === 'Enter') {
      handleSubmit();
    }
  };

  const headerChange = async () => {
    if (!headerValue) {
      setFormError('Header row cannot be empty');
      return;
    }

    const username = 'ychatgpt';
    const password = 'dfnefiwnfwfniwfndscscnxzcx3243cxx';
    const credentials = btoa(`${username}:${password}`);

    const formData = new FormData();
    formData.append('headerValue', headerValue);

    try {
      const response = await fetch('https://ychatgpt-apis.azurewebsites.net/excel_analyzer/analyze-excel', {
        method: 'POST',
        headers: {
          'custom-header': 'route3',
          'Authorization': `Basic ${credentials}`
        },
        body: formData
      });
      const rawResponse = await response.text();
      const data = JSON.parse(rawResponse);
      setdataa(data);
    } catch (error) {
      console.error('Error uploading file:', error);
    }
  };

  const handleSubmit = async () => {
    if (!InputQuestion) {
      setFormError('Question cannot be empty');
      return;
    }

    setLoad(true);
    setFormError(''); // Reset form error on valid submit

    const username = 'ychatgpt';
    const password = 'dfnefiwnfwfniwfndscscnxzcx3243cxx';
    const credentials = btoa(`${username}:${password}`);

    const formData = new FormData();
    formData.append('InputQuestion', InputQuestion);

    try {
      const response = await fetch('https://ychatgpt-apis.azurewebsites.net/excel_analyzer/analyze-excel', {
        method: 'POST',
        headers: {
          'custom-header': 'route2',
          'Authorization': `Basic ${credentials}`
        },
        body: formData
      });

      const contentType = response.headers.get('Content-Type');
      let responseData;

      if (contentType.includes('application/json')) {
        responseData = await response.json();
      } else if (contentType.includes('image/png')) {
        const blob = await response.blob();
        responseData = URL.createObjectURL(blob);
      } else if (contentType.includes('text/plain')) {
        responseData = await response.text();
      } else {
        throw new Error('Unsupported content type: ' + contentType);
      }

      setData(responseData);
    } catch (error) {
      console.error('Error uploading file:', error);
      setFormError('Error submitting the question. Please try again.');
    } finally {
      setLoad(false);
    }
  };

  // Transform data for histogram
  const prepareHistogramData = () => {
    if (!Array.isArray(data) || data.length === 0) return null;

    const ages = data.map(item => item.Age).filter(age => age !== null && !isNaN(age)); // Filter out null and non-numeric values
    const ageCounts = ages.reduce((acc, age) => {
      acc[age] = (acc[age] || 0) + 1;
      return acc;
    }, {});

    return {
      labels: Object.keys(ageCounts),
      datasets: [
        {
          label: 'Age Distribution',
          data: Object.values(ageCounts),
          backgroundColor: 'rgba(75, 192, 192, 0.2)',
          borderColor: 'rgba(75, 192, 192, 1)',
          borderWidth: 1
        }
      ]
    };
  };

  const histogramData = prepareHistogramData();

  // Function to render data
  const renderData = () => {
    if (typeof data === 'string') {
      return <p className='text-lime-600'>{data}</p>;
    }

    if (typeof data === 'object') {
      if (data.answer) {
        return <p className='text-lime-600'>{data.answer}</p>;
      }
      return <pre>{JSON.stringify(data, null, 2)}</pre>;
    }

    return null;
  };

  return (
    <div className='mt-2'>
      <div className='flex-col justify-center items-center'>
        <label className='text-black'>
          <p className='text-left'>Confirm Or Adjust The Header Row (Starting From 0) :</p>
          <input
            name="Input1"
            className='w-full border-gray border-2 mt-2'
            value={headerValue}
            onChange={handleInputChange}
            type='number'
          />
        </label>
      </div>

      {/* Validation Error */}
      {formError && (
        <div className='bg-red-200 h-20 rounded-full text-black p-4 mb-4 w-2/3'>
          <p className='text-center'>{formError}</p>
        </div>
      )}

      <button
        className='px-6 py-2 bg-[#1f4e96] text-white rounded-md mt-4'
        onClick={() => setIsExpanded(!isExpanded)}
      >
        {isExpanded ? 'Hide Dataframe Preview' : 'Show Dataframe Preview'}
      </button>
      {isExpanded && (
        <div>
          <h3 className="font-bold mt-6 mb-2">Dataframe Preview</h3>
          <table>
            <thead>
              <tr>
                {data1.length > 0 && Object.keys(data1[0]).map((key) => (
                  <th key={key} className='border-slate-400 border-2'>{key}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {data1.map((row, index) => (
                <tr key={index}>
                  {Object.values(row).map((value, i) => (
                    <td key={i} className='border-slate-400 border-2 text-left'>{value !== null ? value : ''}</td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
      <div className='flex-col justify-center items-center mt-8'>
        <label className='text-black'>
          <p className='text-left text-black'>Chat With Dataframe :</p>
          <textarea
            row={4}
            style={{ width: '886px' }}
            name="InputQuestion"
            className='w-full border-gray border-2 mt-2'
            value={InputQuestion}
            onChange={handleInputQuestionChange}
            onKeyDown={handleKeyDown}
            placeholder='Ask Question?'
          />
        </label>
      </div>
      <div className='mt-4'>
        {load ? (
          <div className="spinner-container">
            <ClipLoader size={50} color={"#123abc"} loading={load} />
            <p>Loading file, please wait...</p>
          </div>
        ) : (
          <>
            {renderData()}
            {histogramData && (
              <div>
                <h3 className="font-bold mt-6 mb-2">Age Histogram</h3>
                <Bar data={histogramData} options={{ responsive: true, scales: { x: { title: { display: true, text: 'Age' } }, y: { title: { display: true, text: 'Fare' } } } }} />
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default ExcelAnalyzerChatbox;
