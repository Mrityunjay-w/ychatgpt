import React, { useContext, useState } from 'react';
import PDFQuerySystemThemeContext from './PDFQuerySystemThemeContext';


const PDFQuerySystemDisplay = () => {
    const { handleSubmit, selectedFiles, inputText,setDataresponse,dataresponse } = useContext(PDFQuerySystemThemeContext);
    const [queryType, setQueryType] = useState('Metadata');
    const [queryData, setQueryData] = useState({ queryScreenId: '', queryInstructions: '', queryText: '' });
    const [datatype, setDatatype] = useState("metadata");
    const [isGenerated, setIsGenerated] = useState(false);
    const [data, setData] = useState([]);

    const handleQueryTypeChange = (event) => {
        setDatatype(event.target.value);
        setQueryType(event.target.value);
        const { name, value } = event.target;
        setQueryData({ ...queryData, [name]: value });
    };

    const handleChange = (event) => {
        setQueryData({
            ...queryData,
            queryScreenId: event.target.value,
        });
    };

    const handleChange1 = (event) => {
        setQueryData({
            ...queryData,
            queryInstructions: event.target.value,
        });
    };

    const handleChange2 = (event) => {
        const { value } = event.target;
        setQueryData((prevQueryData) => ({
            ...prevQueryData,
            queryText: value,
        }));
    };

    const handleGenerate = () => {
        console.log('queryData before handleSubmit:',inputText, selectedFiles, queryType, queryData);
        handleSubmit(inputText, selectedFiles, queryType, queryData);
        setIsGenerated(true);
       
       
    };

    return (
        <div className='w-full'>
            <select value={queryType} onChange={handleQueryTypeChange} className='w-full border-slate-400 rounded-md border-2 h-10 text-xl'>
                <option value="metadata">MetaData</option>
                <option value="text">Text</option>
            </select>

            {datatype === "metadata" ? (
                <div>
                    <div className="mt-4">
                        <label htmlFor="screenID" className="block text-sm font-medium text-black-700 dark:text-black-900 mb-2 text-left">Screen ID:</label>
                        <input type="text" id="screenID" value={queryData.queryScreenId} onChange={handleChange} className="text-left shadow-sm rounded-md w-full px-3 py-2 border-2 border-slate-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500" required />
                    </div>
                    <div className="mt-4">
                        <label htmlFor="instructions" className="block text-sm font-medium text-black-700 dark:text-black-900 mb-2 text-left">Instructions:</label>
                        <input type="text" id="instructions" value={queryData.queryInstructions} onChange={handleChange1} className="text-left shadow-sm rounded-md w-full px-3 py-2 border-2 border-slate-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500" required />
                    </div>
                </div>
            ) : (
                <div className='mt-4'>
                    <label htmlFor="instructions" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 text-left">Query text:</label>
                    <textarea
                        className="text-left shadow-sm rounded-md w-full px-3 py-2 border-2 border-slate-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                        value={queryData.queryText}
                        onChange={handleChange2}
                        rows="5"
                        cols="50"
                    />
                </div>
            )}

            <div className='flex flex-col items-center justify-center pt-6'>
                <button className='px-6 py-2 bg-[#1f4e96] text-white rounded-md' onClick={handleGenerate}>
                    Generate
                </button>
            </div>

            {isGenerated && (
                <div className='pt-6 ml-4 '>
                    <h2 className=' text-left text-2xl font-semibold text-black mb-4'>Top 5 nearest neighbors for the {queryType} query:</h2>
                    <div>
                        {dataresponse.map((item, index) => (
                          <React.Fragment key={index}>
                            <div key={index} className= 'text-left mb-4 '>
                                <p className='mb-4'><strong>Page {item.page_number}:</strong> Distance={item.distance}</p>
                                <p className='mb-4'><strong>Screen ID:</strong> {item.screen_id}, <strong>Instructions:</strong> {item.instructions}</p>
                                <p className='mb-4'><strong>Page Text:</strong> {item.page_text}</p>
                                <p><strong>Page Image:</strong></p>
                                <img src={item.page_image} alt={`Page ${item.page_number}`} width="1600" />
                               
                            </div>
                            {index < dataresponse.length - 1 && <hr className="hr-darkblack border-solid border-black " />}
                            </React.Fragment>
                        ))}
                       
                    </div>
                </div>
            )}
        </div>
    );
};

export default PDFQuerySystemDisplay;
