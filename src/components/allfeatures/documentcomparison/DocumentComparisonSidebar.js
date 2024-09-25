import React, {useState , useContext, useEffect} from 'react'
// import {useNumberInput} from './ThemeContext';
import {FaFileUpload,FaTimesCircle} from "react-icons/fa";
import InsertDriveFileRoundedIcon from '@mui/icons-material/InsertDriveFileRounded';
import DocumentComparisonThemeContext from './DocumentComparisonThemeContext';
import Select from 'react-select';
// import { ClipLoader } from 'react-spinners';

const getclass1 = (currenttheme) => {
    return currenttheme === 'light' ? '' : 'bg-black text-white';
  };

const DocumentComparisonSidebar = () => {
    
    // const [file1, setFile1] = useState(null);
    // const [file2, setFile2] = useState(null);
    const [fileName, setFileName] = useState('');   
    const [selectedLanguage, setSelectedLanguage] = useState('');
    const [downloadUrl, setDownloadUrl] = useState('');
   
    const [items,setItems] = useState([]);
    const {file1, setFile1,file2, setFile2,highlightedText1,setHighlightedText1,highlightedText2,setHighlightedText2,
           firstText,setFirstText,secondText,setSecondText,mergedText,setMergedText,submitted1, setSubmitted1,theme } = useContext(DocumentComparisonThemeContext)
    const {sendData,loadTrue,fileTrue,loadFalse,setDownloadLink,setFileReady} = useContext(DocumentComparisonThemeContext);
    const class1 = getclass1(theme);

    useEffect(() => {
        localStorage.setItem('items',JSON.stringify(items));
      },[items]);

    const handleFile1Change = (event) => {
        setFile1(event.target.files[0]);
    };

    const handleFile2Change = (event) => {
        setFile2(event.target.files[0]);
    };

    const handleDragOver = (event) => {
        event.preventDefault();
    };

    const handleDrop = (event) => {
        event.preventDefault();
        const droppedFile = event.dataTransfer.files[0];
        setFile1(droppedFile);
    };

    const handleDropFile2 = (event) => {
        event.preventDefault();
        const droppedFile = event.dataTransfer.files[0];
        setFile2(droppedFile);
    };

    const clearFile1 = () => {
        setFile1(null);
    };

    const clearFile2 = () => {
        setFile2(null);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        const username = 'ychatgpt';
        const password = 'dfnefiwnfwfniwfndscscnxzcx3243cxx';
        const credentials = btoa(`${username}:${password}`);

        setSubmitted1(true);
        loadTrue();

        const formData = new FormData();
        formData.append('file1', file1);
        console.log('file1', file1);
        formData.append('file2', file2);
        console.log('file2', file2);
        

        try {
        console.log('Sending data to backend:');
        const response = await fetch('/Document_Comparision/upload_and_process/', {
            method: 'POST',
            body: formData,
            headers: {
                'Authorization': `Basic ${credentials}`
            }
        });
    
        const data = await response.json();
        console.log('Response Data', data);

        setHighlightedText1(data.highlighted_text1);
        setHighlightedText2(data.highlighted_text2);
        setFirstText(`data:text/plain;base64,${data.highlighted_text1_base64}`);
        setSecondText(`data:text/plain;base64,${data.highlighted_text2_base64}`);
        setMergedText(`data:text/plain;base64,${data.merged_text_base64}`);
        
        fileTrue();  // Call function to handle file upload success
        } catch (error) {
            console.error('Error in route:', error);
        } finally {
            // Handle loading state
            loadFalse();
        }
    };

    const isTextFileSelected = (file) => file && file.type === 'text/plain';

  
  return (
    <div className={`w-full `} >
        <h2 className={`text-left text-black text-xl font-bold mb-4 ${class1}`}>Upload and File Selection</h2>
        <label className={`block text-left text-black text-lg font-medium mb-2 ${class1}`}>Choose the first file:</label>
        <div
                className="flex flex-col items-center mt-4 justify-center rounded border-black w-70 h-36 transition-transform"
                style={{ padding: '20px', background: 'linear-gradient(rgb(31, 78, 150), rgb(81, 208, 253))', marginBottom: '50px' }}
                onDragOver={handleDragOver}
                onDrop={handleDrop}
            >
                <div className="flex flex-col items-center font-medium text-black">
                    <FaFileUpload color='black' size='2em' />
                    <p className={`${class1}`}>Drag & drop your file here</p>
                    <p className={`${class1}`}>Limit 200MB per file • PDF, TXT</p>
                    <label className={`mt-2 cursor-pointer px-4 py-2 border-2 border-black rounded text-black ${class1}`} htmlFor='input-file'>
                        Browse File
                        <input
                            type='file'
                            accept='application/pdf,text/plain'
                            id='input-file'
                            onChange={handleFile1Change}
                            className="hidden"
                        />
                    </label>
                </div>
            </div>

            {file1 && (
                <div className='flex items-center justify-between w-70 -mt-9 mb-9 text-black border-gray-300'>
                    <div className="flex items-center truncate font-medium">
                        <InsertDriveFileRoundedIcon style={{ color: 'black', fontSize: '2em' }} />
                        <p className={`ml-2 truncate font-medium max-w-xs ${class1}`}>{file1.name}</p>
                        <p className={`font-medium text-black ${class1}`}>{`(${(file1.size / 1024).toFixed(2)} KB)`}</p>
                    </div>
                    <button onClick={clearFile1} className="text-red-600 hover:text-red-800">
                        <FaTimesCircle size='1.5em' />
                    </button>
                </div>
            )}    

        <label className={`block text-left text-black text-lg font-medium mb-2 ${class1}`}>Choose the second file:</label>
                    <div
                        className="flex flex-col items-center mt-4 justify-center rounded border-black w-70 h-36 transition-transform"
                        style={{ padding: '20px', background: 'linear-gradient(rgb(31, 78, 150), rgb(81, 208, 253))', marginBottom: '50px' }}
                        onDragOver={handleDragOver}
                        onDrop={handleDropFile2}
                    >
                        <div className="flex flex-col items-center font-medium text-black">
                            <FaFileUpload color='black' size='2em' />
                            <p className={`${class1}`}>Drag & drop your file here</p>
                            <p className={`${class1}`}>Limit 200MB per file • PDF, TXT</p>
                            <label className={`mt-2 cursor-pointer px-4 py-2 border-2 border-black rounded text-black ${class1}`} htmlFor='input-file2'>
                                Browse File
                                <input
                                    type='file'
                                    accept='application/pdf,text/plain'
                                    id='input-file2'
                                    onChange={handleFile2Change}
                                    className="hidden"
                                />
                            </label>
                        </div>
                    </div>

            {file2 && (
                <div className='flex items-center justify-between w-70 -mt-9 text-black border-gray-300'>
                    <div className="flex items-center truncate font-medium">
                        <InsertDriveFileRoundedIcon style={{ color: 'black', fontSize: '2em' }} />
                        <p className={`ml-2 truncate font-medium max-w-xs ${class1}`}>{file2.name}</p>
                        <p className={`font-medium text-black ${class1}`}>{`(${(file2.size / 1024).toFixed(2)} KB)`}</p>
                    </div>
                    <button onClick={clearFile2} className="text-red-600 hover:text-red-800">
                        <FaTimesCircle size='1.5em' />
                    </button>
                </div>
            )}    

            {isTextFileSelected(file2) && isTextFileSelected(file1) && (
                            <button
                                onClick={handleSubmit}
                                className={`mt-4 px-4 py-2 bg-[#1f4e96] text-white rounded-md transition-colors duration-300 text-center  block w-full ${class1}`}
                            >
                                Compare
                            </button>
            )}
        
    </div>
  )
}

export default DocumentComparisonSidebar;