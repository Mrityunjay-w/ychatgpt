import React, {useState , useContext, useEffect} from 'react'
// import {useNumberInput} from './ThemeContext';
//import {FaFileUpload} from "react-icons/fa";
import PDFQuerySystemThemeContext from './PDFQuerySystemThemeContext';




const PDFQuerySystemSidebar = () => {
    
    const [file1, setFile1] = useState(null);
    const [fileName, setFileName] = useState('');
    // const [inputText, setInputText] = useState('');
    const [pdfFiles, setPdfFiles] = useState([]);
    const [showCheckbox, setShowCheckbox] = useState(true);
    const [showCheckboxes, setShowCheckboxes] = useState(false);
    // const [selectedFiles, setSelectedFiles] = useState([]);
    

    const [items,setItems] = useState([]);

    const {sendData,loadTrue,fileTrue,loadFalse, startQuery,setAtLeastOneFile,selectedFiles,setSelectedFiles,inputText,setInputText} = useContext(PDFQuerySystemThemeContext);

    useEffect(() => {
        localStorage.setItem('items',JSON.stringify(items));
      },[items]);

    const handleSubmit = async (event) => {
        event.preventDefault();

        const formData = new FormData();
        formData.append('directory', inputText);
        // console.log(formData)
        console.log(inputText)

        // setLoading(true); 
        loadTrue();

        try {
            console.log("sending data from backend")
            const response = await fetch('http://localhost:5000/api/route', {
            method: 'POST',
            headers:{
                'x-directory-data':'route1'
            },
            body: formData
            });
        // Handle response from backend
             const data = await response.json();
             console.log('Response data:', data);
           
            sendData(data);
            
           
            fileTrue();
            
            if (data.pdfFiles) {
              setPdfFiles(data.pdfFiles);
              setShowCheckboxes(true);
              
          }

        } catch (error) {
            console.error('Error uploading file:', error);
        }finally {
            // setLoading(false); // Hide spinner
            loadFalse();
        }
    };

    const handleKeyPress = (event) => {
       
        if (event.key === 'Enter') {
          handleSubmit(event);
      }
      };
    
      const handleCheckboxChange = (event, file) => {
        const isChecked = event.target.checked;
        let updatedSelectedFiles;
        if (isChecked) {
            // setSelectedFiles([...selectedFiles, file]); // Add to selected files
            updatedSelectedFiles = [...selectedFiles, file];
        } else {
            // setSelectedFiles(selectedFiles.filter(f => f !== file)); // Remove from selected files
            updatedSelectedFiles = selectedFiles.filter(f => f !== file);
        }
        setSelectedFiles(updatedSelectedFiles);
        // console.log("===",selectedFiles)
        // console.log("+++",updatedSelectedFiles)
        setAtLeastOneFile(updatedSelectedFiles.length > 0);
    };

    const submitSelectedFiles = async () => {
        const formData = new FormData();
        formData.append('directory', inputText);
        formData.append('selectedFiles', JSON.stringify(selectedFiles));
        // formData.append('selectedFiles', selectedFiles);

        try {
            console.log("Sending selected files to backend");
            const response = await fetch('http://localhost:5000/api/route', {
                method: 'POST',
                headers: {
                    'x-directory-data': 'selectedFiles'
                },
                body: formData
            });

            const data = await response.json();
            console.log('Response data:', data);
        } catch (error) {
            console.error('Error uploading selected files:', error);
        }
    };

    

  return (
    <div className='w-full'>
        <div className="mt-4">
            <label for="directoryInput" className="block text-sm font-medium text-gray-700 dark:text-black mb-2 text-left">Enter the directory path containing PDF files:</label>
            <input 
            type="text" 
            id="directoryInput"
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            onKeyPress={handleKeyPress}
            className="text-left  text-black shadow-sm rounded-md w-full px-3 py-2 border-2 border-slate-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500" 
            required/>
          </div>

         

              <div className="mt-4">
                {showCheckboxes && pdfFiles.length > 0 && (
                    <div>
                        <h3 className="text-left text-black mb-2">Select PDF files:</h3>
                        {pdfFiles.map((file, index) => (
                            <div key={index} className="flex items-center mb-2">
                                <input
                                    type="checkbox"
                                    id={`pdfFile${index}`}
                                    name="pdfFiles"
                                    value={file}
                                    className="mr-2"
                                    onChange={(e) => handleCheckboxChange(e, file)}
                                />
                                <label htmlFor={`pdfFile${index}`} className="text-left text-black">
                                    {file}
                                </label>
                            </div>
                        ))}
                    </div>
                )}
            </div>  
          

    </div>
  )
}

export default PDFQuerySystemSidebar;