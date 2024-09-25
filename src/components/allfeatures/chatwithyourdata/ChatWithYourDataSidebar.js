import React, {useState , useContext, useEffect} from 'react'
import ChatWithYourDataThemeContext from './ChatWithYourDataThemeContext';

const getclass1 = (currenttheme) => {
    return currenttheme === 'light' ? '' : 'bg-black text-white';
};

const ChatWithYourDataSidebar = () => {
    
    const [file1, setFile1] = useState(null);
    const {chatAdded,setDatabasePath,loadTrue,fileTrue,loadFalse,setFileName,setSelectedFile,theme} = useContext(ChatWithYourDataThemeContext);
    const [fileNames, setFileNames] = useState([]);

    const handleFile1Change = (event) => {
        setFile1(event.target.files[0]);
    };

    const class1 = getclass1(theme);

    useEffect(() => {
        // Retrieve all file names from localStorage when the component mounts
        const storedFileNames = getAllFileNames();
        setFileNames(storedFileNames);
    },[chatAdded]);

    const getAllFileNames = () => {
        const chatData = JSON.parse(localStorage.getItem("chat with data")) || {};
        return Object.keys(chatData);
    };
    
    const handleSubmit = async (event) => {
        event.preventDefault();

        const formData = new FormData();
        formData.append('file1', file1);

        setFileName(file1.name);
        setSelectedFile(null);
        // setLoading(true); 
        loadTrue();

        try {
            const response = await fetch('/api/route', {
            method: 'POST',
            headers: {
                'X-Custom-Header': 'route0'
            },
            body: formData
            });
            // Handle response from backend
            const data = await response.text();

            setDatabasePath(data);
            console.log(data);
            
            console.log(response)
            if(response.ok)
            fileTrue();

        } catch (error) {
            console.error('Error uploading file:', error);
        }finally {
            // Hide spinner
            loadFalse();
        }
    };
    
    const removeAllPrompt = () => {
        localStorage.removeItem("chat with data");
        setFileNames([]);

      }

    return (
    <div className='w-full'>
        <div className="flex flex-col items-center justify-center rounded border-black w-70 h-36 transition-transform hover:scale-110" style={{  padding: '20px',background:'linear-gradient(rgb(31, 78, 150), rgb(81 208 253))', marginBottom: '30px', overflow:'hidden' }}>
            <h className='text-2xl mb-2'>New Chat</h>
            <div>
                
            </div>
            <div className='text-wrap'>                               
                <label className='pl-28 ml-10' for='input-file'>
                    <input type='file' accept='.pdf,.doc,.docx,.txt,.jpg,.jpeg,.png' id='input-file' onChange={handleFile1Change}/>
                </label>
            </div> 
            <div className=' flex flex-col items-center justify-center mt-2'>
                <button
                    className='px-4 py-2 bg-[#1f4e96] text-white rounded-md'
                    onClick={handleSubmit}>
                    Start Chat
                </button>
            </div>          
        </div>   
        <div className="border-b border-blue-800 border-2"></div>   
        <div>
            <div className='flex justify-between'>
                <h className='block text-sm mt-4 mb-1 font-medium text-[#1f4e96]'>Previous Files :</h>
                <button onClick={removeAllPrompt}>
                    <p className='px-6 py-1 mb bg-[#1f4e96] block text-sm text-white rounded-md truncate' >Clear Prompts</p>
                </button>
            </div>
            <div className='h-[24rem] mt-6' style={{ overflowY: 'auto' }}>
                {[...fileNames].reverse().map((curr_fileName, index) => (
                    <button className="w-full" onClick={() => setSelectedFile(curr_fileName)}>
                        <p className='px-6 py-2 h-10 w-full text-left mb-2 bg-[#1f4e96] text-white rounded-md truncate' key={index}>{curr_fileName}</p>
                    </button>
                ))}
            </div>            
        </div>         
    </div>
  )
}

export default ChatWithYourDataSidebar;