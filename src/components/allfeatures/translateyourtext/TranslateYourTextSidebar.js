import React, {useState , useContext, useEffect} from 'react'
// import {useNumberInput} from './ThemeContext';
//import {FaFileUpload} from "react-icons/fa";

//import Select from 'react-select';
// import { ClipLoader } from 'react-spinners';
import TranslateYourTextThemeContext from './TranslateYourTextThemeContext';

const TranslateYourTextSidebar = () => {
    const [inputText, setInputText] = useState('');
    const [file1, setFile1] = useState(null);
    const [fileName, setFileName] = useState('');   
    const [selectedLanguage, setSelectedLanguage] = useState('');
    const [downloadUrl, setDownloadUrl] = useState('');
    // const [status, setStatus] = useState('');


    const handleFile1Change = (event) => {
        setFile1(event.target.files[0]);
        // if(file1)
        // {
        //     setFileName(file1.name);
        //     console.log(file1.name);
        // }
    };

    // const handleLanguageChange = (event) => {
    //     setSelectedLanguage(event.target.value);
    //   };
    const handleLanguageChange = (selectedOption) => {
        // setSelectedLanguage(selectedOption ? selectedOption.value : '');
        setSelectedLanguage(selectedOption);
    };

    const [items,setItems] = useState([]);

    const {sendData,loadTrue,fileTrue,loadFalse,setDownloadLink,setFileReady,progress, updateProgress} = useContext(TranslateYourTextThemeContext);

    useEffect(() => {
        localStorage.setItem('items',JSON.stringify(items));
      },[items]);

    const handleSubmit = async (event) => {
        event.preventDefault();
        // startTranslation();
        const formData = new FormData();
        formData.append('file1', file1);
        console.log(file1)
        // formData.append('target_language', selectedLanguage);
        console.log('Selected Language:', selectedLanguage ? selectedLanguage.label : 'None');
        formData.append('target_language', selectedLanguage ? selectedLanguage.label : '');
        console.log(selectedLanguage)
        // setLoading(true); 
        loadTrue();

        try {
            console.log('sending data to backend:')
            console.log(formData)   
            const response = await fetch('http://localhost:5000/api/route', {
            method: 'POST',
            body: formData
            });
            console.log('response:',response)
        // Handle response from backend
            // const data = await response.json();
            // setItems(data);
            // localStorage.setItem('items',JSON.stringify(data));
            // sendData(data);
            
            console.log(response)
            
            if (response.ok) {
                // Extract the download URL from the response
                const data = await response.text();
                const location = data.location;
                console.log(data)
                setDownloadLink(data);
                fileTrue();

            } else {
                // Handle the case where the response is not successful
                console.error('Response not okay:', response);
                // alert('Failed to upload file. Please try again.');
            }
               
            
            fileTrue();

           

        } catch (error) {
            console.error('Error uploading file:', error);
        }finally {
            // setLoading(false); // Hide spinner
            loadFalse();
        }
    };

    const languageOptions = [
        { value: 'en', label: 'English' },
        { value: 'es', label: 'Spanish' },
        { value: 'fr', label: 'French' },
        { value: 'de', label: 'German' },
        { value: 'hi', label:'Hindi'},
        { value: 'ru', label:'Russian'},
        { value: 'id', label:'Indonesian'},
        { value: 'zhc', label:'Mandarin Chinese'},
        { value: 'fi', label:'Finnish'},
        { value: 'ar', label:'Standard Arabic'},
        { value: 'pt', label:'Portuguese'},
        { value: 'ja', label:'Japanese'},
        { value: 'sw', label:'Swahili'},
        { value: 'tr', label:'Turkish'},
        { value: 'ko', label:'Korean'},
        { value: 'it', label:'Italian'},
        { value: 'nl', label:'Dutch'},
        { value: 'fa', label:'Persian'},
        { value: 'vi', label:'Vietnamese'},
        { value: 'th', label:'Thai'},
        { value: 'ms', label:'Malay'},
        { value: 'fil', label:'Filipino'},
        // Add more languages as needed
    ];
    
  return (
    <div className='w-full '>   
       

       

        

    </div>
  )
}

export default TranslateYourTextSidebar;