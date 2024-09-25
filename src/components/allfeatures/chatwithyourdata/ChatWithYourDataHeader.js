import React, { useContext } from 'react';
import ChatWithYourDataThemeContext from './ChatWithYourDataThemeContext';
import Image from '../../image/Images';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from "react-router-dom";
import './../../../styles/Header.css';


const ChatWithYourDataHeader = () => {

    const navigate = useNavigate();

    const handleAdvanceFeaturesClick = () => {
        navigate('/actionorientedfunctionalities/advancefeature');
    }

    const { theme, toggleTheme } = useContext(ChatWithYourDataThemeContext);

    return (
        <div className=''>
            <div className='text-2xl '>
                {/* <img src={Image.logoYoko} alt='Logo' className="w-48 h-14 mt-0 mr-2 ml-20" /> */}
                <div className="bannerHeaderBarChart">
                    <span className="branding2"style={{marginTop:'7px'}}>Y-ChatGPT</span>
                </div>
                <div>

                    <p className="text-3xl font-semibold" style={{ position: 'fixed', top: '21px', right: '638px' }}>
                        <span className="text-white">Chat With Your Data</span>
                    </p>
                </div>

                <button onClick={handleAdvanceFeaturesClick} className='bg-transparent text-white mr-4 mb-2 py-2 px-4' style={{ border: 'none' }}>
                    <FontAwesomeIcon icon={faArrowLeft} style={{ fontSize: '25px', position: 'fixed', top: '32px', right: '126px' }} title="Back" />
                </button>

                {/* <img alt='DarkMode' onClick={toggleTheme} src={theme === 'Image.light' ? Image.dark : Image.light} style={{ width: '38px', height: '35px', position: 'relative', cursor: 'pointer',left:'1774px',bottom:'99px' }} /> */}
            </div>

        </div>

    )
}

export default ChatWithYourDataHeader;