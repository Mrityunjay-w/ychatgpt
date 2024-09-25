import React, { useContext, useEffect, useState } from 'react'
import { FaArrowAltCircleRight } from "react-icons/fa";
import { FaUser } from "react-icons/fa";
import ChatWithYourDataThemeContext from './ChatWithYourDataThemeContext';
import { RiRobot2Fill } from "react-icons/ri";

const ChatWithYourDataChatBot = () => {
    const [inputText, setInputText] = useState('');
    const [textList, setTextList] = useState([]);
    // const [responseText ,setResponseText] = useState('');
    const [responseList, setResponseList] = useState([]);
    // const [textListSelecetedFile, setTextListSelecetedFile] = useState([]);
    // const [responseListSelecetedFile, setResponseListSelecetedFile] = useState([]);
    const [chatDataSelectedFile, setchatDataSelectedFile] = useState([]);
    const [showContent, setShowContent] = useState(false);

    const { databasePath, fileName, selectedFile, setChatAdded, chatAdded } = useContext(ChatWithYourDataThemeContext);

    const minLength = Math.min(textList.length, responseList.length);

    const handleInputChange = (e) => {
        setInputText(e.target.value);
    }

    const handleAddText = () => {
        if (inputText.trim() !== "") {
            setTextList([...textList, inputText]);
            setInputText('');
        }
    };

    const handleKeyDown = (event) => {
        if (event.key === 'Enter') {
            handleAddText();
            handleSubmit();
        }
    }

    useEffect(() => {
        getDataFromLocalStorage(selectedFile);
        // console.log("hi");
        if (selectedFile !== null) {
            // Reset showContent to false
            setShowContent(false);

            // Set a timeout to change `showContent` to true after a delay
            const timer = setTimeout(() => {
                setShowContent(true);
            }, 3000); // 3 seconds delay

            // Cleanup the timeout if the component is unmounted or `selectedFile` changes
            return () => clearTimeout(timer);
        } else {
            // If `selectedFile` is null, reset `showContent` to false
            setShowContent(false);
        }
    }, [selectedFile]);

    const getDataFromLocalStorage = (selectedFile) => {
        const chatData = JSON.parse(localStorage.getItem("chat with data")) || [];
        setTextList([])
        setResponseList([])
        // setTextListSelecetedFile([])
        // setResponseListSelecetedFile([])
        const x = chatData[selectedFile];
        console.log("x :", x);
        setchatDataSelectedFile(x);

        console.log("data", chatDataSelectedFile);
    }

    const initializeLocalStorage = () => {
        if (!localStorage.getItem("chat with data")) {
            localStorage.setItem("chat with data", JSON.stringify({}));
        }
    };

    const addDataToLocalStorage = (inputText, data) => {
        // Initialize localStorage if not already done
        initializeLocalStorage();

        // Retrieve the current data from localStorage
        const chatData = JSON.parse(localStorage.getItem("chat with data"));

        // Initialize the file's data if it doesn't exist
        if (!chatData[fileName]) {
            chatData[fileName] = [];
        }

        let newEntry = { prompt: inputText, output: data };
        // Add the new prompt and output to the file's data
        chatData[fileName].push(newEntry);

        // Save the updated data back to localStorage
        localStorage.setItem("chat with data", JSON.stringify(chatData));
    };

    const handleSubmit = async (event) => {

        // event.preventDefault();

        const formData = new FormData();
        formData.append('inputtext', inputText);
        formData.append('DatabasePath', databasePath);

        setChatAdded(chatAdded === false ? true : false);
        try {
            const response = await fetch('/api/route', {
                method: 'POST',
                headers: {
                    'X-Custom-Header': 'route1'
                },
                body: formData
            });
            const data = await response.text();
            // setResponseText(data);
            setResponseList([...responseList, data]);

            console.log("++++", typeof (fileName));

            // storing data at local storage
            addDataToLocalStorage(inputText, data);


            console.log(response)
            console.log(data)

        } catch (error) {
            console.error('Error sending message:', error);
        } finally {

        }

    };

    const renderContent = (text) => {
        console.log(typeof (text))
        const jsonLines = text.split('\n');
        return (
            <p>
                {jsonLines.map((line, i) => (
                    <React.Fragment key={i}>
                        {line}
                        <br />
                    </React.Fragment>
                ))}
            </p>
        );
    }

    return (
        <div className='p-4 mx-4'>
            <div className='h-[33rem] text-black text-left' style={{ overflowY: 'auto' }}>

                {selectedFile != null ?
                    (showContent ?
                        (
                            <div>
                                {chatDataSelectedFile.map((item, index) => (
                                    <div key={index} style={{ marginBottom: '2px' }}>
                                        <div className='flex my-4 pb-2 bg-slate-200 rounded-lg'>
                                            <div className='ml-5 mt-2'>
                                                {<FaUser size={30} color='#1f4e96' />}
                                            </div>
                                            <div className='ml-4 text-xl mt-2'>{item.prompt}</div>
                                        </div>
                                        <div className='flex m-5 text-wrap'>
                                            <div>
                                                {<RiRobot2Fill size={30} color='#1f4e96' />}
                                            </div>
                                            <div className='ml-4'>
                                                {renderContent(item.output)}
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        ) : (<></>)
                    )
                    : (<></>)}

                {selectedFile == null ?
                    (<div>
                        {Array.from({ length: minLength }, (_, index) => (
                            <div key={index} style={{ marginBottom: '2px' }}>
                                {<div className='flex my-4 pb-2 bg-slate-200 rounded-lg'>
                                    <div className='ml-5 mt-2'>
                                        {<FaUser size={30} color='#1f4e96' />}
                                    </div>
                                    <div className='ml-4 text-xl mt-2' key={index}>{textList[index]}</div>
                                </div>}
                                <div className='flex m-5 text-wrap'>
                                    <div>
                                        {<RiRobot2Fill size={30} color='#1f4e96' />}
                                    </div>
                                    <div className='ml-4'>
                                        {renderContent(responseList[index])}
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>) :
                    (<></>)
                }
            </div>

            {selectedFile === null ?
                (<div className="flex align-center bg-[#f5f7fa] rounded-full mt-4 p-4 shadow-xl">
                    {/* <input type="text" placeholder="Ask your questions?" value={searchText} onKeyDown={handleKeyDown} onChange={handleInputChange} className="bg-transparent pl-4 w-[58rem] border-transparent text-black text-base " style={{outline: 'transparent','z-index':'100000'}} /> */}
                    <input type='text' placeholder="Ask your questions?" value={inputText} onKeyDown={handleKeyDown} onChange={handleInputChange} className="bg-transparent pl-4 w-[68rem] border-transparent text-black text-base " style={{ outline: 'transparent' }} />
                    <button onClick={handleSubmit}>
                        <FaArrowAltCircleRight size={30} color='#1f4e96' />
                    </button>
                </div>)
                : (<></>)
            }
        </div>
    )
}

export default ChatWithYourDataChatBot;